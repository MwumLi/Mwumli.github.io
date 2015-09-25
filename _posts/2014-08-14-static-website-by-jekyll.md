---
layout: post
title: "使用jekyll搭建静态站点"
toc: "true"
modifyTime: "2015-09-25 16:50:53"
description: ""
category: 软件
tags: [Jekyll, Git, Github, Linux, Web, Website]
---
{% include LU/setup %}

### Jekyll的安装  

假如系统未曾安装gem,请使用以下命令安装: 

	$ sudo apt-get install ruby1.9.1-full

安装ruby(1.9.3)的时候，会同时安装gem1.8.23  
  
使用gem安装jekyll:` sudo gem install jekyll`  

假如报错的话，请安装ruby1.9.1的编译扩展组件的头文件:  

	$ sudo apt-get install ruby1.9.1-dev    

基本安装已经完成了，但是你执行`jekyll new myblog`时，可能会报`Could not find a JavaScript runtime`这样的错误，你需要使用一下命令解决：  

	$ sudo apt-get install nodejs  

### Jekyll的使用  

一个获取最简单 Jekyll 模板并生成静态站点的方法  

	$ jekyll new myblog
	New jekyll site installed in /home/temp/myblog.  
	$ cd myblog
	$ ls
	about.md     css/      _includes/  _layouts/  _sass/
	_config.yml  feed.xml  index.html  _posts/
	$ jekyll serve
	Configuration file: /home/temp/myblog/_config.yml
		    Source: /home/temp/myblog
	       Destination: /home/temp/myblog/_site
	      Generating... 
                    	    done.
	 Auto-regeneration: disabled. Use --watch to enable.
	Configuration file: /home/temp/myblog/_config.yml
	    Server address: http://0.0.0.0:4000/
	  Server running... press ctrl-c to stop.

Well,你可以browse to http://localhost:4000  

就是这么简单。从现在开始，你可以通过创建文章、改变头信息来控制模板和输出、修改 Jekyll 设置来使你的站点变得更有趣～  

#### 运行jekyll开发服务器  

jekyll使用一下命令，将会运行一个服务器，用来在本地查看你的静态站点  
类似于在本地搭建的apache服务器，命令如下：  

	$ jekyll serve  

一个开发服务器将会在`http://localhost:4000`运行  

假如你想脱离终端在后台运行,请使用：  

	$ jekyll serve --detach

如果你想关闭服务器，可以使用`kill -9 PID`命令  
如果你找不到进程号，那么就用`ps aux | grep jekyll`命令来查看，然后关闭服务器。  

如果你想查看变更并且自动再生成  

	$ jekyll serve --watch 

### Jekyll的配置

#### 使用RDiscount来渲染md文档  

如果你希望使用RDiscount来渲染markdown,而不是Maruku,只要确保RDiscount被正确的安装  

	$ sudo gem install rdiscount  

然后运行 Jekyll，并使用以下的参数选项：  

	$ jekyll --rdiscount  

你可以在你的_config.yml中写入代码，从而不必指定参数:  

	markdown: rdiscount  

#### Pygments来实现代码高亮  

如果你是一个程序员，那么你一定希望你的文章中代码高亮  
不错，已经有好的解决办法了：通过 highlight 标签实现代码高亮  
但在此之前，你需要首先安装 Pygments  

	$ sudo apt-get install python-pygments  

##### 在文章中引用highlight标签  

1. 使用pygmentize生成高亮CSS文件  

		$ pygmentize -f html -S default > pygments.css  

2. 把生成的pygments.css移到你的css文件夹里，在post模板里引用一下  

3. 修改配置文件_config.xml,添加： `highlighter: pygments`  

4. 使用格式如下:    
![helighter_demo](/assets/imgs/heligher_demo.png)

其中`language`可以从[Syntax highlighter][pygments-syntax-heghlighter]获取   

[pygments-syntax-heghlighter]:http://pygments.org/docs/lexers/ "pygments语法高亮"

