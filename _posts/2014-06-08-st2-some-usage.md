---
layout: post
title: "Sublime Text 2的使用"
description: ""
category: 软件
tags: [Sublime Text 2, Usage]
---
{% include LU/setup %}


假如你还没安装ST2,那么去[安装它](/记录/2014/06/08/st2_install_config/ "Sublime Text 2的安装与配置")

### 多项选择，多项编辑  

* 鼠标选中多行，按下 Ctrl+Shift+L (Command+Shift+L) 即可同时编辑这些行；  

* 鼠标选中文本，反复按 CTRL+D (Command+D) 即可继续向下同时选中下一个相同的文本进行同时编辑；  

* 鼠标选中文本，按下 Alt+	F3 (Win) 或 Ctrl+Command+G(Mac) 即可一次性选择全部的相同文本进行同时编辑；  

* Shift+鼠标右键 (Win) 或 Option+鼠标左键 (Mac) 或使用鼠标中键可以用鼠标进行竖向多行选择；  

* Ctrl+鼠标左键(Win) 或 Command+鼠标左键(Mac) 可以手动选择同时要编辑的多处文本  

### 命令行面板(Command Palette)

**Ctrl+Shift+P**唤醒Command Palette　　　
输入：  

	sspy	--->set the syntax of the current file to Python

当然，还有很多命令，使用过程中慢慢发现吧  

### 快速导航面板(Goto Anything)

#### 快速切换文件
**Ctrl+p**唤醒*Goto Anything*  

输入文件名，面板下拉框将出现所有匹配的文件名(当然，在这之前必须线打开一个目录作为搜索根目录)	  

可以试着在使用Up和Down滚动条目，会有意外的发现哦    

#### 在指定文件中快速查找函数，文本，跳转指定行  

* 查找函数，或者id（HTML）	  

		file@func

* 查找文本  

		file#text

* 跳转指定行  

		file:num

当*file*省略时，默认当前编辑文件

### 打开一个项目  
使用ST2可以打开一个项目，这样我们就可以很方便的对一个项目进行编辑，修改了  
打开的项目文件会展示在左侧的`side bar`  
当我们编辑某文件时，希望`Side bar`在我们需要时候展示，在我们不需要的时候消失，你可以这样做  

	Ctrl + k Ctrl + b   -->隐藏时显示，显示时隐藏 for Side bar 

当然，你也可以使用鼠标进行选择，但是那样不可避免降低你的速度   

### 模糊匹配  
无论是Command Palette还是Goto Anything,他们都采用模糊匹配，故不需要输入全命令和全文件名  
例如:在文件shiluodechenai.c中查找func_word  

	sldca@fw  

甚至可能更短

### Package Control(扩展包管理器)  
用来管理（安装，卸载）插件，皮肤的管理器，和vim中Vundle差不多，不过看起来更简单  
默认不含有此管理器，我们需要自己手动安装  

#### 安装

##### 手动版(复杂点)  

1. 在 SublimeText2 的目录里面找到 `Data > Installed Packages` 的文件夹 (如没有请手动新建)  

2. 在这里下载 [Package Control.sublime-package](http://dl.iplaysoft.com/files/1774.html#download_list) 文件  

3. 将下载到的文件放进去 Installed Packages 里面  

4. 重新启动 Sublime Text 即可

##### 自动版(保持网络，简单)  

如果你按照上面的方法确实搞不定，  
可以试试按键盘 Ctrl+~ （数字1左边的按键）调出控制台，  
然后拷贝下面的代码进去并回车，  它会自动帮你新建文件夹并下载文件的，与上面的方法最终效果是一样的  
代码如下：　　

	import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'

#### 使用

如果 Package Control 已经安装成功，  
那么 Ctrl+Shift+P 调用命令面板，我们就会找到一些以“Package Control:”开头的命令:  

	 Install Package	--->(安装扩展)
	 List Packages 		--->(列出全部扩展)
	 Remove Package		--->(移除扩展)
	 Upgrade Package	--->(升级扩展)

在命令面板输入 “Package Control: Install Package“即会列出全部可以安装的扩展  
从列表可以看到，4GL、AAAPackageDev 那些就是插件的名称    
选择它们就可以进行下载安装了  

此外，你还可以[在这里看到 Web 版的扩展列表和详细的说明](https://sublime.wbond.net/) （这俩列表的数据应该是同步的)  

#### 一些比较好的插件  

__Emmet__: 以前被称作为Zen Coding,如果你从事Web前端开发的话，对该插件一定不会陌生。  
它使用仿CSS选择器的语法来快速开发HTML和CSS,在一个扩展框中输入符合规范的表达式，它会动态生成相应的代码 ,或者直接在文本中使用表达式，按扩展键(Tab)进行扩展

具体使用见:[表达式语法](http://www.w3cplus.com/tools/emmet-cheat-sheet.html)  

__Gits__： 可以轻松集成 GitHub  

__SFTP__： 直接编辑 FTP 或 SFTP 服务器上的文件  

__ConvertToUTF8__： ST2只支持utf8编码，该插件可以显示与编辑 GBK, BIG5, EUC-KR, EUC-JP, Shift_JIS 等编码的文件  

__Clipboard History__： 剪切板历史  

__WordPress__： 集成一些WordPress的函数，对于像我这种经常要写WP模版和插件的人特别有用！  

__HtmlTidy__： 清理与排版你的HTML代码  

__PHPTidy__： 整理与排版PHP代码  

__YUI Compressor__： 压缩JS和CSS文件
