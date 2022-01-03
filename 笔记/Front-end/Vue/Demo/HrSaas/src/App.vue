<template>
  <!--
    控制类名的方案:
    1. :class="{ pink: true, blue: false }"
    2. :class="['pink']"
  -->
  <div id="app" :class="classArr">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    classArr() {
      let className = ''
      switch (this.$store.state.settings.theme) {
        case '#6959CD':
          className = 'purple-theme'
          break
        case '#F5222D':
          className = 'red-theme'
          break
        case '#212121':
          className = 'black-theme'
          break
        default:
          className = 'default-theme'
      }
      return [className]
    }
  }
}
</script>
