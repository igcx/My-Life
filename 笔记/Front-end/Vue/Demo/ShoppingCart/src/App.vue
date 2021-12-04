<template>
  <div class="app">
    <MyHeader title="购物车案例"></MyHeader>
    <MyGoods
      @changeSelect="changeSelectFn"
      v-for="goods in goodsList"
      :goods="goods"
      :key="goods.id"
      @add="addFn"
      @dec="decFn"
      @inputCount='inputCountFn'
    ></MyGoods>
    <MyFooter
      @changeCheckall="changeCheckallFn"
      :goodsList="goodsList"
    ></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyGoods from "./components/MyGoods.vue";
import MyFooter from "./components/MyFooter.vue";
import axios from "axios";

export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter,
  },
  data() {
    return {
      goodsList: [],
    };
  },
  async created() {
    const res = await axios({
      method: "GET",
      url: "https://www.escook.cn/api/cart",
    });
    console.log(res);
    const { list, status } = res.data;
    if (status === 200) {
      this.goodsList = list;
    }
    console.log(list, status);
  },
  methods: {
    changeSelectFn(id) {
      // 获取到了商品id
      // 找到对应的商品
      // 修改当前的 goods_state (取反)
      const result = this.goodsList.find((v) => v.id === id);
      result.goods_state = !result.goods_state;
      console.log(id);
    },
    // 修改全选框
    changeCheckallFn(flag) {
      this.goodsList.forEach((v) => (v.goods_state = flag));
    },
    // 商品数量 +1
    addFn(count, id) {
      // console.log(count, id);
      const result = this.goodsList.find((v) => v.id === id);
      result.goods_count = count;
    },
    // 商品数量 -1
    decFn(count, id) {
      // console.log(count, id);
      const result = this.goodsList.find((v) => v.id === id);
      result.goods_count = count;
    },
    // 手动修改 输入框的值
    inputCountFn(count, id) {
      const result = this.goodsList.find((v) => v.id === id);
      // console.log(result) 
      result.goods_count = count;
    }
  },
};
</script>

<style>
.app {
  padding: 45px 0 50px 0;
}
</style>
