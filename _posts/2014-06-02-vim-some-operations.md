---
layout: post
title: "Vim的一些操作"
description: "Vim 中的一些操作: 快捷键, 帮助文档, 加密文件, 多窗口操作"
category: 记录
tags: [Vim, Linux]
toc: true
modifyTime: "2015-05-22 00:29:43"
---

{% include gen_toc %}

## vim编程常用命令  

### 常用命令

	%  		| 	跳转到配对的括号去
	[[ 		| 	跳转到代码块的开头去
	gD 		| 	跳转到局部变量定义处  
	gg 		| 	跳转到文件开始位置
	G  		| 	跳转到文件结束位置  
	mx 		| 	设置书签，x只能是[a---z]的26个字母
	`x 		| 	跳转到书签处(`是１旁边的键)
	>  		| 	增加缩进，"x>"表示增加以下x行的缩进
	<  		| 	减少缩进，"x>"表示减少以下x行的缩进
	
### 快速查找单词  

当光标移动到相应单词，按下 `shift + #`, 就会在文件中快速查找改单词  

### 撤销和反撤销  

按下 `u` 撤销上一步保存的操作  

按下 `ctrl + r` 回退上一步撤销的操作  

### 相关帮助文档 

	:help usr_29
	:help usr_30

## Vim中文文档 

1. vim中文文档不会覆盖原英文文档，安装后vim默认使用中文文档。若想使用英文文档，可在vim中执行以下命令：  

		set helplang=en

	同理，使用以下命令可重新使用中文文档：  

		set helplang=cn

2. 帮助文件的文本是utf-8编码的, 如果想用vim直接查看, 需要在~/.vimrc中设置:  

		set encoding=utf-8

## 缩进设置

#### .vimrc选项

	set tabstop=4
	set softtabstop=4
	set shiftwidth=4
	set noexpandtab / expandtab

**做一些说明**:  
其中 `tabstop` 表示一个 `tab` 显示出来是多少个空格的长度，默认 8  

`softtabstop` 表示在编辑模式的时候按退格键的时候退回缩进的长度，当使用 `expandtab` 时特别有用  

`shiftwidth` 表示每一级缩进的长度，一般设置成跟 `softtabstop` 一样  

当设置成 `expandtab` 时，缩进用空格来表示，`noexpandtab` 则是用制表符表示一个缩进。

#### 根据文件类型来设置 tab：

有些时候想为某些类型的文件设置不同的 tab 表现  
如 python 用四个空格来表示一个缩进，javascript 约定也是用四个空格来表示缩进  
而 HTML 和 CSS 则喜欢用 tab 制表符来缩进，那么可以做如下设置：  

	if has("autocmd")
	    autocmd FileType javascript setlocal ts=4 sts=4 sw=4 expandtab
		autocmd FileType python setlocal ts=4 sts=4 sw=4 expandtab
	endif

这样当开打的文件是 .js .py 的，都会用四个空格来缩进  

#### 用特殊符号设置tab制表符  

在 Vim 中可以用特殊的符号来表示一个 tab 制表符，这样 tab 制表符和空格就可以很容易的区分看来了  
在.vimrc加入这些就可以了  

	set list
	set listchars=tab:▸\ ,eol:¬

##　折叠

#### 6种方法

	manual	---	手工定义折叠  
	indent	---	更多的缩进表示更高级别的折叠
	expr	---	用表达式来定义折叠
	syntax	---	用语法高亮来定义折叠
	diff	---	对没有更改的文本进行折叠
	marker	---	对文中的标志折叠

注意，每一种折叠方式不兼容，当前时刻，有且只能使用一种  

#### 常见设置 

1. 设置折叠方法

		set foldmethod=syntax	//其他几种也可以

2. 设置折叠级别

		set foldlevel=num
		num为0时，所有的折叠关闭  
		num为正数时，一些折叠关闭
		num很大时，所有的折叠打开

3. 设置折叠栏宽度

		set foldcolumn=num
		num的取值[0----12]

一个打开的折叠由一栏来表示，顶端是'-',其下方是'|',这栏在折叠结束的地方结束  
一个关闭的折叠由'+'表示  
折叠栏太窄而不能显示所有折叠时，显示一数字来表示嵌套的级别  
当设置`set mouse=a`时,在折叠栏点击鼠标，可以打开和关闭折叠  

4. 光标所在，自动打开折叠  

		set foldopen=all  

5. 光标移开，自动关闭折叠  

		set foldclose=all

#### 常用快捷键

	za  打开/关闭在光标下的折叠
	zA  循环地打开/关闭光标下的折叠
	zo  打开 (open) 在光标下的折叠
	zO  循环打开 (Open) 光标下的折叠
	zc  关闭 (close) 在光标下的折叠
	zC  循环关闭 (Close) 在光标下的所有折叠
	zM  关闭所有折叠
	zR  打开所有的折叠


## vim加密文件

Command mode下使用:X命令为文件设定一个密码  

	:X
    Enter encryption key: ******
    Enter same key again: ******

如果要取消加密，可以设置密码为空  
可以禁用交换文件，以免泄密  

	$ vim -x -n file

如果你已在经编辑这个文件了，那么交换文件可以用下面的命令禁止:  

	:setlocal noswapfile

由于没了交换文件，文件复原就不可能了。为了避免失去编辑的成果，要比平时更勤快地存盘你的文件  

现在你可以像平时一样编辑这个文件并把你所有的秘密放进去。当你编完文件要退出 Vim 时，这个文件就被加密存盘了  
当你下次用 Vim 编辑这个文件时，它就会询问你密码  

如果你试图用另一个程序来阅读这个文件，你将读到一堆垃圾。如果你用 Vim 来编辑这个文件，但输入了错误的密码，你也只能得到垃圾.  
Vim 并不具备检验密码正确性的机制 (这一点使得破译密码更为困难)  


## Vim的多文件操作

1. 打开file1, file2, file3 ...  
		
		$ vim file1 file2 file3

2. 文件之间的跳转  

		:n	跳转到下一个文件
		:N	跳转到上一个文件

3. 列出目前这个vim打开的所有文件  

		:files
		1 %a   "a.v"                          line 1
		2      "cvim_use.md"                  line 0
		3      "test.md"                      line 0

4. 一次退出，全部退出编辑  

		:q

## vim的多窗口操作

* 分割窗口  
    		
		:sp [file]

`[ ]`代表可选，file是可选的  
若是不输入file，则分割后的创建窗口显示当前窗口文件  
若是输入file,则分割后的窗口打开文件file

* 切换窗口  

		[Ctrl]+[w]+[j] == [Ctrl]+[w]+[ArrowDown]	跳转到当前窗口下方的窗口
		[Ctrl]+[w]+[k] == [Ctrl]+[w]+[ArrowUp]	跳转到当前窗口上方的窗口

