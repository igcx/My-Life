<template>
  <div>
    <!--
      el-upload 组件 ----- 用于上传图片

        1. list-type ----- 设置样式

        2. action 必传 设置接口地址，上传图片到哪台服务器 element会自动帮你发送请求 上传图片
            我们不需要它自动发请求, 将来自己发送请求, 设置为空或# 为了不报错

        3. file-list 设置文件列表数组

        4. on-preview 设置了就有预览的 + 号，当点击预览会触发这个函数

        5. limit 限制用户上传图片的数量

        6. on-remove 只有在点击删除时会触发，但是删除的只是结构上的图片，数据上的图片没有删除

        7. http-request 覆盖默认上传行为，不会自动发送请求，需要自己发请求上传图片

        8. on-change 添加图片，上传成功、失败都会触发

        9. before-upload 上传之前会调用，返回 false 意味着失败的 promise，停止上传，常用于文件基本校验

    -->
    <el-upload
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePreview"
      :limit="limit"
      :class="{ disabled: isDisabled }"
      :on-remove="handleRemove"
      :http-request="handleUpload"
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <!-- 进度条 -->
    <!-- <el-progress style="width: 300px" :text-inside="true" :stroke-width="20" :percentage="percentage" /> -->

    <el-dialog title="预览图片" :visible="isShow" @close="isShow = false">
      <img :src="imgUrl" alt="" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
// 装包 => 导包 => new 实例发送请求 => 调用方法发请求(文档)
import COS from 'cos-js-sdk-v5' // 导入腾讯云的包(sdk)
const cos = new COS({
  SecretId: 'AKIDb1B5h3B2dxzlFSO3RZQ1LPCiyxjGXXGh', // 身份识别ID
  SecretKey: 'D9oBH7gy0m9G6gz1lERN1OVLtABvObXD' // 身份秘钥
})
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      isShow: false,
      imgUrl: '',
      percentage: 0
    }
  },
  computed: {
    isDisabled() {
      // 需求: 将来如果实际图片超过了limit, 不显示加号, 应该有disabled 类名
      return this.fileList.length >= this.limit
    },
    isAllUploadSuccess() {
      // 必须fileList中每一项的status都是 success
      return this.fileList.every((item) => item.status === 'success')
    }
  },
  methods: {
    handlePreview(file) {
      // console.log('我被预览了', file)
      // 显示对话框
      this.isShow = true
      // 将预览的图片地址 赋值给imgUrl
      this.imgUrl = file.url
    },
    // 删除文件
    handleRemove(file, fileList) {
      // file => 删除的那个文件/图片
      // fileList => 结构里的图片数组 (自己会更新)
      // this.fileList => 数据里面的图片数组 (手动更新)
      console.log(file, fileList, this.fileList)

      // 1. 将结构中的数据 依次展开, 交给数据的数组
      // this.fileList = [...fileList]

      // 2. 手动过滤
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    // 上传文件
    handleUpload({ file }) {
      // 判断用户上传的图片的体积, 不符合要求,  return
      // 晚了, 已经被用户看到了..

      console.log('上传文件', file)
      const fileObj = this.fileList.find((item) => item.uid === file.uid)

      // 设置上传前的进度条显示
      fileObj.status = 'uploading'

      // 上传的代码..
      cos.putObject(
        {
          Bucket: 'hrsaas-1309002420', // 存储桶的名称
          Region: 'ap-shanghai', // 存储桶的所在地域
          Key: parseInt(Math.random() * 999) + file.name, // 设置图片的名字
          StorageClass: 'STANDARD', // 设置存储类型: 标准即可
          Body: file, // 要上传的图片
          // 每上传一小部分 就触发一次
          onProgress: (progressData) => {
            // this ???
            // console.log(JSON.stringify(progressData))
            // this.percentage = parseInt(progressData.percent * 100)
            fileObj.percentage = parseInt(progressData.percent * 100)
          }
        },
        (err, data) => {
          // this => 组件
          // 请求结束后 会触发这个函数!!!(箭头)
          // console.log(err || data)
          if (err) {
            console.log(err)
            return
          }

          // 成功了
          // 临时路径换成真实的路径
          fileObj.url = 'https://' + data.Location

          // 用户网络太好了, 上传的太快 => 只看到了0%  看不到100% => 体验不好
          setTimeout(() => {
            // 右上角打钩 + 进度条关了
            fileObj.status = 'success'
          }, 1000)
        }
      )
    },
    handleChange(file, fileList) {
      // file => 添加的那个文件
      // fileList => 结构中的数组(更新了)
      // this.fileList => 数据的数组(手动更新)
      // console.log(file, fileList, this.fileList)

      this.fileList = [...fileList]
    },
    handleBeforeUpload(file) {
      // file => 上传的文件对象
      // this.$message.error('图片有问题!!!')
      // return false

      // file.size => 文件体积(B)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        // 超过2M
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }

      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>

