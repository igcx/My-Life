<template>
  <div>
    <button @click="start">开始任务</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Start",
  setup() {
    // 组件创建过程的生命周期 setup
    //   console.log(111)
    let router = useRouter();
    onMounted(() => {
      // 组件挂载过程的生命周期 onMounted
      // 数据 dom等...
      // 一般 onMounted 做两件事情
      // 1. 发请求
      // 2. 做一些数据初始化的操作 接收路由传递的参数
      console.log("onMounted");
    });
    onUnmounted(() => {
      // 组件卸载时的生命周期 onUnmounted
      // 一般用来 清除定时器 清除闭包函数...
      console.log("onUnmounted");
    });
    console.log("setup"); // setup 会在 onMounted 前面执行，跟代码位置无关
    let start = () => {
      // push 如果传的是对象的形式，就可以传递参数
      router.push({
        path: "/home",
      });
    };
    return {
      start,
    };
  },
});
</script>