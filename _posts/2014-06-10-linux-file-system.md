---
layout: post
title: "Linux文件系统的创建和挂载"
toc: "true"
modifyTime: "2015-09-25 16:42:35"
description: ""
category: 记录
tags: [Linux, cmd, 文件系统]
---
{% include LU/setup %}

### 如果您想 
如果您想加载一个分区（文件系统）:  
首先您得确认文件系统的类型，然后才能挂载使用  
比如通过mount 加载，或者通过修改 /etc/fstab来开机自动加载   

如果您想添加一个新的分区或者增加一个新的硬盘:  
您要通过分区工具(`fdisk`)来添加分区  
然后要创建分区的文件系统 (`mkfs`) 
然后才是挂载文件系统(mount)  


### 存储设备的分区  
存储设备主要是本地硬盘、移动硬盘  
由于磁盘很大并且为了满足我们各种需要，所以把硬盘分成若干个分区  
比如我们可以用这个分区来安装Linux系统，那个分区用来 安装Windows系统...  

Linux中进行硬盘分区操作,可以使用fdisk  

### 文件系统  
对存储设备分区，这个新的分区还不能正常使用，我们需要对其格式化  
即存储设备的格式化就是建立文件系统的过程  

Windows下的文件系统,熟知有NTFS, msdos ...
Linux下的文件系统，熟知的有ext2、ext3、swap 交换分区... ...   
U盘的文件系统，有FAT32, fat16 ... 
还有一些咱们不熟悉的操作系统的文件系统等  

我们通常使用文件系统格式化工具进行*文件系统的建立*  

### 文件系统的建立

`mkfs`就是Linux下常用的建立文件系统的工具  
`mkfs.nefs`, `mkfs.vfat`, `mkfs.ext2`, `mkfs.ext3`, `mkfs.ext4`等工具，也是Linux下建立文件系统常用工具  
事实上，`mkfs`也是更具提供的格式化文件系统类型参数，来调用这些工具实现指定文件系统的建立  

`mkfs`的命令格式  

	mkfs -t 文件系统类型 存储设备 

首先，查看Linux下所有分区，确定分区的存储设备  

	$ sudo fdsik -l
	Disk /dev/sda: 120.0 GB, 120034123776 bytes
	255 heads, 63 sectors/track, 14593 cylinders, total 234441648 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 4096 bytes
	I/O size (minimum/optimal): 4096 bytes / 4096 bytes
	Disk identifier: <0x000d9852>	</0x000d9852>

	   Device Boot      Start         End      Blocks   Id  System
	/dev/sda1            2048    15624191     7811072   82  Linux swap / Solaris
	/dev/sda2   *    15624192   234440703   109408256   83  <Linux>	</Linux>

	Disk /dev/sdb: 500.1 GB, 500107862016 bytes
	255 heads, 63 sectors/track, 60801 cylinders, total 976773168 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 4096 bytes
	I/O size (minimum/optimal): 4096 bytes / 4096 bytes
	Disk identifier: <0x5be4a3f9>	</0x5be4a3f9>

	   Device Boot      Start         End      Blocks   Id  System
	/dev/sdb1   *        2048   409602047   204800000    7  HPFS/NTFS/exFAT
	/dev/sdb2       409602048   593922047    92160000    7  HPFS/NTFS/exFAT
	/dev/sdb3       593922048   778242047    92160000    7  HPFS/NTFS/exFAT
	/dev/sdb4       778244094   976771071    99263489    5  Extended
	Partition 4 does not start on physical sector boundary.
	/dev/sdb5       778244096   797773823     9764864   82  Linux swap / Solaris
	/dev/sdb6       797775872   976771071    89497600   83  <Linux>	</Linux>

	Disk /dev/sde: 16.4 GB, 16358768640 bytes
	255 heads, 63 sectors/track, 1988 cylinders, total 31950720 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk identifier: <0xcad4ebea>	</0xcad4ebea>

	   Device Boot      Start         End      Blocks   Id  System
	/dev/sde4   *          63    31950719    15975328+   c  W95 FAT32 (LBA)  
	
`/dev/sde4`是我U盘，以此为实验  
接着，为存储设备重新建立文件系统，即格式化一个新的文件系统  
那么，建立ext4文件系统  

	$ sudo mkfs -t ext4 /dev/sde4  
	mke2fs 1.42.9 (4-Feb-2014)
	Filesystem label=
	OS type: Linux
	Block size=4096 (log=2)
	Fragment size=4096 (log=2)
	Stride=0 blocks, Stripe width=0 blocks
	999424 inodes, 3993832 blocks
	199691 blocks (5.00%) reserved for the super user
	First data block=0
	Maximum filesystem blocks=4093640704
	122 block groups
	32768 blocks per group, 32768 fragments per group
	8192 inodes per group
	Superblock backups stored on blocks: 
		32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208
 
	Allocating group tables: done                            
	Writing inode tables: done                            
	Creating journal (32768 blocks): done

同样，我们使用下面这条命令，也可以达到一样的效果  

	$ sudo mkfs.ext4 /dev/sde4  

#### 关于swap分区  
创建此分区为swap 交换分区  

	$ mkswap /dev/sda6

加载交换分区  

	$ swapon /dev/sda6 

关闭交换分区  

	$ swapoff /dev/sda6

查看交换分区  
	
	$ swapon -s		或者  
	$ cat /proc/swaps

可以考虑下下面这种情况:内存不足，swap交换分区爆满,您的硬盘不能再分区  
此时怎么办呢? 你可以创建一个swap文件,并把其当作格式化swap来使用  

创建一个大小为512M 的swap 文件，在/tmp目录中  

	$ dd if=/dev/zero of=/tmp/swap bs=1024 count=524288
	$ mkswap /tmp/swap
	$ swapon /tmp/swap

### 文件系统的挂载  
当我们需要访问某个文件系统时，必须要进行文件系统的挂载  
挂载文件系统，目前有两种方法:  
1. 通过 mount 来挂载  
2. 通过/etc/fstab文件来开机自动挂载  

#### 通过mount 来挂载磁盘分区（或存储设备）  
mount的命令格式:  

	mount -t type device dir

`参数说明:`  
**-t** 指定文件系统的类型  
一般的情况下不必指定有时也能识加   
`-t `后面是`type`,`type`是文件系统类型( ext3 、ext2 、reiserfs、vfat 、ntfs 等)  
如果你忘记了文件系统，`type`就是 `auto`；  

*需要注意的是:* mount挂载文件系统,当挂载目录在挂载文件系统之前有文件存在,挂载之后文件消失(实际存在，只是看不见),只能看见当前挂载文件系统下的文件;当然，在卸载后，则会恢复  


**device** 指存储设备  
比如/dev/hda1， /dev/sda1 ，cdrom 等...   
你可以通过`fdisk -l`查看存储设备  
一般的情况下光驱设备是/dev/cdrom ；  
软驱设备是/dev/fd0 ；  
硬盘及移动硬盘以 fdisk -l 的输出为准；  

**dir** 挂载点  
一般是个目录,这个目录通常被使用`chmod`改写权限为`777`，这样任何用户都能写入了  
假如`dir`为空，那么会自动寻找挂载点  

#### 查看已挂载的分区
1. 使用df  

		$ df -lh

2. 使用mount  

		$ mount

你也可以通过显示/proc/mounts 或 /etc/mtab 来查看类似信息  

#### 通过/etc/fstab文件来开机自动挂载文件系统
这个文件中存在的文件系统，是开机自动挂载  
因此，当我们需要开机挂载某些文件系统的话，就直接在此文件后面添加（当然，按照固定格式）   

此文件每条记录的格式  

	<file system>  <mount point> <type> <options> <dump>  <pass>  

`一共6个字段:`  
`file system`: 设备名，即文件系统，例如/dev/sda1  
`mount point`: 文件系统挂载点  
`type`: 文件系统类型  
`options`: mount挂载文件时，使用-o指定的选项,具体查阅man手册  
`dump`: 文件系统是否需要dump 备份，1是需要，0 是不需要  
`pass`: 是否在系统启动时，通过fsck磁盘检测工具来检查文件系统，1是需要，0是不需要，2是跳过  

swap分区在fatab中:  

	LABEL=SWAP-hda7 swap swap defaults 0 0

文件系统为/dev/sdd4,文件系统挂载点为~/mnt,文件系统类型vfat:  

	/dev/sdd4 ~/mnt vfat defaults 0 0

### 文件系统的卸载  
使用umount来卸载  
卸载一个已有文件系统时，指出挂载点或者设备名其中一个就足够了，没有必要> 都指出  

	$ sudo umount device	或者  
	$ sudo umount dir

*需要注意的是:*  
1. 当一个文件系统被卸载之后，作为挂载点的目录下的那些文件会再次出现  
2. 如果您想卸载一个文件系统，而此时进程已打开了该文件系统上的文件，将会出现一个错误消息。  
3. 卸载文件系统之前，您应当确认没有进程正在该文件系统的文件上运行(`lsof -w device` 或者 `lsof -w dir`再或者`lsof -w single_file`)  
4. `umount`使用`-l`参数进行懒卸载(直接从文件系统树分离文件系统，然后，在文件系统空闲时，清理文件系统附加项)  

### 两个比较特殊的文件  
* /dev/null  
	
		它是空设备，也称为位桶（bit bucket）。
		任何写入它的输出都会被抛弃。
		如果不想让消息以标准输出显示或写入文件，那么可以将消息重定向到位桶。

一般用于错误信息或者垃圾信息重定向  
* /dev/zero  

		该设备无穷尽地提供0  
		它可以用于向设备或文件写入字符串0。

一般用于初始化某个文件和分区,例如`dd if=/dev/zero of=/tmp/heihei`    

---  

### 相关链接 
* [《Linux文件系统的安装和卸载》](http://os.51cto.com/art/201012/239233_all.htm "Linux文件系统的安装和卸载")  
* [《学习 Linux，101: 创建分区和文件系统》](http://www.ibm.com/developerworks/cn/linux/l-lpic1-v3-104-1/ "学习 Linux，101: 创建分区和文件系统")  
