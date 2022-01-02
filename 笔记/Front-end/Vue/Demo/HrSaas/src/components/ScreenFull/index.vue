<template>
  <div>
    <!-- <svg>
      <use xlink:href="#icon-404" />
    </svg> -->
    <svg-icon v-if="isFull" class="myicon" icon-class="exit-fullscreen" @click="toggle" />
    <svg-icon v-else class="myicon" icon-class="fullscreen" @click="toggle" />
  </div>
</template>
<script>
// 装包 => 导入 => 调用方法
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFull: false // 记录当前全屏状态
    }
  },
  methods: {
    toggle() {
      // 全屏
      if (ScreenFull.isEnabled) {
        // 能用
        ScreenFull.toggle()
        this.isFull = !this.isFull
      } else {
        // 不能用
        this.$message.error('很遗憾，当前浏览器不支持全屏')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myicon {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>
