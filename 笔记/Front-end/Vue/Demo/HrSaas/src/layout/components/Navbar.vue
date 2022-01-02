<template>
  <div class="navbar">
    <!-- 汉堡包: 控制侧边栏的折叠.展开 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 面包屑 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <!-- 公司名称 -->
    <div class="app-breadcrumb">
      江苏传智播客教育科技股份有限公司
      <span class="breadBtn">体验版</span>
    </div>

    <div class="right-menu">
      <!-- 全屏组件 -->
      <ScreenFull class="right-menu-item" />
      <!-- 下拉菜单 -->
      <el-dropdown class="avatar-container" trigger="click">

        <div class="avatar-wrapper">
          <img v-imgerror="defaultImg" :src="staffPhoto" class="user-avatar">
          <!-- <span class="name">{{ $store.state.user.userInfo.username }}</span> -->
          <!-- <span class="name">{{ $store.getters.name }}</span> -->
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" style="color: #fff" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!--
            项目跳转路由:
            router-link:  跳转自己的路由页面
            a: 跳转外部链接
           -->
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>

          <a target="_blank" href="https://gitee.com/li-liqiang/hrsaas-vue-91">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>

          <!-- native 给组件内部的根元素注册原生事件!!不能删 -->
          <el-dropdown-item divided @click.native="handleLogout">
            <span v-color="color" style="display:block;">退出登录</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// 网络图片没有问题
// 本地图片: 导入(esmodule / commonjs)
// import defaultImg from '@/assets/common/bigUserHeader.png'
const defaultImg = require('@/assets/common/bigUserHeader.png')
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ScreenFull from '@/components/ScreenFull'

export default {
  components: {
    Hamburger,
    ScreenFull
  },
  data() {
    return {
      // defaultImg: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2944476239,2235255584&fm=26&gp=0.jpg',
      defaultImg: defaultImg,
      color: 'red'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'staffPhoto'
    ])
  },
  created() {
    // 在这里分发获取用户资料的action => 晚了 => 已经进入页面
    // 希望在用户进入页面之前, 就应该获取到用户基本信息(menus) , 然后可以根据menus渲染菜单, 再放进来!!!
    // this.$store.dispatch('user/getUserProfile')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleLogout() {
      // console.log('logout')
      // 清除信息
      this.$store.dispatch('user/logout')
      // 跳转路由
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name {
          cursor: pointer;
          color: #fff;
          vertical-align: middle;
          margin-left:5px;
        }
        .user-dropdown {
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
