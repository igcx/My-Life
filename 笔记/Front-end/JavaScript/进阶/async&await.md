# async 和 await

async 和 await 是一对关键字

1. async用于修饰一个函数, 表示一个函数是异步的

   如果async函数内没有await, 那么async没有意义的, 全是同步的内容

   只有遇到了await开始往下, 才是异步的开始

    ```js
    console.log(1)
    async function fn () {
      console.log(4)
      const res = await 2
      console.log(res)
    }
    fn()
    console.log(3)
    ```

2. await 要用在 async 函数中

3. await 后面一般会跟一个promise对象,  await会阻塞async函数的执行,

   直到等到 promise成功的结果(resolve的结果)

4. await 只会等待 promise 成功的结果, 如果失败了会报错, 需要 try catch

```js
const fs = require('fs')
function read (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function fn () {
  try {
    const data1 = await read('a.txt')
    console.log(data1)

    const data2 = await read('b.txt')
    console.log(data2) 

    const data3 = await read('c.txt')
    console.log(data3)

    const data4 = await read('d.txt')
    console.log(data4)
  } catch (err) {
    console.log(err)
    // console.log('目前, 文件有丢失, 没有读到正确的文件, 请联系管理员')
  }
}
fn()
```
