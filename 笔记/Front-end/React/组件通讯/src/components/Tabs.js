import { Component } from 'react'

class Tabs extends Component {
  render() {
    return (
      <div className="tabs-order">
        <ul className="sort-container">
          <li className="on">按热度排序</li>
          <li>按时间排序</li>
        </ul>
      </div>
    )
  }
}

export default Tabs
