<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章分类</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row type="flex" justify="end">
        <el-col :span="2">
          <el-button type="primary" size="small">添加分类</el-button></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
