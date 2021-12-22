<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!root" command="edit">编辑部门</el-dropdown-item>
              <!-- 组件内部没有支持click原生事件 -->
              <el-dropdown-item v-if="!root" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { reqDelDepartment } from '@/api/departments'
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    root: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // del() {
    //   console.log('我要被删了')
    // }
    handleCommand(str) {
      // 指令事件: 1.el-dropdown @command="fn"  2. el-dropdown-item 设置command="xxx"
      // str => 点击的菜单项的command
      // 点击任何一个菜单项就会触发这个事件对应的处理函数!!
      // console.log('被点击了', str)
      if (str === 'add') {
        console.log('添加')
        // 显示添加子部门的dialog
        // 子传父 通知父组件 isShow true
        this.$emit('openDialog', this.nodeData)
      }

      if (str === 'edit') {
        console.log('编辑')
      }

      if (str === 'del') {
        console.log('删除')

        this.$confirm('此操作将永久删除该部门,继续么?', '温馨提示', { type: 'warning' }).then(async() => {
          // console.log('我要删除', this.nodeData)
          const res = await reqDelDepartment(this.nodeData.id)
          // console.log(res)
          this.$message.success(res.message)
          // 重新渲染  departs 父组件
          // 子组件通知父组件 根新数据
          this.$emit('del-dept')
        }).catch(() => {
          console.log('取消')
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
