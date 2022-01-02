<template>
  <div>
    <!-- 工作日历, 年和月 -->
    <div class="select-box">
      <!-- 年份 -->
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px; margin-right: 10px"
        @change="handleChange"
      >
        <!-- 年份取给定年份的, 前五年 + 后五年 -->
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

      <!-- 月份 -->
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px"
        @change="handleChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <!-- 日历组件 -->
    <!-- date: 原始的日期数据
    data: { "isSelected": true, "type": "current-month", "day": "2022-01-07" } -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date, data }">
        <div class="date-content">
          <span class="text">{{ data.day | time }}</span>
          <span v-if="isRest(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    time(value) {
      const str = value.split('-')[2]
      return str.startsWith('0') ? str.slice(1) : str
    }
  },
  // 规范：如果要给复杂类型的 props 给默认值，通过函数 return 出来(保持组件的独立封闭)
  props: {
    startDate: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null // 如果是null 会默认拿当前时间
      // yearList: [] // 要遍历的年的数组
    }
  },
  computed: {
    yearList() {
      return Array.from(new Array(11)).map(
        (item, index) => index + this.currentYear - 5
      )
    }
  },
  watch: {
    currentDate(newValue) {
      // 如果用户点了日历，currentDate变化，同步给下拉框
      this.currentYear = newValue.getFullYear()
      this.currentMonth = newValue.getMonth() + 1
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear() // 得到当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月份
    this.handleChange() // 一进入页面就基于当前年月，控制日历
  },
  methods: {
    handleChange() {
      // 选择年份 月份 会触发 change事件
      // 控制日历正确展示
      // console.log(this.currentYear, this.currentMonth)
      // 要想控制日历的年月，只要调整 currentDate
      this.currentDate = new Date(
        `${this.currentYear}-${this.currentMonth}-01`
      )
    },
    isRest(date) {
      // 周日 0
      // 周一 1
      if (date.getDay() === 0 || date.getDay() === 6) {
        // 周六周日 => 显示休息
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  display: flex;
  justify-content: flex-end;
}

::v-deep .el-calendar-day {
  height: auto;
}
::v-deep
  .el-calendar-table__row
  td::v-deep
  .el-calendar-table
  tr
  td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
