<template>
  <div class="home">
    <!-- 必须有宽高 -->
    <div class="box" ref="boxRef"></div>
  </div>
</template>

<script>
// vue中如何使用echarts / swiper
//  下载 => 导入 => 提前准备一个有宽高的容器 => mounted钩子中找到dom进行初始化 => 配置参数

// 全部导入 => 一次性导入所有的按需导出
import * as echarts from 'echarts'

// 使用全部导入的语法  一次性导入article.js中的所有按需导出
// import * as result from '@/api/article.js'
// console.log(result, 888)

export default {
  mounted () {
    // 组件挂载之后的钩子
    const myChart = echarts.init(this.$refs.boxRef)

    myChart.setOption({
      title: {
        text: 'Basic Radar Chart'
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 600px;
  height: 600px;
  background-color: #8df;
}
</style>
