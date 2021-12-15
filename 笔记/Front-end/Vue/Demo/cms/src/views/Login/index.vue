<template>
  <div class="login-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="" />
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 登录的表单 -->
      <!--
        表单校验:
        1. el-form 添加 :model="表单整体数据"  :rules="rule"  rule: { 校验字段名: [{}, {}...], ... }
        2. el-form-item  添加 prop="字段名"
        3. el-input v-model
       -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="rule">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>

        <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        <el-link type="info" class="link-reg" @click="$router.push('/reg')">去注册账号</el-link>
      </el-form>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// 这是我们自己的axios (配置了基地址)

// 需求: 我们希望用自己的axios模块, 但是不想每个页面手动导入  =>  挂载Vue 原型上 => this
// import axios from '@/utils/request'

// 按需导入
import { reqLogin } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      // 登录表单数据
      loginForm: {
        username: 'llq123123',
        password: 'llq123123'
      },
      // 校验规则对象
      rule: {
        username: [
          // 非空校验
          { required: true, message: '用户名不能为空哟', trigger: ['change', 'blur'] },
          // 非空 +  长度(min max) + 正则(pattern) + 自定义校验
          // 只能由字母数字组成, 1-10
          { pattern: /^[0-9a-zA-Z]{1,10}$/, message: '用户名格式只能是字母数字,且1-10位', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '密码不能为空哟', trigger: ['change', 'blur'] },
          // 非空字符串 6-15位
          { pattern: /^\S{6,15}$/, message: '密码只能是非空 且6-15位', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    login () {
      // 组件方法内部的this => 组件本身

      // 1. 整体校验  validate => form组件的方法
      // validate( () => { this => 组件 } )
      this.$refs.loginFormRef.validate(async (flag) => {
        // console.log(flag)
        // if (flag) {
        //   console.log('请求了')
        //   console.log('登录成功')
        //   // this.$router  this=>组件实例
        //   this.$router.push({ path: '/' })
        // }

        if (!flag) return console.log('校验失败')
        console.log('发请求了')

        // 应该是请求发出去之前loading
        // 演示loading
        // 这种方式使用组件 函数调用(服务)
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })

        // 2.请求 (当成请求用户基本信息的接口, 将来会频繁调用,  封装成函数)
        const { data } = await reqLogin(this.loginForm)

        // 请求有结果了 可以关闭loading
        // loading.close()

        // 3.请求的处理(成功/失败)
        // console.log(res)
        if (data.code !== 0) {
          return this.$message.error('再想想密码呢')
        }
        console.log(data, '登录成功')

        // 3.1提示用户
        this.$message.success('恭喜你，登录成功')
        // 3.2存储到本地
        localStorage.setItem('cms-91', data.token)
        // 3.3跳转首页  /
        this.$router.push('/')
        // this.$router.push({ path: '/' })

        // this.$message({
        //   message: '恭喜你，登录成功',
        //   type: 'success'
        // })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background-color: blue;
  height: 100%;
  // vue中的@别名 在样式中默认是不识别的!!! 如果需要让他识别. 在他前面 加~@
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
    }
  }
}
</style>
