// 封装组织架构的相关接口

import request from '@/utils/request'

/**
 * 获取部门列表
 */
export const reqGetDepartments = () => request({
  method: 'GET',
  url: '/company/department'
})

/**
 * 根据id删除部门
 * @param {*} id 部门id
 */
export const reqDelDepartment = (id) => request({
  method: 'DELETE',
  url: `/company/department/${id}`
})

/**
 * 新增部门
 * @param {*} data { name code manager  introduce pid }
 */
export const reqAddDepartment = data => request({
  method: 'POST',
  url: '/company/department',
  data: data
})
