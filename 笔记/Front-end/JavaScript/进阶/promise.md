# Promise

## 异步函数 和 回调函数的说明

异步函数:  setTimeout  setInterval  ajax   fs.readFile

回调函数:

1. **把一个函数当成参数传递, 将来特定的时机调用, 这个函数就叫回调函数**

2. 一般什么时候会用到回调函数, 异步的时候 ,  定时器， ajax  （success,  error）

   ```js
   console.log(1)
   
   setTimeout(function() {
     console.log(2)
     
     setTimeout(function() {
       console.log(4)
     }, 1000)
     
     console.log(5)
   }, 1000)
   
   
   console.log(3)
   ```

回调函数的问题:

1. 回调函数的阅读性不好, 回调不会立马执行
2. 回调函数如果有大量的嵌套, 可维护性差  

回调地狱， 就是指维护回调嵌套的代码, 就像在地狱一样
**promise 就是为了解决回调地狱的问题而存在的**

## 回调函数的嵌套问题演示

回调地狱: 回调函数嵌套回调函数, 嵌套多了, 将来就很难维护, 很难理清顺序

```js
// 回调函数的嵌套问题演示
    // 需求1: 2s 之后，打印 'ls'
    // setTimeout(() => {
    //   console.log('ls')
    // }, 2000)

    //  需求2: 两秒以后, 打印一个zs => 封装成一个函数
    // function fn() {
    //   setTimeout(() => {
    //     console.log('zs')
    //   }, 2000)
    // }
    // fn()

    //  需求3: 两秒以后, 打印一个zs => 封装成一个函数(具体做什么事 不写死)
    // function fn(callback) {
    //   setTimeout(() => {
    //     // 具体做啥 不能写死, 传啥做啥 => 回调函数
    //     // console.log('zs')
    //     callback()
    //   }, 2000)
    // }
    // fn(function() {
    //   console.log('zs')
    // })

    // fn(function() {
    //   console.log('ls')
    // })

    // fn(function() {
    //   console.log('ww')
    // })

    // 需求4: 等2s 打印zs  再等2s 打印ls 再等2s 打印ww
    function fn(callback) {
      setTimeout(() => {
        callback()
      }, 2000)
    }
    fn(function() {
      console.log('zs')

      fn(function() {
        console.log('ls')

        fn(function() {
          console.log('ww')
        })
      })
    })
```

## promise的基本语法

目的: promise 是书写异步代码的另一种方式, 是异步编程的一种解决方案, 解决回调函数嵌套的问题

1. 如何创建一个 promise 对象

   ```js
   const p = new Promise((resolve, reject) => {
     // promise内部一般可以封装一个异步操作
       // resolve, reject 是 promise 内部提供好给你的两个函数
    // 成功调用 resolve
    // 失败调用 reject
   })
   ```

2. 如何使用一个 promise 对象

   ```js
   p.then(res => { ... }) 处理成功
    .catch(res => { ... }) 处理失败
   ```

## promise的三个状态

`promise有三种状态`

- pending:  等待 (进行中)

- fulfilled: 成功 (已完成), 调用了 resolve, promise的状态就会被标记成成功

- rejected: 失败 (拒绝), 调用了 reject, promise的状态就会被标记成失败
**注意: 一旦promise的状态发生变化, 状态就会被凝固**

## promise 解决回调地狱的问题

**如果有多个 promise 需要处理, 支持链式编程**
如果上一个 .then() 方法中返回了一个新的Promise 实例对象，则可以通过下一个 .then() 继续进行处理。

因此， .then() 方法是 Promise 支持链式调用的本质原因。

```jsx
const p = new Promise(function (resolve, reject) {
  // promise 内部会封装一个异步的操作
  // resolve: 成功的时候, 需要调用
  // reject: 失败的时候, 需要调用
  fs.readFile('a.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
const p2 = new Promise(function (resolve, reject) {
  fs.readFile('b.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})
...

p.then(res => {
  console.log(res)
  return p2
}).then(res => {
  console.log(res)
  return p3
}).then(res => {
  console.log(res)
  return p4
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

## promise 解决回调地狱优化

```js
  // 需求4: 等2s 打印zs  再等2s 打印ls 再等2s 打印ww
  function fn() {
    return new Promise((resolve, reject) => {
      // 封装异步操作
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  fn().then(() => {
    console.log('zs')
    // 相当于又等了 2s
    return fn()
  }).then(() => {
    console.log('ls')
    return fn()
  }).then(() => {
    console.log('ww')
  }).catch((err) => {
    console.log(err)
  })
```

在 Promise 的链式操作中如果发生了错误，可以使用 .catch 方法进行捕获和处理

## Promise 的常用静态方法

- `Promise.all([ promise1, promise2, ... ]).then( ... )`

  Promise.all() 方法会发起并行的 Promise 异步操作，等所有的异步操作全部结束后

  才会执行下一步的 .then操作（**等待机制**）。

- `Promise.race([ promise1, promise2, ... ]).then( .... )`

  Promise.race() 方法会发起并行的 Promise 异步操作，只要任何一个异步操作完成，

  就立即执行下一步的 .then 操作（**赛跑机制**）

async/await

``` js
  // async await 语法糖(简写形式)
  async function test() {
    await fn()
    console.log('zs')

    await fn()
    console.log('ls')

    await fn()
    console.log('ww')
  }

  test()
```
