import { Component } from 'react'

class Tabs extends Component {
  render() {
    const { tabs, active, changeTab } = this.props
    return (
      <div className="tabs-order">
        <ul className="sort-container">
          {tabs.map((item) => (
            <li
              className={item.type === active ? 'on' : ''}
              key={item.id}
              onClick={() => changeTab(item.type)}
            >
              ζ{item.name}ζεΊ
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Tabs
