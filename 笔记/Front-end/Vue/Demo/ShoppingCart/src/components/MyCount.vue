<template>
  <div class="my-counter">
    <button type="button" class="btn btn-light" @click="dec">-</button>
    <!-- input 输入框  oninput 实时获取输入框的内容  onchange 失去焦点的时候获取输入框的内容 -->
    <input @change="inputCount" type="number" class="form-control inp" :value="count">
    <button type="button" class="btn btn-light" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 加
    add() {
      // console.log(this.count)
      this.$emit('add', this.count + 1)
    },
    // 减
    dec() {
      if (this.count === 1) return
      this.$emit('dec', this.count - 1)
    },
    inputCount(e) {
      let num = + e.target.value
      // console.log('失去焦点了', e.target.value)
      if (num < 1) {
        num =1
        // e.target.value = 1

        // 强制更新
        this.$forceUpdate()
      }
      this.$emit('inputCount', num)
    }
  }
}
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 45px;
    text-align: center;
    margin: 0 10px;
  }
}
</style>