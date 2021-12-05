<template>
  <table class="table table-bordered table-striped">
    <!-- 表格标题区域 -->
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格主体区域 -->
    <tbody>
      <tr v-for="(item, index) in data" :key="item.id">
        <slot name="body" :row='item' :index='index'></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
//   name: 'MyTable',
  props: {
    data: {
      type: Array,
      require: true
    }
  }
}
</script>

<style>

</style>