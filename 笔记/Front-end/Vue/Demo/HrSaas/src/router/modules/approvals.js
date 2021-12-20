import Layout from '@/layout'

export default {
  // 审批（二级路由） 抽离出来是为了好维护
  path: '/approvals',
  component: Layout,
  children: [
    // 审批默认页面
    {
      path: '',
      name: 'approvals', // 命名路由
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' } // 路由添加额外的信息
    }
  ]
}
