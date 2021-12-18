// 储存 用户相关的数据

// token 要被 vuex管理
//  1. 方便获取
//  2. 让token变成响应式的 一旦变化 所有组件都知道

import { reqLogin } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = {
  // token 优先从 cookie 获取
  token: getToken() || ''
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken

    // token 存到 cookie
    setToken(newToken)
  }
}
const actions = {
  // 封装异步操作 => 登录的异步操作
  // async login(context, data) {
  //   const res = await reqLogin(data)
  //   console.log(res)
  //   const newToken = res.data.data
  //   context.commit('setToken', newToken)
  // }

  // 封装 promise
  login(context, data) {
    return new Promise((resolve, reject) => {
      // 登录的异步操作
      reqLogin(data).then((res) => {
        const newToken = res.data
        context.commit('setToken', newToken)
        resolve(res)
      }).catch((err) => {
        // 请求失败
        console.log(err)
        reject(err)
      })
    })
  }
}
const getters = {}

export default {
  // 开启命名空间  => 先找模块, 再找方法
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
