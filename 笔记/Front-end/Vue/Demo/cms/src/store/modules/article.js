// 这个小仓库只存储文章相关的数据

import { reqGetArtCateList } from '@/api/article'

export default {
  state: {
    // 文章分类的数据
    cateList: []
  },
  mutations: {
    setCateList (state, newCateList) {
      state.cateList = newCateList
    }
  },
  actions: {
    async getCateList (context) {
      const { data } = await reqGetArtCateList()
      // console.log(res)
      if (data.code === 0) {
        context.commit('setCateList', data.data)
      }
    }
  },
  getters: {},
  // 开启命名仓库
  namespaced: true
}
