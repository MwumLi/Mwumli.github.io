# React 网页模板

2015-10-27 11:17:14 by MwumLi

---

React 推荐通过 npm 通过 react  
但是在学习 React 我们可以抛开 npm, 独立使用  
这个是抛开 npm 的时候使用的模板 :  

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    </head>
    <body>
    <div id="example"></div>
    <script type="text/babel">
        // ** our code goes here! **
    </script>
    </body>
    </html>


首先引入三个库 : `react.js`、`react-dom.js` 和 `browser.js`  
这三个库是必须首先加载的  

* `react.js` : React 的核心库  
* `react-dom.js` : 提供与 DOM 相关的功能  
* `browser.js` : 将 JSX 语法转为 JavaScript 语法  
  浏览器不识别 jsx, 因此需要将其转化为 js 语法  
  这一步很耗时间, 实际上线的时候, 应该会在服务器端把 jsx 文件转化成符合 js 语法的文件  
  使用 `babel` 命令行工具进行 jsx 到 js 的转换, 如果采用这种方式, 就不需要引入此库  


接着使用 `<script type="text/babel">` 来嵌入 React 的 jsx 语法的代码  
凡是使用 jsx 的地方, 都要加上 `type="text/babel"`  


