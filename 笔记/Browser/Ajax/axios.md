# axios

## axios是什么

> 是前端圈最火的、专注于数据请求的库

## axios 的基础语法

axios 的基本语法如下

``` js
axios({
    method: '请求的类型',
    url: '请求的URL地址'
}).then((result) => {
    // .then 用来指定请求成功之后的回调函数
    // 形参中的 result 是请求成功之后的结果
})
```

## 基于 axios 发起 GET 请求

测试 **GET 请求**的 **URL 地址**为 <http://www.liulongbin.top:3009/api/getbooks>

``` js
axios({
    method: 'GET',
    url: 'http://www.liulongbin.top:3009/api/getbooks'
}).then((result) => {
    console.log(result)
})
```

### GET 请求的查询参数

刚才查询回来的是所有图书的列表数据，如果想**指定查询的条件**，可以通过 **params 选项**来指定**查询的参数**：

``` js
axios({

    // 1. 发起 GET 请求
    method: 'GET',

    // 2. 指定请求的 URL 地址
    url: 'http://www.liulongbin.top:3009/api/getbooks',

    // 3. 查询的参数
    params: {
        id: 1
    }
}).then((result) => {

    // 4. 请求成功之后的回调函数
    console.log(result)
})
```

### 查询参数的本质

在使用 Ajax 发起 GET 请求时，data 中的参数，会以 **?键=值** 的形式拼接到 **URL 地址的末尾**。因此下面这种写法是完全 正确的：

``` js
axios({
    method: 'GET',

    // 直接在 URL 地址的末尾，手动拼接查询的参数
    url: 'http://www.liulongbin.top:3009/api/getbooks?id=1'
}).then((result) => {
    console.log(result)
})
```

> 注意：**?** 后面的都是**查询参数**，查询参数的**键和值**之间使用 **=** 进行分隔

### 在 GET 请求中携带多个查询参数

如果要携带多个参数，只需要在 **params 对象**中指定**多个查询参数项**即可。示例代码如下：

``` js
axios({
    method: 'GET',
    url: 'http://www.liulongbin.top:3009/api/getbooks',

    // 查询 id 等于 1 并且 bookname 等于 love 的图书
    params: {
        id: 1,
        bookname: 'love'
    }
}).then((result) =>{
    console.log(result)
})
```

最终，在 URL 地址的末尾，多个查询参数之间使用 **&** 符号进行分隔：
<http://www.liulongbin.top:3009/api/getbooks?id=1&bookname=love>

### URL 编码

在 URL 地址中**不允许出现中文、空格等特殊字符**，因此浏览器会**自动**对 URL 地址内的中文进行**转换处理**。例如:

``` bash
# 未转换前的 URL 地址中包含中文
http://www.liulongbin.top:3009/api/getbooks?id=1&bookname=西游记

# 转换后的 URL 地址中，中文变成了 % 开头的 UTF-8 编码格式
http://www.liulongbin.top:3009/api/getbooks?id=1&bookname=%E8%A5%BF%E6%B8%B8%E8%AE%B0
```

浏览器内置了 **encodeURI()** 和 **decodeURI()** 两个方法，用来实现 URL 的**编码**和**解码**处理：

``` js
encodeURI('西') // 输出字符串 “%E8%A5%BF”

decodeURI('%E6%B8%B8') // 输出字符串“游”
```

## 基于 axios 发起 POST 请求

使用 axios 发起 POST 请求时，只需要将 **type 属性**的值设置为 '**POST**' 即可：

``` js
axios({
    // 1. 请求方式
    method: 'POST',

    // 2. 请求的 URL 地址
    url: 'http://www.liulongbin.top:3009/api/addbook',

    // 3. data 是要提交给服务器的数据
    data: {
        bookname: '水浒传',
        author: '施耐庵',
        publisher: '上海图书出版社'
    }
}).then((result) => { console.log(result) })
```

### POST 提交数据的方式

> 通过 Chrome 浏览器的 Network 网络请求面板，可以发现 POST 请求提交的数据，并没有拼接到 URL 地址的末尾
>> 原因：各个浏览器对 URL 的长度有限制

## GET 和 POST 提交数据的区别

- GET
请求适合用来提交**少量**的数据
没有请求体，只有查询参数，并且会把查询参数拼接到 URL

- POST
请求适合用来提交**大量**的数据
POST 为了能够提交大量的数据，所以**没有把数据拼接到 URL 的末尾**；而是放到了独立的“**请求体**”中
