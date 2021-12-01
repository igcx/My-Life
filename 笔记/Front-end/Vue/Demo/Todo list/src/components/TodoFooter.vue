<template>
  <footer class="footer">
    <span class="todo-count"><strong>{{ restCount }}</strong>剩余</span>
    <ul class="filters">
      <li>
        <a @click="changeSelect('all')" :class="{selected: type==='all'}" href="#/">全部</a>
      </li>
      <li>
        <a @click="changeSelect('active')" :class="{selected: type==='active'}" href="#/active">未完成</a>
      </li>
      <li>
        <a @click="changeSelect('completed')" :class="{selected: type==='completed'}" href="#/completed">已完成</a>
      </li>
    </ul>
    <!-- 控制当前按钮的显示和隐藏 -->
    <!-- 只要数据中有已完成的就显示 反之就 隐藏 -->
    <button v-show="isShow" class="clear-completed" @click="clear">清除已完成</button>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      type: 'all'
    }
  },
  props: {
    list: {
      type: Array,
      require: true
    }
  },
  computed: {
    // 剩余个数
    restCount () {
      return this.list.filter(v => !v.isDone).length
    },
    isShow() {
      return this.list.some(v => v.isDone)
    }
  },
  methods: {
    // 清除已完成 
    clear() {
      this.$emit('clear')
    },
    changeSelect(type) {
      // console.log(type)
      this.type = type
      this.$emit('changeSelect', type)
    }
  }
}
</script>

<style>
</style>