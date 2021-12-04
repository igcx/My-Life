<template>
  <!-- 底部 -->
  <div class="my-footer">
    <!-- 全选 -->
    <div class="custom-control custom-checkbox">
      <input
        v-model="isCheckAll"
        type="checkbox"
        class="custom-control-input"
        id="footerCheck"
      />
      <label class="custom-control-label" for="footerCheck">全选</label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计:</span>
      <span class="price">¥ {{ totalPrice }}</span>
    </div>
    <!-- 按钮 -->
    <button type="button" class="footer-btn btn btn-primary">
      结算 ({{ totalCount }})
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      require: true,
    },
  },
  computed: {
    // 全选框
    isCheckAll: {
      get() {
        return this.goodsList.every((v) => v.goods_state);
      },
      set(value) {
        console.log(value);
        this.$emit("changeCheckall", value);
      },
    },
    // 合计
    totalPrice() {
      // 1. 找到所有选中的商品
      // 2. 遍历选中的商品，计算求和
      const arr = this.goodsList.filter((v) => v.goods_state);

      // 1. 定义变量遍历相加
      // 2. reduce()
      return arr.reduce((sum, v) => sum + v.goods_price * v.goods_count, 0);
    },
    // 计算选中的商品数量
    totalCount() {
      const arr = this.goodsList.filter((v) => v.goods_state);
      return arr.reduce((sum, v) =>  sum + v.goods_count, 0)
    },
  },
};
</script>

<style lang="less" scoped>
.my-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;

  .price {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-btn {
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    padding: 0;
  }
}
</style>