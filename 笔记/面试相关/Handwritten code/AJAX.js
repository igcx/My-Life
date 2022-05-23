// 基于 Promise 封装 Ajax
// XMLHttpRequest 是浏览器内置的一个构造函数
// 使用 XMLHttpRequest 发送 GET 请求主要的 4 个实现步骤
//   1. 创建 xhr 对象
//   2. 调用 xhr.open() 函数
//   3. 调用 xhr.send() 函数
//   4. 监听 load 事件

/*
  思路: 
  返回一个新的 Promise 实例对象
  创建 HMLHttpRequest 异步对象
  调用 open 方法，打开url，与服务器建立连接（发送前的一些处理）
  监听 Ajax 状态信息

  xhr.readyState !== 4，把请求主体的信息基于 send 发送给服务器
 */

const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest() // 创建 xhr 实例对象
      : new ActiveXObject('Mscrosoft.XMLHttp')
    xhr.open('GET', url, false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}

// 封装一个自己的 axios

// 1.定义一个函数
function MyAxios(options) {
  // 1.1.创建一个XHR对象
  const xhr = new XMLHttpRequest()
  // ?a=1&b=2
  // 判断params是否存在

  // toUpperCase()  将字符串转为大写
  // toLowerCase()  将字符串转为小写
  if (options.params && options.method.toUpperCase() === 'GET') {
    // 定义一个空数组
    const qs = []

    // 遍历 options.params
    for (let key in options.params) {
      qs.push(`${key}=${options.params[key]}`)
    }
    //  ['a=1','b=2']  === 'a=1&b=2'

    // 将数组转成字符串 利用了 数组的join()方法

    // 将当前的字符串拼接到url地址上
    options.url += `?${qs.join('&')}`
  }

  // 1.2 设置请求方式和请求地址
  xhr.open(options.method, options.url)

  // 判断当前是get请求还是post请求
  if (options.method.toUpperCase() !== 'GET' && options.data) {
    // 处理的就是post请求
    // (1).判断当前请求体的数据是否是Formata
    if (options.data instanceof FormData) {
      // 不需要自己设置
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data')

      // 发送请求体内容
      xhr.send(options.data)
    } else if (typeof options.data === 'string') {
      // (2).判断当前请求体的数据是否是字符串 key=value&key=value
      // 设置请求头的内容类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      xhr.send(options.data)
    } else if (typeof options.data === 'object') {
      xhr.setRequestHeader('Content-Type', 'application/json')

      xhr.send(JSON.stringify(options.data))
    }
    // console.log(typeof options.data === 'object');
    // fd对象类型也属于object
    // (3).判断当前请求体的数据是否为json格式
  } else {
    // 处理的是get请求
    // 1.3 发送请求
    xhr.send()
  }

  // 1.4 监听load(请求完成)事件
  xhr.addEventListener('load', function () {
    // 请求成功之后,将响应体的结果通过回调函数
    // 给到调用的success(形参) -通过形参接收-
    console.log(JSON.parse(xhr.response))
    options.success(JSON.parse(xhr.response))
  })
}
