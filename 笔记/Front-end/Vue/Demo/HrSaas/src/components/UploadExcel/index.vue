<template>
  <!-- 选择文件的input: file 已经隐藏 -->
  <!-- 拖拽的盒子 drop dragover dragenter (h5提出的) -->
  <!--
      drop       放下(最重要)   松手了  就需要帮他上传
      dragover   拖拽悬停  没松手 不帮他上传   会做一些兼容性处理
      dragenter  拖拽进入  没松手 不帮他上传   会做一些兼容性处理
     -->
  <!-- input:file 选择文件功能 -->
  <!-- 点击了button  相当于点击input:file -->
  <div class="upload-excel">
    <!-- 按钮盒子 -->
    <div class="btn-upload">
      <el-button :loading="loading" size="mini" type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>

    <!-- 隐藏的文件选择框 -->
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">

    <!-- 拖拽的盒子 -->
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <i class="el-icon-upload" />
      <span>将文件拖到此处</span>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      // 表头 主体数据 存下来
      this.excelData.header = header
      this.excelData.results = results

      // 如果配置了成功函数, 调用成功函数 同时传递了 {表头 主体数据}
      this.onSuccess && this.onSuccess(this.excelData)
    },
    // 当你拖拽了一个文件到盒子区域内, 松手了  放下 => 上传
    handleDrop(e) {
      // 阻止冒泡 + 阻止默认行为 => 兼容性处理 + 阻止浏览器的默认下载行为
      e.stopPropagation()
      e.preventDefault()

      // 如果是loading 不继续了
      if (this.loading) return

      // 继续
      // input: file   =>  e.target.files[0]
      // 用户拖拽了一个文件进来 => 获取用户拖拽进来的文件列表 e.dataTransfer.files
      const files = e.dataTransfer.files

      // 判断用户拖拽的文件数量
      if (files.length !== 1) {
        // 只要不是一个文件(0 ,2,)
        // 提示
        this.$message.error('仅支持单文件上传!!!')
        return
      }

      // 拖拽了1个文件
      // files[0] => 获取文件列表中的那个文件对象
      const rawFile = files[0] // only use files[0]

      // 判断你的文件后缀名是否合法
      if (!this.isExcel(rawFile)) {
        // 后缀名不合法
        // 提示
        this.$message.error('仅支持上传.xlsx, .xls, .csv 后缀的文件')
        return false
      }

      // 后缀名合法
      // 开始上传文件了.....

      // 以上这么多的判断 代码 健壮性
      this.upload(rawFile)

      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      // 阻止冒泡 + 阻止默认行为 => 兼容性处理
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      // 对象访问属性  []
      // this.$refs['excel-upload-input']
      // 已经获取到了 用户拖拽的文件对象, 就可以清空input:file的值
      this.$refs['excel-upload-input'].value = null // 修复不能选择相同文件的bug

      // 这是在获取你之前传递进来的beforeUpload校验函数
      if (!this.beforeUpload) {
        // 没有传beforeUpload校验函数 => 默认不需要校验 直接解读文件
        this.readerData(rawFile)
        return
      }

      // 配置了校验函数   true通过 / false失败
      const before = this.beforeUpload(rawFile)
      if (before) {
        // 你的校验成功 => 直接解读文件
        this.readerData(rawFile)
      }
    },
    // 解读文件对象  解读文件 耗时不短 是个异步的操作  => promise => 将来如果你需要在异步操作结束以后做某件事
    readerData(rawFile) {
      // 开启loading
      this.loading = true

      // 封装promise 为了你以后想在解读文件结束以后做某件事 , 提前处理
      return new Promise((resolve, reject) => {
        // h5提出的一个读取文件的api
        // 创建FileReader 实例 => 读取文件
        const reader = new FileReader()

        // 读文件是一个耗时的操作, 结束以后一定会触发一个load事件
        reader.onload = e => {
          // 解读之后的结果 => data
          const data = e.target.result

          // 一顿处理  处理成 excel 的表头 表格主体数据
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          // header => 表头
          const header = this.getHeaderRow(worksheet)
          // results => 主体数据
          const results = XLSX.utils.sheet_to_json(worksheet)

          this.generateData({ header: header, results: results })
          this.loading = false
          resolve()
        }

        // 真正开始读取文件...
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      // 正则校验你的文件后缀名 xlsx xls csv 合理??  true / false
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    padding-top: 20px;
    line-height: 80px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
