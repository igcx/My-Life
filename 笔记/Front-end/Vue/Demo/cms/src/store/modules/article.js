// 这个小仓库 只存储 文章相关的数据
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
  // 封装异步操作
  actions: {
    async getCateList (context) {
      const { data } = await reqGetArtCateList()
      // console.log(res)
      if (data.code === 0) {
        // data.data => 文章分类
        context.commit('setCateList', data.data)
      }
    }
  },
  getters: {},
  // 开启命名空间  让mutations actions getters 注册在局部
  namespaced: true
}
