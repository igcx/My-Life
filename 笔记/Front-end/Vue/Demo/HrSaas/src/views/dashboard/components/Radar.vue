<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// 下包 => 引入 => 准备一个有宽高的容器 => 初始化echarts
// 完整加载过程
// import * as echarts from 'echarts'
// 按需加载
import * as echarts from 'echarts/core' // 引入主模块
import { RadarChart } from 'echarts/charts' // 引入雷达图 图表后缀名都为Chart
// 引入提示框和标题组件
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
// 引入canvas渲染器
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, LegendComponent, RadarChart, CanvasRenderer]
)

export default {
  // 页面渲染完毕事件
  // 获取DOM的插件必须在 mounted钩子函数中初始化
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
    myChart.setOption({
      title: {
        text: '个人能力图'
      },
      tooltip: {},
      // 图例
      legend: {
        data: ['平均水平', '个人价值'],
        right: 0,
        // 图例垂直布局
        orient: 'vertical'
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        name: '平均 vs 个人',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [80, 80, 80, 80, 80, 80],
            name: '平均水平'
          },
          {
            value: [90, 75, 95, 90, 95, 90],
            name: '个人价值'
          }
        ]
      }]
    })
  }
}
</script>

<style>
.radar-echart {
    width: 500px;
    height: 400px;
}
</style>

