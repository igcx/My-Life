import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import uuid from 'react-uuid'
import { useStore } from '../store'
import './index.css'
function Task() {
  // useStore
  const { taskStore } = useStore()
  // 单选框 受控
  // 思想：mobx Store去维护状态，input只需要把e.target.value 交给store让它来进行修改
  function onChange(id, e) {
    // console.log(e)
    taskStore.singleCheck(id, e.target.checked)
  }

  // 全选
  function allChange(e) {
    // console.log(e)
    taskStore.allCheck(e.target.checked)
  }

  // 删除
  function delTask(id) {
    taskStore.delTask(id)
  }

  // 新增 使用受控组件
  const [taskValue, setTaskValue] = useState('')
  function addTask(e) {
    console.log(e)
    if (e.code === 'Enter') {
      taskStore.addTask({
        id: uuid(),
        name: taskValue,
        isDone: false,
      })
      setTaskValue('')
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todoList</h1>
        {/* 新增输入框 */}
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyUp={addTask}
        />
      </header>
      <section className="main">
        {/* 全选 */}
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/* completed类名标识 */}
          {taskStore.list.map((item) => (
            <li
              className={item.isDone ? 'todo completed' : 'todo'}
              key={item.id}
            >
              <div className="view">
                {/* 单选 受控方式 */}
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={(e) => onChange(item.id, e)}
                  checked={item.isDone}
                />
                <label>{item.name}</label>
                <button
                  className="destroy"
                  onClick={() => delTask(item.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          任务总数：{taskStore.list.length} 已完成：{taskStore.isFinishedLength}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)
