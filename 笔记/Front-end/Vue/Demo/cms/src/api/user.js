// 这个文件是专门用于封装 和用户本身 相关的一些接口的

// http 是axios的增强版  (基地址+请求拦截器 响应拦截器)
import http from '@/utils/request'

// 用于用户登录的请求 封装
export const reqLogin = (data) => {
  return http.post('/api/login', data)
}

// 用于用户注册的请求 封装函数
export const reqReg = (data) => {
  return http.post('/api/reg', data)
}

// 用于获取用户基本资料
export const reqGetUserInfo = () => http({
  method: 'get',
  url: '/my/userinfo',
  // 单独设置请求头
  headers: {
    Authorization: localStorage.getItem('token')
  }
})
