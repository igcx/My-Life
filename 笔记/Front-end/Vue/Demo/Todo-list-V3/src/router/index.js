import { createRouter, createWebHistory } from 'vue-router'
import Start from '../views/Start.vue'

// 路由的配置属性
// path：路由的路径 必须 / 开头
// component：对应的路由组件
const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/about',
    name: 'About',
    // 按需引入
    // 如果没有访问 /about 就不会加载这个组件，节约性能
    component: () => import('../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // 按需引入
    // 如果没有访问 /about 就不会加载这个组件，节约性能
    component: () => import('../views/Home.vue')
  }
]

// 创建路由对象
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
