import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // 设置超时时间 一旦超过5s 响应结果就不要了
  timeout: 5000 // request timeout
})

// 添加请求拦截器
http.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 拦截器统一携带token
  const token = store.getters.token
  if (token) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // 请求成功 且 success: false => catch(返回一个失败的 promise)
  const res = response.data
  // console.log(res)
  const { success, message } = res
  if (!success) {
    // 统一处理请求成功但是结果失败的消息提示
    Message.error(message)
    return Promise.reject(new Error(message))
  }

  return res
}, function(error) {
  console.dir(error)
  if (error.response.status === 401 && error.response.data.code === 10002) {
    // 表示登录过期了，401未授权
    Message.error('您的登录已过期，请重新登录！')
    // 到期清除token 清除个人信息
    store.dispatch('user/logout')
    // 跳转
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 将来服务器错误提示用户
  return Promise.reject(error)
})

export default http
