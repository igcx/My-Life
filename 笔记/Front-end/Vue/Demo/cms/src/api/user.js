// 这个文件是专门用于封装 和用户本身 相关的一些接口的

// http 是axios的增强版  (基地址+请求拦截器 响应拦截器)
import http from '@/utils/request'

// 按需导出
// 用于用户登录的请求 封装
export const reqLogin = (data) => {
  return http({
    method: 'post',
    url: '/api/login',
    data: data
  })

  // return undefined
}

// 用于用户注册的请求 封装函数
export const reqReg = (data) => {
  return http({
    method: 'post',
    url: '/api/reg',
    data
  })
}

// 用于获取用户基本资料
export const reqGetUserInfo = () => http({
  method: 'get',
  url: '/my/userinfo'
  // 单独设置请求头
  // headers: {
  //   Authorization: localStorage.getItem('cms-91')
  // }
})

// 更新用户信息
// data {id , nickname , email}
export const reqUpdateUserInfo = (data) => {
  return http({
    method: 'put',
    url: '/my/userinfo',
    data
  })
}

// 更新头像
// avatar => base64字符串
// data => {avatar}
export const reqUploadAvatar = (data) => {
  return http({
    method: 'patch',
    url: '/my/update/avatar',
    data
  })
}

// 更新密码
// data => { old_pwd new_pwd re_pwd }
export const reqUpdatePwd = (data) => http({
  method: 'patch',
  url: '/my/updatepwd',
  data
})
