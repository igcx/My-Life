
# vuex 是 vue提供的状态管理工具 数据管理工具 => 管理的是公共的数据

语法:

1. state 提供数据(通用的数据)

    ``` js
    const store = new Vuex.Store({
      state: {
        xxx: xxx
      }
    })

    // 模板使用数据
    // 1.{{ this.$store.state.xxx }}
    // 2.自己提供计算属性  {{ xxx }}
      xxx() {
        return this.$store.state.xxx
      }
    // 3.mapState 辅助函数 帮你写了计算属性  {{ xxx }}
      import { mapState } from 'vuex'
      ...mapState(['xxx', 'xxxx'])
    ```

2. mutations 提供修改数据的方法

    ``` js
    const store = new Vuex.Store({
      state: {
        xxx: xxx
      },
      mutations: {
        fn(state, 一个参数) {
          state.xxx = xxx
        }
      }
    })

    // 如何在组件内修改数据(提交mutation)
    // 1.this.$store.commit('mutation名字', 1个参数)
    // 2.mapMutations 辅助函数 帮你提交mutation
      import { mapMutations } from 'vuex'
      ...mapMutations(['mutation名字'])

      this.xxxx()
    ```

3. actions: 封装异步操作 真正去改数据一定是mutation(mutation一定得是同步的)

    ``` js
    
    const store = new Vuex.Store({
      state: {
        xxx: xxx
      },
      mutations: {
        fn(state, 一个参数) {
          state.xxx = xxx
        }
      },
      actions: {
        fnAsync(context) {
          setTimeout(() => {
            context.commit('mutation名字')
          }, 2000)
        }
      }
    })

    // 组件中触发actions:
    // 1.this.$store.dispatch('actions名字')
    // 2. ...mapActions(['actions名字'])  this.xxx()

    ```

4. getters 基于state的计算属性

    ``` js
    const store = new Vuex.Store({
      state: {
        xxx: xxx
      },
      mutations: {
        fn(state, 一个参数) {
          state.xxx = xxx
        }
      },
      actions: {
        fnAsync(context) {
          setTimeout(() => {
            context.commit('mutation名字')
          }, 2000)
        }
      },
      getters: {
        bestCount(state) {
          return state.count + 100
        }
      }
    })

    模板中使用:
    1. $store.getters.xxx
    2.  ...mapGetters(['xxx'])  {{ xxx }}
    ```

5. 模块化 modules

    ``` js
    const store = new Vuex.Store({
      state: {
        xxx: xxx
      },
      mutations: {
        fn(state, 一个参数) {
          state.xxx = xxx
        }
      },
      actions: {
        fnAsync(context) {
          setTimeout(() => {
            context.commit('mutation名字')
          }, 2000)
        }
      },
      getters: {
        bestCount(state) {
          return state.count + 100
        }
      },
      modules: {
        模块名: {
          namespaced: true,  让我们的mutations actions getters 局部注册
          state: {},
          mutations:{},
          actions:{},
          getters:{}
        }
      }
    })

    this.$store.commit('模块名/mutations名字')
    ...mapMutations('模块名' ,['mutations名字'])

    this.$store.dispatch('模块名/actions名字')
    ...mapActions('模块名' ,['actions名字'])

    1. $store.state.模块名.xxx
    2. ...mapState(['setting'])
    3. ...mapState('setting', ['title'])

    ```
