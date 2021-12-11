// 用于封装 axios
// 导入 axios
import router from '@/router'
import axios from 'axios'

import { Loading } from 'element-ui'
// 全局挂载axios地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'

let loading
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么 ==> 统一添加 token
  //  config 该请求所有的配置选项
  console.log(config)
  // 将 token统一携带在 axios请求拦截器中
  // 固定语法
  // 并不是所有的请求都需要加这个字段 Authorization 以/my开头的就是需要认证
  if (config.url.startsWith('/my')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  loading = Loading.service({
    // lock: true, // 锁定屏幕的滚动
    text: '先喝杯茶歇一歇吧', // 文字效果
    spinner: 'el-icon-loading', // icon 图标
    background: 'rgba(0, 0, 0, 0.7)' // 背景透明
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  loading.close()
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.dir(error)
  // token过期响应拦截器中处理
  if (error.response.status === 401 && error.response.data.code === 1) {
    localStorage.removeItem('token')
    router.push('/login')
  }
  loading.close()
  return Promise.reject(error)
})
// 导出axios
export default axios
