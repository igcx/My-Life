import { reqGetUserInfo } from '@/api/user'

// 这个小仓库只 存储 和用户相关的数据
const state = {
  // 存储用户基本资料
  userInfo: {}
}

const mutations = {
  setUserInfo (state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}

// actions专门用于封装异步操作(请求就是异步的), 如果要修改数据, 还是得去提交mutation
const actions = {
  async getUserInfo (context) {
    const { data } = await reqGetUserInfo()
    // console.log(res)
    if (data.code === 0) {
      // 接口请求成功
      // data.data => 用户基本信息  存储到仓库
      // 模块内部提交自己的mutation
      context.commit('setUserInfo', data.data)
    }
  }
}

const getters = {
  defaultImg (state) {
    return state.userInfo.username ? state.userInfo.username.slice(0, 1).toUpperCase() : ''
  }
}

export default {
  // 开启命名空间,  所有mutations actions getters 都会注册到user模块内部
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
