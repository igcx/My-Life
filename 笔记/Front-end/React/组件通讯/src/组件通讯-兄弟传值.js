import { Component } from 'react'
import ReactDOM from 'react-dom'

class Jack extends Component {
  render() {
    return (
      <div>
        <h3>Jack 组件</h3>
        <button onClick={() => this.props.changeMsg('you jump i look')}>Jack 对 Rose 说</button>
      </div>
    )
  }
}

class Rose extends Component {
  render() {
    return (
      <div>
        <h3>Rose 组件 --- Jack的话-- {this.props.msg}</h3>
      </div>
    )
  }
}

class App extends Component {
  state = {
    msg: ''
  }
  changeMsg = (msg) => {
    this.setState({
      msg
    })
  }
  render() {
    return (
      <div>
        <h2>根组件</h2>
        <Jack changeMsg={this.changeMsg}></Jack>
        <Rose msg={this.state.msg}></Rose>
      </div>
    )
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'))
