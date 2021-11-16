## this
``` js

    //  四种
    //  默认绑定   fn() this 指向window
    //  隐式绑定   obj.fn()   this 指向obj （调用者）
    //  new绑定   new Person()   this 指向新创建的实例对象
    //  硬绑定    自己来指定this的指向 

    // 默认绑定   函数内的this指向window
    function fn() {
      console.log(this)
    }
    // 函数名()
    fn()


    // 隐式绑定 （谁调用，this指向谁）
    let obj = {
      a: function () {
        console.log(this)
      }
    }
    // 调用者.方法名()    方法内的this指向调用者
    obj.a()


    // new 绑定
    function Person() {
      // this.name = 'xm'
      console.log(this)
    }
    //  new 构造函数()   构造函数内的this指向新创建的实例对象
    let p = new Person()

    Person() // window

    // apply方法 作用和 call是一样的
    //  1. 都能调用函数
    //  2. 第一个参数都是来指定this指向的
    //  3. 传参的区别
    //      函数.call(this指向, 实参1, 实参2,...)
    //      函数.apply(this指向, [实参1, 实参2,...])

    /* function fn3(num1, num2) {
      console.log(this)
      console.log(num1 + num2)
    }
    fn3(1, 2) // window  3
    let obj3 = {
      name: 'feifei'
    }
    fn3.call(obj3, 10, 30) // obj3
    fn3.apply(obj3, [100, 200])// obj3 */

    // bind 方法
    //  1. bind 不会调用函数 （call apply 会调用函数）
    //  2. 在原函数基础上，得到一个完全一样的新函数，新函数内的this绑定指向 bind的this指向

    // 语法： 函数.bind(this指向)

    function fn6() {
      console.log(this)
    }

    let obj6 = {
      name: 'heihei'
    }
    // 基于fn6函数，bind会得到和fn6函数一样的新函数
    let newFn = fn6.bind(obj6) // fn6函数并没有被调用
    console.log(newFn)

    // newFn() 默认绑定， newFn内的this指向window
    //  newFn 是bind创建的函数，该函数内的this被绑定死了指向 bind的this指向
    newFn() // this指向 obj6
```