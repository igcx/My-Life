import Vue from 'vue'
import Router from 'vue-router'

// 安装语法!!
Vue.use(Router)

/* Layout */
// 布局架子
import Layout from '@/layout'

// 导入是有缓存的，下次再被引入 import 时，先走缓存

// 引入多个模块的规则
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

// 动态路由表 => 动态路由(需要权限才可以访问的) 我们这里准备一个数组存放
export const asyncRoutes = [
  departmentsRouter,
  settingRouter,
  employeesRouter,
  permissionRouter,
  approvalsRouter,
  attendancesRouter,
  salarysRouter,
  socialRouter
]

// 这种方式会组件全部加载 => 首屏加载很慢
// import Login from '@/views/Login'
// 懒加载方式
// const Login = () => import('@/views/Login')

// const routes = [
//   { path: '/login', component: Login }
// ]

// const router = new Router({
//   routes: routes
// })

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 一级路由 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 一级路由 404 报错页
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 一级路由  首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      // 首页的二级路由
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'import',
        component: () => import('@/views/import')
      }
    ]
  }

  // 404页必须放在末尾 !!!
  // 匹配所有路由 通常配合 404 一起用
  // 临时注释，将来一定要添加到路由规则的最后
  // { path: '*', redirect: '/404', hidden: false }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 管理滚动行为, 让页面切换时回到顶部
  // 我们作为开发者，一开始是不考虑权限管理的，应该默认看到所有路由
  // 临时合并动态路由和静态路由
  routes: [
    ...constantRoutes
    // ...asyncRoutes
  ]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由 => new了一个新的路由实例，只要新的路由实例的匹配规则，替换给老的路由规则
export function resetRouter() {
  const newRouter = createRouter() // 重新 new 路由实例
  router.matcher = newRouter.matcher // 路由匹配函数
}

export default router
