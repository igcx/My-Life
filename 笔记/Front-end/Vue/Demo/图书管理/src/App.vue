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
        <button id="btnAdd" class="btn btn-primary" @click="add">添加</button>
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
        <tr v-for="(item, index) in list" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.bookname }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.publisher }}</td>
          <td>
            <a
              href="javascript:;"
              class="btn btn-danger delete"
              @click="del(item.id)"
              >删 除</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// 配置跟路径
axios.defaults.baseURL = "http://www.liulongbin.top:3006";
export default {
  data() {
    return {
      list: [],
      bookname: "",
      author: "",
      publisher: "",
    };
  },
  // 生命周期函数
  async created() {
    // 发送 ajax - 获取数据
    this.getList()
  },

  methods: {
    // 获取列表数据
    async getList() {
      const res = await axios({
        method: "GET",
        url: "/api/getbooks",
      });
      console.log(res);
      const { data, status } = res.data;
      // console.log(data, status)
      if (status === 200) {
        this.list = data;
      }
    },
    // 删除操作
    async del(id) {
      const res = await axios({
        method: "DELETE",
        url: "/api/delbook",
        params: {
          id,
        },
      });
      console.log(res);
      const { status, msg } = res.data;
      alert(msg);
      if (status === 200) {
        this.getList();
      }
    },
    // 添加图书
    async add() {
      // console.log(this.bookname, this.author, this.publisher);
      const res = await axios({
        method: 'POST',
        url:'/api/addbook',
        data: {
          bookname: this.bookname,
          author: this.author,
          publisher: this.publisher
        }
      })
      console.log(res)
      const {msg, status} = res.data
      alert(msg)
      if (status === 201) {
        this.getList()
      }
    }
  },
};
</script>

<style></style>
