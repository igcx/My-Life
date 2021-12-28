import Layout from '@/layout'
export default {
  // 员工
  path: '/employees',
  component: Layout,
  children: [
    // 员工默认页面
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    // 员工的详情页
    {
      // 如果子路由 path 不带/  会自动拼接父路由 /employees/detail
      // 动态路由，每个用户自己带上 id进来
      path: 'detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail'),
      hidden: true
    }
  ]
}
