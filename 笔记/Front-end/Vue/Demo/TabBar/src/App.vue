<template>
  <div class="app">
    <MyHeader color="#fff" bgColor='skyblue'> TabBar 案例 </MyHeader>

    <MyTabBar :tabList='tabList' :active='active' @changeTab='changeTabFn'></MyTabBar>

    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyTabBar from './components/MyTabBar.vue'
import MyGoodsList from './components/MyGoodsList.vue';
import MyGoodsSearch from './components/MyGoodsSearch.vue';
import MyUserInfo from './components/MyUserInfo.vue';
export default {
  data() {
    return {
      // tab栏的数据
      tabList: [
        { icon: 'icon-shangpinliebiao', title: '商品列表', name: MyGoodsList},
        { icon: 'icon-sousuo', title: '商品搜索', name: MyGoodsSearch},
        { icon: 'icon-user', title: '用户中心', name: MyUserInfo}
      ],
      // 默认高亮
      active: 0
    }
  },
  methods: {
    changeTabFn(index) {
      this.active = index
    }
  },
  // 计算属性,动态计算出当前要展示的组件的名称
  computed: {
    activeName() {
      return this.tabList[this.active].name
    }
  },
  // 局部注册组件
  components: {
    MyHeader,
    MyTabBar,
    MyGoodsList,
    MyGoodsSearch,
    MyUserInfo
  }
}
</script>

<style>
.app {
  padding: 50px 0;
}
</style>