---
layout: post
title: "静态博客系统-->JekyllBootstrap"
description: ""
category: 记录
tags: [Website, Web, Jekyll]
toc: true
modifyTime: "2015-09-25 16:52:48"
isShow: true
---

{% include gen_toc %}


### 上菜--JekyllBootstrap 
在[使用jekyll搭建静态站点][jekyll_website]一文中， 我已经介绍了怎么创建最简单站点的例子(`jekyll new myblog`),但看起来貌似难以起步(神马都没有),一切都需要start from scratch，真是愁啊  

不过，现在不用担心了，我们有技能-->JekyllBootstrap  

JekyllbBootstrap就像WordPress(动态博客系统）一样，但是，jekyllbootstrap用于静态网站    

好了，开始准备干活吧  

1. 创建一个新的仓库  
去你的[https://github.com](https://github.com "github首页")创建一个新的仓库，命名为`username.github.io`  

2. 安装Jekyll-Bootstrap  
打开终端，切换到你想放置站点的目录，输入一下命令：  

		$ git clone https://github.com/plusjade/jekyll-bootstrap.git username.github.io
		$ cd username.github.io
		$ git remote set-url origin git@github.com:username/username.github.com.git
		$ git push origin master

3. 等待与收获  
等待大约10分钟，你就可以通过browser在`http://username.github.com`看到你的站点  

### 使用rake快速创建post or page
顺便说一句，`rake`工具需要安装，Linux/Ubuntu请使用：  

	$ sudo apt-get install rake  

`rake`使用之前需要有一个`Rakefile`文件，如果你使用`JekyllBootstrap`,那你就不用自己创建`Rakefile`文件，已经内置;否则，你如果想使用`Rake`，可以拷贝一下`JekyllBoostrap`里的`Rakefile`，或者，自己查阅相关资料按照规则编写（你可以的，嘿嘿）  

#### 创建一篇post  
通过`rake`很容易创建一篇post  

	$ rake post title="Hello World"  
	Creating new post: ./_posts/2014-08-14-hello-world.md  

`rake`会帮你格式化名字并添加日期(当前时间)   
并且post中自动添加YAML头信息，太方便了  
`rake`不会覆盖原有文件，除非你让它那么做  

#### 创建一个page  
* 在根目录创建  

		$ rake page name="about.md"
		Creating new page: ./about.md  

* 创建一个内嵌  

		$ rake page name="pages/about.md"
		Creating new page: ./pages/about.md  

* 创建一个"漂亮"的路径  

		$ rake page name="pages/about.md
		Creating new page: ./pages/about/index.html"

三种方式的区别在于browser呈现的路径的不同,自己尝试吧   

#### 发布你的站点  

	$ git add .
	$ git commit -m "add new content"
	$ git push origin master  

好了，新的内容已经在你的github项目，享受新的变化吧  

#### 自定义  
Jekyll-Bootstrap可以根据喜好自我定义  
主题可以更换，也可以自己写；配置根据喜好自己修改  
具体请参考[Jekyll-Bootstrap快速开始][jekyll-bootstrap-usage]  

---

### 说些什么
其实这篇文章也算是一篇简单的译文吧  
不管如何，看完基本能懂得怎么安装，使用Jekyll-Bootstrap就可以了  
至于深入用法和配置，请参考[Jekyll-Bootstrap官方网站][jekyll-bootstrap-official]  
单词和句型都很简单(就连我四级都没过的人都看的懂)，你一定可以的，嘿嘿  

[jekyll_website]:/%E8%AE%B0%E5%BD%95/2014/08/14/static-website-by-jekyll/ "使用jekyll搭建静态站点"
[jekyll-bootstrap-usage]:http://jekyllbootstrap.com/usage/jekyll-quick-start.html "Jekyll-Bootstrap快速开始"
[jekyll-bootstrap-official]:http://jekyllbootstrap.com "Jekyll-Bootstrap官方网站"
