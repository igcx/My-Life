import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/Login/'
// 注册
import Reg from '@/views/Reg'
// 首页
import Layout from '@/views/Layout'
// 二级路由
import Home from '@/views/Home'
// 文章分类
import ArtCategory from '@/views/ArtCategory'
// 文章列表
import ArtList from '@/views/ArtList'
// 个人中心
import UserInfo from '@/views/UserInfo'
// 更换头像
import ChangeAvatar from '@/views/ChangeAvatar'
// 重置密码
import ResetPwd from '@/views/ResetPwd'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/reg', component: Reg },
    {
      path: '/',
      component: Layout,
      // 主页的二级路由
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: '/artcategory',
          component: ArtCategory
        },
        {
          path: '/artlist',
          component: ArtList
        },
        {
          path: '/userinfo',
          component: UserInfo
        },
        {
          path: '/changeavatar',
          component: ChangeAvatar
        },
        {
          path: '/resetpwd',
          component: ResetPwd
        }
      ]
    }
  ]
})

// 白名单
const WHITE_LIST = ['/login', '/reg']
// 全局前置守卫
// to 去哪里
// from 哪里来
// next() 放行 必须调用,不调用是看不到任何页面的
router.beforeEach((to, from, next) => {
  if (WHITE_LIST.includes(to.path)) {
    // 这是属于不登录也能看的页面 直接放行
    next()
  } else {
    // 表示去的是需要登录的页面
    // 需要判断是否有 token
    if (localStorage.getItem('token')) {
      // 登录过，直接放行
      next()
    } else {
      // 没有登录过，去 login
      next('/login')
    }
  }
  // next()
})

export default router
