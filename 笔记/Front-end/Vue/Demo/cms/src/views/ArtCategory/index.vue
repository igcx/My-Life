<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章分类</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- <el-button>添加分类</el-button> -->

      <!--
        行  el-row   type设置布局模式 flex
        列  el-col
       -->
      <el-row type="flex" justify="end">
        <el-col :span="2">
          <el-button type="primary" size="small" @click="dialogVisible = true"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- {{cateList}} -->

      <!-- 展示文章分类的表格 -->
      <!--
        el-table 整个表格
          :data="对象型的数组"
          stripe 隔行变色
          border 加边框

        el-table-column
          label 列的标题
          prop  字段名 是字符串
       -->
      <el-table
        stripe
        border
        :data="cateList"
        style="width: 100%; margin-top: 30px"
      >
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <!--
          el-table-column组件内部
          <slot name="default"/>

          <el-table-column>
            <template v-slot:插槽名>
              button...
            </template>
          </el-table-column>
         -->
         <!--
           作用域插槽: 获取组件内插槽上提供的数据
           <slot name="default" xx="xx" xxx="xxx" row="xxxx"/>

           { xx: 'xx', xxx: 'xxx', row:  }

           row 获取到每一行的数据
          -->
        <el-table-column label="操作">
          <template v-slot:default="{row}">
            <!-- {{ row }} -->
            <el-button type="primary" size="mini" @click="editDialogShow(row.id)">修改</el-button>
            <el-button type="danger" size="mini" @click="delArtCate(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加分类的对话框 -->
      <!--
        visible 控制对话框展示 隐藏
        title 对话框标题
        @close 事件什么触发?  =>  当你点击了X 点击了蒙层 就会触发
       -->
      <el-dialog
        title="添加分类"
        :visible="dialogVisible"
        width="30%"
        @close="handleClose"
      >
        <!-- 放一个表单 -->
        <!-- 编辑的表单 -->
        <el-form
          :model="addForm"
          :rules="addRules"
          ref="addRef"
          label-width="80px"
        >
          <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="addForm.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="addForm.cate_alias"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addArtCate">确 定</el-button>
        </template>
      </el-dialog>

      <!-- 修改分类的对话框 -->
      <el-dialog
        title="修改分类"
        :visible="editDialogVisible"
        width="30%"
        @close="editDialogVisible = false"
      >
        <!-- 放一个表单 -->
        <!-- 添加的表单 -->
        <el-form
          :model="editForm"
          :rules="addRules"
          ref="editRef"
          label-width="80px"
        >
          <el-form-item label="分类名称" prop="cate_name">
            <el-input v-model="editForm.cate_name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="cate_alias">
            <el-input v-model="editForm.cate_alias"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCateInfo">确 定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { reqAddArtCate, reqDelArtCate, reqEditCateInfo, reqGetCateInfoById } from '@/api/article'
// import { reqGetArtCateList } from '@/api/article'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Cate',
  data () {
    return {
      dialogVisible: false,
      // 添加分类的表单数据
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 编辑分类的表单数据
      editForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 添加分类的校验
      addRules: {
        // 分类的名称
        cate_name: [
          // 非空
          { required: true, message: '分类名称不能为空', trigger: ['change', 'blur'] },
          // 正则
          { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符串', trigger: ['change', 'blur'] }
        ],
        // 分类别名
        cate_alias: [
          // 非空
          { required: true, message: '分类别名不能为空', trigger: ['change', 'blur'] },
          // 正则
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: ['change', 'blur'] }
        ]
      },
      // 控制 编辑分类对话框 的显示隐藏
      editDialogVisible: false
    }
  },
  // 数据初始化之后的钩子
  created () {
    // const res = await reqGetArtCateList()
    // 调试程序: log + 打断点
    // console.log(res, 999)

    // this.$store.dispatch('article/getCateList')

    this.getCateList()
  },
  methods: {
    ...mapActions('article', ['getCateList']),
    handleClose () {
      // 关闭对话框
      this.dialogVisible = false
      // 清空表单且移除校验
      this.$refs.addRef.resetFields()
    },
    addArtCate () {
      // 整体校验
      this.$refs.addRef.validate(async (flag) => {
        if (!flag) return console.log('校验失败')

        // 通过
        // 发请求
        const { data } = await reqAddArtCate(this.addForm)
        // console.log(res)
        // 1.提示用户
        if (data.code !== 0) return this.$message.error('新增分类失败')
        this.$message.success(data.message)
        // 2.关闭对话框
        this.dialogVisible = false
        // 3.重新获取数据
        this.getCateList()
      })
    },
    delArtCate (id) {
      console.log('删除文章分类', id)
      // 判断 id 1 2 不给删
      if (id === 1 || id === 2) return this.$message.warning('不允许操作这个分类')

      this.$confirm('此操作将删除文章分类, 是否继续?', '温馨提示', {
        type: 'warning'
      }).then(async () => {
        // 确认....
        // 发请求
        const { data } = await reqDelArtCate(id)
        // console.log(res)
        // 1.提示
        if (data.code !== 0) return this.$message.error('删除文章分类失败')
        this.$message.success(data.message)
        // 2.重新获取数据
        this.getCateList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async editDialogShow (id) {
      // 判断是否能操作
      if (id === 1 || id === 2) return this.$message.warning('不允许操作该分类')
      // 弹对话框
      this.editDialogVisible = true
      console.log(id)
      // 发请求
      const { data } = await reqGetCateInfoById(id)
      // console.log(res)
      // 提示用户
      if (data.code !== 0) return this.$message.error('获取文章分类详情失败')
      // this.$message.success(data.message)
      // 数据回显
      this.editForm = data.data
    },
    editCateInfo () {
      // 整体校验
      this.$refs.editRef.validate(async (flag) => {
        if (!flag) return console.log('校验失败')

        // 校验通过
        // 发送请求(封装)
        const { data } = await reqEditCateInfo(this.editForm)
        // console.log(res)
        // 1.提示
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)
        // 2.关闭对话框
        this.editDialogVisible = false
        // 3. 重新获取数据
        this.getCateList()
      })
    }
  },
  computed: {
    ...mapState('article', ['cateList'])
  }
}
</script>

<style></style>
