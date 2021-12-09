// 用于封装 axios
// 导入 axios
import axios from 'axios'

import { Loading } from 'element-ui'
// 全局挂载axios地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'

let loading
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
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
  loading.close()
  return Promise.reject(error)
})
// 导出axios
export default axios
