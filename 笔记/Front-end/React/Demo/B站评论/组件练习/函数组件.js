import React from 'react'
import ReactDOM from 'react-dom'

function Hello() {
  return (
    <div>
      <h1>函数组件</h1>
      <p>这是用函数来定义的一个组件</p>
    </div>
  )
}

const element = (
  <div>
    <h1>函数组件</h1>
    <Hello />
    <Hello />
    <Hello />
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
