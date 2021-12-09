<template>
  <div class="reg-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <!-- <img src="@/assets/images/logo.png" alt="" /> -->
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 注册的表单 -->
      <!--
        表单校验:
        1. el-form 添加 :model="表单整体数据"  :rules="rule"  rule: { 校验字段名: [{}, {}...], ... }
        2. el-form-item  添加 prop="字段名"
        3. el-input v-model
       -->
      <el-form ref="regFormRef" :model="regForm" :rules="rule">
        <el-form-item prop="username">
          <el-input v-model="regForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regForm.password" prefix-icon="el-icon-lock" show-password placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="regForm.repassword" prefix-icon="el-icon-lock" show-password placeholder="请输入密码" type="password"></el-input>
        </el-form-item>

        <el-button type="primary" class="btn-login" @click="register">注册</el-button>
        <el-link type="info" class="link-reg" @click="$router.push('/login')">去登录账号</el-link>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reqReg } from '@/api/user'
export default {
  name: 'Reg',
  data () {
    const checkRePass = (rule, value, callback) => {
      if (value === this.regForm.password) {
        callback()
      } else {
        callback(new Error('两次密码不一致'))
      }
    }

    return {
      // 注册表单数据
      regForm: {
        username: '',
        password: '',
        repassword: ''
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
        ],
        repassword: [
          { required: true, message: '确认密码不能为空哟', trigger: ['change', 'blur'] },
          // 非空字符串 6-15位
          { pattern: /^\S{6,15}$/, message: '密码只能是非空 且6-15位', trigger: ['change', 'blur'] },
          // 需求: 确认密码必须和密码是相同的!!!
          {
            validator: checkRePass,
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    register () {
      // 1.表单的整体校验
      this.$refs.regFormRef.validate(async (flag) => {
        if (!flag) return this.$message.error('校验失败')
        console.log('请求啦')

        const { data } = await reqReg(this.regForm)
        // console.log(res)
        if (data.code !== 0) {
          // 失败的处理
          return this.$message.error(data.message)
        }

        // 成功
        // 1.提示
        this.$message.success(data.message)
        // 2 跳转登录
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.reg-container {
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
    height: 335px;
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
