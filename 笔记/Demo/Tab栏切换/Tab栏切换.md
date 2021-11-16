## Tab 栏切换
> 原生 js 操作
``` html
<!DOCTYPE html>
<html>

<head lang="en">
  <meta charset="UTF-8" />
  <title></title>
  <style type="text/css">
    * {
      margin: 0;
      padding: 0;
    }

    ul {
      list-style: none;
    }

    .wrapper {
      width: 1000px;
      height: 475px;
      margin: 0 auto;
      margin-top: 100px;
    }

    .tab {
      border: 1px solid #ddd;
      border-bottom: 0;
      height: 36px;
      width: 320px;
    }

    .tab li {
      position: relative;
      float: left;
      width: 80px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
      border-top: 4px solid #fff;
    }

    .tab span {
      position: absolute;
      right: 0;
      top: 10px;
      background: #ddd;
      width: 1px;
      height: 14px;
      overflow: hidden;
    }

    .products {
      width: 1002px;
      border: 1px solid #ddd;
      height: 476px;
    }

    .products .main {
      float: left;
      display: none;
    }

    .tab li.current {
      border-color: red;
      border-bottom: 0;
    }

    .products .main.active {
      display: block;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <ul class="tab">
      <li class="tab-item current">国际大牌<span>◆</span></li>
      <li class="tab-item">国妆名牌<span>◆</span></li>
      <li class="tab-item">清洁用品<span>◆</span></li>
      <li class="tab-item">男士精品</li>
    </ul>
    <div class="products">
      <div class="main active">
        <a href="###"><img src="imgs/guojidapai.jpg" alt="" /></a>
      </div>
      <div class="main">
        <a href="###"><img src="imgs/guozhuangmingpin.jpg" alt="" /></a>
      </div>
      <div class="main">
        <a href="###"><img src="imgs/qingjieyongpin.jpg" alt="" /></a>
      </div>
      <div class="main">
        <a href="###"><img src="imgs/nanshijingpin.jpg" alt="" /></a>
      </div>
    </div>
  </div>

  <script>
    // tab栏切换案例

    // 分析
    //  1. 找元素（导航li   main）
    //  2. 给导航li注册click
    //  3. 做啥
    //    3.1 对导航进行排他  ==> 高亮 current类名 
    //    3.2 对内容main也要排他 ==> active类名

    // 1. 
    let lis = document.querySelectorAll('.tab-item')
    let mains = document.querySelectorAll('.main')

    // 2. 
    for (let i = 0; i < lis.length; i++) {
      lis[i].addEventListener('click', function () {

        // 3.1 对导航进行排他 ==> 升级写法
        document.querySelector('.current').classList.remove('current')
        this.classList.add('current')

        // 3.2 对内容main也要排他
        document.querySelector('.active').classList.remove('active')
        // 复活哪一个div ==> 从mains伪数组中通过下标i来找到对应的进行复活
        // console.log(this)
        mains[i].classList.add('active')
      })
    }
  </script>

</body>

</html>
```
> 使用构造函数封装
``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  .box {
    width: 600px;
    margin: 100px auto;
    border: 1px solid #000;
    box-sizing: border-box;
  }

  .box * {
    box-sizing: border-box;
  }

  .box .header {
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: 1px solid #222;
  }

  .box .header span {
    transition: all 0.3s;
    background-color: #fff;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    border-right: 1px solid #000;
    flex: 1;
  }

  div.header>span:last-child {
    border-right-width: 0;
  }

  .box .header span.active,
  .box .header span:hover {
    background-color: #ccc;
  }

  .box .main {
    width: 100%;
    height: 300px;
    line-height: 300px;
  }

  .box .main div {
    width: 100%;
    text-align: center;
    font-size: 60px;
    font-weight: 800;
    display: none;
  }

  .box .main div.active {
    display: block;
  }
</style>

<body>
  <div class="box" id="box1">
    <!-- <div class="header">
      <span class="active">tab1</span>
      <span>tab2</span>
      <span>tab3</span>
    </div>
    <div class="main">
      <div class="active">内容1</div>
      <div>内容2</div>
      <div>内容3</div>
    </div> -->
  </div>
  <div class="box" id="box2"></div>


  <script>
    // 目标：
    // 使用构造函数封装
    // new MyTab() 可以实现tab栏切换效果
    // MyTab 是构造函数 自己定义

    // 除此之外，还需要有两个方法 ==> 放到原型对象上（共享）
    //  init() 来创建节点
    //  addClick()  注册click事件

    // el 表示tab栏容器 
    // 1. 创建构造函数
    function MyTab(el, config) {
      // config 形参  表示配置对象

      // 给实例对象自身添加属性来记录对应的tab容器是谁，对应导航数据 + 内容数据
      this.el = el
      this.headerArr = config.headerArr
      this.mainArr = config.mainArr

      // 优化：把init 和 addClick方法调用写在构造函数中
      //  this 指向实例对象tab1，可以共享访问原型上的init 和 addClick方法
      this.init()
      this.addClick()
    }

    // 2. 除此之外，还需要有两个方法 ==> 放到原型对象上（共享）
    MyTab.prototype.init = function () {
      // console.log('is init');
      // 将原先代码放到init中， headerArr 和 mainArr 都需要通过this.headerArr来获取
      // this ==> 指向实例对象tab1，有el属性，值是 '#box1'
      let box1 = document.querySelector(this.el);
      let headerDiv = document.createElement('div');
      let mainDiv = document.createElement('div');

      // 2. 添加节点
      box1.appendChild(headerDiv)
      box1.appendChild(mainDiv)

      // 3. 给headerDiv  mainDiv 添加类名
      headerDiv.classList.add('header')
      mainDiv.classList.add('main')
      
      // 4. 按照数据来生成结构  span + 内容div
      for (let i = 0; i < this.headerArr.length; i++) {

        // 5. 创建span + 内容div ==> 添加到对应位置
        let newSpan = document.createElement('span');
        // 6. 把创建的每个span放到 headerDiv中
        headerDiv.appendChild(newSpan)
        // 7. 给 span 设置内容
        newSpan.innerHTML = this.headerArr[i]
        // 8. 给 div设置内容
        let newDiv = document.createElement('div')
        mainDiv.appendChild(newDiv)
        newDiv.innerHTML = this.mainArr[i]

        // 9. 还差给第一个span  第一个内容div 添加active类名
        if (i === 0) {
          // 创建都是第一个
          newSpan.classList.add('active')
          newDiv.classList.add('active')
        }
      }
    }
    MyTab.prototype.addClick = function () {
      // 这是找到对应的tab栏容器 ==> 之后.header span 和 .main div 都是从对应的tab栏容器中来获取元素
      let box = document.querySelector(this.el)

      // console.log('is addClick');
      // 1. 找到span + div 完成点击功能
      // 注意点：表示从 box中来查找元素，都是从box对应的tab栏中进行查找
      let spans = box.querySelectorAll('.header span');
      let divs = box.querySelectorAll('.main div');
      // 2. 循环遍历
      for (let i = 0; i < spans.length; i++) {
        spans[i].addEventListener('click', function () {
          // 3. 导航排他
          box.querySelector('.header .active').classList.remove('active')
          this.classList.add('active')
          // 4. 内容排他
          box.querySelector('.main .active').classList.remove('active')
          // 5. 复活
          divs[i].classList.add('active')
        })
      }
    }

    // 1. tab1 实例对象有属性 （headerArr、 mainArr 、el）
    let tab1 = new MyTab('#box1', {
      // key: value
      headerArr: ['动物', '明星', '热点', '广场', 'Demo'],
      mainArr: ['动物世界', '明星新闻', '热点新闻', '广场趣事', 'is Demo']
    })
    console.log(tab1)

    // 生成第二个tab
    let tab2 = new MyTab('#box2', {
      headerArr: ['tab1', 'tab2', 'tab3'],
      mainArr: ['内容1', '内容2', '内容3']
    })
    console.log(tab2)

  </script>
</body>

</html>
```
> ES6  class类 封装
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        width: 600px;
        margin: 100px auto;
        border: 1px solid #000;
        box-sizing: border-box;
    }

    .box * {
        box-sizing: border-box;
    }

    .box .header {
        width: 100%;
        height: 50px;
        display: flex;
        border-bottom: 1px solid #222;
    }

    .box .header span {
        transition: all 0.3s;
        background-color: #fff;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        border-right: 1px solid #000;
        flex: 1;
    }

    div.header>span:last-child {
        border-right-width: 0;
    }

    .box .header span.active,
    .box .header span:hover {
        background-color: #ccc;
    }

    .box .main {
        width: 100%;
        height: 300px;
        line-height: 300px;
    }

    .box .main div {
        width: 100%;
        text-align: center;
        font-size: 60px;
        font-weight: 800;
        display: none;
    }

    .box .main div.active {
        display: block;
    }
</style>

<body>
    <div class="box" id="box1">

    </div>
    <div class="box" id="box2">

    </div>

    <script src="Mytab.js"></script>
    <script>
        // MyTab 构造函数 ==> 提供
        let tab1 = new MyTab('#box1', {
            // key: value
            a: 'is a',
            headerArr: ['动物', '明星', '热点', '广场', 'Demo'],
            mainArr: ['动物世界', '明星新闻', '热点新闻', '广场趣事', 'is Demo'],
        })
        let tab2 = new MyTab('#box2', {
            headerArr: ['tab1', 'tab2', 'tab3'],
            mainArr: ['内容1', '内容2', '内容3']
        })
    </script>
</body>

</html>


<script>
<!-- Mytab.js 文件 -->
// class 类 封装 Tab栏
class MyTab {
    constructor(el, config) {
        this.el = el // '#box1'  '#box2'
        this.headerArr = config.headerArr
        this.mainArr = config.mainArr

        // 将init 和addClick方法的调用放到构造函数中（这样每次创建实例对象的时候，都会执行构造函数内代码，调用init和addCLick方法）
        this.init()
        this.addClick()
    }

    // 创建节点方法 init（初始化）
    init() {
        // console.log(this) // this指向实例对象（tab1 tab2）

        // tab容器
        let box = document.querySelector(this.el)

        let headerDiv = document.createElement('div')
        let mainDiv = document.createElement('div')

        // 添加节点
        box.appendChild(headerDiv)
        box.appendChild(mainDiv)

        // 给headerDiv  mainDiv 添加类名
        headerDiv.classList.add('header')
        mainDiv.classList.add('main')

        // 按照数据来生成结构  webapi

        // 由于下面有headerArr变量，可以在上面提供下该变量，省的到处找headerArr，给其前面加this
        let headerArr = this.headerArr
        let mainArr = this.mainArr

        // span + 内容div
        for (let i = 0; i < headerArr.length; i++) {
            // 创建span + 内容div ==> 添加到对应位置

            let newSpan = document.createElement('span')
            // 把创建的每个span放到 headerDiv中
            headerDiv.appendChild(newSpan)

            // 给span设置
            newSpan.innerHTML = headerArr[i]

            let newDiv = document.createElement('div')
            mainDiv.appendChild(newDiv)
            newDiv.innerHTML = mainArr[i]

            // 还差给第一个span  第一个内容div 添加active类名
            if (i === 0) {
                // 创建都是第一个
                newSpan.classList.add('active')
                newDiv.classList.add('active')
            }
        }
    }

    // 注册点击功能
    addClick() {
        // =============================================================
        // 找到span + div 完成点击功能
        // tab容器
        let box = document.querySelector(this.el)

        let spans = box.querySelectorAll('.header span')
        let divs = box.querySelectorAll('.main div')

        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener('click', function () {
                // 导航排他
                box.querySelector('.header .active').classList.remove('active')
                this.classList.add('active')

                // 内容div排他
                box.querySelector('.main .active').classList.remove('active')
                // 复活哪一个
                divs[i].classList.add('active')
            })
        }
    }
}
</script>
```