import { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    count: 0,
    money: 100,
    list: ['西瓜', '苹果'],
    msg: 'Hello React',
    isDog: false,
  }
  render() {
    return (
      <div>
        <h4>
          <button onClick={this.handleClick}>点击</button> : {this.state.count}
        </h4>
        <h4>金钱: {this.state.money}</h4>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <input
          type="text"
          value={this.state.msg}
          onChange={this.handleChange}
        />
        <label htmlFor="isDog">是否单身:</label>{' '}
        <input
          type="checkbox"
          id="isDog"
          checked={this.state.isDog}
          onChange={this.handleDog}
        />
      </div>
    )
  }
  // handleClick(e) {
  //   console.log('点击了',e)
  //   console.log(this) // undefined
  // }
  handleClick = () => {
    // console.log('点击了')
    // console.log(this)
    // 不要直接修改原来的状态，原来的状态是不可变的
    // 通过 setState 来修改状态
    this.setState({
      count: this.state.count + 1,
      list: [...this.state.list, 4],
    })
  }
  handleChange = (e) => {
    // console.log('123')
    // console.log(e.target.value)
    this.setState({
      msg: e.target.value,
    })
  }
  handleDog = (e) => {
    this.setState({
      isDog: e.target.checked,
    })
  }
}

ReactDOM.render(<App></App>, document.getElementById('root'))
