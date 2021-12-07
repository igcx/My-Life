# 解决 vue-router 重复点击报错问题

## 问题

记录一下，在项目中遇到的一个小问题，使用 vue-router 的时候会因为`重复点击同一路由`而产生报错问题

报错信息如下:

![报错信息](/Users/x/Documents/My-Life/生活/随笔/vue-router报错/images/image-20211205215148633.png)

`Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location`

虽然这个问题不会影响代码的正常运行，但是看着也让人很不爽，然后在网上搜索到很多人出现了这种问题，大部分是说版本问题(我使用的是 `3.5.3`版本)

vue router ≥ v3.1 后 ，回调形式改成promise api了，返回的是promise，如果没有捕获到错误，控制台始终会出现如上图的警告

## 解决

方式一: 降低版本

``` js
npm i vue-router@3.0 -S
```

方式二: 在 router 下的 `index.js` 添加以下代码

``` js
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
```

方式三: 捕获异常

``` js
// 捕获router.push异常
this.$router.push(route).catch(err => {
    console.log('输出报错',err)
})
```

方式四: 补齐router第三个参数

``` js
// 补齐router.push()的第三个参数
this.$router.push(route, () => {}, (e) => {
    console.log('输出报错',e) 
})
```
