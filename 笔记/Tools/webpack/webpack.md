# webpack概述

> webpack 是一个基于 NodeJS 的 **静态模块打包器 (module bundler)**
>
> vue-cli 脚手架环境, 集成了 webpack, 所以才能对各类文件进行打包处理

[webpack官网](https://webpack.js.org/)

## webpack 能做什么

webpack是一个 静态模块 打包器
**项目一般先打包再上线**

1. 语法转换
   - less/sass转换成css
   - ES6转换成ES5
   - typescript转换成原生js
   - ...
2. html/css/js 代码压缩合并 (打包)

3. webpack可以在开发期间提供一个开发服务器， 提高开发效率

## webpack 打包演示

1. 新建目录 dist  src/main.js

``` js
Root Component
└─ dist
└─ src
   ├─ main.js
```

2. 初始化

   ``` bash
   yarn init -y
   ```

3. 安装依赖包  

- -D: 将安装包作为开发阶段的依赖, 只在开发阶段使用, 实际上线不要的, 可以加 -D

- dependencies  `项目依赖`, 实际上线, 也要用的包, 比如 `jquery`   yarn add jquery

- devDependencies `开发依赖`, 实际上线, 不用这个包, 只在开发打包过程中用   -D

   ``` bash
   yarn add webpack  webpack-cli  -D
   ```

4. 在`package.json`中配置scripts

   ```json
   "scripts": {
    "build": "webpack --config webpack.config.js"
   }
   ```

   `--config  webpack.config.js` 这个配置文件名为默认值, 不加也会默认找这个文件

5. 在根目录提供 webpack.config.js

   基础版本

   ```jsx
   module.exports = {
     // 入口: 从哪个文件开始打包
     entry: './src/main.js'
   }
   ```

6. 新建a.js，b.js，在main.js导入，进行打包测试

   ```bash
   yarn build
   ```

小测试:

 假定在main.js中导入一个  aa.js,  多个文件需要打包, webpack会打包成一个文件, 可以节约请求的次数

```js
import './js/aa.js'
console.log('这是main模块')
```

`目录说明`：

- `dist目录`：存放打包后代码的目录

- `src目录`：存放源代码的目录

## package.json 中 script

### scripts的使用说明

在package.json文件中, 可以配置 scripts ...  配置自己的命令

``` json
"scripts": {
 "pp": "yarn add jquery",
 "build": "webpack --config webpack.config.js"
}

yarn xxx
npm run pp
npm run build
```

**运行方式:  npm  run  xx**
特殊的命令:  start / stop  可以省略 run

```bash
npm run start  => npm start      =>  yarn start
npm run stop  => npm stop        =>  yarn stop
```

使用 yarn 直接不需要加 run  

```bash
npm run pp  =>  yarn pp
npm run build => yarn build
```

### 基本配置 - 配置入口出口模式

参考文档:   [https://webpack.docschina.org/concepts/#entry](https://webpack.docschina.org/concepts/#entry)

`入口`：entry （从哪开始打包）

`出口`：output （打包到哪里去）

`模式`：mode （打包模式，生产环境还是开发环境）

在 `webpack.config.js`中配置入口出口模式

```js
const path = require('path')

module.exports = {
  // entry: 配置入口文件 (从哪个文件开始打包) 
  entry: './src/main.js',

  // output: 配置输出 (打包到哪去)
  output: {
    // 打包输出的目录 (必须是绝对路径)
    path: path.join(__dirname, 'dist'),
    // 打包生成的文件名
    filename: 'bundle.js'
  },

  // 打包模式 production 压缩/development 不压缩
  mode: 'development'
}
```

重新 `yarn build` 打包

> `yarn build` 后干了什么?

``` bash

`yarn build` ==> 执行 `package.json` 配置的对应命令 ==> `webpack --config ...` ==> 读取配置文件 `webpack.config.js` ==> 找到 `entry` 入口 `main.js` ==> 先`构建依赖关系图` `编译各个模块文件` 比如：编译 导入的a.js， b.js ==> `输出 output` ==> `指定文件 bundle.js`

```

答：执行webpack命令, 找到配置文件, 从入口文件开始， 基于依赖关系, 打包代码输出到指定位置

### 基于 webpack 实现隔行变色

需求: **使用 jquery 隔行变色**

1. 新建  public/index.html 编写代码

``` js
Root Component
└─ dist
└─ src
   ├─ main.js
└─ public
   ├─ index.html
```

2. 在 index.html 中新建一些 li 玩玩

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<div id="app">
  <!-- ul>li{我是第$个li}*10 -->
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <li>我是第6个li</li>
    <li>我是第7个li</li>
    <li>我是第8个li</li>
    <li>我是第9个li</li>
  </ul>
</div>

</body>
</html>
```

3. 安装jquery， 编写代码

```bash
yarn add jquery
```

`main.js`

```js
// 需求: 通过jquery实现隔行变色
// 引入 jquery
import $ from 'jquery'
$(function() {
  $('#app li:nth-child(odd)').css('color', 'red')
  $('#app li:nth-child(even)').css('color', 'green')
})
```

4. 执行打包命令

```bash
yarn build
```

5. 将 public/index.html 手动拷贝到 dist 目录， 手动引入打包后的 js

```jsx
<script src="./bundle.js"></script>
```

## webpack - 插件 和 loaders的配置

### **自动生成html** - `html-webpack-plugin` 插件

每次都要将 public/index.html 手动拷贝到 dist 目录， 手动引入打包后的 js， 太麻烦

所以一般会用一个插件, 会自动拷贝到 dist下, 并自动引入

  1. 下载

     ```bash
     yarn add html-webpack-plugin  -D
     ```

  2. **在`webpack.config.js`文件中，引入这个模块** :

     ```js
     // 引入自动生成 html 的插件
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     ```

  3. 配置 `webpack.config.js`

     ```json
     plugins: [
       new HtmlWebpackPlugin({ template: './public/index.html' })
     ]
     ```

> **配置好了之后, public 目录的 index.html 就不需要引入打包后的文件了, 会自动被插件生成 html 引入**

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>

<div id="app">
  <!-- ul>li{我是第$个li}*10 -->
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <li>我是第6个li</li>
    <li>我是第7个li</li>
    <li>我是第8个li</li>
    <li>我是第9个li</li>
  </ul>
</div>

<!-- 打包后的文件会被自动引入, 不需要手动引入了 -->
</body>
</html>
```

### webpack中处理 css 文件 - `css-loader`

webpack默认只认识 js 文件和 json文件, 但是webpack 可以使用 [loader](https://webpack.docschina.org/concepts/loaders/) 来加载预处理文件, 允许webpack也可以打包 js之外的静态资源。

所以webpack如果要处理其他文件类型, **记得要先配置对应的 loader**

> 需求: 去掉小圆点, 新建 css 目录

1. 安装依赖

   ```bash
   yarn add style-loader css-loader -D
   ```

2. 配置 `webpack.config.js`

   ```js
   module: {
     // loader的规则
     rules: [
       {
         // 正则表达式，用于匹配所有的css文件
         test: /\.css$/,
         // 先用 css-loader 让webpack能够识别 css 文件的内容
         // 再用 style-loader 将样式, 以动态创建style标签的方式添加到页面中去
         use: [ "style-loader", "css-loader"]
       }
     ]
   },
   ```

### 分离 css 文件 `mini-css-extract-plugin`

我们上面的操作，使得`css`和`js`文件混杂在一起了，那有没有什么办法把`css`分离出来呢？

插件: `mini-css-extract-plugin`

1. 安装依赖包

   ```bash
   yarn add mini-css-extract-plugin -D
   ```

2. **在`webpack.config.js`文件中，引入这个模块**

   ```js
   // 引入分离 css 文件的 模块
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   ```

3. 配置loaders

   ```js
   // 模块加载
   module: {
     // loader的规则
     rules: [
       // 配置 css 文件的解析
       {
         test: /\.css$/,
         use: [ // 根据官方文档写的，注意'css-loader'的书写位置
           {
             loader: MiniCssExtractPlugin.loader,
             options: {
               publicPath:'../',
             },
           },
           'css-loader'
         ]
       },
     ],
   }
   ```

4. 插件的配置

   ```js
   plugins: [
     new HtmlWebpackPlugin({ template: './public/index.html' }),
     
     // 定义打包好的文件的存放路径和文件名
     new MiniCssExtractPlugin({ 
      filename:'css/index.css'
     })
     
   ],
   ```

### webpack 中处理 less - `less-loader`

1. 下载依赖包

   注意: 解析less文件需要识别 less 语法, 所以除了 `less-loader`  需要额外下载 `less` 包  

   less-loader: 将less转换成 css

   ```bash
   yarn add less  less-loader  -D
   ```

2. 新增配置

   ```js
   // 配置 less 文件的解析
   {
     test: /\.less$/,
     use: [
       // 分离出 css 内容
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
             publicPath:'../',
         },
       }, 
       'css-loader',
       'less-loader' 
     ]
   }
   ```

### webpack 中处理图片 - 内置的 asset module

我们试了一下，在项目中使用一下 img 图片。结果就报错了，难道`webpack`连图片也认不出来吗？

```jsx
import imgObj from './imgs/01.jpg'

$(function() {
  const $img = $('<img>')
  $img.attr('src', imgObj)
  $('#app .header').append($img)
})

```

没有错，的确认不出来,   此时需要用webpack5 内置的 asset 资源处理模块，来处理图片资源。

webpack5 处理资源： <https://webpack.docschina.org/guides/asset-modules/>

`tips`: webpack4 中来处理图片的问题,  主要用到 `url-loader`  和   `file-loader` 两个模块， 现 webpack5 已集成，无需安装。

**配置 rules 基本规则：**

```js
{
  test: /\.(png|jpg|gif|jpeg)$/i,
  type: 'asset'
}
```

（1）对于小于 8k 的图片，会自动转 base64 字符串（节约请求次数，成本：放大约30%的图片体积大小）

（2）对于大于 8k 的图片，会生成单独文件引入。

**配置图片的打包输出目录：**

默认是直接输出到了 dist 根目录, 可以通过  generator  进行配置

```js
{
  test: /\.(png|jpg|gif|jpeg)$/i,
  type: 'asset',
  generator: {
    filename: 'images/[hash][ext]'
  }
}
```

### webpack 配置字体图标 - 和图片一致

字体图标 和 图片的配置一致

``` js
// 处理字体图标的解析
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  type: 'asset',
  generator: {
    filename: 'fonts/[hash][ext]'
  }
}
```

### webpack处理高版本语法 - babel语法降级

babel官网:<https://babeljs.io/>

文档:<https://webpack.docschina.org/loaders/babel-loader/>

webpack 默认仅内置了模块化的兼容性处理 `import  export`

`babel`:一个javascript编译器,把高版本js语法降级处理输出兼容的低版本语法,用于处理高版本js语法的兼容性

`babel-loader`:可以让webpack转译打包的js代码

  1. 安装包

     ```bash
     yarn add -D babel-loader @babel/core @babel/preset-env
     ```

  2. 配置规则

     ```js
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     }
     ```

## webpack - 开发服务器

**问题**:每次修改代码,重新yarnbuild打包,才能看到最新的效果,实际工作中,打包`yarn build`非常费时(30s-60s)

原因:

- 从0构建依赖
- 从电脑磁盘，读取对应的文件到内存,webpack开始加载
- 再用对应的loader进行处理
- 将处理完的内容,输出到电脑磁盘，指定目录

**解决**:起一个开发服务器,缓存一些已经打包过的内容,只重新打包修改的文件,最终运行在内存中给浏览器使用

### webpack-dev-server自动刷新

`webpack开发服务器`：把代码运行在内存中,保存自动更新,实时返回给浏览器显示

1. 下载

```bash
yarn add webpack-dev-server -D
```

2. package.json 配置 scripts

```json
"scripts": {
 "build": "webpack --config webpack.config.js",
 "dev": "webpack serve --config webpack.config.js"
}
```

3. 启动服务器开发

``` bash
yarn dev  ==> npm run dev
```

**为什么要使用webpack开发服务器呢?**

1. 打包在内存中,速度快

2. 自动更新打包变化的代码,实时返回给浏览器显示

### webpack-开发服务器-端口号配置

webpack-dev-server配置文档:  

<https://webpack.docschina.org/configuration/dev-server/#devserverafter>

在 `webpack.config.js`中修改端口号以及自动打开浏览器

```js
devServer: {
  port: 3000, // 端口号
  open: true // 自动打开浏览器
}
```
