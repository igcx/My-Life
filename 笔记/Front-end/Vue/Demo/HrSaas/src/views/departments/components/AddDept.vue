<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    title="新增部门"
    :visible="isShow"
    @close="handleCloseDialog"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
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
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click="clickSubmit">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { reqGetSimpleUserList } from '@/api/user'
import { reqAddDepartment } from '@/api/departments'
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
      console.log(value, this.nodeData.id, this.deptList)

      // arr => 同级部门的数据
      const arr = this.deptList.filter(item => item.pid === this.nodeData.id)
      // console.log(arr)

      // 如果arr中存在一项name和value相同 ,isRepeat为true
      const isRepeat = arr.some(item => item.name === value)

      isRepeat ? callback(new Error('同级部门已经出现该名称!!!')) : callback()

      // if (isRepeat) {
      //   callback(new Error('同级部门已经出现该名称!!!'))
      // } else {
      //   callback()
      // }
    }

    const validateCode = (rule, value, callback) => {
      console.log(value, this.deptList)

      const isRepeat = this.deptList.some(item => item.code === value)
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
          { required: true, message: '部门名称不能为空', trigger: ['change', 'blur'] },
          { min: 1, max: 10, message: '部门名称1-10位', trigger: ['change', 'blur'] },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['change', 'blur'] },
          { min: 1, max: 10, message: '部门编码1-10位', trigger: ['change', 'blur'] },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['change', 'blur'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['change', 'blur'] },
          { min: 1, max: 300, message: '部门介绍1-300位', trigger: ['change', 'blur'] }
        ]
      },
      userList: []
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
      this.$emit('closeDialog', false)
    },
    async getSimpleUserList() {
      const { data } = await reqGetSimpleUserList()
      // console.log(res, 686868)
      this.userList = data
    },
    clickSubmit() {
      this.$refs.form.validate(async flag => {
        if (!flag) return

        const res = await reqAddDepartment({
          ...this.form,
          pid: this.nodeData.id
        })
        console.log(res)
        // 提示
        this.$message.success(res.message)
        // 关闭
        this.handleCloseDialog()
        // 重新渲染  子传父
        this.$emit('add-dept')
      })
    }
  }
}
</script>

<style>

</style>
