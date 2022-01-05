# svg 的使用

了解原理之前，首先抛出几个问题：

1. 什么是 svg ？
      SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图(Scalable Vector Graphics，SVG);
      是属于对图像的形状描述，所以它本质上是文本文件，体积较小
2. 为什么要用？
      缩放不会失真
      调整样式方便
      加载效率高
      使用方便(id标记)
3. 怎么用？
   - 直接在标签中引入，当图片使用
     - `<img src="./xxx.svg" alt="">`
   - 直接在HTML结构当标签使用
     - 原生属性有:
       - width 容器的宽度
       - height 容器的高度
       - fill 填充颜色
       - viewBox='0 0 100 120'
        viewBox 前两个数字表示 x y 轴的偏移，后两个数字表示原图的尺寸
         如果想通过 `width` 和 `height` 控制图标大小，一定要设置 `viewBox`
   - 使用 `webpack` 插件 `svg-sprite-loader`
     - 内部封装了一个组件 `<svg-icon></svg-icon>`
     - 原理: 把所有导入的 `svg` 文件统一塞到symbol自动拼接，最后放到一个大的容器svg标签， `symbol` 默认指定的ID就是文件名

   svg-sprite的原理及使用步骤：利用 svg的 symbol元素，将每个 icon 包括在 symbol中 通过 use元素使用该 symbol

      1. symbol标签(元件) 可以用于包裹 icon，但是包裹了之后就不会展示图标，如果想展示必须再用svg标签包裹所有的 symbol
         元件： 不会显示在页面中，可以包裹图标 icon

      2. 使用 svg 雪碧图 在页面中任何位置，通过 use 根据id显示图标

            ```html
            <svg>
                  <use xlink:href="#symbolId"></use>
            </svg>
            ```
