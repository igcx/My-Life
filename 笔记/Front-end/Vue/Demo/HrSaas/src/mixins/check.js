// mixins 里面可以封装所有你写在组件内部的配置项(data, methods, created, computed)
// 特点:
// 1. 只要你通过正确的语法在组件内混入了, 就会把所有的配置项依次添加给组件
// 2. created 等生命周期函数, 如果组件内部也配置了,
//    不会覆盖, 全都执行(mixins先执行)
// 3. data 提供的数据 将来在组件内部也是可以使用的(可读性极差, 口碑极差)
//     如果组件内部页提供了同名的数据, 优先使用组件自己的
// 4. methods 同data 优先使用组件自己的!!...

export default {
  methods: {
    // 如果需要给某个页面控制里面的按钮，必须提供 checkBtnPerm方法 ==> 复用
    // 1. 挂载Vue的原型
    // 2. mixins
    checkBtnPerm(str) {
      // 这个方法仅仅用来判断当前用户有没有这个按钮权限
      // 有权限返回true;否则返回false
      const roles = this.$store.getters.roles
      // 新增的员工是没有角色, 没有权限的, 会有null的可能
      if (roles) {
        return roles.points.includes(str)
      } else {
        // 没有角色的没有权限
        return false
      }
    }
  }
}
