<template>
  <section class="app-main">
    <!-- vue提供的一个组件,用于组件切换的过渡 -->
    <transition name="fade-transform" mode="out-in">
      <!-- 二级路由出口 -->
      <!--
        key 唯一标识 避免多个页面使用同一个组件 导致缓存, 视图没法更新
        /article/1   /article/2  Article组件 内容就不更新
        key 不同 组件销毁重建 => 不会出现缓存
       -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
