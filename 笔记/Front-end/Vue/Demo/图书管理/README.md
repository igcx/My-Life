# 案例：图书列表案例

## 结构准备

1 拷贝结构 到 src 中，改名App.vue

``` vue
<template>
  <div>
    <!-- 添加图书的Panel面板 -->
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">添加新图书</h3>
      </div>
      <div class="panel-body form-inline">
        <form>
          <div class="input-group">
            <div class="input-group-addon">书名</div>
            <input
              type="text"
              class="form-control"
              id="iptBookname"
              placeholder="请输入书名"
              v-model.trim="bookname"
            />
          </div>
          <div class="input-group">
            <div class="input-group-addon">作者</div>
            <input
              type="text"
              class="form-control"
              id="iptAuthor"
              placeholder="请输入作者"
              v-model.trim="author"
            />
          </div>
          <div class="input-group">
            <div class="input-group-addon">出版社</div>
            <input
              type="text"
              class="form-control"
              id="iptPublisher"
              v-model.trim="publisher"
              placeholder="请输入出版社"
            />
          </div>
        </form>
        <button id="btnAdd" class="btn btn-primary">添加</button>
      </div>
    </div>
    <!-- 图书的表格 -->
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>书名</th>
          <th>作者</th>
          <th>出版社</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="tb">
        <tr>
          <td>1</td>
          <td>西游记</td>
          <td>吴承恩</td>
          <td>出版社</td>
          <td>
            <a
              href="javascript:;"
              class="btn btn-danger delete"
              >删 除</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      bookname: '',
      author: '',
      publisher: '',
    }
  },
  created() {
    
  },
  methods: {

  },
}
</script>

<style></style>

```

2 安装 bootstrap

```jsx
yarn add bootstrap@3.4.1
```

3 main.js 导入 bootstrap

```js
import  'bootstrap/dist/css/bootstrap.css'
```

4 安装axios

``` bash
yarn add axios
```

接口地址： <https://www.showdoc.com.cn/ajaxapi?page_id=3753516951471746>

## 获取数据 - 列表渲染

1 设置基础地址

```jsx
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
```

2 created发送请求获取数据

```jsx
async created() {
  // 发送请求，获取图书的列表
  const res = await axios({
    methods: 'get',
    url: '/api/getbooks'
  })
  const { status, data } = res.data
  if (status === 200) {
    this.list = data
  }
},
```

3 动态渲染

```jsx
<tbody id="tb">
  <tr v-for="(item, index) in list" :key="item.id">
    <td>{{ index + 1 }}</td>
    <td>{{ item.bookname }}</td>
    <td>{{ item.author }}</td>
    <td>{{ item.publisher }}</td>
    <td>
      <a
        href="javascript:;"
        class="btn btn-danger delete"
        >删 除</a
      >
    </td>
  </tr>
</tbody>
```

## 添加功能

1 给添加按钮注册点击事件

```jsx
<button id="btnAdd" class="btn btn-primary" @click="add">添加</button>
```

2 提供方法

```jsx
async add () {
  if (!this.bookname || !this.author || !this.publisher) {
    alert('请输入信息')
    return
  }
  const res = await axios({
    method: 'post',
    url: '/api/addbook',
    data: {
      bookname: this.bookname,
      author: this.author,
      publisher: this.publisher
    }
  })

  if (res.data.status === 201) {
    this.getList()
    this.bookname = ''
    this.author = ''
    this.publisher = ''
  } else {
    alert ('添加失败')
  }
}
```

3 封装获取数据的方法 getList

```jsx
async getList () {
  // 发送请求，获取图书的列表
  const res = await axios({
    methods: 'get',
    url: '/api/getbooks'
  })
  const { status, data } = res.data
  if (status === 200) {
    this.list = data
  }
},
```

## 删除功能

1 注册点击事件

```jsx
<a
  href="javascript:;"
  class="btn btn-danger delete"
  @click="del(item.id)"
  >删 除</a
>
```

2 提供方法

```jsx
async del (id) {
  const res = await axios({
    method: 'delete',
    url: '/api/delbook',
    params: {
      id
    }
  })
  const { status, msg } = res.data
  if (status === 200) {
    this.getList()
    alert('删除成功')
  } else {
    alert(msg)
  }
}
```
