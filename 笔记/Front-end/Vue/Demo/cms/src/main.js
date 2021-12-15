import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 默认导入
import store from './store'
// 导入dayjs
import dayjs from 'dayjs'

// 入口文件进行统一的导入 element.js模块
// import './utils/element'
// @ 默认是没有 路径提示的!!! 需要你根目录下新建jsconfig.json
// 导入并直接执行文件
import '@/utils/element'

// elementui 按需导入:
// 下载elementui => 下载 babel包 => 修改babel.config.js => 重启项目 => 半自动按需导入(自己导入自己注册)

// 导入全局样式
// import './styles/global.css'

// 在我们用vuecli脚手架创建项目时, 默认有一个src的别名@,  @ => src
// import '@/styles/global.css'
import '@/styles/global.css'

// 导入富文本编辑器的第三方包
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 安装这个插件(内部其实是帮你注册了一个组件)
Vue.use(VueQuillEditor)

// 注册全局过滤器
// {{ msg | dataFormat }}
// Vue.filter('dateFormat', (val) => { return 222 })
Vue.filter('dateFormat', (time, str = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(str)
})

// 导入自己的axios
// import axios from '@/utils/request'
// this.$router  this.$store  this.$message
// Vue.prototype.$http = axios

Vue.config.productionTip = false

// this.$router
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// const a = 1
// console.log(a)

// eslint有很多默认的规则:
// 1.不允许超过一个换行
// 2.不能有分号
// 3.缩进有要求
// 4.每个文件留最后一个空行
// 5.变量定义了 必须使用
// 6.变量如果没有重新赋值, 用const
// ...

// eslint插件 自动修复代码风格
