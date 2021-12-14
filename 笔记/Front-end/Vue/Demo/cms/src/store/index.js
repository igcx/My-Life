import Vue from 'vue'
import Vuex from 'vuex'
// 导入user模块(小仓库)
import user from './modules/user'
// 导入文章的小仓库
import article from './modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    article
  }
})
