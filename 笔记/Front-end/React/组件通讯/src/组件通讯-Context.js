import { Component, createContext } from 'react'
import ReactDOM from 'react-dom'

// Provider: 提供者
// Consumer: 消费者
const { Provider, Consumer } = createContext()
class Sun extends Component {
  render() {
    return (
      <Consumer>
        {(value) => (
          <div>
            <h4>孙子组件 --- {value.money}</h4>
            <button onClick={() => value.changeMoney(10)}>修改</button>
          </div>
        )}
      </Consumer>
    )
  }
}
class Son extends Component {
  render() {
    return (
      <div>
        <h3>孩子组件</h3>
        <Sun></Sun>
      </div>
    )
  }
}
class Father extends Component {
  render() {
    return (
      <div>
        <h2>父组件</h2>
        <Son></Son>
      </div>
    )
  }
}
class App extends Component {
  state = {
    money: 100,
  }
  changeMoney = (money) => {
    this.setState({
      money: this.state.money - money
    })
  }
  render() {
    return (
      <Provider
        value={{
          money: this.state.money,
          changeMoney: this.changeMoney
        }}
      >
        <div>
          <h1>根组件 --- {this.state.money}</h1>
          <Father></Father>
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'))
