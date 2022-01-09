# jsx 语法

## createElement的问题

- 繁琐不简洁
- 不直观，无法一眼看出所描述的结构
- 不优雅，开发体验不好

## JSX简介

`JSX`是`JavaScript XML`的简写，表示了在Javascript代码中写XML(HTML)格式的代码  (JS写HTML代码)

优势：声明式语法更加直观，与HTML结构相同，降低学习成本，提高开发效率。

**JSX是react的核心内容**
注意：JSX 不是标准的 JS 语法，是 JS 的语法扩展。脚手架中内置的 `@babel/plugin-transform-react-jsx` 包，用来解析该语法。

## 使用步骤

- 导入react和reactDOM包

``` jsx
// 导入react和react-dom
import React from 'react'
import ReactDOM from 'react-dom'
```

- 使用jsx语法创建react元素

``` jsx
// 创建元素
const title = <h1 title="哈哈"></h1>
```

- 把react元素渲染到页面中

``` jsx
// 渲染元素
ReactDOM.render(title, document.getElementById('root'))
```

``` jsx
// 1. 导入包 react react-dom
// import React from 'react';
// import ReactDOM from 'react-dom';

// // 2. 创建 react 元素 => 虚拟 DOM
// // React.createElement
// // 参数一：标签名
// // 参数二：属性(对象)
// // 参数三：内容，多个子节点，支持数组
// const div = React.createElement(
//   'div',
//   {
//     test: 'abc',
//     title: '123'
//   },
//   '这是内容'
// )
// console.log(div)

// // 3. 渲染
// // 参数一：渲染哪个react 元素
// // 参数二：渲染到哪里去 真实 DOM 容器
// ReactDOM.render(div,document.getElementById('root'))

// 练习1
// import React from 'react';
// import ReactDOM from 'react-dom'

// const div = React.createElement(
//   'div',
//   {
//     id: 'box',
//     className: 'demo'
//   },
//   '这是一个react案例'
// )
// ReactDOM.render(div, document.getElementById('root'))

// 练习2
// import React from 'react';
// import ReactDOM from 'react-dom'

// const ul = React.createElement(
//   'ul',
//   {
//     className: 'list'
//   },
//   // <li>香蕉</li>,
//   // <li>橘子</li>,
//   // <li>苹果</li>
//   [
//     React.createElement('li', {key: 101}, '香蕉'),
//     React.createElement('li', {key: 102}, '橘子'),
//     React.createElement('li', {key: 103}, '苹果')
//   ]
// )
// console.log(ul);
// ReactDOM.render(ul, document.getElementById('root'))

// 使用 jsx 编写 react 代码
// 底层就是用了 React.createElement
// import React from 'react'
// import ReactDOM from 'react-dom'

// const jsx = <div>
//   <ul>
//     <li>香蕉</li>
//     <li>橘子</li>
//     <li>苹果</li>
//   </ul>
// </div>
// ReactDOM.render(jsx,document.getElementById('root'))

// import React from 'react'
// import ReactDOM from 'react-dom'

// const jsx = (
//   <>
//     <h1>大标题</h1>
//     <h2>小标题</h2>
//   </>
// )

// ReactDOM.render(jsx, document.getElementById('root'))

// jsx 注意点
// 只有在脚手架中才能使用jsx语法
//   因为JSX需要经过babel的编译处理，才能在浏览器中使用。脚手架中已经默认有了这个配置。
// JSX必须要有一个根节点， `<></>`  `<React.Fragment></React.Fragment>`
// 没有子节点的元素可以使用`/>`结束
// JSX中语法更接近与JavaScript
//   `class` =====> `className`
//   `for`========>  `htmlFor`
// JSX可以换行，如果JSX有多行，推荐使用`()`包裹JSX，防止自动插入分号的bug

// jsx 中嵌入表达式，jsx中不能使用语句
// 表达式 和 语句
// 表达式一定是要有结果的
// 在jsx中可以在`{}`来使用js表达式
// 不要出现语句，比如`if` `for`

// import React from 'react'
// import ReactDOM from 'react-dom'

// const num = 20
// const username = '李四'

// const list = ['zs', 'ls', 'ww']

// const car = {
//   name: 'BMW',
//   desc: '蓝天白云梦',
// }

// function singsong() {
//   // jsx 是对象
//   return (
//     <div>
//       <p>12345</p>
//       <p>上山打脑虎</p>
//     </div>
//   )
// }

// const title = '呵呵'
// const title2 = '嘻嘻'
// const div = <div>这是一个div - {title}</div>
// const span = <span>这是一个span - {title2}</span>

// const jsx = (
//   <div>
//     <ul>
//       <li>学习表达式嵌入</li>
//       {/* 基本使用 */}
//       <li>{num}</li>
//       <li>{username}</li>

//       {/* 可以访问数组的下标 */}
//       <li>{list[0]}</li>

//       {/* 可以访问对象的属性 */}
//       <li>{car.name}</li>
//       <li>{car.desc}</li>
//     </ul>
//     {/* 可以使用三元运算符 */}
//     <p>喜好：{num > 18 ? '十八岁以上' : '未成年'}</p>

//     {/* 可以调用方法 */}
//     {singsong()}

//     {/* JSX本身 */}
//     {div}
//     {span}

//     {/* JSX中的注释 */}
//   </div>
// )

// ReactDOM.render(jsx, document.getElementById('root'))

// 条件渲染
// import React from 'react'
// import ReactDOM from 'react-dom'

// const isLoading = true

// function fn() {
//   // <p>正在加载中...</p>
//   // <p>加载已完成</p>
//   // if (isLoading) {
//   //   return <p>正在加载中...</p>
//   // } else {
//   //   return <p>加载已完成</p>
//   // }
//   return isLoading ? <p>正在加载中...</p> : <p>加载已完成</p>
// }

// 只有在加载中，才显示后面的提示，短路运算符
// function fn() {
//   return isLoading && <p>正在加载中...</p>
// }
// const element = (
//   <div>
//     <h3>条件渲染</h3>
//     {fn()}
//   </div>
// )
// ReactDOM.render(element, document.getElementById('root'))

// 列表渲染
// 在react中，通过map方法进行列表的渲染
// import React from 'react'
// import ReactDOM from 'react-dom'

// const arr = ['张飞', '关羽', '刘备']
// const newArr = arr.map(item => {
//   return <li> {item} </li>
// })

// const element = <div>
//   <h3>列表渲染</h3>
//   {/* 如果在 {} 表达式中，直接写数组，将数组的每一项依次进行渲染 */}
//   <ul>{newArr}</ul>
// </div>

// ReactDOM.render(element, document.getElementById('root'))

// 列表渲染练习1
// import React from 'react'
// import ReactDOM from 'react-dom'

// const arr = ['冰箱', '空调', '洗衣机']

// const element = (
//   <div>
//     <h3>列表渲染练习</h3>
//     <ul>
//       {arr.map((item, index) => (
//         <li key={index}>{item}</li>
//       ))}
//     </ul>
//   </div>
// )

// ReactDOM.render(element, document.getElementById('root'))

// 列表渲染练习2
import React from 'react'
import ReactDOM from 'react-dom'

const list = [
  { id: 1, name: '香碰碰的口水鸡', price: 8.88 },
  { id: 2, name: '美味大鸡腿', price: 3.5 },
  { id: 3, name: '阳澄湖大闸蟹', price: 49.9 },
]
// 口诀：你要遍历渲染谁，就剪切它，在 map 方法中 return它
const element = (
  <div>
    <h3>列表渲染练习2</h3>
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <h3>商品名称: {item.name}</h3>
          <p>商品价格: {item.price}</p>
        </li>
      ))}
    </ul>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

```
