<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showRoleDialog"
    @close="handleCloseDialog"
    @open="handleOpenDialog"
  >
    <!-- 准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="loading">
      <!-- 这里收集提交给后台的是 label -->
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button type="primary" size="small" @click="clickAssignRoles">确定</el-button>
      <el-button size="small" @click="handleCloseDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
import { reqGetUserDetailById } from '@/api/user'
import { reqAssignRoles } from '@/api/employee'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      loading: false
    }
  },
  methods: {
    handleCloseDialog() {
      // 子传父 .sync
      this.$emit('update:showRoleDialog', false)
      // 优化 点开角色会从上一个角色过渡到这个角色
      this.checkList = []
    },
    handleOpenDialog() {
      this.loading = true
      // console.log('111')
      // created 发请求太早了, 组件是一直在的
      // 获取角色列表
      this.getRoleList()
      // 获取这个员工的详情(包含之前的角色信息)，回显
      this.getEmployeeDetail()
      // 处理并发请求
      Promise.all([this.getRoleList(), this.getEmployeeDetail()]).then(() => {
        // 这里的代码将会在 两个请求都结束之后 才去执行
        this.loading = false
      })
    },
    async getRoleList() {
      const { data: { rows }} = await reqGetRoleList(1, 99999)
      // console.log(res)
      this.roleList = rows
    },
    async getEmployeeDetail() {
      const { data: { roleIds }} = await reqGetUserDetailById(this.userId)
      // console.log(roleIds)
      // 回显角色
      this.checkList = roleIds
    },
    async clickAssignRoles() {
      const res = await reqAssignRoles(this.userId, this.checkList)
      console.log(res)
      this.$message.success('分配角色成功!')
      this.handleCloseDialog()
    }
  }
}
</script>
