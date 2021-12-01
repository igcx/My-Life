<template>
  <section class="todoapp">
    <!-- 头部 输入框 -->
    <TodoHeader @add='addFn'></TodoHeader>
    <!-- 内容 列表 -->
    <TodoMain :list="showList" @del='delFn' @changeState= 'changeStateFn' @changeAll="changeAllFn"></TodoMain>
    <!-- 底部 统计等 -->
    <TodoFooter :list='list' @clear='clearFn' @changeSelect= 'changeSelectFn'></TodoFooter>
  </section>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoMain from "./components/TodoMain.vue";
import TodoFooter from "./components/TodoFooter.vue";
export default {
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
  data() {
    return{
      type: 'all', //当前底部状态
      list: JSON.parse(localStorage.getItem('todolist')) || []
    }
  },
  computed: {
    // 计算列表的数据
    showList() {
      // 如果 type 为 all 列表显示的是全部的数据
      if (this.type === 'all') {
        return this.list
      // 如果 type 为 active 列表显示的是未完成的数据
      } else if (this.type === 'active') {
        return this.list.filter( v => !v.isDone)
      // 如果 type 为 completed 列表显示的是已完成的数据
      } else {
        return this.list.filter( v => v.isDone)
      }
    }
  },
  methods: {
    // 删除操作
    delFn(id) {
      // console.log(id)
      // 使用 filter
      this.list = this.list.filter(v => v.id !== id)
    },
    // 修改复选框的选中状态
    changeStateFn(id) {
      // 1. 找到对应的任务
      const obj = this.list.find(v => v.id === id)
      // 2. 修改状态
      obj.isDone = !obj.isDone
    },
    // 添加操作
    addFn(name) {
      // 末尾添加
      this.list.unshift({
        id: + new Date(),
        name,
        isDone: false
      })
    },
    // 清除已完成
    clearFn() {
      this.list = this.list.filter(v => !v.isDone)
    },
    // 切换状态 已完成 未完成
    changeSelectFn(type) {
      // console.log(type)
      // 修改状态
      this.type = type
    },
    // 全选操作
    changeAllFn(flag) {
      this.list.forEach(v => v.isDone = flag)
    }
  },
  watch: {
    list: {
      deep: true,
      handler(newval) {
        localStorage.setItem('todolist', JSON.stringify(newval))
      }
    }
  }
};
</script>

<style></style>
