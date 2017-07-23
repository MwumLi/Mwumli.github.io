---
layout: post
title: "Linux下MASM汇编环境搭建"
description: ""
category: 软件
tags: [Masm, Assembly, 汇编]
toc: true
modifyTime: "2015-09-25 17:00:03"
isShow: true
---

{% include gen_toc %}

## 碎碎念

`MASM`是Microsoft Macro Assembler的缩写，它是微软为x86微处理器家族缩写的一套宏编译器  

`dosbox`是一款x86/DOS环境模拟器，可以很好模拟DOS环境,方便我们运行DOS程序  

`.asm`是汇编代码的后缀  

好了，现在开始吧！  

## 安装dosbox  

	$ sudo apt-get install dosbox  

## 下载MASM软件包  

从这里下载[masm.tar.bz2][masm_tar_bz2]

	$ cd ~
	$ mkdir -p masm/tools
	$ tar xjf Download/masm.tar.bz2 -C masm/tools 

下载的文件，解压到新建的文件夹masm/tools下  
masm即将作为dosbox的C盘  

## 启动dosbox  

	$ dosbox -c "mount C: ~/masm/tools" -c "path %path%;C:\tools\"

好了，dosbox应该出现了，你可以使用`debug.exe`,`masm.exe`了  
`-c`: 指定dosbox的启动参数  
`mount C: ~/masm/tools`: 把我们用户主目录下的masm/tools作为dosbox的C盘  
`path %path%;C:\tools` : 给path(*可执行文件搜索路径*)环境变量添加值，这样，我们无论在哪个目录都可以使用masm软件包的工具了  

## 使用脚本启动dosbox  

**dosbox_setup.sh**  

	#!/bin/bash
	dosbox -c "mount C: ~masm" -c "path %path%;C:\tools\" &

为dosbox_setup.sh添加执行权限  

	$ chmod a+x dosbox_setup.sh

好了，你可以通过运行此脚本打开dosbox,而且路径已经配置好了  

## 写个汇编版的HelloWorld  

**hello.asm** 

	assume cs:codes, ds:datas
	datas segment
			str db 'hello,world',13,10,'$'
	datas ends
	codes segment
		start:
			mov ax, datas
			mov ds, ax
			lea dx, str
			mov ah, 9
			int 21h
			mov ah, 4ch
			int 21h
	codes ends
		end start

可以使用vim写代码(当然如果你嫌影响你的心情的话，可以使用`EDIT.COM`)  

### 在dosbox中编译连接  

	C:\> masm hello.asm

编译生成hello.obj的连接文件

	C:\> link hello.obj

连接生成hello.exe的可执行文件  

	C:\> hello.exe
	hello,world

至此结束  

## 一些自言自语  

*为什么选择MASM呢？*  
事实上，各大高校的汇编语言学习都是使用MASM的语法，而Linux下的NASM的语法和其还是有些差异的  
(不要问我为何在Linux下使用MASM，我能告诉你这是我的偏执吗?嘿嘿...)  

*为什么还要学习汇编?*    
这个各人有个人的理由吧，而我只是单纯想了解一下底层程序的运行机制  


## 推荐  

对于汇编学习，推荐王爽先生的《汇编语言》  
对于dosbox的其他用法，请使用Linux下的`man dosbox`  
对于其它问题，请留言或者google  

[masm_tar_bz2]: http://yun.baidu.com/share/link?shareid=507770005&uk=388194121 "masm.tar.bz2"
