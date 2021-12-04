<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input
          :checked="goods.goods_state"
          @change="changeSelect"
          type="checkbox"
          class="custom-control-input"
          :id="goods.id"
        />
        <label class="custom-control-label" :for="goods.id">
          <img :src="goods.goods_img" alt="" />
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">{{ goods.goods_name }}</div>
      <div class="bottom">
        <span class="price">¥ {{ goods.goods_price }}</span>
        <span
          ><MyCount @add="add" @dec="dec" @inputCount="inputCount" :count="goods.goods_count"></MyCount
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import MyCount from "./MyCount.vue";
export default {
  components: {
    MyCount,
  },
  props: {
    goods: {
      type: Object,
      require: true,
    },
  },
  methods: {
    changeSelect() {
      this.$emit("changeSelect", this.goods.id);
    },
    // 商品数量 +1
    add(count) {
    //   console.log(count);
      this.$emit("add", count, this.goods.id);
    },
    // 商品数量 -1
    dec(count) {
    //   console.log(count);
      this.$emit("dec", count, this.goods.id);
    },
    // 输入框修改
    inputCount(count) {
        console.log(count);
        this.$emit('inputCount', count, this.goods.id)
    }
  },
};
</script>

<style lang="less" scoped>
.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>