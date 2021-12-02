<template>
  <!-- 编写 html 内容 -->
  <div>
    <nav-header @add="add"></nav-header>
    <nav-main :list="list" @del="del"></nav-main>
    <nav-footer :list="list" @clear="clear"></nav-footer>
    <button @click="goto">跳转路由</button>
  </div>
</template>

<script>
// 编写 js 内容
import NavHeader from "@/components/navHeader/NavHeader";
import NavMain from "@/components/navMain/NavMain";
import NavFooter from "@/components/navFooter/NavFooter";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: {
    NavHeader,
    NavMain,
    NavFooter,
  },
  setup() {
    // router 是全局路由对象
    let router = useRouter();
    let goto = () => {
      // 跳转路由
      // push 函数里面可以直接传入跳转的路径
      // back: 回退到上一页
      // forward: 去到下一页
      // go(整数) 整数代表前进 负数代表后退
      router.push("/about");
    };
    let store = useStore();
    let list = computed(() => {
      return store.state.list;
    });
    // 父组件接收传递过来的参数
    let value = ref("");
    // 添加任务
    let add = (val) => {
      value.value = val;
      // 先判断有没有存在的任务，如果有 不能重复添加
      let flag = true;
      list.value.map((item) => {
        if (item.title === value.value) {
          // 有重复的任务
          flag = false;
          alert("任务已存在！");
        }
      });
      // 没有重复的
      if (flag) {
        // 调用 mutation
        store.commit("addTodo", {
          title: value.value,
          complete: false,
        });
      }

      console.log(val);
    };
    // 删除任务
    let del = (val) => {
      // 调用删除的 mutation
      store.commit("delTodo", val);
      // console.log(del)
    };
    // 清除已完成
    let clear = (val) => {
      store.commit("clear", val);
    };
    return {
      goto,
      add,
      value,
      list,
      del,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
