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
