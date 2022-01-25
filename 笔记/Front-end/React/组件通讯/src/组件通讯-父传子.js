import ReactDOM from 'react-dom'
import { Component } from 'react'

class Father extends Component {
  // 1. 父组件提供数据
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
        {/* 2. 父组件通过属性 props 传递给子组件 */}
        <Son money={this.state.money} car={this.state.car}></Son>
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
}

class Son extends Component {
  render() {
    return (
      <div>
        {/* 3. 子组件通过 this.props 获取属性 */}
        <h4>
          我是子组件 --- {this.props.money} -- {this.props.car}
        </h4>
      </div>
    )
  }
}

ReactDOM.render(<Father />, document.getElementById('root'))
