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



import React from 'react'
import ReactDOM from 'react-dom'

const jsx = <>
  <h1>大标题</h1>
  <h2>小标题</h2>
</>

ReactDOM.render(jsx, document.getElementById('root'))

// jsx 注意点
// 只有在脚手架中才能使用jsx语法
//   因为JSX需要经过babel的编译处理，才能在浏览器中使用。脚手架中已经默认有了这个配置。
// JSX必须要有一个根节点， `<></>`  `<React.Fragment></React.Fragment>`
// 没有子节点的元素可以使用`/>`结束
// JSX中语法更接近与JavaScript
//   `class` =====> `className`
//   `for`========>  `htmlFor`
// JSX可以换行，如果JSX有多行，推荐使用`()`包裹JSX，防止自动插入分号的bug
```
