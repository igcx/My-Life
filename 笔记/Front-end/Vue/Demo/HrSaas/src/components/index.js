// 创建一个插件 => { install() {} }

// Vue.use(obj) => 大量组件的全局注册

import PageTools from './PageTools'
// Vue.component('PageTools', PageTools)
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
export default {
  install(Vue) {
    // 组件的全局注册
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
  }
}
