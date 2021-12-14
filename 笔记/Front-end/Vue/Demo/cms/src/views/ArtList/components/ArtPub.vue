<template>
  <div class="art-pub-container">
    <el-form ref="pubRef" :model="pubForm" :rules="rules" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="pubForm.title"
          placeholder="请填写文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <!-- clearable 清空内容 -->
        <el-select v-model="pubForm.cate_id" placeholder="请选择分类" clearable>
          <el-option
            :label="item.cate_name"
            :value="item.id"
            v-for="item in cateList"
            :key="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <!-- 富文本编辑器(带有格式的文本) -->
        <!-- 将来用户输入的任何有格式的文本 都会被收集pubForm.content -->
        <quill-editor v-model="pubForm.content"></quill-editor>
      </el-form-item>
      <el-form-item label="文章封面">
        <div class="cover-box">
          <img :src="pubForm.cover_img" alt="" class="cover-img" />
          <!-- 点击选择封面 相当于点击了文件域 -->
          <el-link type="primary" :underline="false" @click="$refs.iptFile.click()" >+ 选择封面</el-link>
          <!-- accept="image/*" 表示接受的文件类型  hidden 隐藏 -->
          <input type="file" ref="iptFile" accept="image/*" hidden @change="handleChange"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('已发布')">发布文章</el-button>
        <el-button type="info" @click="publish('草稿')">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 图片的使用路径:
// 1.本地路径使用图片 => 有一个陨石坑(webpack打包时,不认这个本地路径)
// 2.网络路径 => 没坑

// 单独导入的方式 webpack能识别
import defaultImg from '@/assets/images/cover.jpg'
import { mapState } from 'vuex'
import { reqPublishArt } from '@/api/article'
export default {
  name: 'ArtPub',
  data () {
    return {
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        state: '',
        cover_img: defaultImg
      },
      rules: {
        title: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: ['change', 'blur']
          },
          {
            min: 1,
            max: 30,
            message: '文章标题1-30字符',
            trigger: ['change', 'blur']
          }
        ],
        cate_id: [
          {
            required: true,
            message: '文章分类不能为空',
            trigger: ['change', 'blur']
          }
        ]
      },
      file: null // 存储待上传的图片(文件对象)
      // imgUrl: defaultImg
    }
  },
  computed: {
    ...mapState('article', ['cateList'])
  },
  methods: {
    handleChange (e) {
      // console.log(e.target.files[0])
      const file = e.target.files[0]
      // 拿到文件对象 创建临时路径 前端本地预览
      if (file) {
        const tempPath = URL.createObjectURL(file)
        // 展示给用户看
        this.pubForm.cover_img = tempPath
        this.file = file
      }
    },
    async publish (str) {
      console.log('发布文章了')
      this.pubForm.state = str
      // 调用接口  发布文章

      // 需求: 得到一个formData格式的数据 (title cate_id content state cover_img)

      // 得到了一个空的formData数据
      const fm = new FormData()
      // 提供数据  fm.name='zs'
      fm.append('title', this.pubForm.title)
      fm.append('cate_id', this.pubForm.cate_id)
      fm.append('content', this.pubForm.content)
      fm.append('state', this.pubForm.state)
      // fm.append('cover_img', this.pubForm.cover_img)
      // 这里文档有问题!!!  应该是传一个文件对象
      fm.append('cover_img', this.file)

      const { data } = await reqPublishArt(fm)
      // console.log(res)
      if (data.code !== 0) return this.$message.error(data.message)
      this.$message.success(data.message)
      // 关闭对话框 改值(父组件)  子传父
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="less" scoped>
.art-pub-container {
  padding: 0 30px 20px 0px;
}

.el-select {
  width: 100%;
}

/deep/ .ql-snow .ql-color-picker .ql-picker-label svg,
/deep/ .ql-snow .ql-icon-picker .ql-picker-label svg {
  position: relative;
  top: -6px;
}

/deep/ .ql-snow .ql-picker-label::before {
  position: relative;
  top: -8px;
}

/deep/ .ql-editor {
  min-height: 300px;
}

.cover-img {
  object-fit: cover;
  width: 400px;
  height: 280px;
  margin-right: 10px;
}

.cover-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
