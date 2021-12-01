<template>
  <header class="header">
    <h1>todos</h1>
    <input v-model.trim="name" @keyup.enter="add" class="new-todo" placeholder="需要做些什么？" autofocus />
  </header>
</template>

<script>
export default {
    data(){
        return {
            name: ''
        }
    },
    methods: {
        add() {
            // console.log(this.name)
            // 判断不能输入空
            if(this.name === '') return
            this.$emit('add', this.name)
            // 清空
            this.name = ''
        }
    }
};
</script>

<style>
</style>