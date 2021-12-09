import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-ui 按需导入:
// 1. 下载 element-ui
// 2. 下载 babel 包
// 3. 修改 babel.config.js
// 4. 重启项目
// 5. 半自动按需导入(自己导入自己注册)

// 入口文件进行统一的导入 element.js 模块
import '@/utils/element.js'

// 引入全局样式
// 使用 vue-cli 脚手架创建项目的时候会默认有一个src的别名 @ 等同于 src
// @ 默认是没有路径提示的, 需要在根目录下新建 jsconfig.json 自己配置
// vue 中的 @ 别名 在样式中默认是不识别的，如果需要让他识别，在他前面加 ~
import '@/styles/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
