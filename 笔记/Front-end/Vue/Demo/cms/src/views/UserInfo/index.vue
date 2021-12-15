<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      style="width: 500px; margin-top: 30px"
    >
      <el-form-item label="登录名称">
        <!-- disabled 禁用 -->
        <el-input disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reqUpdateUserInfo } from '@/api/user'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Info',
  data () {
    return {
      form: {
        nickname: '',
        email: ''
      },
      rules: {
        nickname: [
          // 你必须填内容(可以填空格)
          { required: true, message: '昵称不能空', trigger: ['change', 'blur'] },
          { pattern: /^\S{1,10}$/, message: '昵称1-10非空字符', trigger: ['change', 'blur'] }
        ],
        email: [
          { required: true, message: '邮箱不能空', trigger: ['change', 'blur'] },
          // https://www.jb51.net/tools/regexsc.htm
          { pattern: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, message: '邮箱格式不正确', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  async created () {
    // 自己主动触发 action 获取仓库数据
    // 下面这个操作时异步的,
    // 仅仅是为了 等请求回来以后, 用户信息就得到了, 拿真实的用户信息进行回显
    await this.getUserInfo()

    console.log(this.userInfo)
    // 这里是为了不影响仓库的数据(提供了一个新的引用)
    this.form = { ...this.userInfo }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    reset () {
      this.form = { ...this.userInfo }
    },
    updateUserInfo () {
      // 整体校验
      this.$refs.form.validate(async (flag) => {
        if (!flag) return console.log('检验失败')

        // 发请求(封装)
        const { data } = await reqUpdateUserInfo(this.form)
        console.log(data)
        // 提示(失败/成功)
        if (data.code !== 0) this.$message.error(data.message)
        this.$message.success(data.message)

        // 重新获取用户资料
        this.getUserInfo()
      })
    }
  }
}
</script>

<style></style>
