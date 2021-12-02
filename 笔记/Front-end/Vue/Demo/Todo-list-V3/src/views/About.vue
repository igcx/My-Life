<template>
  <div class="about">
    <h1>这是 about 组件</h1>
    <button @click="back">回到首页</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "About",
  setup() {
    let router = useRouter();
    let back = () => {
      // router.back()
      router.go(-1);
    };
    return {
      back,
    };
  },
});
</script>