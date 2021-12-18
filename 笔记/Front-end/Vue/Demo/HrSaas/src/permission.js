// 这个文件专门用于添加路由前置守卫
// 登录访问控制? 登录了才能看哪些页面

import router from '@/router'
import store from '@/store'

// 判断有无 token
// 1. 有 token
//  1.1 判断是不是去登陆页 如果去登录页 没有必要去登录 引导去首页
//  1.2 不是登陆页，直接放行

// 2. 没有 token
//  2.1 去的白名单（'/login', '/404'） 直接放行
//  2.2 去的不是白名单，去登录页

// 白名单
const WHITE_LIST = ['/login', '/404']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有 token
    if (WHITE_LIST.includes(to.path)) {
      // 去的是白名单
      next()
    } else {
      // 去的是重要的地方 需要登录
      next('/login')
    }
  }
})

// 白名单 => whilelist = ['/login', '/reg'] =>不需要登录也能访问的页面
// 如果去的是白名单 , 直接放行
// 如果去的不是白名单   有token 直接放行;  没有token 拦截走登录

// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // 设置了 白名单 => 不需要验证token也能访问的(不重要的)
// // 一级路由 login 404 layout(...)
// const whiteList = ['/login', '/404']

// // 前置守卫: 路由被匹配成功以后, 对应的页面组件展示在浏览器之前, 经过前置守卫
// // 只有前置守卫放行了( next() ), 页面组件才会展示在我们面前
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   // 这个函数用于判断用户有无token
//   const hasToken = getToken()

//   if (hasToken) {
//     // 有token => 直接放行 (优化点 判断一下他去的是登录页么)
//     if (to.path === '/login') {
//       // 要去登录页 且登陆过 没必要 => 引导到首页
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       // 表示去的不是登录页, 直接放行
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     // 没有token

//     // 判断去的是否是白名单
//     if (whiteList.includes(to.path)) {
//       // 去的是白名单 => 可以去
//       next()
//     } else {
//       // 去的不是白名单 且没有token , 不能去 => 拦截走登录页
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
