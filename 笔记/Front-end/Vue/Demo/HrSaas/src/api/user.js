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
