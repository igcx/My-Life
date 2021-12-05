<template>
  <div>
      <MyTable :data='goodsList'>
        <template #header>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>

      <template #body='{row, index}'>
        <td>{{index + 1}}</td>
        <td>{{row.goods_name}}</td>
        <td>¥ {{row.goods_price.toFixed(2)}}</td>
        <!-- <td>{{row.tags}}</td> -->
        <td>
            <input v-if="row.inputVisible" v-focus @blur="handleBlur(row)" @keyup.enter="handleEnter(row, $event)" @keyup.esc="$event.target.value = ''" class="tag-input form-control" type="text">
            <button v-else @click="row.inputVisible = true"  class="btn btn-primary btn-sm add-tag">+Tag</button>

            <span v-for="tag in row.tags" :key="tag" class="badge badge-warning">{{ tag }}</span>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" @click="del(row.id)">删除</button>
        </td>
      </template>
      </MyTable>
  </div>
</template>

<script>
import axios from 'axios';
import MyTable from './MyTable';
export default {
    data() {
        return {
            goodsList: []
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        // 初始化商品的数据
        async getGoodsList() {
            // 发送 ajax 请求
            const res = await axios.get('https://www.escook.cn/api/goods')
            const {status, data} = res.data
            if (status !== 0) return console.log('获取商品列表失败')
            // 请求成功
            this.goodsList = data
            console.log(data)
        },
        // 删除
        del(id) {
            // console.log(id)
            this.goodsList = this.goodsList.filter(item => item.id !== id)
        },
        // 失去焦点隐藏内容
        handleBlur (row) {
            row.inputVisible = false
        },
        // 回车添加内容
        handleEnter (row, e) {
            if (e.target.value.trim() === '') return
            row.tags.push(e.target.value)
            e.target.value = ''
            row.inputVisible = false
        }
    },
    components: {
        MyTable
    }
}
</script>

<style lang="less" scoped>
.my-goods-list {
  .badge {
    margin-right: 5px;
  }
}
</style>