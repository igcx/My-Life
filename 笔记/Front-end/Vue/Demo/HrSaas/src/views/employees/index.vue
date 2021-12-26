<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="isShow = true">新增员工</el-button>
        </template>
      </PageTools>

      <el-card v-loading="loading" style="margin-top: 10px;">
        <el-table :data="list" border>
          <el-table-column label="序号" type="index" :index="indexFn" width="80" sortable />
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" :formatter="formatFn" prop="formOfEmployment" sortable />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" sortable>
            <template #default="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <!-- <slot name="default" /> -->
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :current-page="page"
            :page-sizes="[1,2,3,4,5,6,7,8,9,10]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

      </el-card>

      <!-- <Jack>
          <Son></Son>
      </Jack> -->

      <!-- 新增员工 的对话框 -->
      <!-- 放权 -->
      <AddEmployee
        :show-dialog.sync="isShow"
        @add-employee="getUserList"
      />
    </div>
  </div>
</template>
<script>
import { reqDelEmployee, reqGetUserList } from '@/api/employee'
// 默认导入
import obj from '@/constant/employees'
import AddEmployee from './components/AddEmployee.vue'
export default {
  name: 'Employees',
  components: {
    AddEmployee
  },
  data() {
    return {
      page: 1,
      size: 5,
      list: [],
      total: 0,
      loading: false, // card的loading效果
      isShow: false // 新增员工对话框 显示/隐藏
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const { data: { total, rows }} = await reqGetUserList(this.page, this.size)
      // console.log(res, 666655)
      this.list = rows
      this.total = total
      this.loading = false
    },
    handleSizeChange(val) {
      // 每页条数变化触发
      this.size = val
      // 规范
      this.page = 1
      this.getUserList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // 页码变化时触发
      this.page = val
      this.getUserList()
      // console.log(`当前页: ${val}`)
    },
    indexFn(val) {
      //  val 0 1 2 ...
      return val + 1 + (this.page - 1) * this.size
    },
    formatFn(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index, '------')
      // if (cellValue === 1) {
      //   return '正式工'
      // } else {
      //   return '临时工'
      // }
      // 1.将来项目中还会有这种逻辑的判断 ,
      // 2. 聘用形式会丰富
      // constant 常量文件
      // js 解构
      const { hireType } = obj

      const res = hireType.find(item => item.id === +cellValue)

      return res ? res.value : '未知'
    },
    del(id) {
      this.$confirm('确定要删除该员工?', '温馨提示', { type: 'warning' }).then(async() => {
        await reqDelEmployee(id)
        // console.log(res, 88888)
        this.$message.success('删除成功')

        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }

        // 发送请求 获取最新的数据 渲染
        this.getUserList()
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style>

</style>
