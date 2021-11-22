# Node 核心模块

## global 模块

> global模块，是node的全局模块，在使用时不需要引入，直接使用

``` js
/*
  * window 浏览器中的全局对象
  * global nodejs中的全局对象
  * 注意 : node里面使用 global里面的变量,不需要引入
*/
  
  // 1. console.log()  打印

  // 2. setTimeout 和setInterval ，延时器和定时器
  setTimeout(() => {
    console.log('123');
  },1000);

  // 模块作用域下的属性 
  // 3. __dirname  当前文件夹的绝对路径
  // 4. __filename 当前文件的完整路径, 包含当前文件
  //从当前所在磁盘盘符一直到当前文件夹的路径
   console.log(__dirname);
   console.log(__filename);
```

## fs 模块

> fs模块是nodejs中最常用的一个模块，因此掌握fs模块非常的有必要

注意：

1. 除了global模块中的内容可以直接使用，其他模块都是需要加载的。
2. fs模块不是全局的，不能直接使用。因此需要导入才能使用。

``` js
const fs = require('fs')
```

### 读取文件

> 语法：fs.readFile(path[, options], callback)

方式一：不传编码参数

``` js
//参数1： 文件的名字
//参数2： 读取文件的回调函数
  //参数1：错误对象，如果读取失败，err会包含错误信息，如果读取成功，err是null
  //参数2：读取成功后的数据（是一个Buffer对象）
fs.readFile("data.txt", function(err, data){
  console.log(err);
  console.log(data);
});
```

方式二：传编码参数

``` js
//参数1： 文件的路径
//参数2： 编码，如果设置了，返回一个字符串，如果没有设置，会返回一个buffer对象
//参数3： 回调函数
fs.readFile("data.txt", "utf8",function(err, data){
  console.log(err);
  console.log(data);
});
```

关于 `Buffer` 对象

``` js
1. Buffer对象是Nodejs用于处理二进制数据的。
2. 其实任意的数据在计算机底层都是二进制数据，因为计算机只认识二进制。
3. 所以读取任意的文件，返回的结果都是二进制数据，即Buffer对象
4. Buffer对象可以调用toString()方法转换成字符串。
```

### 写文件

> 语法：fs.writeFile(file, data[, options], callback)

```javascript
//参数1：写入的文件名(如果文件不存在，会自动创建)
//参数2：写入的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：写文件后的回调函数
fs.writeFile("2.txt", "hello world, 我是一个中国人", function(err){
  if(err) {
    return console.log("写入文件失败", err);
  }
  console.log("写入文件成功");
});
```

注意：

- 写文件的时候，会把原来的内容给覆盖掉

### 追加文件

> 语法：fs.appendFile(path, data[, options], callback)

```javascript
//参数1：追加的文件名(如果文件不存在，会自动创建)
//参数2：追加的文件内容（注意：写入的内容会覆盖以前的内容）
//参数3：追加文件后的回调函数
fs.appendFile("2.txt", "我是追加的内容", function(err){
  if(err) {
    return console.log("追加文件内容失败");
  }
  console.log("追加文件内容成功");
})
```

### fs 模块-路径动态拼接的问题

在使用 fs 模块操作文件时，如果提供的操作路径是以./ 或 ../ 开头的相对路径时，很容易出现路径动态拼接错误的问题。
**原因**：代码在运行的时候，会以执行node 命令时所处的目录，动态拼接出被操作文件的完整路径。
**解决方案**：在使用fs 模块操作文件时，直接提供绝对路径，不要提供./ 或 ../ 开头的相对路径，从而防止路径动态拼接的问题。

注意：使用__dirname 获取当前文件所在的绝对路径

```javascript
const fs = require('fs');
// 拼接要读取文件的绝对路径
let filepath = __dirname +'/hello.txt'
fs.readFile(filepath, 'utf-8', (err, data) => {
    // 判断是否读取成功
    if (err) return console.log(err);
    console.log(data); 
});
```

## path 模块

### 什么是path路径模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。
例如：

- path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串
- path.basename() 方法，用来从路径字符串中，将文件名解析出来

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：

```javascript
const path = require('path')
```

### 路径拼接

#### path.join()的语法格式

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```javascript
path.join([...paths])
```

参数解读：

- ...paths `string` 路径片段的序列
- 返回值: `string`

> path.join()的代码示例

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串：

```javascript
const path = require('path');

console.log( path.join('a', 'b', 'c') );      // a/b/c
console.log( path.join('a', '/b/', 'c') );    // a/b/c
console.log( path.join('a', '/b/', 'c', 'index.html') );      // a/b/c/index.html
console.log( path.join('a', 'b', '../c', 'index.html') );     // a/c/index.html
console.log(__dirname); // node自带的全局变量，表示当前js文件所在的绝对路径
// 拼接成绩.txt的绝对路径
console.log( path.join(__dirname, '成绩.txt') ); // ------ 最常用的
```

### 获取路径中的文件名

#### path.basename()的语法格式

使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```javascript
path.basename(path[,ext])
```

参数解读：

- path `string` 必选参数，表示一个路径的字符串
- ext `string` 可选参数，表示可选的文件扩展名
- 返回: `string` 表示路径中的最后一部分

> path.basename()的代码示例

使用 path.basename() 方法，可以从一个文件路径中，获取到文件的名称部分：

```javascript
// 找文件名
console.log( path.basename('index.html') );       // index.html
console.log( path.basename('a/b/c/index.html') ); // index.html
console.log(path.basename('/a.jpg'))              // a.jpg
```

### 获取路径中的文件扩展名

#### path.extname()的语法格式

使用 path.extname() 方法，可以获取路径中的扩展名部分，语法格式如下：

```javascript
path.extname(path)
```

参数解读：

- path `string`必选参数，表示一个路径的字符串
- 返回: `string` 返回得到的扩展名字符串

> path.extname()的代码示例

使用 path.extname() 方法，可以获取路径中的扩展名部分

```javascript
// 找字符串中，最后一个点及之后的字符
console.log( path.extname('index.html') ); // .html
console.log( path.extname('a.b.c.d.html') ); // .html
console.log( path.extname('asdfas/asdfa/a.b.c.d.html') ); // .html
console.log( path.extname('adf.adsf') ); // .adsf
```

## http 模块

前置知识: 当我们在浏览器中输入了www.baidu.com的时候,发生了什么?

- ip地址 域名 端口三者之间的关系?
  - ip地址: 计算机想要接入到网络中(互联网,局域网)，就会分配一个唯一的ip地址
    - 作用: 通过ip地址就能找到这台计算机
  - 域名: www.baidu.com 就是域名 ，方便记忆 ，域名会和ip地址对应，通过域名就可以找到对应的ip地址。
  - 端口: 一台计算机能运行很多程序, 一般一个程序会占用一个或者多个端口
    - http协议的默认端口是80
    - https协议的默认端口是443
    - 数据库的默认端口3306

- 浏览器与服务器的交互过程
  1. 根据相关域名, 去查询dns服务器,得到对应的ip地址
  2. 根据IP地址, 找到对应的计算机
  3. 根据端口找到对应的服务器程序
  4. 根据url请求具体的信息
  5. 服务器根据请求进行处理
  6. 浏览器接收到了服务器的响应, 把结果响应出来

### 什么是http模块

http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。它提供了一系列的方法和属性，例如：

- http.createServer() 方法，用来创建一个web 服务器，从而对外提供 web 资源
- http.request() 方法，用来发起 http 网络请求，请求其它 web 服务器上的资源

如果要在 JavaScript 代码中使用 http 模块，则需要先导入它：

```javascript
const http = require('http')
```

### 创建最基本的web服务器

#### 创建web服务器的基本步骤

1. 导入 http 模块
2. 创建 web 服务器实例
3. 启动服务器
4. 为服务器实例绑定request 事件，监听客户端的请求

#### 创建web实现

```javascript
// 1. 导入 http 模块 
const http = require('http');

// 2. 创建 web 服务器实例 
const server = http.createServer();

// 3. 启动服务器
server.listen(3000, () => {
    console.log('my server start work');
});

// 4. 为服务器实例绑定 request 事件，监听客户端的请求 
// 当客户端发送请求到服务器的时候，会触发这个事件
server.on('request', () => {
    // 这里要处理客户端的请求
    console.log('hello html');
});
```

#### 端口号

计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖 送到你的手中。
同样的道理，在一台服务器中，可以运行成百上千个web 服务。此时，通过端口号，客户端发送过来的网络请求，可以被准 确地交给端口号对应的web 服务进行处理。

### request对象详解

常见属性：

```javascript
headers: 所有的请求头信息
method： 请求的方式
url： 请求的地址
```

注意：在发送请求的时候，可能会出现两次请求的情况，这是因为谷歌浏览器会自动增加一个`favicon.ico`的请求。

小结：request对象中，常用的就是method和url两个参数

### response对象详解

常见的属性和方法：

```javascript
res.write(data): 给浏览器发送响应体，可以调用多次，从而提供连续的响应体
res.end();   通知浏览器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。
res.end(data); 结束请求，并且响应一段内容，相当于res.write(data) + res.end()
res.statusCode: 响应的的状态码 200 404 500
res.statusMessage: 响应的状态信息， OK Not Found ,会根据statusCode自动设置。
res.setHeader(name, value); 设置响应头信息， 比如content-type
res.writeHead(statusCode, statusMessage, options); 设置响应头，同时可以设置状态码和状态信息。
```

**注意：必须先设置响应头，才能设置响应。**

#### 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```javascript
res.setHeader('Content-Type', 'text/html; charset=utf-8');
```

#### 根据不同的url响应不同的html内容

```javascript
const http = require('http');

const server = http.createServer();

server.listen(3000, () => console.log('my server running'));

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const url = req.url // 获取请求的url地址
    if (url === '/' || url === 'index.html') {
        res.end('<h1>首页</h1>');
    } else if (url === '/about.html') {
        res.end('<h1>关于我们</h1>');
    } else {
        res.end('<h1>404</h1>');
    }
    
});
```

## 实现静态WEB服务器

### 服务器响应首页

- 注意：浏览器中输入的URL地址，仅仅是一个标识，不与服务器中的目录一致。也就是说：返回什么内容是由服务端的逻辑决定

```js
server.on('request', function(req, res) {
  var url = req.url
  if(url === '/') {
    fs.readFile('./index.html', function(err, data) {
      if(err) {
        return res.end('您访问的资源不存在~')
      }

      res.end(data)
    })
  }
})
```

### 根据不同url，响应不同文件content-type设置-MIME类型

- MIME(Multipurpose Internet Mail Extensions)多用途Internet邮件扩展类型 是一种表示文档性质和格式的标准化方式
- 浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档；因此服务器将正确的MIME类型附加到响应对象的头部是非常重要的
- [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)

### 静态资源的通用处理

### MIME类型的通用处理-mime模块

- 作用：获取文件的MIME类型
- 安装：`npm i mime`

```js
const mime = require('mime')

// 获取路径对应的MIME类型
mime.getType('txt')                    // ⇨ 'text/plain' 纯文本
// 根据MIME获取到文件后缀名
mime.getExtension('text/plain')        // ⇨ 'txt'
```
