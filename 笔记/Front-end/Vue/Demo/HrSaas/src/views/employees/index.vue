<template>
  <div class="employees-container">
    <div class="app-container">
      <PageTools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small" @click="handleDownload">excel导出</el-button>
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
import dayjs from 'dayjs'
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
    },
    async handleDownload() {
      const headersArr = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']

      // 中英文对照关系
      const headersRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 发请求 获取所有的员工数据 => 分页的接口
      const { data: { rows }} = await reqGetUserList(1, this.total)
      console.log(rows)

      const resArr = this.transArrayTo2Wei(headersArr, headersRelations, rows)
      console.log(resArr)

      // 多表头配置
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      // 合并单元格
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      // 动态导入
      import('@/vendor/Export2Excel').then(excel => {
        // console.log(obj)
        excel.export_json_to_excel({
          // 表格的表头
          header: headersArr,
          // 表格的主体数据(固定格式->二维数组)
          data: resArr,
          filename: '员工信息表', // 文件名
          autoWidth: true, // 宽度自适应 非必填
          bookType: 'xlsx', // 文件格式 非必填
          multiHeader,
          merges
        })
      })
    },
    // 封装一个方法，处理成二维数组 [[],[],[],[]...]
    transArrayTo2Wei(headersArr, headersRelations, rows) {
      // console.log(headersArr, headersRelations, rows)
      // rows.length 决定了有多少小数组
      // headersArr 表头的长度决定了小数组有多少项
      const res = []
      rows.forEach(item => {
        // item => 每一项用户信息
        const arr = []

        headersArr.forEach(key => {
          // key => 中文键 转为 英文键
          const englishKey = headersRelations[key]

          let val = item[englishKey]
          // 把时间处理成年月日
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            val = dayjs(val).format('YYYY年MM月DD日')
          }
          // 处理的是聘用形式，把对应的文字显示出来
          if (englishKey === 'formOfEmployment') {
            const { hireType } = obj
            const result = hireType.find(v => v.id === +val)
            val = result ? result.value : '未知'
          }
          arr.push(val)
        })
        res.push(arr)
      })
      return res
    }
  }
}
</script>

<style>

</style>
