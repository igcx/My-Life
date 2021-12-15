// 追加webpack的配置

// 获取当前的打包环境
// 这是node自带的环境变量 自己根据环境切换值
// yarn serve => 开发项目 => 开发环境 => process.env.NODE_ENV  development
// yarn build => 打包项目 => 生产环境 => process.env.NODE_ENV  production
const env = process.env.NODE_ENV
console.log(env)
// 打包排除项
let externals = {}

// 根据打包环境，动态设置打包排除项
if (env === 'production') {
  externals = {
    // import 时的包名称: window 全局的成员名称
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    echarts: 'echarts',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor'
  }
}

module.exports = {
  // devServer: {
  //   port: 3000,
  //   open:true
  // }

  // 希望打包时  以相对路径
  publicPath: './',
  configureWebpack: {
    // 打包优化
    // 配置排除项: vue vue-router vuex axios quill-editor 走在线链接 CDN
    // 一旦设置了这些排除项后, webpack就不会吧这个包 打进我们的项目
    externals: externals
  },
  // 移除控制台打印
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  }

}
