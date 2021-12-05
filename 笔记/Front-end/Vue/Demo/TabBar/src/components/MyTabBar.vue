<template>
  <div class="my-tab-bar">
    <div class="tab-item" v-for="(item, index) in tabList" :key="item.title" :class="{current:active === index}" @click="changeTab(index)">
      <span class="iconfont icon-shangpinliebiao" :class="item.icon"></span>
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        tabList: {
            type: Array,
            require: true,
            // 自定义校验
            validator (value) {
                if (value.length >= 2 && value.length <= 5) {
                    return true
                } else {
                    console.log('tabList长度必须是2-5位')
                    return false
                }
            }
        },
        // 接收 active 属性
        active: {
            type: Number,
            default: 0
        }
    },
    methods: {
        changeTab(index) {
            this.$emit('changeTab', index)
        }
    }
}
</script>

<style lang="less" scoped>
.my-tab-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .iconfont {
      font-size: 18px;
    }
  }
  .current {
    color: #1d7bff;
  }
}
</style>