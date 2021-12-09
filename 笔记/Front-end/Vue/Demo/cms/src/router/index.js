import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/Login/'
// 注册
import Reg from '@/views/Reg'
// 首页
import Layout from '@/views/Layout'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/reg', component: Reg },
    { path: '/', component: Layout }
  ]
})

export default router
