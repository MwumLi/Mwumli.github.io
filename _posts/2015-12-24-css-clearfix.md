---
layout: post
title: "clearfix 引发的思考"
description: " clearfix 的作用以及引发的对于清除浮动和 collapsing margins 的思考"
category: 前端
tags: [CSS, 前端, clearfix, margin]
toc: true
modifyTime: "2015-12-25 17:50:14"
---

{% include gen_toc %}


    .clearfix:before, 
    .clearfix:after {
        content: " ";
        display: table;
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }


`clearfix` 这个 class 很受前端开发者欢迎  
主要用它来清除浮动和防止 Collapsing margins (外边距折叠), 且保证跨浏览器的兼容性  
简述如下 :  

1. `zoom: 1` : 为了兼容 IE6/7  
2. `:before` : 用来防止 top-margin collapse 和保证当 IE6/7 应用 `zoom:1` 时的是视觉一致性  
3. `:after` : 用来清除浮动  

关于它的具体讲解可以参考这篇文章 : <http://nicolasgallagher.com/micro-clearfix-hack/>  

下面是我了解 `clearfix` 具体作用的一些思考 :  

## 清除浮动

`float: left` 和 `float: right` 可以让我们的元素浮动到文档左边和右边  
因为浮动让元素像漂在水中的叶子一样 "浮" 起来, 脱离标准文档流, 所以不占有原来流空间  
之后的元素就有可能和浮动元素重叠或完全遮挡消失  

比如，这段代码(没有浮动):  

	<div style="background: red; width: 150px; height: 80px;">div1</div>
	<div style="background: green; width: 300px; height: 50px;">div2</div>
	<div style="background: yellow; width: 100px; height: 100px">div3</div>
	<div style="background: cyan; width: 250px; height: 60px">div4</div>

它的效果是这样的 :  
![float-normal](/assets/imgs/css-clearfix/float-normal.jpg)

给代码增加浮动 :  

    <div style="background: red; width: 150px; height: 80px;">div1</div>
	<div style="background: green; width: 300px; height: 50px;float: left;">div2</div>
	<div style="background: yellow; width: 100px; height: 100px">div3</div>
	<div style="background: cyan; width: 250px; height: 60px">div4</div>

效果是这样的 :  
![float-left](/assets/imgs/css-clearfix/float-left.jpg)

可以很明显的看到, div3 的区域被 div2 遮挡住了  

因此, 清除浮动是一件很有必要的事情, 清除浮动方法很多, 可以参考: <https://segmentfault.com/a/1190000002616482#articleHeader3>    

这里主要讲述一下 `clearfix` 中清除浮动的方法 :  

> 使用一个容器元素包含浮动元素, 给容器元素添加 `class="clearfix"`  
> 这样主要利用 `:after` psudo-element 给容器元素尾部添加一个空的元素  
> `display: table` 让其成为一个块级元素  
> `clear:both`保证清除前面的浮动  
> 只有块级元素的 `clear` 属性会生效. 内联元素并不会(事实上，我并没有找到相关资料来证明，只是我实验多次下的结论)  
> `zoom:1` 保证跨浏览器的兼容性(IE6/7), 触发 `hasLayout` 属性  

### clear 与块级元素

**为什么上面会把 `:after` psudo-elemnt 声明为一个块级元素呢?**  
那是因为只有块级元素设置 `clear` 才会生效, 而内联元素并不会生效  
(事实上，我并没有找到相关资料来证明这个结论，但是，我实验多次，发现确实如此)  

**为什么这里要使用 `display: table`，不使用其他的声明呢(比如 `block`)?**  
`:before` 中使用 `table` 把其声明为一个 BFC, 而 `table` 有能力表示这个元素为一个块级元素  
所以可能考虑到共用代码, 所以 `:after` 中也是用了 `display: table`  


## 避免 Collapsing  margins

有两种情况会引起 Collapsing margin :  

1. 父子元素(不一定是直接父子) 之间会发生 margin-top 和 margin-bottom 的折叠  
   (如果之间没有 `border、padding、inlne-content、height、min-height、max-height` 分割的话)  
   这篇讨论 <http://stackoverflow.com/questions/9519841/why-does-this-css-margin-top-style-not-work> 很好的演示了这点  

2. 邻近元素同时设置 margin, 前面的 margin-bottom 和 后面的 margin-top 融合取最大的  

`clearfix` 是这么做的 :  

> 父子的话, 给父元素添加 `.clearfix`; 紧邻的话，给前一个元素添加 `.clearfix`  
> 这样主要利用 :before psudo-element 给元素内部前面添加一个空的元素  
> `display: table` 保证它是一个 BFC(BFC 可以隔断外边距折叠)  


## 总结

使用 `:before` 和 `:after` 最大的好处应该是避免添加 HTML 代码到我们的代码, 破坏代码的整体感  

使用 `clearfix` 的时候, 有的时候不仅仅是为了清除浮动带来的影响，还有防止 Collapsing margins  
因此，当你发现布局不对的时候，可以试一试  

当然, 在使用前, 请确定 `clearfix` 和本文章首部的内容一致  

## 参考文档　

1. <http://www.cnblogs.com/zhongxinWang/archive/2013/03/27/2984764.html>  
   这篇文章主要讲了浮动的影响, 图文并茂, 但是没有 code, 但是对于初学者理解浮动的影响有很大帮助  

2. <https://segmentfault.com/a/1190000002616482#articleHeader3>  
   这篇文章主要讨论了清除浮动, 还算完全  

3. <http://nicolasgallagher.com/micro-clearfix-hack/>  
   这是 clearfix 的起源, 分析了 clearfix 的原理  

4. <http://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html>  
  这里讲了BFC，生成一个 BFC 以及 BFC 的使用,图文并茂, 有 code  

5. <http://stackoverflow.com/questions/9519841/why-does-this-css-margin-top-style-not-work>  
   这里面讨论了 margin-top 与父元素的 margin-top 的折叠的危害以及解决，一个很好的例子　

6. <http://www.w3.org/TR/CSS21/box.html#collapsing-margins>  
   英文官方文档, 讲述 collapsing margin 引发的情况  

7. <https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin_collapsing>  
   mdn 上的文章, 讲述 collapsing margin, 中文  

