// 导入vue
import Vue from 'vue'

// base.css 样式初始化 + 样式兼容
import 'normalize.css/normalize.css'

// 按需导入 => 打包体积 => 加载更快 => 用户体验更好
// 后台管理系统 => 用户体验不会特别注重

// 导入elementui 组件库  => 完整导入(1.组件用的7788  2.不会特别管用户体验)
import ElementUI from 'element-ui'
// 导入组件库样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入一个语言包 英文包 用于中英切换
// import locale from 'element-ui/lib/locale/lang/en'

// 导入全局样式
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// 导入icon模块 直接执行
import '@/icons' // icon

// 导入js文件 并且直接执行
import '@/permission'

// 导入自定义指令
import * as directives from '@/directives'
// 使用 for in 遍历对象
// for (const key in directives) {
//   Vue.directive(key, directives[key])
// }
Object.keys(directives).forEach(item => {
  // console.log(item, directives[item])
  // 注册全局指令
  Vue.directive(item, directives[item])
})

// 安装组件库 且英文包
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  // el: '#app',  老写法
  router,
  store,
  render: h => h(App)
}).$mount('#app')
