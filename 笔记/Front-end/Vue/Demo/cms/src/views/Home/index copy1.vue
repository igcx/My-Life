<template>
  <div class="home">
    主页

    <el-button>哈哈哈</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
// scoped => 让样式只在当前组件生效
// 原理: 给你组件内的元素添加了一个属性   所有的样式也会统一加上属性选择器
// 小坑: 但是不会给你的组件库的元素加属性

// 如何解决这个问题:
// 深度作用选择器
// css   =>  >>>
// less  =>  /deep/  =>  去除属性选择器
// scss  =>  ::v-deep

// 总结:
// 需求: 希望改组件库的样式,  改不动??? => 深度作用选择器(向下渗透)
.home {
  color: red;

  /deep/ span {
    color: green!important;
  }
}

</style>
