# PC端 Vue 2.6 实现CMS系统

## 技术栈

MVVM框架: Vue 2.6

源码: ES6

代码风格: eslint

构建工具: webpack

前端路由: vue-router

脚手架: vue-cli

状态管理: Vuex

服务端通讯: axios

apiProxy: Nodejs

组件库: Element-ui

CSS预处理: less

[项目演示地址](http://www.escook.cn:8086/ev/#/login)

[接口文档](https://www.showdoc.com.cn/1425457596992351/6972620264462285)

黑马刘龙彬老师主讲的大事件项目

---

## 项目搭建

Node.js 环境安装

``` bash
 node -v #查看node版本 node版本12+
 npm  -v #查看npm版本
```

npm、yarn 设置淘宝镜像

``` bash
 npm config set registry  https://registry.npm.taobao.org/  #设置淘宝镜像地址
 npm config get registry  #查看镜像地址

 yarn config set registry  https://registry.npm.taobao.org/  #设置淘宝镜像地址
 yarn config get registry  #查看镜像地址
```

使用 vue 脚手架创建项目

``` bash
vue create big-event-vue
```

调整项目目录
默认生成的目录结构不满足我们的开发需求，所以这里需要做一些自定义改动，主要是两个工作：

- 删除初始化的默认文件
- 修改剩余代码内容
- 新增调整我们需要的目录结构

1. 删除文件

    - components/HelloWorld.vue
    - views/Home.vue
    - views/About.vue
    - assets/logo.png

2. 修改内容

    `src/router/index.js`

    ``` js
    import Vue from 'vue'
    import VueRouter from 'vue-router'

    Vue.use(VueRouter)

    const router = new VueRouter({
      routes: []
    })

    export default router
    ```

    `src/App.vue`

    ``` js
    <template>
      <div id="app">
        <router-view></router-view>
      </div>
    </template>

    <style lang="less">

    </style>
    ```

    `store/index.js`  和 `main.js` 不用动

3. 新增需要目录

    在 src 目录下中补充创建以下目录：

    - /api: 存储请求函数模块
    - /styles: 样式文件模块
    - /utils: 工具函数模块

    ```bash
    # 文件夹对应存放的文件
    api # 接口方法封装
    assets # 图片等静态资源
    components # 通用组件
    router # 路由
    store # vuex仓库
    styles # 全局样式
    utils # 自己封装的一些工具函数
    views # 视图组件
    ```

4. 将项目需要的全局样式的文件复制到styles文件夹中,并在`main.js`中引入

    ``` css
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-size: 12px;
    }

    /* 覆盖表单左侧 label 的字体大小 */
    .el-form-item__label {
      font-size: 12px;
    }

    .el-button {
      font-size: 12px;
    }

    .el-table {
      font-size: 12px;
    }

    .el-table thead {
      color: #000;
    }

    .el-dialog__body {
      padding: 10px 20px 0 20px;
    }

    ```

    ```js
    // 导入全局样式
    import '@/styles/global.css'
    ```

5. 将项目需要的图片资源放置`assets`文件夹中

## 引入 Element-ui 组件库

### 全部引入

全部引入, 会导入所有的组件, 虽然方便, 但是将来的打包体积也就大了

- 安装

```js
yarn add element-ui
```

- 在`main.js`中

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```

- 演示

```jsx
<el-button type="primary">主要按钮</el-button>
```

### 按需导入

减轻将来打包后的包的体积

- 安装

```js
yarn add element-ui
```

- 安装`babel-plugin-component`

```js
yarn add babel-plugin-component -D
```

- 在` babel.config.js `中配置

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 新增plugins插件节点,修改完配置文件一定重启项目
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

- 使用插件`main.js`中

```js
import { Button } from 'element-ui'
Vue.use(Button)
```

### 抽离element.js模块

- 由于组件的导入都书写到了`main.js`中,导致`main.js` 代码冗余,将element-ui组件的导入和注册单独抽离到`utils`文件夹中
- 新建element.js

```js
import Vue from 'vue'
// 按需导入组件
import {
  Button,
  Switch } from 'element-ui'

// 注册全局组件
Vue.use(Button)
  .use(Switch)

```

- 直接导入main.js中

```js
// 直接导入element-ui.js
import '@/utils/element.js'
```

### 关于@src目录路径提示的配置

1. 在项目根目录下新建配置文件`jsconfig.json`

    ```json
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
              "@/*": ["src/*"]
            }
        },
        "exclude": [ "node_modules", "dist" ]
    }
    ```

2. 重启项目 项目一定在根目录vscode中打开

## 登录和注册功能

### 创建组件 配置路由

1. 创建组件 `views/Login/index.vue`

    ``` vue
    <template>
      <div class="login">登录页面</div>
    </template>

    <script>
    export default {
      name: 'Login'
    }
    </script>

    <style>

    </style>
    ```

2. 配置路由 `router/index.js`

    ``` js
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import Login from '@/views/Login'

    Vue.use(VueRouter)

    const router = new VueRouter({
      routes: [
        { path: '/login', component: Login }
      ]
    })

    export default router
    ```

#### 实现页面布局

- 注册表单的组件

``` vue
<template>
  <div class="login-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="" />
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 登录的表单 -->
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入你的密码"></el-input>
        </el-form-item>

        <el-button type="primary" class="btn-login">登录</el-button>
        <el-link type="info" class="link-reg">去注册账号</el-link>
      </el-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login-container {
  background-color: blue;
  height: 100%;
  background: url('~@/assets/images/login_bg.jpg') no-repeat center;
  background-size: cover;

  .header {
    width: 1200px;
    margin: 0 auto;
    user-select: none;
  }

  .box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
    box-sizing: border-box;

    .box-header {
      height: 60px;
      background: url('~@/assets/images/login_title.png') no-repeat center;
    }

    .btn-login {
      width: 100%;
    }

    .link-reg {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
```

- 在`App.vue`中设置样式 实现背景图完整展示

``` vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
}
</style>
```

#### 实现表单预校验

- 为form绑定model属性
- 为form绑定rules,并定义规则
- 为form-item绑定prop
- 为表单元素绑定v-model

``` js
<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入你的用户名', trigger: ['blur', 'change'] },
          { pattern: /^[0-9a-zA-Z]{1,10}$/, message: '用户名必须是字母数字,长度1-10', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入你的密码', trigger: ['blur', 'change'] },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符串,长度6-15', trigger: ['blur', 'change'] }
        ]
      }
    }
  }
}
</script>
```

#### 发送请求的表单预校验

- 必须是箭头函数(让this指向组件)

``` js
login () {
  this.$refs.form.validate((flag) => {
    if (flag) {
      console.log('请求啦')
    }
  })
}
```

#### 测试发送登录请求

`yarn add axios`

``` js
import axios from 'axios'

login () {
  this.$refs.form.validate(async (flag) => {
    if (flag) {
      // console.log('请求啦')
      const { data } = await axios({
        method: 'post',
        url: 'http://www.liulongbin.top:3008/api/login',
        data: this.loginForm
      })
      if (data.code !== 0) {
        return console.log('登录失败')
      }
      console.log(data, '登录成功')
    }
  })
}
```

#### 登录完成

需要做的事情:

1. 导入axios
2. 点击登录按钮发送登录的请求
3. 登录成功后或者登录失败都要提示用户 **[需要全局注册 $message](https://element.eleme.io/#/zh-CN/component/message)**
4. 存储登录成功后的token,`因为后续的api都需要携带token`
5. 跳转到首页

`element.js`

``` js
import Vue from 'vue'

// 按需导入
import { Button, Form, FormItem, Input, Link, Message } from 'element-ui'
// 注册
Vue
  .use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Link)

// Message消息提示组件将来不是复制结构使用, 而是通过函数调用, 所以需要挂载到Vue原型上
Vue.prototype.$message = Message
```

`Login.vue`

``` js
login () {
  this.$refs.form.validate(async (flag) => {
    if (flag) {
      // console.log('请求啦')
      const { data } = await axios({
        method: 'post',
        url: 'http://www.liulongbin.top:3008/api/login',
        data: this.loginForm
      })
      if (data.code !== 0) {
        return this.$message.error('登录失败')
      }
      // 登录成功，提示用户，保存 token，跳转到后台主页
      this.$message.success('登录成功')
      localStorage.setItem('big-token', data.token)
      this.$router.push('/')
    }
  })
}
```

## axios封装

- 我们刚才测试了登录功能可以正确的返回数据,但是我们如果再发送多次请求,我们`需要在每个页面导入axios`,`并且需要写完整的地址去发送请求`,**如果有一天基地址变更了**呢?那我们需要逐个去修改每个请求地址, 所以我们正确的解决方案是抽离模块, 单独封装axios
`utils/request.js`

``` js
// 导入 axios
import axios from 'axios'
import Vue from 'vue'
// 全局挂载axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// 导出axios
export default axios 
```

- 将request.js在`main.js`中导入

```js
import http from  '@/utils/request'
// 把 axios 挂载到 Vue 上
Vue.prototype.$http = http
```

- 改造登录的请求

```js
methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async flag => {
        if (!flag) return
        const { data } = await this.$http({
          method: 'post',
          url: '/api/login',
          data: this.loginForm
        })
        if (data.code !== 0) {
          return this.$message.error('登录失败！')
        }
        // 登录成功，提示用户，保存 token，跳转到后台主页
        this.$message.success('登录成功！')
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      })
    }
  }
```

### 拦截器

- 请求到达服务端之前 经过请求拦截器（统一给请求去添加一下东西 请求头）
- 响应的数据真正回到客户端之前 经过响应拦截器（统一处理数据 ==> 脱掉一层）

优化：网络较慢的时候用户频繁点击登录按钮会重复发起请求 ==> 解决 全局加上loading效果 或者 点击一次之后禁用按钮

全局加上loading效果


封装登录api接口



## 注册功能



## axios

大事件是一个 CMS 后台管理项目，包含登录注册、个人中心、文章管理等主要模块。

学习该项目，能够锻炼对 Vue 完整技术栈的运用。同时该项目还涵盖了 token 身份认证、Vue 组件库、文件上传、富文本编辑器等前端技术解决方案，适合刚入手 Vue 框架、希望通过项目开发来巩固 Vue 基础的前端开发者学习。

主讲解决方案

1. token身份认证解决方案
2. 文件上传解决方案
3. 富文本编辑解决方案
4. 表单验证解决方案

主讲知识点

1. 基于 vue-cli 创建工程化的 Vue 项目
2. 基于 element-ui 组件库快速实现项目布局
3. 用户注册与登录的业务解决方案
4. 使用 Vuex 管理全局共享的数据
5. 使用 axios 实现前后端的数据交互

## 登录注册页面

1. 在views里面新建登录文件夹 -> index页面  
2. 配置路由规则在 router=> index.js


打包优化
1. 默认打包引入的js 是绝对路径 => 服务器环境 打不开文件

以相对路径打包
vue.config.js 追加 webpack 配置


2. 路由懒加载
    - 用户第一次点击，一上来加载所有的组件, 首屏加载就比较慢, 可以配置路由按需加载
    - 把一个大的 js 文件 拆分成多个模块 只在需要的时候引入

3. 打包移除控制台打印


4. 使用 CDN 链接