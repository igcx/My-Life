<template>
  <el-card>
    <!--
      插槽: 自定义组件结构
      场景: 如果你发现组件有些结构是变化的, 就不能写死
            ===> 不能写死的地方 统统换成 插槽 <slot />
    -->
    <div class="page-tools">
      <div class="left">
        <!-- 需求: 如果用户传了left插槽, tips显示; 用户没传left插槽, tips不给显示 -->
        <div v-if="$slots.left" class="tips">
          <i class="el-icon-info" />
          <!-- <span>当前审批中 0</span>
          <span>本月审批通过 1</span>
          <span>本月审批驳回 0</span> -->
          <slot name="left" />
        </div>
      </div>
      <div class="right">
        <!-- <el-button type="primary" size="mini">流程设置</el-button> -->
        <slot name="right" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  created() {
    // this.$slots => 获取所有的插槽
    console.log(this.$slots, 88889)
  }
}
</script>

<style lang="scss" scoped>
// css less scss sass stylus
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tips {
    line-height: 34px;
    padding: 0px 15px;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
    // font-size: 12px;
    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
}

</style>
