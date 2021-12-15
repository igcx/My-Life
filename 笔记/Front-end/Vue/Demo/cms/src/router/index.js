import Vue from 'vue'
import VueRouter from 'vue-router'

// 这种导入组件的方式, 会导致页面一加载, 就会加载所有组件
// import Login from '@/views/Login/'
// import Reg from '@/views/Reg'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import ArtCategory from '@/views/ArtCategory'
// import ArtList from '@/views/ArtList'
// import UserInfo from '@/views/UserInfo'
// import ChangeAvatar from '@/views/ChangeAvatar'
// import ResetPwd from '@/views/ResetPwd'

// 这种导入组件的方式 懒加载(到我了 我才上) => 只有用户看到了这个组件 才会加载
const Login = () => import('@/views/Login/')
const Reg = () => import('@/views/Reg')
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const ArtCategory = () => import('@/views/ArtCategory')
const ArtList = () => import('@/views/ArtList')
const UserInfo = () => import('@/views/UserInfo')
const ChangeAvatar = () => import('@/views/ChangeAvatar')
const ResetPwd = () => import('@/views/ResetPwd')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reg',
      component: Reg
    },
    {
      // 首页
      path: '/',
      component: Layout,
      children: [
        // 主页(首页的二级路由)
        {
          path: '/',
          component: Home
        },
        // 文章分类
        {
          path: '/artcategory',
          component: ArtCategory
        },
        // 文章列表
        {
          path: '/artlist',
          component: ArtList
        },
        // 基本资料
        {
          path: '/userinfo',
          component: UserInfo
        },
        // 更换头像
        {
          path: '/changeavatar',
          component: ChangeAvatar
        },
        // 重置密码
        {
          path: '/resetpwd',
          component: ResetPwd
        }
      ]
    }
  ]
})

// 只有两个页面时不需要登录的 /login  /reg  /xxx

// 白名单 =>  就是表示 这些个页面是不需要登录的
const WHITE_LIST = ['/login', '/reg']

// 安排一个全局前置守卫
// to  去哪呀  to.path
// from  来自哪
// next()  放行函数必须要调用, 如果你不调用这个函数, 那么你是看不到任何页面的
router.beforeEach((to, from, next) => {
  // 放行逻辑?
  // 页面分为两种 (需要登录的 + 不需要登录 )
  console.log(to)
  // if (to.path === '/login' || to.path === '/reg') {
  if (WHITE_LIST.includes(to.path)) {
    // 这是属于不登录也能看的页面  直接放行
    next()
  } else {
    // 表示去的是 需要登录的 才能看的页面
    // 需要判断登录? token
    if (localStorage.getItem('cms-91')) {
      // 登录 => 直接放行
      next()
    } else {
      // 没有登录 => 去登录页
      next('/login')
    }
  }
  // next()
})

// 模拟一下大爷
// 你是不是需要登录才能看的页面呀?
// 如果不需要登录也能进的页面,  直接放行
// 如果是需要登录 才能看,
//      如果你登陆过了(token), 直接放行
//      没有登录过,  应该去登录

export default router
