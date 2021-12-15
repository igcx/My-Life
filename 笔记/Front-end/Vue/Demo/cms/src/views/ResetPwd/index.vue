<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>更改密码</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="90px"
      style="width: 500px; margin-top: 30px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="form.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="form.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="form.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwd">修改密码</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reqUpdatePwd } from '@/api/user'
export default {
  data () {
    const validateNew = (rule, val, callback) => {
      if (val === this.form.old_pwd) {
        callback(new Error('新密码不能和原密码相同!!!'))
      } else {
        callback()
      }
    }

    const validateRe = (rule, val, callback) => {
      if (val === this.form.new_pwd) {
        callback()
      } else {
        callback(new Error('确认密码和新密码不一致!!!'))
      }
    }

    return {
      form: {
        old_pwd: '', // 原来密码
        new_pwd: '', // 新密码
        re_pwd: '' // 确认密码
      },
      rules: {
        old_pwd: [
          // 必填
          { required: true, message: '原密码不能为空', trigger: ['change', 'blur'] },
          // 6-15 非空字符
          { pattern: /^\S{6,15}$/, message: '原密码只能是6-15位非空字符', trigger: ['change', 'blur'] }
        ],
        new_pwd: [
          { required: true, message: '新密码不能为空', trigger: ['change', 'blur'] },
          { pattern: /^\S{6,15}$/, message: '新密码只能是6-15位非空字符', trigger: ['change', 'blur'] },
          { validator: validateNew, trigger: ['change', 'blur'] }
        ],
        re_pwd: [
          { required: true, message: '确认密码不能为空', trigger: ['change', 'blur'] },
          { pattern: /^\S{6,15}$/, message: '确认密码只能是6-15位非空字符', trigger: ['change', 'blur'] },
          { validator: validateRe, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    updatePwd () {
      // 整体校验
      this.$refs.form.validate(async (valid) => {
        if (!valid) return console.log('校验失败')

        // 发请求(封装)
        const { data } = await reqUpdatePwd(this.form)
        console.log(data)
        // 提示
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)

        // 退到登录页重新登录
        localStorage.removeItem('cms-91')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style></style>
