import Vue from 'vue'
import App from './App.vue'

// 导入 bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// 导入字体图标
import './fonts/iconfont.css'

// 注册全局指令
Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
