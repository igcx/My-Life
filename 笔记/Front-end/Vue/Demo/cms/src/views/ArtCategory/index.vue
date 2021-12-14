<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="primary" size="small" @click="dialogVisible = true"
          >添加分类</el-button
        >
        <el-dialog
          title="添加文章分类"
          :visible="dialogVisible"
          width="30%"
          @close="dialogVisible = false"
        >
          <span>主体内容</span>
          <template #footer>
            <el-button size="mini" @click="dialogVisible = false"
              >取 消</el-button
            >
            <el-button size="mini" type="primary">确 定</el-button>
          </template>
        </el-dialog>
      </el-col>
    </el-row>

    <el-table
      :data="cateList"
      style="width: 100%; margin-top: 20px"
      border
      stripe
    >
      <el-table-column type="index" label="序号" width="180"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="editCate(row.id)"
            >修改</el-button
          >
          <el-dialog
            title="编辑文章分类"
            :visible="editDialogVisible"
            width="30%"
            @close="editDialogVisible = false"
          >
            <!-- 编辑的表单 -->
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
              <el-button size="mini" @click="editDialogVisible = false"
                >取 消</el-button
              >
              <el-button size="mini" type="primary" @click="editSubmit">确 定</el-button>
            </template>
          </el-dialog>
          <el-button type="danger" size="mini" @click="delCate(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加文章分类"
      :visible="dialogVisible"
      width="30%"
      @close="handleDialogClose"
    >
      <!-- 添加的表单 -->
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
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addCate">确 定</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { reqAddArticleCate, reqDelArtCate, reqGetCateInfoById, reqEditCateInfo } from '@/api/article'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      // 是否展示修改的对话框
      editDialogVisible: false,
      // 修改的表单
      editForm: {
        cate_name: '',
        cate_alias: ''
      },
      addRules: {
        cate_name: [
          {
            required: true,
            message: '分类名称不能为空',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名称必须是1-10位的非空字符串',
            trigger: ['change', blur]
          }
        ],
        cate_alias: [
          {
            required: true,
            message: '分类别名不能为空',
            trigger: ['change', 'blur']
          },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    ...mapActions('article', ['getCateList']),
    handleDialogClose () {
      this.dialogVisible = false
      this.$refs.addRef.resetFields()
    },
    // 新增文章分类
    addCate () {
      this.$refs.addRef.validate(async (flag) => {
        if (!flag) return console.log('校验失败')

        const {
          data: { code, message }
        } = await reqAddArticleCate(this.addForm)
        // console.log(res)
        // 提示用户
        if (code !== 0) return this.$message.error(message)
        this.$message.success(message)
        // 关闭对话框
        this.dialogVisible = false
        // 重新获取分类列表
        this.getCateList()
      })
    },
    // 根据id删除分类
    delCate (id) {
      // console.log(id)
      // 判断要删除的是否为前两个分类
      if (id === 1 || id === 2) {
        this.$message.error('禁止删除该分类')
        return
      }
      // 询问是否删除
      this.$confirm('此操作将永久删除该分类，是否继续？', '温馨提示', {
        type: 'warning'
      })
        .then(async () => {
          // console.log('22')
          // 调用删除的接口
          const { data } = await reqDelArtCate(id)
          // console.log(data)
          // 判断删除结果
          if (data.code !== 0) return this.$message.error('删除分类失败')
          this.$message.success(data.message)

          // 重新获取分类列表
          this.getCateList()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 修改文章分类
    async editCate (id) {
      if (id === 1 || id === 2) return this.$message.info('禁止修改该分类')
      this.editDialogVisible = true
      console.log(id)
      const { data } = await reqGetCateInfoById(id)
      // console.log(data)
      if (data.code !== 0) return this.$message.error('获取文章分类详情失败')
      this.editForm = data.data
    },
    editSubmit () {
      this.$refs.editRef.validate(async (flag) => {
        if (!flag) return console.log('校验失败')
        const { data } = await reqEditCateInfo(this.editForm)
        // console.log(data)
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)

        this.editDialogVisible = false
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
