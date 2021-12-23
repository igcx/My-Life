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
export const reqDelDepartment = id => request({
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

/**
 * 根据id查询部门详情
 * @param {*} id 部门id
 */
export const reqGetDepartDetail = id => request({
  method: 'GET',
  url: `/company/department/${id}`
})

/**
 * @param {*} form {id : name/code/introduce/manager}
 */
export const reqUpdateDepartDetail = form => {
  return request({
    method: 'PUT',
    url: `/company/department/${form.id}`,
    data: form
  })
}
