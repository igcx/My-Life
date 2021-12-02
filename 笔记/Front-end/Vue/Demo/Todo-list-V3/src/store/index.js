import { createStore } from 'vuex'

export default createStore({
  // 定义所需要的状态
  state: {
    list: [
      {
        title: '吃饭',
        complete: false
      },
      {
        title: '睡觉',
        complete: false
      },
      {
        title: '敲代码',
        complete: false
      }
    ]
  },
  // 同步修改 state
  // 第一个参数是 state， 第二个参数是需要修改的值
  mutations: {
    // 添加任务
    addTodo(state, payload) {
      state.list.unshift(payload)
    },
    // 删除任务 splice(下标, 个数)
    delTodo(state, payload) {
      state.list.splice(payload, 1)
    },
    // 清除已完成
    clear(state, payload) {
      // 把过滤之后的数组传进来
      state.list = payload
    }
  },
  // 异步提交 mutation
  // 第一个参数是 store，第二个参数是修改的值
  actions: {

  },
  // 模块化
  modules: {
  }
})
