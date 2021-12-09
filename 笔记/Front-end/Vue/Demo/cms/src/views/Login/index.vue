<template>
  <div class="login-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <!-- <img src="~@/assets/images/logo.png" alt="" /> -->
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 登录的表单 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        <el-link type="info" class="link-reg" @click="$router.push('/reg')">去注册账号</el-link>
      </el-form>
    </div>
  </div>
</template>
<script>
// 我们希望用自己的 axios 模块，但是不想每个页面手动导入 ==> 挂载到Vue 原型上
// import axios from '@/utils/request'
import { reqLogin } from '@/api/user'

export default ({
  name: 'Login',
  data () {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        // 登录表单的校验
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10位的字母或数字', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位并且不能为空', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginFormRef.validate(async flag => {
        // console.log(flag)
        if (!flag) return
        console.log('发请求了')
        const { data } = await reqLogin(this.loginForm)
        if (data.code !== 0) {
          return this.$message.error('登录失败')
        }
        // 登录成功，提示用户，保存token，跳转到后台主页
        this.$message.success('登录成功')
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      })
    }
  }
})

</script>

<style lang="less" scoped>
.login-container {
  background-color: blue;
  height: 100%;
  background: url('~@/assets/images/login_bg.jpg') no-repeat center;
  background-size: cover;

  .header {
    width: 1200px;
    margin: 0 auto;
    user-select: none;
  }

  .box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
    box-sizing: border-box;

    .box-header {
      height: 60px;
      background: url('~@/assets/images/login_title.png') no-repeat center;
    }

    .btn-login {
      width: 100%;
    }

    .link-reg {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
