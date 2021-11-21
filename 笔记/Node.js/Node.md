# Node

## 为什么选择 Node

- Node 对从事前端开发的人员来说很友好
- 降低编程语言切换的成本(Node.js 实质上用的还是`JavaScript`)
- Node.js 是前端项目的基础设施，不仅仅是做服务端开发，前端项目中用到的大量工具如：webpack、less-css
- Node.js 在处理高并发上有得天独厚的优势

## 浏览器与 JavaScript

> 为什么浏览器能够执行JavaScript

- js的组成

  - js 核心语法
    - 变量、数据类型
    - 循环语句、判断
    - 函数、作用域
    - ...
  - WebApi
    - DOM 操作
    - BOM 操作
    - Ajax 操作
    - ...

- 浏览器的组成部分
  - 用户界面
  - 浏览器引擎
    - 负责在用户界面和渲染引擎之间传送指令或在客户端本地缓存中读写数据等，是浏览器中各个部分之间相互通信的核心
  - js引擎
    - 负责解析javascript代码
  - 渲染引擎
    - 负责解析html和css

不同的浏览器使用不同的**JavaScript引擎**：

- Chrome 浏览器 =>  V8  
- Firefox 浏览器 =>  OdinMonkey（奥丁猴）
- Safri 浏览器 =>  JSCore
- IE 浏览器 =>  Chakra（查克拉）
- 其中，Chrome 浏览器的 V8 解析引擎性能最好！

不同的浏览器使用不同的**渲染引擎**：

- Chrome 浏览器 =>  webkit
- Firefox 浏览器 =>  Gecko
- Safri 浏览器 =>  webkit
- IE 浏览器 =>  Trident

> 为什么JavaScript可以操作 DOM 和 BOM

每个浏览器都内置了`DOM`、`BOM` 这样的 `API` 函数，因此，浏览器中的 `JavaScript`才可以调用它们

小结:

- 运行环境指的是代码正常运行所需的必要环境
- 浏览器是javascript的运行环境

## 什么是 Node

Node.js 是一个基于 `Chrome V8` 引擎的 JavaScript 运行环境
通俗的理解：Node.js 为 JavaScript 代码的正常运行，提供的必要的环境

注意：

- 浏览器是 JavaScript 的前端运行环境
- Node.js 是 JavaScript 的后端运行环境
- Node.js 中无法调用 `DOM` 和 `BOM` 等 `浏览器内置API`

> Node 与 浏览器的区别

`相同点`：nodejs与浏览器都是javascript的运行环境，都能够解析js程序
`不同点`：nodejs无法使用DOM和BOM的操作，浏览器无法执行nodejs中的文件操作等功能

> Node.js 可以做什么

Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和API
然而，基于Node.js 提供的这些基础有很多强大的工具和框架如雨后春笋，层出不穷

- 基于 Express 框架（<http://www.expressjs.com.cn/>），可以快速构建 Web 应用
- 基于 Electron框架（<https://electronjs.org/>），可以构建跨平台的桌面应用
- 基于 restify 框架（<http://restify.com/>），可以快速构建 API 接口项目
- 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…

## Node 环境安装

如果希望通过Node.js 来运行 Javascript 代码，则必须在计算机上安装Node.js 环境才行
安装包可以从Node.js 的官网首页直接下载，进入到Node.js 的官网首页（<https://nodejs.org/zh-cn/>），点击绿色的按钮，下载所需的版本后，双击直接安装即可
> 版本说明

- LTS 为长期稳定版，对于追求稳定性的企业级项目来说，推荐安装LTS 版本的 Node.js
- Current 为新特性尝鲜版，对于热衷于尝试新特性的用户来说，推荐安装Current 版本的 Node.js。但是，Current 版本 中可能存在隐藏的Bug 或安全性漏洞，因此不推荐在企业级项目中使用Current 版本的 Node.js

> 测试是否安装成功

打开终端，在终端输入命令node –v 后，按下回车键，即可查看已安装的Node.js 的版本号

``` bash
node -v
```

常见终端命令

- ls ==> list 查看 ，查看当前文件夹下所有的目录列表
- cd ==> 切换到某个文件夹下，  change directory
- cd ../  ==> 退回上级文件夹
- clear ==> 清屏
- esc ==> 清除当前这一行

## Node 基本使用

在 Node.js 中需要通过终端才能执行 JavaScript 代码

1. 打开终端

2. 输入 node 要执行的js文件的路径，即可通过Node.js，来执行存放于.js 文件中的代码
    - 创建js文件 `helloworld.js`
    - 写nodejs的内容：`console.log('hello nodejs')`
    - 打开终端
    - 执行命令：`node helloworld.js`

**注意**：在nodejs中是无法使用DOM和BOM的内容的，因此`document, window`等内容是无法使用的。

常用快捷键
在 Windows 的命令行中，我们可以通过如下快捷键，来提高命令行的操作效率：

1. 使用 ↑ 键，可以快速定位到上一次执行的命令
2. 使用 tab 键，能够快速补全路径
3. 使用 esc 键，能够快速清空当前已输入的命令
