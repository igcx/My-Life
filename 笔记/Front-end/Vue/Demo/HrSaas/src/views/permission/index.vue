<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="clickAdd(1, '0')">添加权限</el-button>
        </div>
        <el-table border row-key="id" :data="list">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                v-if="row.type === 1"
                size="small"
                type="text"
                @click="clickAdd(2, row.id)"
              >添加权限点</el-button>
              <el-button size="small" type="text" @click="edit(row.id)">查看</el-button>
              <el-button size="small" type="text" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 新增/编辑的弹层 -->
      <el-dialog
        :visible="showDialog"
        :title="showTitle"
        @close="handleCloseDialog"
      >
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="clickSubmit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqAddPermission, reqDelPermission, reqGetPermissionDetail, reqGetPermissionList, reqUpdatePermission } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Permissions',
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 权限名称
        code: '', // 权限标识,用于将来判断
        description: '', // 权限描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '查看权限' : '添加权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const { data } = await reqGetPermissionList()
      // console.log(data)
      // 将数据转为树形结构
      // 一级页面访问权都是 '0'
      this.list = transListToTreeData(data, '0')
      console.log(this.list)
    },
    clickAdd(type, pid) {
      this.showDialog = true
      this.formData.type = type
      this.formData.pid = pid
    },
    async clickSubmit() {
      if (this.formData.id) {
        // 编辑
        const res = await reqUpdatePermission(this.formData)
        console.log(res)
        this.$message.success(res.message)
      } else {
        // 添加
        const res = await reqAddPermission(this.formData)
        // console.log(res)
        // 提示
        this.$message.success(res.message)
      }
      // 关闭弹框
      this.handleCloseDialog()
      // 重新渲染
      this.getPermissionList()
    },
    handleCloseDialog() {
      this.showDialog = false
      // 没有做表单的整体校验(model  rules  prop), 不能调用这个方法
      // this.$refs.form.resetFields()
      // 这里只能手动重置
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 权限名称
        code: '', // 权限标识,用于将来判断!!!
        description: '', // 权限描述
        type: '', // 类型标记了 1 一级(页面访问权) 2 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    },
    del(id) {
      this.$confirm('确定要删除吗？', '温馨提示', { type: 'warning' }).then(async() => {
        const res = await reqDelPermission(id)
        console.log(res)
        // 提示
        this.$message.success(res.message)
        this.getPermissionList()
      }).catch(() => {
        console.log('取消')
      })
    },
    async edit(id) {
      this.showDialog = true
      // 发送请求 获取权限的详情 进行回显
      const { data } = await reqGetPermissionDetail(id)
      // console.log(res)
      this.formData = data
    }
  }

}
</script>
