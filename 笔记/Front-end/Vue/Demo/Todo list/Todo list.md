# Todo list案例

- vue 2.6.11
启动
- yarn
- yarn serve

## 封装组件

- 封装三个组件`TodoHeader.vue,  TodoMain.vue, TodoFooter.vue`

- 在`App.vue`局部注册三个组件

```jsx
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'
export default {
  // 局部注册组件
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },
}
```

- 在`App.vue`渲染3个组件

```jsx
<template>
  <section class="todoapp">
    <todo-header></todo-header>
    <todo-main></todo-main>
    <todo-footer></todo-footer>
  </section>
</template>
```

- 在`main.js`中导入通用的样式

```jsx
import './styles/base.css'
import './styles/index.css'
```

## 列表的渲染

- 在`App.vue`提供了任务列表数据

```jsx
data () {
  return {
    list: [
      { id: 1, name: '吃饭', isDone: true },
      { id: 2, name: '睡觉', isDone: false },
      { id: 3, name: '打豆豆', isDone: true }
    ]
  }
}
```

- App.vue通过父传子，把list数据传给`TodoMain.vue`

```jsx
    <!-- 父传子 -->
    <todo-main :list="list"></todo-main>
```

- `TodoMain.vue`接受数据，且渲染

```vue
props: {
  list: {
    type: Array,
    required: true,
  },
},

<ul class="todo-list">
  <!-- completed: 完成的类名 -->
  <li :class="{completed: item.isDone}" v-for="item in list" :key="item.id">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="item.isDone">
      <label>{{item.name}}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>
</ul>
```

## 任务删除功能

- 给删除按钮注册点击事件

```jsx
<button class="destroy" @click="del(item.id)"></button>
```

- 通过$emit把值传给父组件

```jsx
methods: {
  del (id) {
    // console.log(id)
    this.$emit('del', id)
  }
}
```

- 父组件给子组件注册事件

```jsx
<todo-main :list="list" @del="delFn"></todo-main>
```

- 父组件通过回调函数接受参数

```js
methods: {
  delFn (id) {
    // 把id过滤掉
    this.list = this.list.filter(item => item.id !== id)
  }
}
```

## 任务状态修改功能

- 把`v-model`改成了`:checked`

`v-model`和父组件双向数据绑定，违反单向数据流的原则。

```jsx
<input class="toggle" type="checkbox" :checked="item.isDone" >
```

- 给checkbox注册change事件

```jsx
<input class="toggle" type="checkbox" :checked="item.isDone" @change="change(item.id)">
```

- 子传父，让父组件修改

```jsx
change (id) {
  this.$emit('change', id)
}
```

- 父组件注册事件

```jsx
<todo-main :list="list" @del="delFn" @change="changeFn"></todo-main>
```

- 父组件修改状态

````jsx
changeFn (id) {
  const result = this.list.find(item => item.id === id)
  result.isDone = !result.isDone
}
````

## 任务的添加功能

- 在`TodoHeader.vue`组件中通过v-model获取到任务的名字

````jsx
<input class="new-todo" placeholder="What needs to be done?" autofocus v-model.trim="name">
  
data () {
  return {
    name: ''
  }
},
````

- 回车的时候，需要子传父，把名字传给父组件

```jsx
<input class="new-todo" placeholder="What needs to be done?" autofocus v-model.trim="name" @keyup.enter="add">

methods: {
  add () {
    // 子传父
    this.$emit('add', this.name)
    // 清空内容
    this.name = ''
  }
}
```

- 父组件接受name，并且添加

```jsx
<todo-header @add="addFn"></todo-header>

addFn (name) {
  this.list.unshift({
    id: Date.now(),
    name,
    isDone: false
  })
}
```

## 剩余任务的统计功能

- 父传子，把list传给`TodoFooter.vue`组件

```jsx
<todo-footer :list="list"></todo-footer>
```

- footer组件通过props接收传递过来的数据

```jsx
props: {
  list: {
    type: Array,
    required: true,
  },
},
```

- footer组件提供了一个计算属性，用于统计未完成的任务

```jsx
computed: {
  leftCount () {
    // 统计的未完成的任务的数量
    return this.list.filter(item => item.isDone === false).length
  }
}
```

- 显示剩余任务的条数

```js
<footer class="footer" v-if="list.length > 0">
  
  
<span class="todo-count">
  <strong>{{ leftCount }}</strong> item left
</span>
```

## 清空功能

- 提供计算属性，用于控制清空按钮的显示和隐藏

```js
computed: {
  // 获取所有未完成的任务的数量
  leftCount() {
    const arr = this.list.filter((item) => !item.isDone)
    return arr.length
  },
  // 如果list中有一个或者多个完成的任务，就应该显示
  isShowClear() {
    return this.list.some((item) => item.isDone)
  },
},
```

- 通过v-show控制显示隐藏, 注册了点击事件

```html
<button v-show="isShowClear" class="clear-completed" @click="clear">
  Clear completed
</button>
```

- 触发clear事件

```js
methods: {
  clear() {
    // 清空已经完成的任务  过滤，保留未完成的任务
    this.$emit('clear')
  },
},
```

- 父组件清空已经完成的任务

```js
<TodoFooter :list="list" @clear="clearFn"></TodoFooter>

clearFn() {
  // console.log('清空')
  this.list = this.list.filter((item) => item.isDone === false)
},
```

## 底部筛选功能-点击高亮

- 给3个a注册点击事件

```diff
<li>
  <a
-    @click.prevent="filter('all')"
    :class="{ selected: type === 'all' }"
    href="#/"
    >All</a
  >
</li>
<li>
  <a
-    @click.prevent="filter('active')"
    href="#/active"
    :class="{ selected: type === 'active' }"
    >Active</a
  >
</li>
<li>
  <a
-    @click.prevent="filter('completed')"
    href="#/completed"
    :class="{ selected: type === 'completed' }"
    >Completed</a
  >
</li>
```

- 准备type数据，记录点击的按钮

```js
data() {
  return {
    type: 'all',
  }
},

filter(type) {
  this.type = type
},
```

- 动态控制 selected类名

```diff
<li>
  <a
    @click.prevent="filter('all')"
-    :class="{ selected: type === 'all' }"
    href="#/"
    >All</a
  >
</li>
<li>
  <a
    @click.prevent="filter('active')"
    href="#/active"
-    :class="{ selected: type === 'active' }"
    >Active</a
  >
</li>
<li>
  <a
    @click.prevent="filter('completed')"
    href="#/completed"
-   :class="{ selected: type === 'completed' }"
    >Completed</a
  >
</li>
```

子传父 - 将类型 type 传递给 App.vue

```jsx
filter (type) {
  this.type = type
  this.$emit('filter', type)
}
```

提供计算属性完成切换

```jsx
computed: {
  showList () {
    if (this.type === 'completed') { // 显示已完成
      return this.list.filter(item => item.isDone === true)
    } else if (this.type === 'active') { // 显示未完成
      return this.list.filter(item => item.isDone === false)
    } else {
      return this.list // 全部显示
    }
  }
}
```

## 本地存储

- 监视数组的变化

```jsx
watch: {
  list: {
    deep: true,
    handler(newValue) {
      localStorage.setItem('todoList', JSON.stringify(newValue))
    }
  }
}
```

- data中默认使用本地的数据

```jsx
data(){
    return {
        list: JSON.parse(localStorage.getItem('todoList')) || [],
    }
},
```

## 全选功能

- `TodoMain.vue`提供一个计算属性，用于控制 全选的状态

```js
isCheckAll() {
  return this.list.every((item) => item.isDone === true)
}
```

- 给全选案例v-model双向绑定

```jsx
<input
  id="toggle-all"
  class="toggle-all"
  type="checkbox"
  v-model="isCheckAll"
/>
```

- 计算属性默认无法修改，不支持双向绑定, 修改时子传父

```js
// 要求：list中isDone全部为true,才能是true  否则是false
isCheckAll: {
  get() {
    return this.list.every((item) => item.isDone === true)
  },
  set(value) {
    // console.log(value)
    this.$emit('checkAll', value)
  },
},
```

- 父组件接受value值，并且修改

```jsx
<TodoMain
  @checkAll="checkAllFn"
></TodoMain>

checkAllFn(value) {
  this.list.forEach((item) => (item.isDone = value))
},
```
