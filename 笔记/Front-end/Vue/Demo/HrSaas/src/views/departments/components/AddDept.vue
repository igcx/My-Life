<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    :title="dialogTitle"
    :visible="isShow"
    @close="handleCloseDialog"
    @open="getSimpleUserList"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          style="width: 80%"
          placeholder="1-10个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          style="width: 80%"
          placeholder="1-10个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="form.manager"
          style="width: 80%"
          placeholder="请选择"
        >
          <!-- label 给用户看的  value 提交给后台的 -->
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button
        type="primary"
        size="small"
        @click="clickSubmit"
      >确定</el-button>
      <el-button size="small" @click="handleCloseDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reqGetSimpleUserList } from '@/api/user'
import { reqAddDepartment, reqGetDepartDetail, reqUpdateDepartDetail } from '@/api/departments'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    },
    deptList: {
      type: Array,
      required: true
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      // console.log(value, this.nodeData.id, this.deptList)

      let arr = []
      if (this.form.id) {
        // 如果当前是编辑且 value 和之前的值相同，直接通过校验
        if (this.nodeData.name === value) {
          callback()
          return
        }
        // 编辑 编辑自己 比的是你自己的兄弟部门
        arr = this.deptList.filter(item => item.pid === this.nodeData.pid)
      } else {
        // 添加 是子部门 比的是你父亲的儿子部门
        // arr => 同级部门的数据
        arr = this.deptList.filter((item) => item.pid === this.nodeData.id)
      }

      // 如果arr中存在一项name和value相同 ,isRepeat为true
      const isRepeat = arr.some((item) => item.name === value)

      isRepeat ? callback(new Error('同级部门已经出现该名称!!!')) : callback()
    }

    const validateCode = (rule, value, callback) => {
      // console.log(value, this.deptList)
      // this.form.code 已经和 value 双向数据绑定，nodeData其实就是之前的数据且没有双向数据绑定
      if (this.form.id && value === this.nodeData.code) {
        // 编辑且用户输入的值和之前的相同
        callback()
        return
      }

      const isRepeat = this.deptList.some((item) => item.code === value)
      isRepeat ? callback(new Error('部门编码已经重复了')) : callback()
    }

    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: ['change', 'blur']
          },
          {
            min: 1,
            max: 10,
            message: '部门名称1-10位',
            trigger: ['change', 'blur']
          },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: ['change', 'blur']
          },
          {
            min: 1,
            max: 10,
            message: '部门编码1-10位',
            trigger: ['change', 'blur']
          },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: ['change', 'blur']
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: ['change', 'blur']
          },
          {
            min: 1,
            max: 300,
            message: '部门介绍1-300位',
            trigger: ['change', 'blur']
          }
        ]
      },
      userList: []
    }
  },
  computed: {
    dialogTitle() {
      return this.form.id ? '编辑部门' : '添加子部门'
    }
  },
  created() {
    // 希望的是 弹窗显示时, 发送请求 获取员工简单列表
    // 最后的效果是一看到index.vue就已经发送, addDept组件其实一直都在,只是没显示!!!
    // this.getSimpleUserList()
  },
  methods: {
    handleCloseDialog() {
      // 关闭对话框
      // this.isShow = false
      // 子传父
      // 子组件不能直接去更新父组件的数据，通知父组件，让父组件自己改
      // 还有一种方式 子组件通过一定的语法直接改
      //    1. 需要父组件放权 .sync 相当于父组件给了子组件一个修改的权利
      //    2. 子组件通过固定语法： this.$emit(update:props名称, 值)
      this.$emit('update:is-show', false)

      // 清空表单且重置错误提示 表单的 resetFields
      // resetFields 只会清空绑定给表单组件的数据
      this.$refs.form.resetFields()
      // 手动清空(解决标题bug)
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async getSimpleUserList() {
      const { data } = await reqGetSimpleUserList()
      // console.log(res, 686868)
      this.userList = data
    },
    clickSubmit() {
      this.$refs.form.validate(async(flag) => {
        if (!flag) return

        let res
        if (this.form.id) {
          // 编辑
          res = await reqUpdateDepartDetail(this.form)
          // console.log(res)
          // this.$message.success(res.message)
        } else {
          // 添加
          res = await reqAddDepartment({
            ...this.form,
            pid: this.nodeData.id
          })
          // console.log(res)
          // 提示
        }

        this.$message.success(res.message)
        // 关闭
        this.handleCloseDialog()
        // 重新渲染  子传父
        this.$emit('add-dept')
      })
    },
    async getDepartDetail() {
      const { data } = await reqGetDepartDetail(this.nodeData.id)
      // console.log(res)
      this.form = data
    }
  }
}
</script>

<style>
</style>
