import request from '@/utils/request'

/**
 * 用于登录
 */
export const reqLogin = (data) => {
  return request({
    method: 'POST',
    url: '/sys/login',
    data: data
  })
}

/**
 * 获取用户的基本资料
 */
export const reqGetProfile = () => {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

/**
 * 获取用户的基本信息
 * @param {*} id 用户id userId
 */
export const reqGetUserDetailById = (id) => {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}
