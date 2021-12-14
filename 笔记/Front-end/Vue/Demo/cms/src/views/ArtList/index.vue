<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- {{cateList}} -->

      <!-- el-row el-col -->
      <el-row type="flex" justify="space-between" style="margin: 30px 0">
        <!-- 放一个筛选的表单 -->
        <el-col :span="16">
          <!-- inline让表单一行显示 -->
          <el-form inline>
            <el-form-item label="文章分类">
              <!-- el-select v-model双向数据绑定 最后收集的是 你选择的那个option对应的value -->
              <el-select
                size="small"
                placeholder="请选择文章分类"
                v-model="params.cate_id"
              >
                <!--
                  el-option组件
                  label设置文字描述(给用户看的)
                  value 提交给后台的
                  -->
                <el-option
                  :label="item.cate_name"
                  :value="item.id"
                  v-for="item in cateList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布状态">
              <el-select
                size="small"
                placeholder="请选择发布状态"
                v-model="params.state"
              >
                <el-option label="已发布" value="已发布"></el-option>
                <el-option label="草稿" value="草稿"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 只需要发送请求 getArtList() => 因为每次触发这个方法,对应带上新的params -->
              <el-button type="primary" size="mini" @click="getArtList"
                >筛选</el-button
              >
              <el-button type="info" size="mini" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            size="small"
            @click="pubDialogVisible = true"
            >发表文章</el-button
          >
        </el-col>
      </el-row>

      <!-- 展示文章列表的表格 -->
      <el-table :data="list" style="width: 100%" border stripe>
        <el-table-column label="文章标题">
          <template #default="{ row }">
            <el-link type="primary" @click="openDialog(row.id)">{{
              row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类"> </el-table-column>
        <!-- 过滤器只有两种使用姿势: 1.单向数据绑定 2.{{}} -->
        <!-- {{ msg | xxx }}   :count="time | format"  -->
        <el-table-column label="发表时间">
          <template #default="{ row }">
            {{ row.pub_date | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="delArtById(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!--
        @size-change="handleSizeChange" 每页条数变化时, 就会触发这个事件
        @current-change="handleCurrentChange" 当前页码变化, 就会触发current-change

        current-page 设置当前页
        page-sizes 提供选择项 数组 [1,2,3,4,5]
        page-size 设置每页条数
        layout 设置布局控件
        total 设置数据总数
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 30px"
        :current-page="params.pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 文章预览的对话框 -->
      <el-dialog
        title="文章预览"
        :visible="dialogVisible"
        width="75%"
        @close="dialogVisible = false"
      >
        <!-- 自己封装的文章详情组件 -->
        <ArtInfo :artDetail="artDetail"></ArtInfo>
      </el-dialog>

      <!-- 发表文章的对话框 -->
      <!--
        destroy-on-close  关闭时 销毁对话框 里面的内容会销毁重新创建
       -->
      <el-dialog
        title="发表文章"
        :visible.sync="pubDialogVisible"
        fullscreen
        :before-close="handleBeforeClose"
        destroy-on-close
      >
        <!-- 自己封装的一个组件 用于发表文章的结构 -->
        <ArtPub @closeDialog="closeDialogFn"></ArtPub>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { reqDelArtById, reqGetArtInfoById, reqGetArtList } from '@/api/article'
import { mapState, mapActions } from 'vuex'
import ArtInfo from './components/ArtInfo.vue'
import ArtPub from './components/ArtPub.vue'
export default {
  name: 'List',
  created () {
    // reqGetArtList()

    // 调用方法, 获取数据
    this.getArtList()
    // 这里就是为了解决刷新文章列表页面的 分类数据为空
    this.getCateList()
  },
  data () {
    return {
      params: {
        pagenum: 1, // 页码
        pagesize: 5, // 一页5条
        cate_id: '', // 分类的id  如果传'', 拿到的是所有分类的数据,
        state: '' // 状态 ,  如果传'', 拿到的是所有状态
      },
      total: 0, // 总数
      list: [], // 文章列表
      dialogVisible: false, // 控制文章预览对话框的显示
      artDetail: {}, // 存储文章详情
      pubDialogVisible: false // 控制发表文章的对话框显示.隐藏
    }
  },
  components: {
    ArtInfo,
    ArtPub
  },
  computed: {
    ...mapState('article', ['cateList'])
  },
  methods: {
    ...mapActions('article', ['getCateList']),
    // 用于发送请求 获取文章列表数据
    async getArtList () {
      const { data } = await reqGetArtList(this.params)
      // console.log(res, 78976)
      if (data.code !== 0) return this.$message.error('获取文章列表失败')
      this.list = data.data
      this.total = data.total
    },
    reset () {
      // 重置文章分类 '' 文章状态  ''
      this.params.cate_id = ''
      this.params.state = ''
      this.getArtList()
    },
    handleSizeChange (pagesize) {
      // pagesize => 最新的选择的每页条数
      // 每页条数变化 会触发
      console.log('每页条数发生变化了', pagesize)
      // 更新pagesize
      this.params.pagesize = pagesize
      // 重新发请求
      this.getArtList()
    },
    handleCurrentChange (pagenum) {
      // pagenum => 当前的最新的页码
      // 页码变化(点击页码, 点击上一页 下一页, 跳转X页) 会触发
      console.log('页码变化了', pagenum)

      // 更新页码到params
      this.params.pagenum = pagenum
      // 希望有新的数据展示给用户看,
      this.getArtList()
    },
    delArtById (id) {
      // console.log(id)

      // 确认框
      this.$confirm('此操作将会删除该文章,继续么?', '温馨提示', {
        type: 'warning'
      })
        .then(async () => {
          // 自己确认
          // 发请求
          const { data } = await reqDelArtById(id)
          // console.log(data)
          // 提示
          if (data.code !== 0) return this.$message.error(data.message)
          this.$message.success(data.message)

          // 加判断
          // 如果你删除的是当前页的最后一条数据且你不是第一页, => 往前一页
          if (this.list.length === 1 && this.params.pagenum > 1) {
            this.params.pagenum--
          }

          // 重新渲染数据
          this.getArtList()
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    async openDialog (id) {
      // 发请求 获取数据
      const { data } = await reqGetArtInfoById(id)
      // console.log(data, 4545)
      if (data.code !== 0) return this.$message.error(data.message)
      // data.data  文章详情数据对象
      this.artDetail = data.data

      this.dialogVisible = true
    },
    handleBeforeClose (done) {
      // 点了关闭 之前要做的事,都放这里
      // done() 是个函数 用于关闭对话框
      this.$confirm('你确认要退出发布么, 以上信息不会保留?', '提示', {
        type: 'warning'
      })
        .then(() => {
          console.log('确认退出了')
          // 注意: 这里如果真的希望完成关闭的功能, 必须加上.sync修饰符
          done()
        })
        .catch(() => {
          this.$message.info('已取消操作')
        })
    },
    closeDialogFn () {
      // 关闭对话框
      this.pubDialogVisible = false
      // 重新渲染 重新发请求获取数据
      this.getArtList()
    }
  }
}
</script>

<style lang="less" scoped>
// 想改组件库里面的样式, 改不动 => /deep/
/deep/ .el-form-item__label {
  font-size: 12px;
}
</style>
