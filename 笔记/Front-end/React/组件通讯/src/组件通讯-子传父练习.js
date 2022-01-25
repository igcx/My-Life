import { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Father extends Component {
  state = {
    // 列表数据
    list: [
      {
        id: 1,
        name: '超级好吃的棒棒糖',
        price: 18.8,
        info: '开业大酬宾，全场8折',
      },
      {
        id: 2,
        name: '超级好吃的大鸡腿',
        price: 34.2,
        info: '开业大酬宾，全场8折',
      },
      {
        id: 3,
        name: '超级无敌的冰激凌',
        price: 14.2,
        info: '开业大酬宾，全场8折',
      },
    ],
  }

  render() {
    return (
      <div className="parent">
        <h2>父组件</h2>
        {
          // {...item} 把整个 item 展开，将所有的值全部传递给子组件
          this.state.list.map((item) => (
            <Son key={item.id} {...item} kan={this.kan}></Son>
          ))
        }
      </div>
    )
  }
  kan = (id, price) => {
    console.log(id, price)
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          let newPrice = +(item.price - price).toFixed(2)
          if (newPrice < 0) {
            newPrice = 0
            alert('白送')
          }
          return {
            ...item,
            price: newPrice,
          }
        } else {
          return item
        }
      }),
    })
  }
}
class Son extends Component {
  render() {
    const { name, price, info } = this.props
    return (
      <div className="child">
        <div className="product">
          <h3>标题: {name}</h3>
          <div className="price">价格: {price}</div>
          <div>{info}</div>
          <div>
            <button onClick={this.handleClick}>砍一刀</button>
          </div>
        </div>
      </div>
    )
  }
  handleClick = () => {
    // console.log(this.props.id)
    // 生成随机数，将价格和id传给父组件
    // ｜ & 位运算符的特点：1. 忽略小数 2. 变成二进制进行运算
    const price = (Math.random() * 4) | 0
    this.props.kan(this.props.id, price)
  }
}

ReactDOM.render(<Father></Father>, document.getElementById('root'))
