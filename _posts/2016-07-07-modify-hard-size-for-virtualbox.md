---
layout: post
title: "调整 virtualbox 虚拟机磁盘大小"
description: "你可以在 virtualbox 虚拟机构建以后, 重新调整虚拟机磁盘大小"
category: 记录
tags: [VirtualBox]
toc: true
modifyTime: "2016-07-07 22:50:44"
isShow: true
---

{% include gen_toc %}

VirtualBox 是一个免费的虚拟化产品, 可以用来构建虚拟机  
它可以运行各大平台(Mac/Linux/OS) 上, 可以支持现有的绝大部分系统  

VirtualBox 的构建的虚拟机一旦构建完毕, 磁盘的配置就几乎不能更改了, 至少从其界面并没有看到任何可以更改的操作  

但是并不是没有办法, VirtualBox 安装完成之后, 同时还集成安装了 VirtualBox 的一些工具命令  

比如 `VBoxManage`, 我们今天用它来解决调整 virtualbox 虚拟机磁盘大小这个问题  

1. 进入 Virutalbox 存放 VM 的路径,找到你的虚拟机的文件夹并进入  
   快捷方法 : `打开 virtualbox -> 右键你要操作的 VM -> 在文件搜索器 Finder 中显示`  
   我这里只是写了 Mac 下的操作内容, 其他平台也相差不多, 就最后一步的右键菜单内容有点不一样, 不过聪明的你一定知道怎么选择  
   		
		# 假设我们已经进来, VirtualBox 具体镜像文件夹下的目录内容如下
		$ ls
		Logs                                         docker_default_1462932932793_38985.vbox
		Snapshots                                    docker_default_1462932932793_38985.vbox-prev
		box-disk1.vmdk

2. 查看磁盘文件信息, 记录原来磁盘文件的 uuid  

		$ VBoxManage showhdinfo box-disk1.vmd
		UUID:           6f5838ee-4319-4885-8eea-6276c9fbbe37
		Parent UUID:    base
		State:          locked write
		Type:           normal (base)
		Location:       /Users/Luo/VirtualBox VMs/docker_default_1462932932793_38985/box-disk1.vmdk
		Storage format: VMDK
		Format variant: dynamic default
		Capacity:       40960 MBytes
		Size on disk:   2795 MBytes
		Encryption:     disabled
		In use by VMs:  docker_default_1462932932793_38985 (UUID: 76746809-f711-4936-915c-49e27195d4f7)
   可以看到 old UUID : `6f5838ee-4319-4885-8eea-6276c9fbbe37`  

2. 克隆 `.vmdk` 镜像为一个 `.vdi`  镜像  
	
		$ VBoxManage clonehd box-disk1.vmdk new-disk1.vdi --format vdi
		0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
		Clone medium created in format 'vdi'. UUID: af5fbd4d-b4f9-4392-b78d-00822b3c32ca

3. 调整 `.vdi` 镜像的大小  
   比如调整为 50G (51200MB)  

		$ VBoxManage modifyhd new-disk.vdi --resize 51200
		0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%

4. 克隆 `.vdi` 镜像为一个 `.vmdk` 镜像  

		$ VBoxManage clonehd new-disk.vdi resized-disk.vmdk --format vmdk
		0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
		Clone medium created in format 'vmdk'. UUID: 362b43f9-f562-49c9-8218-1235be0d16a7
   记下 new UUID : `362b43f9-f562-49c9-8218-1235be0d16a7`

5. 修改虚拟机镜像目录下的 `.box` 后缀的文件  
   > 使用 `new UUID` 替换所有的 `old UUID`  
   > 使用 `resized-disk.vmdk` 替换所有的 `box-disk1.vmdk`  


至此, 虚拟机的磁盘大小已经从 40G 调整到 50G  
(以前的 box-disk1.vmdk 和 中间生成的 new-disk1.vdi 文件你可以清除掉了)  

