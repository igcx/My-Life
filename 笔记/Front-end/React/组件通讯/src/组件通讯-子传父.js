import ReactDOM from 'react-dom'
import { Component } from 'react'

class Father extends Component {
  state = {
    money: 1000,
    car: '小绵羊',
  }
  render() {
    return (
      <div>
        <h3>
          我是父组件 -- {this.state.money} -- {this.state.car}
        </h3>
        <button onClick={this.handleChange}>修改</button>
        {/* 2. 父组件把函数传递给子组件 */}
        <Son money={this.state.money} car={this.state.car} buy={this.buy}></Son>
      </div>
    )
  }
  handleChange = () => {
    console.log(1)
    this.setState({
      money: this.state.money + 10,
      car: 'BMW',
    })
  }
  // 1. 父组件提供函数
  buy = (money) => {
    console.log(this) // 普通函数 this 指向 props 对象
    console.log(money)
    this.setState({
      money: this.state.money - money,
    })
  }
}

class Son extends Component {
  render() {
    return (
      <div>
        <h4>
          我是子组件 --- {this.props.money} -- {this.props.car}
          <button onClick={this.handleClick}>花钱</button>
        </h4>
      </div>
    )
  }
  handleClick = () => {
    // console.log(1)
    // 3. 子组件通过 props 调用父组件传递的函数
    this.props.buy(100)
  }
}

ReactDOM.render(<Father />, document.getElementById('root'))
