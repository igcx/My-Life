// 封装角色管理的相关接口
import request from '@/utils/request'

/**
 * 获取所有角色列表
 */
export const reqGetRoleList = (page, pagesize = 10) => request({
  method: 'GET',
  url: '/sys/role',
  params: {
    page,
    pagesize
  }
})

/**
 * 删除角色
 */
export const reqDelRole = id => request({
  method: 'DELETE',
  url: `/sys/role/${id}`
})

/**
 * 添加角色
 * @param {*} id 角色id(必传)
 */
export const reqAddRole = form => request({
  method: 'POST',
  url: '/sys/role',
  data: form
})

/**
 * 根据id获取角色详情
 * @param {*} form form必须要有 id
 */
export const reqGetRoleDetail = id => request({
  method: 'GET',
  url: `/sys/role/${id}`
})

/**
 * 更新角色详情(form中需要有id以及其他信息)
 */
export const reqUpdateRole = form => request({
  method: 'PUT',
  url: `/sys/role/${form.id}`,
  data: form
})
