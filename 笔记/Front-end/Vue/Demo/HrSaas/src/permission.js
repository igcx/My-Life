// 这个文件专门用于添加路由前置守卫
// 登录访问控制? 登录了才能看哪些页面

import router from '@/router'
import store from '@/store'

// 希望进入页面有一个进度条 NProgress
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 按需导入所有路由
// import { asyncRoutes } from '@/router'

// 判断有无 token
// 1. 有 token
//  1.1 判断是不是去登陆页 如果去登录页 没有必要去登录 引导去首页
//  1.2 不是登陆页，直接放行

// 2. 没有 token
//  2.1 去的白名单（'/login', '/404'） 直接放行
//  2.2 去的不是白名单，去登录页

// 白名单
const WHITE_LIST = ['/login', '/404']

// 导航前置守卫
router.beforeEach(async(to, from, next) => {
  // 不论哪个页面进入都会经过前置守卫，开启进度条
  NProgress.start()
  // 判断有无token
  if (store.getters.token) {
    // 判断去的是不是登录页
    if (to.path === '/login') {
      // 跳到首页
      next('/')
      NProgress.done()
    } else {
      // 进入页面之前，先看这个人的权限
      // 只有获取到了用户的权限，才能放行
      // 异步的函数(封装promise)

      // 只有在仓库里没有用户资料，这个时候可以发请求
      if (!store.state.user.userInfo.userId) {
        const { roles: { menus }} = await store.dispatch('user/getUserProfile')
        console.log(menus)

        // 封装了路由模块，所有跟路由相关的操作都应该放在路由模块(规范)
        // 过滤路由这个操作应该放在路由模块
        // actions 内部封装了 promise
        // 只要是分发 actions 无论同步还是异步，都是 await 接受结果(规范)
        // otherRoutes => 过滤好的路由规则(用户自己的路由规则)
        const otherRoutes = await store.dispatch('permission/filterRoutes', menus)

        // 一定是看清了这个人的所有信息(menus)，给他添加对应的路由规则，放他进去
        // router.addRoutes([{},{},{}...])
        // 临时先添加所有的动态路由规则
        // addRoutes 动态添加路由规则们（耗时的，异步的）
        router.addRoutes([...otherRoutes, { path: '*', redirect: '/404', hidden: false }])

        // 为了让以上的路由规则生效以后，再放行，在进入页面（重进了一次页面）
        next({
          ...to,
          replace: true // 避免路由跳转历史重复的问题
        })
        return
      }
      next()
    }
  } else {
    // 没有 token
    // 看在不在白名单中(免登陆即可访问的页面)
    if (WHITE_LIST.includes(to.path)) {
      // 去的是白名单
      next()
    } else {
      // 去的是重要的地方 需要登录
      next('/login')
      NProgress.done()
    }
  }
})
// 路由后置守卫
// 只要进入到页面中，会经过后置守卫
// 将来如果是被拦截走的页面，是没有真正进入到页面中，所以就不会触发后置守卫
// 解决：找到被拦截走的页面，手动关闭进度条
router.afterEach((to, from) => {
  NProgress.done()
})
