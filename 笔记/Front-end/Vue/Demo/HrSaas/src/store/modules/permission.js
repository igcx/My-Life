import { constantRoutes } from '@/router'
// 按需导入所有动态路由
import { asyncRoutes } from '@/router'

const state = {
  // vue router 没有帮我们维护一个新增后的路由规则数组，所以我们自己维护一个数组(静态+动态)
  routes: constantRoutes || []
}
const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [...constantRoutes, ...otherRoutes]
  }
}
const actions = {
  // 过滤出用户自己的路由规则
  filterRoutes(context, menus) {
    // console.log(asyncRoutes, menus)
    // item.children[0].name 判断的标准
    // item.children[0].name 如果在 menus 中出现，要保留
    const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    context.commit('setRoutes', otherRoutes)
    console.log(asyncRoutes, menus, otherRoutes)

    return otherRoutes
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
