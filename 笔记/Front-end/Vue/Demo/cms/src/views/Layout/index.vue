<template>
  <el-container class="layout-container">
    <!-- 头部结构 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />

      <!-- 右侧的导航菜单 -->
      <!--
        el-menu的属性:
        mode :  调整导航菜单 默认纵向
        background-color="#fff"  背景颜色
        text-color  文字颜色
        active-text-color  高亮的文字颜色

       -->
      <el-menu
        default-active="1"
        class="el-menu-demo"
        background-color="#24262d"
        text-color="#fff"
        active-text-color="#4e87d1"
        mode="horizontal"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- <img
              :src="$store.state.user.userInfo.user_pic"
              alt=""
              class="avatar"
            /> -->
            <img
              :src="userInfo.user_pic"
              alt=""
              class="avatar"
              v-if="userInfo.user_pic"
            />
            <div v-else class="text-avatar">{{ defaultImg }}</div>
            <!-- 注意: -->
            <!-- <div v-else class="text-avatar">{{ $store.getters['user/defaultImg'] }}</div> -->
            个人中心
          </template>
          <el-menu-item index="/userinfo"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="/changeavatar"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="/resetpwd"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item @click="logout">
          <i class="el-icon-switch-button"></i> 退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="aside-info">
          <img
            :src="userInfo.user_pic"
            alt=""
            class="avatar"
            v-if="userInfo.user_pic"
          />
          <div v-else class="text-avatar">{{ defaultImg }}</div>
          <span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
        </div>
        <!--
          el-menu属性
          1.default-active 设置激活 高亮 给string
          2.unique-opened 保持只有一个子菜单展开  布尔型属性值 只要设置了 就是true
          3.router  一旦开启 就会使用vuerouter模式
         -->
        <!--
           $router => 路由实例 => 一般用于跳转路由
           $route => 当前路由信息 => $route.path 当前路由对应的url
          -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#24262d"
          text-color="#fff"
          active-text-color="#579ef8"
          :unique-opened="true"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/artcategory"
              ><i class="el-icon-s-data"></i>文章分类</el-menu-item
            >
            <el-menu-item index="/artlist"
              ><i class="el-icon-document-copy"></i>文章列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/userinfo"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="/changeavatar"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="/resetpwd"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 二级路由的页面出口 -->
          <router-view></router-view>
        </el-main>
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// import { reqGetUserInfo } from '@/api/user'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'Layout',
  created () {
    // 数据初始化好的钩子
    // 可以在这发请求了
    // const res = await reqGetUserInfo()
    // console.log(res)

    // 触发actions 获取用户基本资料
    // this.$store.dispatch('user/getUserInfo')

    this.getUserInfo()
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    logout () {
      // 1.先让用户自己确认
      this.$confirm('确认退出么?', '温馨提示', {
        // confirmButtonText: '确定', // 确认按钮的文字
        // cancelButtonText: '取消', // 取消按钮的文字
        type: 'warning'
      })
        .then(() => {
          // 确认 => 跳转登录页 + 清除token
          // this.$message.success('确定退出')
          this.$router.push('/login')
          localStorage.removeItem('cms-91')
        })
        .catch(() => {
          // 取消
          this.$message.info('已取消退出')
        })
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapGetters('user', ['defaultImg'])
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;

  .el-header {
    padding: 0;
    background-color: #23262e;
    display: flex;
    justify-content: space-between;

    .el-menu {
      height: 60px;
      user-select: none;
    }
  }

  .el-aside {
    background-color: #23262e;
    user-select: none;
    .el-menu {
      border-right: 0;
    }
  }

  .el-footer {
    text-align: center;
    line-height: 50px;
    background-color: #eeeeee;
    height: 50px !important;
  }
}

.el-menu-item {
  font-size: 12px;
}

/deep/ .el-submenu__title {
  font-size: 12px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
.text-avatar {
  width: 35px;
  height: 35px;
  display: inline-block;
  background-color: #409eff;
  border-radius: 50%;
  font-size: 24px;
  text-align: center;
  line-height: 35px;
  margin-right: 10px;
  color: white;
}

.aside-info {
  border: 1px solid #000;
  border: 0 1px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}

// 去除下边框
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
