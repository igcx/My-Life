<template>
  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input v-model="isCheckAll" id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- v-for 遍历 -->
      <li :class="{completed: item.isDone}" v-for="item in list" :key="item.id">
        <div class="view">
          <input class="toggle" type="checkbox" :checked="item.isDone" @change="changeState(item.id)"/>
          <label>{{item.name}}</label>
          <button class="destroy" @click="del(item.id)"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            require: true
        }
    },
    methods: {
        //删除操作
        del(id) {
            // 派发事件
            this.$emit('del', id)
        },
        // 修改复选框状态
        changeState(id) {
            this.$emit('changeState', id)
        }
    },
    computed: {
        isCheckAll: {
          set(val) {
              console.log(val)
              this.$emit('changeAll', val)
          },
          get() {
              return this.list.every(v => v.isDone)
          },
        }
    }
}
</script>

<style>
</style>