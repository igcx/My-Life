// 创建一个插件 => { install() {} }

// Vue.use(obj) => 大量组件的全局注册

import PageTools from './PageTools'
// Vue.component('PageTools', PageTools)
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import Lang from './Lang'
import TagsView from './TagsView'

export default {
  install(Vue) {
    // 组件的全局注册
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入上传组件
    Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
    Vue.component('Lang', Lang) // 注册语言包组件
    Vue.component('TagsView', TagsView) // 注册标签页组件
  }
}
