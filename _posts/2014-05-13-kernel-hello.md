---
layout: post
title: "来自Linux内核的hello,world"
toc: "true"
modifyTime: "2015-09-25 15:34:48"
description: "简单讲解 Linux 内核模块的定义以及加载,卸载,查看, 最后写了一个简单的 HelloWorld 模块"
category: 记录
tags: [Linux, Kernel, 内核]
---
{% include LU/setup %}

## Linux内核模块

### 内核模块是什么	

内核模块是Linux内核向外部提供的一个插口,其全程为动态可加载内核模块(LVM,Loadable Kernel Module),简称模块  

内核模块是具有独立功能的程序，可以被单独编译，但不能独立运行  
它在运行时被链接到内核作为内核的一部分在内核空间，这和我们平时在用户空间的进程不同  

内核模块通常由一组函数和数据结构构成

### 内核模块的来由

Linux是一个单内核操作系统  
它有着单内核的优点**效率高**,因为所有内容都集成在一起  
同样，缺点也是显而易见的，可扩展性和可维护性相对较差，模块机制正是为了弥补这一缺陷  

### 内核模块可以做什么  

模块作为内核功能的一个扩展,是为了在保持内核体积较小的情况下，增强其功能  
内核只需要完成必要的功能即可，其他的功能都可以通过模块进行增强，类似于Vim的插件机制  

内核模块用来实现一种文件系统，一个驱动程序和其他内核上层的功能

## 来自内核的hello,world

### 内核版本的hello,world  

{% highlight c%}
/*hello_world.c*/
	#include <linux/init.h>
	#include <linux/module.h>
	#include <linux/kernel.h>

	MODULE_LICENSE("GPL");

	static int __init hello_init(void)
	{
		printk(KERN_ALERT "Hllo,kernel world\n");
		return 0;
	}

	static void __exit hello_exit(void)
	{
		printk(KERN_ALERT "goodbye,kernel\n");
	}

	module_init(hello_init);
	module_exit(hello_exit);

	MODULE_AUTHOR("MwumLi");
	MODULE_DESCRIPTION("Hello World's kernel version!\n");

{% endhighlight %}

一些说明:  

1. <linux/module.h>，<linux/init.h>,<linux/kernel.h>是Linux内核模块程序必不可少的三个头文件   
	* <linux/module.h>包含模块的结构定义以及模块的版本控制
	* <linux/init.h>包含了宏\_\_init和\_\_exit,函数module_init(),module_exit()
	* <linux/kernel.h>包含了常用的内核函数
	 
2. \_\_init告诉编译器此函数仅用于初始化，编译器将\_\_init的所有代码存储到特殊的内存区域,初始化完毕之后，这段内存将被释放掉;\_\_exit表示此段函数是模块卸载清理函数,当模块卸载之时，将执行此函数  

3. MODULE_*系列宏，是一些模块程序的说明信息，可选；但是，要注意的是MODULE_LICENSE("GPL")宏，如果模块中无此宏，编译的时候会出现警告(假如你特别在意此问题，那么加上即可)  

4. module_init()是模块加载函数，当模块加载时，会执行此函数参数指向的函数；module_exit()是模块卸载函数，当卸载模块的时候，会执行此函数参数指向的函数,必须  

### 编写Makefile文件

对于一般的Ｃ程序，我们只需要gcc就可以了，然后直接运行  
但是内核模块程序，我们必须使用内核中makefile文件，里面包含了内核库的位置  
因此，我们需要编写makefile文件来实现内核模块的编译  

{% highlight mf%}
  
	# this is a Makefile
	obj-m += hello_world.o
	#generate the path
	CURRENT_PATH:=$(shell pwd)
	#the current kernel version number
	LINUX_KERNEL:=$(shell uname -r)
	#the absolute path
	LINUX_KERNEL_PATH:=/usr/src/linux-headers-$(LINUX_KERNEL)
	#complie object
	all:
		make -C $(LINUX_KERNEL_PATH) M=$(CURRENT_PATH) modules
	#clean
	clean:
		make -C $(LINUX_KERNEL_PATH) M=$(CURRENT_PATH) clean

{% endhighlight %}

然后，在命令行下:  
	
		$ sudo make

这样就可以成功编译(报错的话，根据错误信息debug)

### 模块的加载，卸载，查看

* 模块加载到内核  
		
		$ sudo insmod hello_world.ko

* 查看内核中已经加载的内核模块  

		$ sudo lsmod | head

你会发现hello_word在第一行,okay,加载成功

* 从内核卸载模块  

		$ sudo rmmod hello_world

* 查看编译成功的内核模块信息  

		$ sudo modinfo hello_world.ko


