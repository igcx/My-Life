import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册组件 svg-icon
// <svg-icon></svg-icon>
Vue.component('svg-icon', SvgIcon)

// 手动导入svg文件夹下面的所有svg文件 => 麻烦 不灵活
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'
// import './svg/eye.svg'

// 导入svg文件夹下面的所有svg文件
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories : 是否查找子目录
// regExp: 要查找的文件的正则
// 告诉webpack 一会去查找同级目录下的svg文件夹, 不需要查找子目录, 找的是所有以.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)
// 固定语法, 用于获取需要查找的文件路径
// ['./dashboard.svg', './example.svg', './eye-open.svg', './eye.svg', './form.svg', './link.svg', './nested.svg', './password.svg', './table.svg', './tree.svg', './user.svg']
console.log(req.keys(), 8877)

// 这个函数的作用就是 根据提供好的查找的文件路径, 统一的导入
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}

// 统一导入了svg文件夹下的所有svg文件
requireAll(req)

// 导入所有的svg文件,  svg => svg-sprites(svg精灵图) => webpack插件 svg-sprites-loader
// svg-sprites-loader 作用就是 把所有导入的svg文件 自动拼接, 且放到一个大的容器
// 容器 => 11个图标
