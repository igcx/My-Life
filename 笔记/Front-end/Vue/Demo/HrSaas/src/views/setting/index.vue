<template>
  <div class="setting-container">
    <!-- 提供了一些默认的内边距 padding -->
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button
              type="primary"
              size="small"
              @click="showDialog = true"
            >+ 新增角色</el-button>
            <el-dialog
              :title="showTitle"
              :visible="showDialog"
              @close="closeDialog"
            >
              <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="100px"
              >
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                  <el-input
                    v-model="form.description"
                    placeholder="请输入角色描述"
                  />
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button
                  size="small"
                  type="primary"
                  @click="clickSubmit"
                >确认</el-button>
                <el-button size="small" @click="btnCancel">取消</el-button>
              </template>
            </el-dialog>
            <!-- 分配权限的弹层 -->
            <el-dialog
              title="分配权限"
              :visible="showAssignDialog"
              @close="closeAssignDialog"
            >
              <!-- node-key 唯一标识 -->
              <el-tree
                ref="tree"
                :data="permissionList"
                show-checkbox
                check-strictly
                default-expand-all
                :props="{ label: 'name' }"
                node-key="id"
              />
              <template #footer>
                <div style="text-align: right">
                  <el-button @click="closeAssignDialog">取消</el-button>
                  <el-button type="primary" @click="clickAssignSubmit">确定</el-button>
                </div>
              </template>
            </el-dialog>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="list">
              <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                width="120"
              />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assign(row.id)"
                  >分配权限</el-button>

                  <el-button
                    size="small"
                    type="primary"
                    @click="edit(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="del(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <!--
              属性:
                1. current-page 标记当前页 (谁高亮)
                2. page-sizes 可供选择的每页条数列表
                3. page-size 起作用的每页条数
                4. layout 布局, 控制是展示的控件列表布局
                5. total 总条数
              方法:
                @size-change="handleSizeChange" 每页条数变化
                @current-change="handleCurrentChange" 当前页变化
            -->
            <el-pagination
              :current-page="page"
              :page-sizes="[1, 2, 3, 4, 5]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">
            <!-- 警告信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyForm.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyForm.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyForm.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyForm.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  reqGetRoleList,
  reqDelRole,
  reqAddRole,
  reqGetRoleDetail,
  reqUpdateRole,
  reqAssignPerm
} from '@/api/setting'
import { reqGetCompanyById } from '@/api/company'
import { mapState } from 'vuex'
import { reqGetPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'role',
      list: [],
      page: 1, // 当前页
      pagesize: 3, // 每页条数
      total: 0, // 总条数
      loading: false,
      showDialog: false,
      // 接口文档
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: ['change', 'blur']
          }
        ],
        description: [
          {
            required: true,
            message: '角色描述不能为空',
            trigger: ['change', 'blur']
          }
        ]
      },
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      showAssignDialog: false, // 分配权限的确认框
      permissionList: [] // 树形的权限列表
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    showTitle() {
      return this.form.id ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo() // 获取公司信息
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const {
        data: { total, rows }
      } = await reqGetRoleList(this.page, this.pagesize)
      // console.log(total, rows)
      this.list = rows
      this.total = total
      this.loading = false
    },
    // 修改了每页条数后, 会造成页数的变化, 从第一页重新开始展示
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      // 更新每页条数
      this.pagesize = val
      // 重置当前页
      this.page = 1
      // 调用方法, 重新请求
      this.getRoleList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 更新当前页
      this.page = val
      // 调用方法, 重新请求渲染
      this.getRoleList()
    },
    // 配置自定义函数
    indexMethod(index) {
      // 处理序号问题
      return index + 1 + this.pagesize * (this.page - 1)
    },
    // 取消 提示框
    btnCancel() {
      // console.log('取消')
      this.showDialog = false
    },

    del(id) {
      // console.log(id)
      this.$confirm('确定删除该角色么？', '温馨提示')
        .then(async() => {
          await reqDelRole(id)
          this.$message.success('删除角色成功')

          if (this.list.length === 1 && this.page > 1) {
            this.page--
          }

          this.getRoleList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async edit(id) {
      // console.log(id)
      const { data } = await reqGetRoleDetail(id)
      // console.log(res)
      // 给 form表单赋值
      this.form = data
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      // 重置表单 (数据+提示)
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },

    clickSubmit() {
      this.$refs.form.validate(async(flag) => {
        if (!flag) return
        let res
        if (this.form.id) {
          // 编辑
          res = await reqUpdateRole(this.form)
          console.log(res)
          // this.$message.success(res.message)
        } else {
          // 添加
          res = await reqAddRole(this.form)
          console.log(res)
        }
        this.$message.success(res.message)
        this.showDialog = false
        this.getRoleList()
      })
    },
    async getCompanyInfo() {
      const { data } = await reqGetCompanyById(this.userInfo.companyId)
      this.companyForm = data
      console.log(data)
    },
    // 分配权限的弹框
    closeAssignDialog() {
      this.showAssignDialog = false
      // 重置选中项为空
      this.$refs.tree.setCheckedKeys([])
    },
    // 分配权限的按钮
    async assign(id) {
      this.showAssignDialog = true
      this.roleId = id
      console.log(id)
      // console.log(id)
      // 1. 获取所有权限列表
      const { data } = await reqGetPermissionList()
      // 列表数据转为树形数据
      this.permissionList = transListToTreeData(data, '0')
      // 2. 获取角色之前的权限 进行回显(就是获取角色详情那个接口)
      const { data: { permIds }} = await reqGetRoleDetail(id)
      console.log(permIds)
      // 设置树形结构节点选中调用tree组件的方法 (配合node-key)
      this.$refs.tree.setCheckedKeys(permIds)
    },
    async clickAssignSubmit() {
      const permIds = this.$refs.tree.getCheckedKeys()
      const res = await reqAssignPerm(this.roleId, permIds)
      console.log(res)
      this.$message.success(res.message)
      this.closeAssignDialog()
    }
  }
}
</script>
