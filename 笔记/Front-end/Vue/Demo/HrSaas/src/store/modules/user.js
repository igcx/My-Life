// 储存 用户相关的数据

// token 要被 vuex管理
//  1. 方便获取
//  2. 让token变成响应式的 一旦变化 所有组件都知道

import { reqLogin, reqGetProfile, reqGetUserDetailById } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

const state = {
  // token 优先从 cookie 获取
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken

    // token 存到 cookie
    setToken(newToken)
  },
  // 获取用户资料
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}
const actions = {
  // 封装异步操作 => 登录的异步操作
  async login(context, data) {
    const res = await reqLogin(data)
    // console.log(res)
    const newToken = res.data
    context.commit('setToken', newToken)
    return res
  },

  // 封装 promise 写法
  // login(context, data) {
  //   return new Promise((resolve, reject) => {
  //     // 登录的异步操作
  //     reqLogin(data).then((res) => {
  //       const newToken = res.data
  //       context.commit('setToken', newToken)
  //       resolve(res)
  //     }).catch((err) => {
  //       // 请求失败
  //       console.log(err)
  //       reject(err)
  //     })
  //   })
  // },
  // 获取用户资料
  // async 函数的返回值，默认会返回一个 promise
  async getUserProfile(context) {
    // 请求获取用户基本资料(无头像)
    const { data: data1 } = await reqGetProfile()
    console.log(data1)
    // 请求获取用户基本资料(有头像)
    const { data: data2 } = await reqGetUserDetailById(data1.userId)
    console.log(data2)

    // 合并所有的信息，把完整的信息存入仓库中，return完整信息
    const resObj = {
      ...data1,
      ...data2
    }

    context.commit('setUserInfo', resObj)
    // async函数中 return xxx 相当于调用 resolve(xxx)
    return resObj
  }
  // promise 写法
  // getUserProfile(context) {
  //   return new Promise((resolve, reject) => {
  //     // promise => 异步操作的容器
  //     // 获取用户信息，异步操作的整体
  //     reqGetProfile().then((res) => {
  //       console.log(res)
  //       context.commit('setUserInfo', res.data)
  //       resolve(res)
  //     }).catch((err) => {
  //       reject(err)
  //     })
  //   })
  // }
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
