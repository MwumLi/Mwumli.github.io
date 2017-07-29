---
layout: post
title: "Vim的安装与配置"
description: ""
category: 记录
tags: [Vim, Linux]
toc: true
modifyTime: "2014-05-03 20:50:05"
---

{% include gen_toc %}

## Debian/ubuntu下安装

	$sudo apt-get install vim

## 编写配置文件

vim用户自定义配置文件`$(HOME)/.vimrc`(若没有,请自行创建)  
vim系统级配置文件/usr/share/vim/vimrc  
而我们一般只修改~/.vimrc

## 查看vim做过什么

~/.viminfo：记录了你曾经在vim上做过的操作(vim会自动创建)  

## Vim的四大模式

### Normal mode	----	Press [Esc] to enter  

此mode是进入其他mode的基础  

		[Ctrl]+[f]	==	[PgDn]
		[Ctrl]+[b]	==	[PgUp]
		[Ctrl]+[d]		向下翻半页
		[Ctrl]+[u]		向上翻半页
		[Ctrl]+[g]  	显示位置信息
		[g]+[Ctrl]+[g]	统计字数
		[d]+[d]			删除光标所在行
		[W]				跳转到下一个单词的开头

### Visual mode	----	press [Esc]+v to enter	

选择区域：移动光标选择区域  

复制：选中区域后，按下y,选中的区域就被复制到剪贴板  

粘贴：移动光标到想要粘贴的位置，按下p,剪贴板的内容就被复制到该位  

区块选择：  

  1. 光标移动到想复制区域的左上角，然后按下[Ctrl-v],进入区块选择模式  

  2. 移动光标选择矩形区域，选定之后，选择的区域会反白，按下[y],反白区域消失，内容已进入vim复制缓冲区  

  3. 移动光标到你想开始粘贴位置的起点，按下[p],刚才复制内容就会以矩形形式粘贴下来  

### Insert mode	----	press [Esc]+[i,o,a] to enter

		[Ctrl]+[n]和[Ctrl][p]	单词补全

### Command-line mode	----	press [Esc]+[:] to enter

		:help	进入vim帮助文档
		:set all	查看vim的素有原始设置

## vim的环境设定参数

两种设置方式：  

*  在配置文件vimrc中写入(永久有效)
*  在vim的命令行模式下设置(只在此次打开的vim中有效)  
展示一些常用参数：  

        "设置高亮搜索
		set hlsearch	"high light search,默认

        "设置backspace按键的工作方式
        "0,1表示只删除当前输入的字符
        "2表示可任意删除字符,默认
        set backspace=[0,1,2]
		
		"设置不自动缩进，自动缩进set autoindent
        set noautoindent	"默认
                                                                           
        "设置不显示行号	set nonumber显示行号
        set nonumber

		"设置不自动储存备份,set backup	自动备份
        "更改一个文件file时，会自动在当前路径生成一个file~的文件，记录上一步状态
        set nobackup
        
        "语法高亮,syntax off 取消语法高亮
        syntax on


