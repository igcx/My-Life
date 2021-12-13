# 解决 vue-router 路径跳转报错问题

## 问题

错误：使用新导航取消了从“/xxx”到“/xxx”的导航

```js
router.beforeEach((to, from, next) => {
  if (WHITE_LIST.includes(to.path)) {
    // 这是属于不登录也能看的页面 直接放行
    next()
  } else {
    // 表示去的是需要登录的页面
    // 需要判断是否有 token
    if (localStorage.getItem('token')) {
      // 登录过，直接放行
      next()
    } else {
      // 没有登录过，去 login
      next('/login')
    }
  }
  // next() // 这里报错，因为自己当时是先写的放行测试一下，导致最后忘记了这个放行
})
```

报错信息如下:

![报错信息](/Users/x/Documents/My-Life/生活/随笔/vue-router报错/images/vue-Router BUG.png)

出现这个错误是因为一个页面出现在你的Vue路由器全局导航守卫中，跳转到一个页面然后重定向到另一个界面

## 解决

如果这样的代码出现在 Vue router 中，就会出现这个错误。解决办法是不使用多层if和else
当然，此次出 bug 完全是我个人粗心
