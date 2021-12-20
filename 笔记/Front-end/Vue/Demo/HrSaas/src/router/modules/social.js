import Layout from '@/layout'

export default {
  // 社保
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
