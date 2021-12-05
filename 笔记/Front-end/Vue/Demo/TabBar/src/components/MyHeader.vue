<template>
  <div class="my-header" :style="{color: color, backgroundColor: bgColor}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'skyblue'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="less" scoped>
.my-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  background-color: red;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>