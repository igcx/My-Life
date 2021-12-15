<template>
   <el-card class="userAvatar-container">
     <!-- 面板屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom: 40px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>更换头像</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 用来展示头像的盒子 -->
    <div class="avatar-box">
      <!-- 如果设置头像, 就展示头像, 没有的话就是默认图片 -->
      <img :src="imgUrl || defaultImg" alt="" />
    </div>

    <!-- 放2个按钮  一个文件选择表单 -->
    <div class="box">
      <el-button type="primary" @click="$refs.fileRef.click()"> <i class="el-icon-plus"></i> 选择图片</el-button>
      <el-button type="success" :disabled="isDisabled" @click="uploadAvatar"> <i class="el-icon-upload"></i> 上传头像</el-button>
      <input type="file" accept="image/*" hidden ref="fileRef" @change="handleChange">
    </div>
  </el-card>
</template>

<script>
// 单独导入
import defaultImg from '@/assets/images/avatar.jpg'
import { mapActions, mapState } from 'vuex'
import { reqUploadAvatar } from '@/api/user'
export default {
  data () {
    return {
      defaultImg: defaultImg,
      isDisabled: true, // 控制上传头像的禁用状态
      imgUrl: ''
    }
  },
  async created () {
    await this.getUserInfo()
    // console.log(this.userInfo, 56789)
    this.imgUrl = this.userInfo.user_pic
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    handleChange (e) {
      const file = e.target.files[0]
      console.log(file)
      if (file) {
        // 如果你的图片你超过1.5M 提示不给上传
        if (file.size / 1024 / 1024 > 1.5) {
          return this.$message.error('不允许上传超过1.5M')
        }

        // 如何吧图片处理成 服务端的base64格式
        // 图片 => base64  FileReader

        // 创建filereader实例(身上有一个方法 读取图片)
        const fileReader = new FileReader()
        // 这个方法就是用来读取图片  接受一个file文件对象
        fileReader.readAsDataURL(file)

        // 将来读取结束, 会触发一个事件 load
        fileReader.addEventListener('load', () => {
          // fileReader.result => base64字符串
          console.log(fileReader.result)
          // this.userInfo.user_pic = fileReader.result
          this.imgUrl = fileReader.result
          this.isDisabled = false
        })
      } else {
        // this
        this.$message.error('请选择图片')
      }
    },
    async uploadAvatar () {
      if (this.imgUrl) {
        // 发请求(封装)
        const { data } = await reqUploadAvatar({ avatar: this.imgUrl })
        // console.log(res)
        // 提示
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)

        // 重新获取用户资料
        this.getUserInfo()

        // 禁用上传图片
        this.isDisabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userAvatar-container {
  padding: 0 0 20px 20px;

  .box {
    margin-top: 30px;
  }

  .avatar-box {
    img {
      width: 350px;
      height: 350px;
      object-fit: cover;
    }
  }

  .btns {
    padding-top: 10px;
  }
}
</style>
