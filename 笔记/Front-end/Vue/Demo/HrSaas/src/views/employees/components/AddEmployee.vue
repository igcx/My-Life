<template>
  <el-dialog
    title="新增员工"
    :visible="showDialog"
    top="8vh"
    @close="closeDialog"
    @click.native="handleClickDialog"
  >
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- el-input别人封装的组件 不支持原生click事件 -->
        <!--
          input v-model 双向数据绑定
          1. 数据 影响 视图   :value='123'
          2. 视图 影响 数据   @input  收集用户输入的内容 , 更新数据

          这里需要v-model更换成 :value单向数据绑定  只能有数据去影响视图
         -->
        <el-input
          :value="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @click.native.stop="handleClick"
        />
        <!-- 树形组件 -->
        <div v-if="isShowTree" class="tree-box">
          <el-scrollbar>
            <el-tree
              v-loading="isTreeLoading"
              :data="treeData"
              :props="{ label: 'name' }"
              @node-click="handleNodeClick"
            />
          </el-scrollbar>
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="clickSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import obj from '@/constant/employees'
const { hireType } = obj
import { reqGetDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import { reqAddEmployee } from '@/api/employee'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      treeData: [],
      isShowTree: false, // 树展示/隐藏
      isTreeLoading: false, // 树开启loading
      hireType
    }
  },
  methods: {
    closeDialog() {
      // 关闭对话框
      // this.showDialog = false XXXXX
      // 1.标准的子传父 2. .sync    2.1 放权 2.2 一定的语法
      // 更新父组件中传递过来的数据
      this.$emit('update:showDialog', false)

      // 清空表单 移除校验结果
      this.$refs.addForm.resetFields()
    },
    async handleClick() {
      // console.log('1231231213')
      // 这里我们希望是 点一下 显示, 再点一下 隐藏,.....
      // 显示/隐藏 树
      this.isShowTree = !this.isShowTree

      // 如果是隐藏, 可以不用发请求了(优化)
      if (this.isShowTree === false) {
        return
      }

      // 发请求之前开启loading
      this.isTreeLoading = true

      const { data: { depts }} = await reqGetDepartments()
      // console.log(res, 8989)
      const res = transListToTreeData(depts, '')
      this.treeData = res
      // 数据回来以后, 关闭loading
      this.isTreeLoading = false
      console.log(this.treeData)
    },
    handleClickDialog() {
      // 这里选择给dialog注册点击事件,  因为无论你点击了任何对话框的内容, 都会冒泡 到dialog的点击事件 => 关闭tree
      this.isShowTree = false
    },
    handleNodeClick(data) {
      // 任何节点都会触发,  => 叶子节点触发
      // console.log(data)

      // 需求是: 只能让叶子节点被打印(确认选择)
      if (data.children && data.children.length > 0) {
        // 一定是有子部门的!!
        return
      }

      // console.log(data)
      // 数据回显
      this.formData.departmentName = data.name
      // 关闭tree
      this.isShowTree = false
    },
    clickSubmit() {
      this.$refs.addForm.validate(async flag => {
        if (!flag) return

        const res = await reqAddEmployee(this.formData)
        console.log(res, 7777)
        this.$message.success(res.message)
        this.closeDialog()
        // 标准的子传父 通知父组件 更新数据  是对的!!!very good
        this.$emit('add-employee')

        // 有效果 但是不推荐
        // 先获取父组件, 调用组件的方法!!!
        // 注意点: this.$parent确实是获取父组件, 会受到插槽的影响
        // this.$parent.getUserList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.tree-box {
  position: absolute;
  width: 50%;
  // min-height: 50px;
  // max-height: 300px;
  height: 250px;
  left: 0;
  top: 45px;
  z-index: 100;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 5px;
  // overflow: auto;
  background-color: #fff;

  ::v-deep {
    .el-tree-node__content {
      height: auto; // 高度由内容撑开
    }
    .el-scrollbar {
      height: 100%;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden; // 横向溢出隐藏 横向滚动条禁用
    }
  }
}

</style>
