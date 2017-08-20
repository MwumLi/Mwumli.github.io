---
layout: post
title: "使用 JavaScript 获取 DOM 元素位置和尺寸"
description: ""
category: "记录"
tags: ['JavaScript', 'DOM', 'client/offset/scroll', '视口坐标', '文档坐标']
toc: true
modifyTime: "2017-08-21 01:00:09"
---

在一些复杂的页面中, 经常会用 JavaScript 产生一些 DOM 元素的动态效果(滚动到页面某个位置)或者做一些自适应的调整(超出屏幕边缘, 向可视区域调整元素位置)，这个时候我们经常会做一些元素位置和尺寸的计算。浏览器兼容性问题也是不可忽略的一部分，要想写出预想效果的 JavaScript 代码，需要了解一些基本知识。  

{% include gen_toc %}

## 涉及 DOM 元素定位的属性

每个 HTML 元素都有下列属性:  

* `clientWidth`, `clientHeight`, `clientLeft`, `clientTop`  
* `offsetWidth`, `offsetHeight`, `offsetLeft`, `offsetTop`  
* `scrollWidth`, `scrollHeight`, `scrollLeft`, `scrollTop`  

下面是具体解释:  

* **clientHeight 和 clientWidth**: 用于描述元素内尺寸，是指 `元素内容+padding` 大小  
  不包括 border（IE下实际包括、margin 和滚动条部分  
* **offsetHeight 和 offsetWidth**: 用于描述元素外尺寸，是指 `元素内容+padding+border`  
  不包括 margin 和滚动条部分  
* **clientTop 和 clientLeft**: 指该元素 border 内外边缘的垂直和水平距离, 即 `border-top-width` 和 `border-left-width`  
* **offsetTop 和 offsetLeft**: 指该元素的左上角(**border 外边缘**) 与已定位的父容器(**offsetParent 对象**)左上角(**padding 外边缘**)的距离, 即`元素的 margin-top + offsetParent.padding-top`和 `元素的 margin-left + offsetParent.padding-left`
* **offsetParent**: 指该元素最近的定位 (`relative`、`absolute`) 祖先元素，递归上溯，如果没有祖先元素是定位的话，会返回 `null`  
* **scrollWidth和scrollHeigh** : 是指元素的`内容区域 + padding + 溢出尺寸`  
  当内容正好和内容区域匹配, 这时候没有溢出，这些属性与 `clientWidth和clientHeight` 相等  
* **scrollLeft 和 scrollTop**: 是指元素滚动条当前所在位置, 是**可写**的  
  通过给这两个属性赋值, 从而使页面滚动到指定位置  

写了两个 demo 对应理解:  

* [演示 client/offset 相关的几种属性]({{ site.public_path }}/demos/fe/client-offset-scroll#client-offset-title)  
* [演示 scroll 相关的几种属性]({{ site.public_path }}/demos/fe/client-offset-scroll#scroll-title)  

## window 对象的尺寸属性

* `window.innerWidth` 和 `window.innerHeight`: 浏览器视口的宽(包含垂直滚动条)和高(水平滚动条), 不包含菜单，工具栏等   
  因为不是 W3C 技术规范或推荐规范的一部分, 所以有些浏览器不支持  
* `window.outerWidth` 和 `window.outerHeight`: 浏览器的宽和高, 包含菜单，工具栏等  
* `window.pageXOffset`: 浏览器水平滚动条的位置,`window.scrollX` 的别名, 但兼容性更好  
  `window.pageYOffset`: 浏览器垂直滚动条的位置,`window.scrollY` 的别名, 但兼容性更好  

## 文档坐标和视口坐标

当我们计算一个 DOM 元素位置也就是坐标的时候，会涉及到两种坐标系: **文档坐标** 和 **视口坐标**。  

浏览器呈现给人眼看到网页的那部分就是视口, 不包含浏览器外壳（菜单，工具栏，状态栏等  

我们经常用到的 `document` 就是整个网页，而不仅仅是从视口看到的那部分内容，还包括因为窗口大小限制而出现滚动条的部分，它的左上角就是我们所谓相对于文档坐标的原点  

如果文档小于等于视口, 则不会出现滚动条, 文档左上角和视口左上角相同  

因此, 在两种坐标系之间进行切换, 需要加上或减去滚动的偏移量  

为了在坐标系之间进行转换, 需要判定浏览器窗口的滚动条位置:  
* `window` 对象的 `pageXoffset` 和 `pageYoffset` 提供这些值(IE 8 及更早版本除外)  
* 如果 `window.pageXoffset` 不存在, 那么:  
  * 标准模式下, 获取 `document.documentElement` 的 `scrollTop/scrollLeft`的值来代替
  * 怪异模式下, 获取 `document.body` 的 `scrollTop/scrollLeft`的值来代替

## 具体应用

### 得到浏览器窗口的滚动条位置

	function getScrollOffsets(w) {
		var w = w || window;
		if (w.pageXoffset != null) { // > IE8
			return { x: w.pageXoffset, y: pageYoffset };
		}

		var d = w.document.documentElement; // 标准模式
		if (document.compatMode == "BackCompat") { // 怪异模式
			d = w.document.body;
		}
		return { x: d.scrollLeft, y: d.scrollTop };
	}

### 视口大小

	function getViewportSize(w) {
		var w = w || window;
		if (w.innerWidth != null) {
				return { width: w.innerWidth, height: w.innerHeight };
		}

		var d = w.document.documentElement; // 标准模式
		if (document.compatMode == "BackCompat") { // 怪异模式
			d = w.document.body;
		}

		return { width: d.clientWidth, height: d.clientHeight };
	}

### 网页大小

	function getPageSize(w) {
		var w = w || window;

		var d = w.document.documentElement; // 标准模式
		if (document.compatMode == 'BackCompat') { // 标准模式
			d = w.document.body;
		}

		// 无滚动条时, clientWidth 与 scrollWidth 相同, 但由于不同浏览器处理方式不一致, 因此应该取其中较大值
		return {
			width: Math.max(d.scrollWidth, d.clientWidth),
			height: Math.max(d.scrollHeight, d.clientHeight)
		};
	}


### 元素的文档坐标
> 得到元素的文档坐标, 如果浏览器有滚动条, 可以滚动浏览器到指定元素  

	function getElementScrollCoords(element) {
		var actualLeft = element.offsetLeft, actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null){
			// 注意要加上边界宽度
			actualLeft += (current.offsetLeft + current.clientLeft);
			actualTop += (current.offsetTop + current.clientTop);
			current = current.offsetParent;
		}
		return {x: actualLeft, y: actualTop}
	}

### 元素的视口坐标

	function getElementViewportCoords(element) {
		var scrollCoords = getElementScrollCoords(element);
		var scrollOffsets = getScrollOffsets();

		// 视口坐标 = 文档坐标 - 滚动条坐标
		return {
			x: scrollCoords.x - scrollOffsets.x,
			y: scrollCoords.y - scrollOffsets.y
		}
	}
	
	// 或者使用 element.getBoundingClientRect()
	function getElementViewportCoords(element) {
		var clientRect = element.getBoundingClientRect();
		return {
			x: clientRect.left,
			y: clientRect.top
		}
	}

