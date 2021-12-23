<template>
  <div class="departments-container">
    <!-- app-container提供了内边距 -->
    <div class="app-container">
      <el-card v-loading="loading">
        <!-- 一行  24分 -->
        <!-- root 表示是上面的结构, 不要编辑/删除 -->
        <TreeTools
          :node-data="company"
          root
          @openDialog="openDialogFn"
        />

        <!--
          树形结构
          data 树形数据
          props  设置树形结构读取数据的字段名
          default-expand-all  默认展开所有子节点
        -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 默认插槽 作用域插槽 -->
          <!--
            el-tree组件内部封装:
            <slot name="default" :data="xxx" :node="xxxx" index="xxx"></slot>
            { data: ..., node: xxx, index: xxxx }

            <template #default="{data}">
           -->

          <!-- obj.data => el-tree组件提供给你的!!! -->
          <!-- data 是组件内部提供的数据(作用域插槽) -->
          <template #default="{ data }">
            <TreeTools
              :node-data="data"
              @openDialog="openDialogFn"
              @del-dept="getDepartments"
              @openEditDialog="openEditDialogFn"
            />
          </template>
        </el-tree>

        <!-- <input type="checkbox" checked="" name="" id=""> -->
      </el-card>
    </div>

    <!-- 添加部门的对话框 -->
    <AddDept
      ref="addDept"
      :dept-list="deptList"
      :node-data="nodeData"
      :is-show.sync="isShow"
      @add-dept="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import AddDept from './components/AddDept.vue'
import { reqGetDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      // label 文字描述  children 子节点 []
      departs: [],
      deptList: [], // 列表数据
      defaultProps: {
        label: 'name'
        // children: 'children'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      isShow: false,
      nodeData: {}, // 为了以后新增部门 确定, 新增给谁做子部门
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 一旦调用这个函数, 自动发请求 获取最新的部门列表  渲染页面
    async getDepartments() {
      this.loading = true
      const { data: { depts, companyName }} = await reqGetDepartments()
      console.log(depts)
      // 保留一份原始的列表数据, 方便查找
      this.deptList = depts
      this.company.name = companyName
      // 以下这行代码 为了去做 总公司下添加子部门时 重复性校验
      this.company.id = ''
      // 先找一级部门  pid = ''
      // console.log(transList2TreeData(data.depts, ''), 99999)
      this.departs = transListToTreeData(depts, '')
      this.loading = false
    },
    openDialogFn(nodeData) {
      // 让弹窗显示
      this.isShow = true
      this.nodeData = nodeData

      // 发请求
      // getSimpleUserList 是子组件的方法
      // 父组件调用子组件的方法!!!  => 获取子组件实例 调用方法
      // this.$refs.form.validate
      this.$nextTick(() => {
        // this.$refs.addDept.getSimpleUserList()
        // this.$refs.addDept.dialogTitle = '添加子部门'
      })
    },
    openEditDialogFn(nodeData) {
      this.nodeData = nodeData
      this.isShow = true
      // vue 是异步更新 DOM 的
      this.$nextTick(() => {
        // 页面更新之后，获取子组件，调用方法
        // this.$refs.addDept.dialogTitle = '编辑部门'
        this.$refs.addDept.getDepartDetail()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  // 深度作用选择器 less /deep/ ;  scss  ::v-deep ;   css: >>>
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
