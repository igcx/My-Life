import Layout from '@/layout'

export default {
  // 权限管理
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]

}
