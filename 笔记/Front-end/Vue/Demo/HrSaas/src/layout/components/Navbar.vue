<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="app-breadcrumb">
      xxxxxxxxxxxxxxx
      <span class="breadBtn">体验版</span>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-imgerror="defaultImg" :src="staffPhoto" class="user-avatar">
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" style="color: #fff" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/igcx/My-Life/tree/main/%E7%AC%94%E8%AE%B0/Front-end/Vue/Demo/HrSaas">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span v-color="color" style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import userImg from '@/assets/common/bigUserHeader.png'

export default {
  components: {
    Hamburger
  },
  data() {
    return {
      // 在 webpack 中 直接写本地路径是不识别不解析的
      // defaultImg: '@/assets/common/bigUserHeader.png'
      defaultImg: userImg,
      // defaultImg: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2944476239,2235255584&fm=26&gp=0.jpg'
      color: 'red'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'staffPhoto'])
  },
  created() {
    // 获取分发用户资料
    // 希望在用户进入页面之前，就应该获取到用户基本信息(menus)，然后可以根据menus渲染菜单，再放进来
    // this.$store.dispatch('user/getUserProfile')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 清除信息
      this.$store.dispatch('user/logout')
      // 跳转到登录
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
  background: #fff;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
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
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
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
          margin-left: 5px;
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
</style>
