import ReactDOM from 'react-dom'
import Hello from './components/Hello.jsx'
import Demo from './components/Demo.jsx'


const element = (
  <div>
    <h1>class组件</h1>
    <Hello></Hello>
    <Hello />
    <Demo></Demo>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))
