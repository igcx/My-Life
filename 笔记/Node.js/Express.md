# Express基本使用

## express介绍

- Express 是一个第三方模块，用于快速搭建服务器  
- Express 是一个基于 Node.js 平台，快速、开放、极简的 **web 开发框架**。

- [Express 官网](http://expressjs.com/)
- [Express 中文文档](http://www.expressjs.com.cn/)

### 为什么需要express

- http模块创建服务器比较复杂，开发效率低
- express在http模块的基础上进行了封装，能够极大的提高开发效率，类似于jquery与DOM
- 使用express，我们可以方便快速的开发一个web服务器以及API接口服务器。

nodejs的框架也很多：  `node-http模块 ===> express框架 ===> koa2 ===>egg.js`

## Express基本使用步骤

项目文件夹中，执行 `npm i express`。即可下载安装express。

> 注意：express不能安装在express文件夹中。否则安装失败。

使用Express构建Web服务器步骤：

  1. 加载 express 模块
  2. 创建 express 服务器
  3. 开启服务器
  4. 监听浏览器请求并进行处理

```js
// 使用express 搭建web服务器
// 1. 加载 express 模块
const express = require('express');

// 2. 创建 express 服务器
const app = express();

// 3. 开启服务器
app.listen(3000, () => console.log('express服务器开始工作了'));

// 4. 监听浏览器请求并进行处理
app.get('GET请求的地址', 处理函数);
app.post('POST请求的地址', 处理函数);
```

`res.send()`可以给浏览器返回数据，而且不用担心中文会乱码

## express接口开发

### GET接口

```js
// app.get('请求的URL', callback);
app.get('/api/getbooks', (req, res) => {
    // 处理GET方式的/api/getbooks接口
});

app.get('/', (req, res) => {
    // 客户端没有指定请求的url，在这里处理。
});

app.get('/v1/get', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send('你好啊')
})
```

> `app.get('*', (req, res) => {})` 他能够匹配到所有的GET请求，所以把它放到所有接口的最后。

#### 获取查询字符串

获取url`?参数=值&参数=值`

- 这种方式的参数，比较常规，参数部分也叫做查询字符串
- 请求地址的写法： <http://localhost:3006/test?id=3&bookname=zxx&age=20>
- 获取方式：`req.query`

```js
// 写接口
app.get('/test', (req, res) => {
    console.log(req.query); // { id: '3', bookname: 'zxx', age: '20' }
});
```

#### 获取动态参数

获取 url/`:id/:name/:age`

- 这种方式的参数，叫做动态参数
- 请求地址的写法：<http://localhost:3006/test/3/zs/30>
- 要求请求的url参数必填，否则不能和定义的接口匹配

```js
// 1个参数
// 浏览器的请求  http://localhost/test/3
// 测试接口，获取动态参数
app.get('/test/:id', (req, res) => {
 console.log(req.params); // 可以获取所有的动态参数 { id: 3 }
    res.send('收到参数');
});

// 多个参数
// 浏览器的请求  http://localhost/test2/3/zhangsan/20
// 测试接口，获取多个动态参数
app.get('/test2/:id/:name/:age', (req, res) => {
    console.log(req.params); // 可以获取所有的动态参数  
    // { id: '4', name: 'zhangsan', age: '20' }
    res.send('全部收到');
});
```

### POST接口

```js
// app.post('请求的URL', callback);
app.post('/api/addbook', (req, res) => {
    // 处理POST方式的/api/addbook接口
});

app.post('*', (req, res) => {
    // 处理所有的POST请求
})
```

#### 获取POST请求体

- GET方式没有请求体，POST方式才有请求体。
- 请求体，即客户端提交的数据。

#### 请求体是查询字符串

```js

app.use(express.urlencoded({extended: false}));

// 后续，任何一个POST接口，都可以通过req.body获取到请求体的内容
app.post('/test', (req, res) => {
    // 获取请求体
    console.log(req.body);
    res.send('你的请求体收到了');
});

```

## Express中间件

### 中间件介绍

- 中间件(Middleware )，特指业务流程的中间处理环节
- 中间件，是express最大的特色，也是最重要的一个设计
- 很多第三方模块，都可以当做express的中间件，配合express，开发更简单
- 一个express应用，是由各种各样的中间件组合完成的
- 中间件，本质上就是一个函数

### 中间件原理

为了理解中间件，我们先来想一下我们现实生活中的自来水厂的净水流程。

水库取水 ==> 加絮凝剂 ==> 反应沉淀池 ==> 过滤池 ==> 吸附池 ==> 清水池 ==> 投药消毒 ==> 配水泵 ==> 用户

- 自来水厂从获取水源到净化处理交给用户，中间经历了一系列的处理环节
- 我们称其中的每一个处理环节就是一个中间件。
- 这样做的目的既提高了生产效率也保证了可维护性。

express中间件原理：

客户端 `发送请求` 给 Express 服务器
中间件在服务器中做处理，并响应这次请求，中间一步步的处理就可以称为一个个中间件在处理

### 中间件语法

- 中间件就是一个函数
- 中间件函数中有三个基本参数， req、res、next
  - req就是请求相关的对象
  - res就是响应相关的对象
  - next：它是一个函数，必须调用了next，中间件才会往下传递

- 语法：

```js
app.use(function (req, res, next) {
  // ....
  next()
})
```

### 中间件的特点

- 每个中间件函数，共享req对象、共享res对象
  - js代码中，所有的req对象是一个对象；所有的res是一个对象
- 不调用`next()`，则程序执行到当前中间件函数后，不再向后执行
  - 注意中间件的顺序，因为有可能因为顺序原因，你的中间件函数不会执行
  - 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
- 客户端发送过来的请求，可能连续调用多个中间件进行处理
- 使用`app.use()`注册的中间件，GET和POST请求都可以触发

### 中间件初体验

为所有的请求，统一设置响应头

```js
// 直接调用app.use
app.use((req, res, next) => {
    req.abc = 'hello';
    req.body = {bookname: '西游记', author: '唐三藏'}
    next(); // 调用next，表示当前的中间件处理请求完毕，把请求交给下一个中间件
    // req.aaaa = 'aadsf'; // 错误的写法
});

// 在来一个中间件
app.use((req, res, next) => {
    req.aa = 'hahaha';
    res.bb = 'lalala';
    res.fn = function () {
        console.log(123);
    }
    next();
});

app.get('/test', (req, res) => {
    console.log(req.abc);
    console.log(req.body);
    console.log(req.aa);

    console.log(res.bb);
    res.fn();
    res.send('hello，我是服务器');
});
```

中间件的语法只需要 了解即可，真正开发中都会使用内置的或者第三方中间件。

## express内置的中间件

### static

- 什么叫做静态资源
  - css文件
  - 图片文件
  - js文件
  - 等等
- 什么叫做开放静态资源
  - 开放，即允许客户端来访问
- 具体做法
  - 比如，允许客户端访问public文件夹里面的文件
  - `app.use(express.static('public'))`

### urlencoded

用于处理`application/x-www-form-urlencoded`请求的数据

```js
app.use(express.urlencoded({extended: false}));
```

### json

用于处理`content-type`为`application/json`的中间件

```js
app.use(express.json());
```

## 第三方中间件

### cors --- 处理跨域

使用方法：

``` js
    npm i cors // 1. 下载安装 cors
    const cors = require('cors') // 2. 加载模块
    app.use(cors()) // 3. 注册中间件
    res.set('Access-Control-Allow-Origin', '*') // 4. 设置响应头
```

### multer

- 下载安装multer
- 加载模块 `const multer = require('multer')`
- 配置上传文件的存放目录  `const upload = multer({ dest: '路径' })`， 使用绝对路径。
- 路由（接口）使用

  ```js
  const multer = require('multer')
  // const upload = multer({ dest: '路径' })
  const upload = multer({
      dest: path.join(__dirname, '../uploads')
  });
  
  router.post('/add', upload.single('接口文档规定的图片名字'), (req, res) => {
      req.body  获取文本类型的数据
      req.file  获取文件的信息
  });
  ```
