# 快速开始

2015-09-28 02:10:55 by MwumLi

---

## JavaScript 的引入  

向 HTML 页面中插入 JavaScript 主要是使用 `<script>` 元素  
`<script>` 元素由两个重要的属性 `src`(文档来源) 和 `type`(文档类型)  

使用 `<script>` 标签引入 JavaScript 有两种方式 :  

1. 直接在页面中嵌入 JavaScript 代码 :  

		<script type="text/javascript">
		    function sayHi() {
			    console.log("Hello, I'm console in browser.");
			}
		</script>
  
   可以放在页面任何地方, 不过通常我们都把 JavaScript 代码放到 `<head>` 中  

2. 引入外部 JavaScript 文件 :  

		<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.0.0-alpha1/jquery.min.js" >

   把 JavaScript 代码放到一个单独的 `.js` 文件中, 然后在 HTML 中通过 `<script>` 标签引入  

## 多个 js 的引入及执行顺序 

可以在同一个页面中引入多个 `.js` 文件  
还可以在页面中多次编写 `<script>js code...</script>`  

浏览器顺序从上往下依次执行 js 代码  

## 如果改动页面中的 js


当浏览器解释到一个函数的定义, 然后把该定义保存在自己的环境中  
之后通过事件对这些 js 的操作, 都是基于当前环境的  

**如果你在编辑器中**, 对页面中的 js 代码进行改变, 而不刷新网页的话, 是无法生效的  
因为浏览器对 js 的反应都是基于当前环境中已经解释的代码, 而浏览器只会在第一次加载页面时候对 js 进行解释， 并保存到当前环境  

**如果你在 chrome 浏览器中**, 利用浏览器的开发者工具对 js 进行改变, 并且保存， 那么会立即生效  
这个方便调试, 但是所做修改不会保存到本地  

## 如何编写 JavaScript  

可以使用任何文本编辑器来编写 JavaScript 代码  

这里推荐几种 :  

1. VS Code (Visual Studio Code) -- 来自微软
   [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. WebStorm -- The smartest JavaScript IDE
   [http://www.jetbrains.com/webstorm/](http://www.jetbrains.com/webstorm/)

3. Sublime Text 2  
   [Sublime Text 2的安装与配置](http://www.ifmicro.com/st2-install-config/)  
   [Sublime Text 2 的使用](http://www.ifmicro.com/st2-some-usage/)  

## 如何运行 JavaScript

1. 直接用浏览器打开嵌入 js 代码的 HTML 页面, 浏览器地址栏显示 `file://...`  
   由于浏览器的安全限制, 以 `file://` 开头的地址无法执行联网等 js 代码  

2. 搭建一个 Web 服务器, 使用 `http://` 形式在浏览器中访问网页  
   这个可以正常执行所有的 js 代码  
   * WAMP -- [http://www.wampserver.com/en/](http://www.wampserver.com/en/)
   * LAMP -- [LAMP 环境搭建](http://www.ifmicro.com/lamp-build/)

## 如何调试 JavaScript

1. 使用 chrome 浏览器的开发者工具  
   `12` 或 `Ctrl+Shit+I`  

2. 使用 Firefox 浏览器的 firebug 插件  

