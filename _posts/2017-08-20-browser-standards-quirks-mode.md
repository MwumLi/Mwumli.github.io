---
layout: post
title: "浏览器的标准模式和怪异模式"
description: ""
category: "记录"
tags: ["JavaScript", "Standards", "Quirks", "mode"]
toc: true
modifyTime: "2017-08-20 22:44:03"
---

现代的浏览器一般都有两种渲染模式: 标准模式(Standards mode)和怪异模式(Quirks mode)  
标准模式下, 浏览器按照 HTML 与 CSS 标准对文档进行解析和渲染; 而在怪异模式下，浏览器则按照旧有的非标准的实现方式对文档进行解析和渲染。  

{% include gen_toc %}

## 为什么要做如此区分?

在 HTML 与 CSS 的标准化未完成之前, 各个浏览器对 HTML 和 CSS 的解析有各自不同的实现, 而有很多旧的网页都是按照这些非标准的实现去设计的。  
在 HTML 与 CSS 标准确定之后，浏览器一方面要按照标准去实现对 HTML 与 CSS 的支持，另一方面又要保证对非标准的旧网页设计的后向兼容性。  
因此, 现代的浏览器一般会支持两种渲染模式: 标准模式和怪异模式。  

## 浏览器如何确定使用哪种渲染模式

如果 HTML 文件首部包含文档类型声明 `DOCTYPE`, 那么浏览器就会启动标准模式, 按照指定的文档类型标准解析和渲染文档  
对于没有文档类型声明或者文档类型声明不正确的文档，浏览器就会认为它是一个旧的HTML文档，就会使用怪异模式解析和渲染该文档  

> `<!DOCTYPE html>` 是所有可用的 `DOCTYPE` 之中最简单的，而且是 HTML5 所推荐的  

## 判断当前浏览器采用的渲染模式

JavaScript 中, `document.compatMode` 是用来判断当前浏览器采用的渲染方式  
`document.compatMode` 的值为 `CSS1Compat`(标准模式) 或 `BackCompat`(怪异模式)  

	let mode = document.compatMode;
	if (mode == 'BackCompat') {
		console.log('当前浏览器正在使用怪异模式渲染当前页面');
	}
	if (mode == 'CSS1Compat') {
		console.log('当前浏览器正在使用标准模式渲染当前页面');
	}

参考mdn: <https://developer.mozilla.org/zh-CN/docs/Web/API/Document/compatMode>  
