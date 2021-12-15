// 这个文件专门用于封装我们的axios
import axios from 'axios'
// 单独导入router去使用 (跳转路由)
import router from '@/router'

// 单独导入Loading这个包
import { Loading } from 'element-ui'
// Loading.service()

// 配置axios的基础地址
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'

let loading

// 添加请求拦截器(在请求真正到达服务端之前统一做些什么=>)
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么  => 统一加token
  // config => 该请求所有的配置选项
  console.log(config, 666)

  // 并不是所有的请求都需要加这个字段Authorization? 以/my开头就是需要身份认证
  if (config.url.startsWith('/my')) {
    config.headers.Authorization = localStorage.getItem('cms-91')
  }

  // 统一添加loading效果
  loading = Loading.service({
    // lock: true, // 是锁定屏幕 不让滚动
    text: '一大波数据正在赶来...', // 加载中文字消息
    spinner: 'el-icon-loading', // icon
    background: 'rgba(0, 0, 0, 0.7)' // 遮罩透明度
  })

  return config
}, function (error) {
  // 对请求错误做些什么(很少用)
  return Promise.reject(error)
})

// 添加响应拦截器
// 响应无论是成功/ 失败. 都结束了 => 关闭loading
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log('请求成功了')
  loading.close()
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。 404  500
  // 对响应错误做点什么
  console.dir(error)

  if (error.response.status === 401 && error.response.data.code === 1) {
    // 这个请求401  身份认证失败, token 过期 => 回到登录去
    router.push('/login')
    // token过期, 删除
    localStorage.removeItem('cms-91')
  }

  loading.close()
  return Promise.reject(error)
})

// 默认导出
export default axios
