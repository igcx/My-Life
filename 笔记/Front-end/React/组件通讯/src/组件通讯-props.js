import React from 'react'
import ReactDOM from 'react-dom'

function App1({name, money}) {
  return <div>
    <p>This is App -- {name}--{money}</p>
  </div>
}

class App extends React.Component{
  render() {
    const {name, money} = this.props
    return <div>
      <p>This is App --- {name} -- {money}</p>
    </div>
  }
}

ReactDOM.render(<App name='ls' money={200}></App>, document.getElementById('root'))