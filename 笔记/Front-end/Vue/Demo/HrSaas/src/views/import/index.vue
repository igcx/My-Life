<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { reqAddEmployeeBatch } from '@/api/employee'
export default {
  name: 'Import',
  methods: {
    handleSuccess({ header, results }) {
      // 获取上传结果
      console.log(header, results)
      if (this.$route.query.type === 'user') {
        // 添加员工页面过来
        this.handleEmployeeBatch(header, results)
      }
      if (this.$route.query.type === 'money') {
        // 处理批量添加薪资的逻辑
        console.log('处理批量添加薪资的逻辑')
      }
      if (this.$route.query.type === 'social') {
        // 处理批量添加社保的逻辑
        console.log('处理批量添加社保的逻辑')
      }
    },
    async handleEmployeeBatch(header, results) {
      // header中, results中的数据是中文的, 但是提交给后台的要是英文的
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        // item => 对象 包含中文键
        // 准备一个新对象，用来换键
        const obj = {}
        // 浅拷贝
        for (const key in item) {
          // key => '入职日期'
          // 从 userRelations 找
          const englishKey = userRelations[key]
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            // 如果发现在处理时间，拿到原来的值进行转换
            obj[englishKey] = this.formatExcelDate(item[key], '-')
          } else {
          // item[key] 是第一次遍历的值 不用处理 把它交给 obj[englishKey] 的键
            obj[englishKey] = item[key]
          }
        }
        console.log(obj)
        arr.push(obj)
      })
      const res = await reqAddEmployeeBatch(arr)
      this.$message.success(res.message)
      // 跳转到员工页面
      this.$router.push('/employees')
    },
    formatExcelDate(numb, format) {
      const time = new Date(numb * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
