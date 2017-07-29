---
layout: post
title: "使用 SSH 进行远程操作"
description: "使用 ssh 进行远程操作，而不用登录进服务器"
category: 记录
tags: [SSH, Linux, cmd]
toc: true
modifyTime: "2015-09-23 05:38:18"
---

{% include gen_toc %}

使用 SSH 可以实现直接在本地对远程主机执行操作  

## ssh-copy-id 做了什么

	$ ssh-copy-id ifmicro@remote-host  

它实现了这样一个功能 :  

	把 `~/.ssh/id_rsa.pub` 内容添加到 remote-host 的用户 ifmicro 的用户主目录下的文件 `~/.ssh/authorized_keys` 的末尾  

通过命令组合, 我们也可以实现同样的功能 :  

	$ ssh ifmicro@remote-host 'mkdir -p .ssh && cat >> .ssh/authorized_keys && chmod 600 .ssh/authorized_keys' < ~/.ssh/id_rsa.pub

因此, 我们可以得出这样一个结论 :  

	SSH 可以在用户和服务器之间，建立一条通道来实现命令和数据的传输  

## 做些什么(几个实例)

1. 复制 `hello-cpp/` 目录下的东西到远程主机的 `~/hello-cpp` 目录下 :  

		$ tar czv hello-cpp | ssh ifmicro@remote-host 'tar xz'

2. 将服务器 `~/hello-cpp/` 下的东西复制到本地当前目录 : 

		$ ssh ifmicro@remote-host 'tar czv hello-cpp' | tar xz

3. 查看服务器的有多少个用户 :  

		$ ssh ifmicro@remote-host 'ls .. | wc -w'

## 远程自动化脚本的实现  

	#!/bin/bash
	# 这只是一个远程自动化脚本的架构  
	remote_auto(){
		ssh -T $1 <<"EOF"
		echo "Hi, I'm in $1, my name is"$(whoami);
		pwd;
		# 这里可以添加更多的命令
		EOF
	}

	# 这里可以继续添加更多其他服务器执行任务
	remote_auto ifmicro@remote-host-1 &
	remote_auto ifmicro@remote-host-1 &
	...

	# 等待所有后台进程结束
	wait 
	# 做些结果处理

1. 自行填充这个脚本中的内容  
2. 请学习 [here Document](http://www.tldp.org/LDP/abs/html/here-docs.html) 的语法
3. 根据需求使用 `ssh -T` 或 `ssh -t` 、`ssh -tt`

### 是否允许分配伪终端

当采用 Here Document 执行命令的时候，可能会出现 : 

	Pseudo-terminal will not be allocated because stdin is not a terminal.
	
意思是无法分配一个伪终端给这个 ssh 链接  

在伪终端中执行脚本, 可以进行交互  
而没有伪终端, 则不能进行交互  


因此对于此的解决方案就呼之欲出了 :  

1. 禁止分配伪终端 -- 使用 `ssh -T`
2. 强制分配伪终端 -- 使用 `ssh -t`  或 `ssh -tt`

这里是 `man ssh` 中这两个参数的描述 : 

	-T	Disable pseudo-terminal allocation.
	-t	Force pseudo-terminal allocation. This can be used to execute arbitrary screen-based 
		programs on a remote machine, which can be very useful, e.g. when implementing menu 
		services. Multiple -t options force tty allocation, even if ssh has no local tty
	

我们上面的自动化脚本框架中使用了 `ssh -T`, 是因为对于自动化来说，基本上不用交互的  
当然也有可能需要交互, 可以考虑 `expect` 来实现自动交互  

### 参考链接  

* [a-simple-way-to-send-multiple-line-commands-over-ssh](http://www.unixmantra.com/2014/03/a-simple-way-to-send-multiple-line-commands-over-ssh.html)
* [Here Document-en](http://www.tldp.org/LDP/abs/html/here-docs.html)
* [Here Document-zh](http://shouce.jb51.net/shell/here-docs.html)  
* [shell 操作之 read、cat 和 here document](http://www.open-open.com/lib/view/open1415793400445.html)

