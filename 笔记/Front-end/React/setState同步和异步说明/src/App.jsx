import React, { Component, createRef } from 'react'

export default class App extends Component {
  state = {
    showInput: false,
  }
  inputRef = createRef()
  render() {
    return (
      <div>
        <h2>我是根组件</h2>
        {this.state.showInput ? (
          <input
            ref={this.inputRef}
            type="text"
            placeholder="请输入您的回复内容"
          />
        ) : (
          <button onClick={this.handleClick}>回复</button>
        )}
      </div>
    )
  }
  // handleClick = () => {
  //   // setState 看起来是异步的
  //   // setState如果是在react的生命周期中或者是事件处理函数中，表现出来是异步的
  //   this.setState(
  //     {
  //       showInput: true,
  //     },
  //     () => {
  //       // 自动获取焦点
  //       this.inputRef.current.focus()
  //     }
  //   )
  // }
  handleClick = () => {
    // setState如果是在setTimeout/setInterval或者原生事件中，表现出来是同步的
    // setState是同步的方法，但是react为了性能优化，所以setState在react的事件中表现得像异步
    setTimeout(() => {
      this.setState({
        showInput: true,
      })
      console.log(this.state.showInput);
      this.inputRef.current.focus()
    }, 0)
  }
}
