---
layout: post
title: "Raspberry Pi安装Debian Wheezy系统"
description: ""
category: 记录
tags: [Raspberrypi, 树莓派]
toc: true
modifyTime: "2015-09-25 17:01:30"
isShow: true
---

{% include gen_toc %}


### 碎碎念  

Raspberry Pi，是一款基于Linux系统的、信用卡大小的单板机电脑  
它的出现源于一个想**制作一套启发孩子的电脑**的想法  
看来一切美好的事情背后总是有一颗让人心动的理念，而这个理念往往才是他们获得流行的动力  

![树莓派B2.0简图][raspberry_pic] 

### 系统安装  
可以用于Raspberry Pi的系统很多，有我们即将安装的Debian Wheezy,还有Arch Linux ARM, RISC OS等等  
对咯，Debian Wheezy更为常见的称呼是Raspbian,但是为了避免与Raspberry Pix形似，我特意称其为Debian Wheezy,也喜欢这样称呼(嘿嘿...)  
这些资源都可以送网络上获取，感谢互联网  

为树莓派安装系统很简单，开始咯  

1. 首先从[树莓派官网下载页][debian_wheezy]选择下载Debian Wheezy系统(第一个应该就是),这是树莓派专用系统  

2. 因为Raspberry Pi是从SD卡启动的(**没有BIOS和其他内部存储设备，只有一个SD卡槽**)，所以我们需要准备一张SD卡,8G大小(**更大更好，不过it depends**),把SD卡使用卡托或者读卡器接入你的计算机  

#### 不同平台下的镜像写入
* Windows  
	1. 请下载官方推荐工具[Win32 Disk Imager][win32diskimager]，它是一款绿色软件，点击即可使用  
	2. 运行软件，选择我们SD卡盘符，加载我们的Debian Wheezy镜像(**像2014-09-09-wheezy-raspbian.img**)，最后点击"Write",等待几分钟写入完成  
	3. 哦，对了，在写入镜像前，你也可以校验镜像的完整性，可以使用`fciv`命令生成SHA1校验码与网上公布的码值对比，如果一样，okay，没问题。不过假如你从官网下载镜像与软件以及网络环境没问题，那么应该不会有太大问题问题(**可忽略**)  

* Linux   
	1. 校验镜像，使用sha1sum生成SHA1校验码  

			$ sha1sum 2014-09-09-wheezy-raspbian.img 
			57a73544fab3f1163a14903647e55c3998bf9dc9  2014-09-09-wheezy-raspbian.img  
	
	2. 查看你的SD卡的准确位置，并确定是否挂载分区  

			$ df -h
			Filesystem      Size  Used Avail Use% Mounted on
			/dev/sda1       103G   37G   61G  38% /
			none            4.0K     0  4.0K   0% /sys/fs/cgroup
			udev            2.0G   12K  2.0G   1% /dev
			tmpfs           393M  1.3M  392M   1% /run
			none            5.0M     0  5.0M   0% /run/lock
			none            2.0G   58M  1.9G   3% /run/shm
			none            100M   40K  100M   1% /run/user
			/dev/sde2       3.6G  1.2G  2.4G  30% /media/mwumli/12C-3244-2342
			/dev/sde1		4.2G	0G	0G	   0% /media/mwumli/43C-2334-4354
	3. 如果挂载，请先卸载所有分区，以免发生错误  

			$ umount /dev/sde1
			$ umount /dev/sde2
	4. 使用`dd`写入镜像  

			$ sudo dd bs=1M if=2014-09-09-wheezy-raspbian.img of=/dev/sde 
			[sudo] password for mwumli:
			3125+0 records in
			3125+0 records out
			3276800000 bytes (3.3 GB) copied, 406.802 s, 8.1 MB/s

### 访问  
把写好的SD卡插入树莓派卡槽，连接上电源  

#### 和正常计算机一样访问
为树莓派配上显示器和键盘，鼠标，这样就和正常的计算机一样访问了   
但要注意的是USB接口在B2.0上只有两个，就算B+也只有4个  
同时还要注意电压不足的问题，这个问题好解决，买一个可以接入外接电源的USB集线器   

#### 通过ssh远程访问  
Debian Wheezy系统默认已经开启ssh服务，所以我们可以通过ssh进行远程访问，对于很多操作，那已足够  

	$ ssh pi@192.168.199.244
	pi@192.168.199.244's password: 
	Linux raspberrypi 3.12.28+ #709 PREEMPT Mon Sep 8 15:28:00 BST 2014 armv6l

	The programs included with the Debian GNU/Linux system are free software;
	the exact distribution terms for each program are described in the
	individual files in /usr/share/doc/*/copyright.

	Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
	permitted by applicable law.
	Last login: Sat Dec  6 23:08:25 2014 from mwumli-k43sa.lan
	pi@raspberrypi ~ $ whoami
	pi
	
##### 一些必要的小贴士
* 用户名为`pi`,密码为`raspberry`  
Debian Wheezy提供一个默认的用户名`pi`和密码`raspberry`(据说很久之前密码是`suse`,假如你足够幸运)  
`raspberry`不是一个很好的密码，因为很多地区的键盘布局并没有设置`y`(德国)，假如你是在国外，那么你可以使用`raspberrz`来登录  

* 获取你的Raspberry Pi的IP   
请保证树莓派连接上网络，然后  
	* 你可以在路由器后台中查看你的树莓派的IP
	* 你可以在Windows下使用[PortScan][PortScan_exec]去查看,它会列出当前局域网内所有主机    
	* 你可以在Linux下使用`nmap`  

			$ nmap -sP 192.168.199.0/24  
			Starting Nmap 6.40 ( http://nmap.org ) at 2014-12-07 08:51 CST
			Nmap scan report for Hiwifi.lan (192.168.199.1)
			Host is up (0.39s latency).
			Nmap scan report for mwumli-K43SA.lan (192.168.199.104)
			Host is up (0.00036s latency).
			Nmap scan report for MI2A-xiaomishouji.lan (192.168.199.137)
			Host is up (0.64s latency).
			Nmap scan report for android-e54569f466270a09.lan (192.168.199.226)
			Host is up (0.34s latency).
			Nmap scan report for raspberrypi.lan (192.168.199.244)
			Host is up (0.016s latency).
			Nmap done: 256 IP addresses (5 hosts up) scanned in 14.32 seconds

具体可参考[Linux 查看局域网内所有主机IP和MAC的方法][Nmap_use]  
`nmap`的介绍可以参考[Nmap参考指南][Nmap_man]  
`nmap`的使用介绍可以参考[端口扫描工具namp的使用介绍][Nmap_Intro]

#### 使用VNC远程图形化访问  
1. Raspberry Pi安装VNC Server`tightvncserver`  

		$ sudo apt-get install tightvncserver  
2. 使用`vncpasswd`设置登录密码和一个view-only密码  

		$ vncpasswd
		You will require a password to access your desktops.
	
		Password: 
		Verify:   
		Would you like to enter a view-only password (y/n)? n
view-only密码仅仅用来查看，所以可以不设置  

3. 启用VNC Server   

		$ tightvncserver

在初次启动时，会提示步骤2的过程，之后就不会再提示  
每启动一次，就会建立一个虚拟屏幕，那个`:n`后面的数字n就是虚拟屏幕ID，我们使用VNC Client连接时需要  

4. 在你的计算机中使用VNC Client,客户端很多  
	* 安装chrome浏览器，使用VNC Viewer for Google Chrome插件  
	* 在这里下在[https://www.realvnc.com/download/](https://www.realvnc.com/download/ "一个VNC Software站点")  
	* Linux下可以通过命令安装  
		
			$ sudo apt-get install vncviewer xtightvncviewer  

用VNC客户端连接VNC服务端需要两个参数:`Pi的IP地址和屏幕的端口地址`  
VNC端口地址：`基础端口(默认5900)+屏幕ID`   
如果Pi的iP地址为:`192.168.199.227`，屏幕ID为:`1`  
那么在Linux下可以这样访问:  

		$ xtightvncviewer 192.168.199.227:5901

由于基础端口一般默认为5901,所以我们直接通过屏幕ID访问  

		$ xtightvncviewer 192.168.199.227:1

其他客户端访问一样，在输入地址区域输入:`Pi's IP:[base port]+Screen ID`   
然后选择连接即可  

### 配置  
使用`raspi-config`进行一些重要的系统配置  
主要是设置合适的区域以及扩展其可用存储空间  

*扩展文件系统到SD卡所有空间*

	$ sudo raspi-config 

好了出现一个命令行设置界面，选择第一项`Expand Filesystem`,设置完毕，然后重启即可生效  

Raspberry镜像在整个系统中只占用2G空间，即用户8G的SD卡，也只能被使用2G空间，那么一些大的软件将无法安装  

*设置区域*   
每个地区的语言环境不一样，造成我们使用的键盘布局不一样，排序方法不一样，设置合适的区域，便于我们操作  
而且各个地方的时间并不一致，难道你想坐在大白天看的时间凌晨一点吗?  

当然，假如你有此癖好，就请忽略  

*其他设置*  
按你的需求吧  

### 更换软件源  
树莓派的服务器在国外，在国内访问可能有点慢，额，应该很慢，还有些东西可能因为土啬的原因还下载不了  
还好Raspberry Pi官方提供了一个镜像列表:[http://www.raspbian.org/RaspbianMirrors](http://www.raspbian.org/RaspbianMirrors "树莓派软件源列表")  
就近原则选择更换吧  

编辑`/etc/apt/sources.list`  

	#deb http://mirrordirector.raspbian.org/raspbian/ wheezy main contrib non-free rpi
	deb http://mirrors.ustc.edu.cn/raspbian/raspbian/ wheezy main contrib non-free rpi 
	deb-src http://mirrors.ustc.edu.cn/raspbian/raspbian/ wheezy main non-free contrib rpi

保存，更新软件源  

	$ sudo apt-get update

我注释了旧的软件源，添加一个中国的软件源  

对咯，使用上面地址打开的是一个目录，然后我们需要进入当前目录的`dists`,然后可以看到`wheezy`目录,进入`wheezy`就可以看到`main`,`contrib`,`non-free`,`rpi`目录,每一个软件源的目录结构都是这样的，所以其他软件源的添加都这样办即可  

	deb http-address wheezy main contrib non-free rpi 

### 配置自动连接你的局域网  
修改/etc/network/interfaces,原内容如下  

	auto lo 

	iface lo inet loopback
	iface eth0 inet dhcp

	allow-hotplug wlan0
	iface wlan0 inet manual
	wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
	iface default inet dhcp

修改如下: 
	
#使用localhost
	
	auto lo

	iface lo inet loopback
	iface eth0 inet dhcp

	allow-hotplug wlan0 #表示wlan0设备可以热插拔
	iface wlan0 inet dhcp
	wpa-ssid your-wifi-ssid
	wpa-psk your-wifi-passwd

	iface default inet dhcp

OKay，以后就会自动连接上你的wifi，假如存在  

### 后记  
刚看到树莓派的时候，就一块布满电路的板子，瞬间有点懵，天生对电路过敏  

但事实上，关于电路的部分，人家已经为你封装好了(**多好的思想,感谢面向对象**),你只需要会一点软件的知识，痛快的玩就可以了  

文章很长，但还是觉得不够，很多东西还没讲到，但这些应该已经足够  

装系统其实只花费了一小会儿，而写文章却用了4个小时  

希望玩的愉快!...

[raspberry_pic]:/assets/imgs/640px-RaspberryPi.jpg "树莓派B2.0简图"  
[debian_wheezy]:http://www.raspberrypi.org/downloads/ "RaspberryPi OS下载页"  
[win32diskimager]:http://sourceforge.net/projects/win32diskimager/ "一个Windows下把原始数据写入可移动设备的工具"  
[PortScan_exec]:http://abel.oss.aliyuncs.com/file/PortScan.zip "一款Windows下的端口扫描工具"  
[Nmap_man]:http://nmap.org/man/zh/ "Nmap的Man手册"
[Nmap_Intro]:http://netsecurity.51cto.com/art/200801/63660.htm "端口扫描工具nmap使用介绍"  
[Nmap_use]:http://www.jbxue.com/LINUXjishu/10514.html "Linux 查看局域网内所有主机IP和MAC的方法"



