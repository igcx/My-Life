import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {*} page 页码
 * @param {*} size 每页条数
 */
export const reqGetUserList = (page = 1, size = 5) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}

/**
 * 删除员工 (这里后台接口有问题)
 */
export const reqDelEmployee = id => request({
  method: 'DELETE',
  url: `/sys/user/${id}`
})

/**
 * 新增员工
 * @param {*} form { 7个字段 }
 */
export const reqAddEmployee = form => request({
  method: 'POST',
  url: '/sys/user',
  data: form
})

/**
 * 批量新增员工
 * @param {*} arr [ { 7个字段 }, { 7个字段 }... ]
 */
export const reqAddEmployeeBatch = arr => request({
  method: 'POST',
  url: '/sys/user/batch',
  data: arr
})

/**
 * 保存员工的基本信息
 */
export const reqSaveUserDetailById = data => request({
  method: 'PUT',
  url: `/sys/user/${data.id}`,
  data
})

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export const reqGetPersonalDetail = (id) => request({
  method: 'GET',
  url: `/employees/${id}/personalInfo`
})

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export const reqUpdatePersonal = (data) => request({
  method: 'PUT',
  url: `/employees/${data.userId}/personalInfo`,
  data
})

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export const reqGetJobDetail = id => request({
  method: 'GET',
  url: `/employees/${id}/jobs`
})

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export const reqUpdateJob = data => request({
  method: 'PUT',
  url: `/employees/${data.userId}/jobs`,
  data
})

/**
 * 给员工分配角色
 * @param {*} id 员工id
 * @param {*} roleIds 分配的角色id数组
 */
export const reqAssignRoles = (id, roleIds) => request({
  method: 'PUT',
  url: '/sys/user/assignRoles',
  data: {
    id,
    roleIds
  }
})
