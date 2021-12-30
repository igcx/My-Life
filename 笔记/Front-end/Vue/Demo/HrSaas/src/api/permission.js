import request from '@/utils/request'

/**
 * 获取权限
 */
export const reqGetPermissionList = () => request({
  method: 'GET',
  url: '/sys/permission'
})

// 新增权限
export const reqAddPermission = data => request({
  method: 'POST',
  url: '/sys/permission',
  data
})

// 更新权限
export const reqUpdatePermission = data => request({
  method: 'PUT',
  url: `/sys/permission/${data.id}`,
  data
})

// 删除权限
export const reqDelPermission = id => request({
  method: 'DELETE',
  url: `/sys/permission/${id}`
})

// 获取单个权限详情回显
export const reqGetPermissionDetail = id => request({
  method: 'GET',
  url: `/sys/permission/${id}`
})
