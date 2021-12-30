// 封装全局自定义指令

// 指令的配置对象，决定了指令要做什么
export const imgerror = {
  // 指令所在的元素将来插入到页面中时，会自动触发这个函数
  inserted(el, binding) {
    // el => element 指令所在的那个元素
    // binding => 指令相关的信息对象
    // binding.value => 指令的值
    // console.log(el, binding.value)
    // 图片出错了
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

// 自定义指令修改退出功能颜色
// <span v-color="color">哈哈</span> color: 'red'
export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
// 在main里面按需导入 => 注册 => 使用
