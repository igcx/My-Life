<template>
  <div>
    <h1 class="title">{{artDetail.title}}</h1>

    <div class="info">
      <span>作者: {{artDetail.nickname||artDetail.username}}</span>
      <span>发布时间: {{artDetail.pub_date | dateFormat}}</span>
      <span>所属分类: {{artDetail.cate_name}}</span>
      <span>状态: {{artDetail.state}}</span>
    </div>

    <el-divider></el-divider>
    <!-- <hr> -->

    <img :src="'http://www.liulongbin.top:3008' + artDetail.cover_img" alt="" />
    <!-- v-html就一种场景, 服务器返回一段带标签的字符串 -->
    <div v-html="artDetail.content">
      <!-- {{artDetail.content}} -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtInfo',
  props: {
    artDetail: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}
</style>
