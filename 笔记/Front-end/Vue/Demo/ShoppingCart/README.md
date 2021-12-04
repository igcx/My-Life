# 购物车综合案例

![image-20201223110712000](images/image-20201223110712000.png)

## 基本步骤

1. 初始化项目基本结构
2. 封装 MyHeader 组件
3. 封装 MyFooter 组件
4. 基于 axios 请求商品列表数据
5. 封装 MyGoods 组件
6. 封装 MyCounter 组件

## 项目初始化

1. 创建项目

```txt
vue created shopcar-demo
```

2. 安装依赖 下载bootstrap, less, less-loader@7.2.1

```txt
yarn add bootstrap less less-loader@7.2.1
```

3. 清理目录

4. 引入bootstrap样式文件

```jsx
// main.js 
import "bootstrap/dist/css/bootstrap.css"
```

## 封装my-header 组件

![image-20210111195023593](images/image-20210111195023593.png)

### 静态结构

+ 新建`components/MyHeader.vue`

```jsx
<template>
  <div class="my-header">我是标题</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .my-header {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #1d7bff;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
```

+ 在main.js中引入且局部注册

### 封装要求

1. 允许用户自定义  **title 标题**
2. 允许用户自定义  bgcolor **背景色**
3. 允许用户自定义  color  **字体颜色**

![image-20210613074829504](images/image-20210613074829504.png)

```jsx
<template>
    <div 
      class="my-header" 
      :style="{ backgroundColor: bgcolor, color: color }"
    >{{ title }}</div>
</template>

<script>
export default {
  props: {
    // 背景色, 文字颜色, 文本内容
    bgcolor: {
      type: String,
      default: '#1d7bff'
    },
    title: {
      type: String,
      default: '大标题'
    },
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>
```

问题：如果以后遇到了组件内不希望写死的内容，可以怎么操作呢？

## 封装 my-footer 组件

![image-20201223121456731](images/image-20201223121456731.png)

1 准备底部结构, 样式

```jsx
<template>
  <!-- 底部 -->
  <div class="my-footer">
    <!-- 全选 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="footerCheck">
      <label class="custom-control-label" for="footerCheck">全选</label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计:</span>
      <span class="price">¥ 100</span>
    </div>
    <!-- 按钮 -->
    <button type="button" class="footer-btn btn btn-primary">结算 (0)</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.my-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;

  .price {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-btn {
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    padding: 0;
  }
}
</style>
```

2 使用底部组件

```jsx
<my-footer></my-footer>

import MyFooter from './components/my-footer.vue'
export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter
  }
}
```

## 封装GoodsItem组件

```jsx
<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input">
        <label class="custom-control-label" for="input">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">商品名称</div>
      <div class="bottom">
        <span class="price">¥ 商品价格</span>
        <span>counter组件</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}

</style>
```

处理样式

+ App.vue样式处理

```less
<style>
#app {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
```

## 发送axios请求获取数据

**思考：在哪个位置发送请求？**

1 安装 axios

``` bash
yarn add axios
```

2 在 `App.vue` created 中, 发送请求获取列表数据, 存到 goodsList 中

```jsx
data () {
  return {
    goodsList: []
  }
},
// 发送请求
async created () {
  const res = await axios({
    method: 'get',
    url: 'https://www.escook.cn/api/cart'
  })
  // console.log(res)
  const { status, list } = res.data
  if (status === 200) {
    this.goodsList = list
  }
}
```

## 动态渲染商品列表

+ 遍历GoodsItem组件

```jsx
<goods-item v-for="item in goodsList" :key="item.id" :goods="item"></goods-item>
```

+ GoodsItem接受数据

```jsx
<script>
export default {
  props: {
    goods: Object
  }
}
</script>
```

+ GoodsItem数据渲染

```html
<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="goods.id" :checked="goods.goods_state">
        <label class="custom-control-label" :for="goods.id">
          <img :src="goods.goods_img" alt="">
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">{{goods.goods_name}}</div>
      <div class="bottom">
        <span class="price">¥ {{goods.goods_price}}</span>
        <span>counter组件</span>
      </div>
    </div>
  </div>
</template>
```

## 商品选中功能

1 `GoodsItem.vue` 完成基本选中效果,  注册change事件

```jsx
<input type="checkbox" class="custom-control-input" :id="goods.id" :checked="goods.goods_state" @change="change(goods.id)">
```

2 `GoodsItem.vue`子传父

```jsx
methods: {
  change (id) {
    this.$emit('changeState', id)
  }
}
```

3 `app.vue` 接收, 进行处理

```jsx
<goods-item 
  v-for="item in goodsList" 
  :key="item.id" 
  :goods="item"
  @changeState="change"
></goods-item>

change (id) {
  const good = this.goodsList.find(item => item.id === id)
  good.goods_state = !good.goods_state
}
```

## 商品全选功能

+ App.vue 父传子将数据传递给footer组件

```jsx
<my-footer :goodsList="goodsList"></my-footer>
```

+ Footer组件接受

```js
export default {
  props: {
    goodsList: {
      type: Array
    }
  }
}
</script>
```

+ Footer组件提供计算属性

```jsx
computed: {
  full: {
    get () {
      return this.goodsList.every(item => item.goods_state)
    }
  }
}
```

+ 双向绑定

```jsx
<input type="checkbox" class="custom-control-input" id="footerCheck" v-model="full">
```

+ 修改功能

```jsx
computed: {
  full: {
    get () {
      return this.goodsList.every(item => item.goods_state)
    },
    set (value) {
      this.$emit('changeAll', value)
    }
  }
}
```

+ 父组件修改

```jsx
<my-footer :goodsList="goodsList" @changeAll="changeAll"></my-footer>

changeAll (value) {
  this.goodsList.forEach(item => item.goods_state = value)
}
```

## 总价钱与总数量的显示

+ 提供计算属性 且渲染

```jsx
totalCount () {
    const arr = this.goodsList.filter(item => item.goods_state)
    return arr.reduce((prev, item) => prev + item.goods_count * item.goods_price, 0)
},
totalPrice () {
    const arr = this.goodsList.filter(item => item.goods_state)
    return arr.reduce((prev, item) => prev + item.goods_count, 0)
}
```

## MyCount组件封装

### 基本结构

```jsx
<template>
  <div class="my-counter">
    <button type="button" class="btn btn-light">-</button>
    <input type="number" class="form-control inp" value="1">
    <button type="button" class="btn btn-light">+</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 45px;
    text-align: center;
    margin: 0 10px;
  }
}
</style>
```

+ GoodsItem组件注册且使用

```jsx
import MyCount from './MyCount'
export default {
  components: {
    MyCount
  },
}
```

+ 渲染

```jsx
<my-count></my-count>
```

### 输入框值的处理

+ 父传子，传入数量

```jsx
<my-count :count="goods.goods_count"></my-count>
```

+ 子组件接收

```jsx
<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1
    }
  }
}
</script>
```

+ 子组件显示，注册事件进行修改

```jsx
<input type="text" class="form-control inp" :value="count" @change="inputFn">
```

+ 子组件将值传递给父组件

```jsx
methods: {
  inputFn (e) {
    let num = parseInt(e.target.value)
    this.$emit('changeCount', num)
  }
}
```

+ 父组件接收，且传给父组件

```jsx
<my-count @changeCount="changeCount" :count="goods.goods_count"></my-count>

changeCount (count) {
  this.$emit('changeCount', this.goods.id, count)
}
```

+ App.vue中监听

```jsx
<goods-item 
  v-for="item in goodsList" 
  :key="item.id" 
  :goods="item"
  @changeState="change"
  @changeCount="changeCount"
></goods-item>

changeCount (id, count) {
  console.log(id, count)
  const goods = this.goodsList.find(item => item.id === id)
  goods.goods_count = count
}
```

### 加减处理

+ 注册事件

```html
<template>
  <div class="my-counter">
    <button type="button" @click="minus" class="btn btn-light">-</button>
    <input type="number" class="form-control inp" :value="count" @change="inputFn">
    <button type="button" @click="add" class="btn btn-light">+</button>
  </div>
</template>
```

+ 提供方法

```jsx
add () {
  this.$emit('changeCount', this.count + 1)
},
minus () {
  if (this.count <= 1) {
    return
  }
  this.$emit('changeCount', this.count - 1)
}
```

## 非法制处理

+ 通过debugger打断点分析原因

加了一个判断，如果输入的值是负数，让value值直接为1，父组件的数据没有发生改变，会导致组件不更新，input的值没有发生改变

+ 解决

如果 负数，让父组件的数据变成1，并且强制更新组件，或者手动让input框的值变成1

![image-20210114111222117](images/image-20210114111222117.png)
