// 专门用于 elementui组件的导入和 注册
import Vue from 'vue'

// 导入button组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Link,
  Message,
  Loading,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'

// 组件的注册
Vue.use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Link)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

// 组件库的使用方式:
// 1. 直接复制组件结构  =>  导入+use
// 2. 通过函数调用使用组件  =>  导入+挂载
