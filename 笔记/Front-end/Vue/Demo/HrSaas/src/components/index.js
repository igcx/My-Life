// 创建一个插件 => { install() {} }

// Vue.use(obj) => 大量组件的全局注册

import PageTools from './PageTools'
// Vue.component('PageTools', PageTools)

export default {
  install(Vue) {
    // 组件的全局注册
    Vue.component('PageTools', PageTools)
  }
}
