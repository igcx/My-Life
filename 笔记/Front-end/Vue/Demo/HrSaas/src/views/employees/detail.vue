<template>
  <div class="employees-detail-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="userInfo.username" placeholder="请输入姓名" style="width:300px" />
              </el-form-item>
              <el-form-item prop="newPassword" label="新密码:">
                <el-input v-model="userInfo.newPassword" placeholder="请输入新密码" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 打印按钮 -->
            <el-tooltip class="tooltip-box" content="打印基本个人信息">
              <router-link :to="`/employees/print/${userId}?type=personal`">
                <i class="el-icon-printer" />
              </router-link>
            </el-tooltip>
            <!-- 内容 -->
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-tooltip class="tooltip-box" content="打印基本岗位信息">
              <router-link :to="`/employees/print/${userId}?type=job`">
                <i class="el-icon-printer" />
              </router-link>
            </el-tooltip>
            <!-- 内容 -->
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqGetUserDetailById } from '@/api/user'
import { reqSaveUserDetailById } from '@/api/employee'
import UserInfo from './components/UserInfo.vue'
import JobInfo from './components/JobInfo.vue'
export default {
  name: 'EmployeesDetail',
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userInfo: {
        username: '',
        newPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }
        ],
        newPassword: [
          { min: 6, max: 9, message: '密码必须是6-9位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  async created() {
    const { data } = await reqGetUserDetailById(this.userId)
    console.log(data, 9090)
    this.userInfo = data
  },
  methods: {
    saveUser() {
      this.$refs.userForm.validate(async(flag) => {
        if (!flag) return
        // 校验通过
        await reqSaveUserDetailById({
          ...this.userInfo,
          // 将来只修改用户名, 就没有newPassword字段, 做个兜底
          password: this.userInfo.newPassword || this.userInfo.password
        })
        this.$message.success('保存成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.employees-detail-container {
  .el-tab-pane {
    padding-top: 10px;
  }
  .tooltip-box {
    position: absolute;
    right: 30px;
    top: 10px;
    z-index: 999;
  }
}
</style>
