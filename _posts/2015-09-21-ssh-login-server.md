---
layout: post
title: "使用 SSH 登录服务器"
toc: "true"
odifyTime: "2015-09-22 23:35:10"
description: "使用 SSH 登录服务器的两种方法: 采用密码口令验证和使用公钥实现无密码登录"
category: [记录]
tags: [SSH, Linux]
---
{% include LU/setup %}
{% include LU/gen_toc %}

## SSH 是什么

[SSH](https://en.wikipedia.org/wiki/Secure_Shell) 是一个允许两台电脑之间通过安全的连接进行数据交换的网络协议  
它采用公钥加密技术对传输的数据进行加密, 保证了数据的保密性和完整性  

[OpenSSH](https://en.wikipedia.org/wiki/OpenSSH) 是 SSH 协议的一种实现，是一种比较 popular 的远程登录服务器的软件

## 安装 SSH

Linux 主机普遍默认安装 OpenSSH  

客户端安装 ssh client 去登录服务器 : 

	$ sudo apt-get install openssh-client

服务器端安装 ssh server 用以验证客户端的登录 :  

	$ sudo apt-get install openssh-server

## 两种登陆方式  

SSH 提供两种登录服务器的方式 :  

* 使用密码口令
* 使用公钥实现无密码登录  

在此，做出以下假定 :  

1. 服务器上的用户名 : `ifmicro`  
2. 服务器地址 : `remote-host`
3. 服务器的 SSH 服务监听端口 : `22`(默认)

### 使用密码口令登录服务器  

#### 使用

	$ ssh ifmicro@remote-host

如果本地用户名也是 `ifmicro` , 那么 :  

	$ ssh ifmicro

假如你的服务器 SSH 服务监听端口是 `2222` , 那么 :  

	$ ssh -p 2222 ifmicro@remote-host

#### 验证流程

1. 客户端想服务器发送登录请求
1. 服务器收到请求，把自己的公钥发给用户  
2. 用户使用这个公钥，对自己的密码进行加密，然后发送给服务器  
3. 服务器用自己的私钥对收到加密后的密码进行解密，如果密码正确，就同意用户登录  

### 使用公钥实现无密码登录

#### 使用

1. 生成公钥和私钥(如果存在，请忽略) :  

		$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

		Generating public/private rsa key pair.
		Enter file in which to save the key (/home/vagrant/.ssh/id_rsa):
		Enter passphrase (empty for no passphrase):
		Enter same passphrase again:
		Your identification has been saved in /home/vagrant/.ssh/id_rsa.
		Your public key has been saved in /home/vagrant/.ssh/id_rsa.pub.
		The key fingerprint is:
		2e:a3:02:c9:f1:bd:bd:d3:2e:85:26:4c:4a:b6:d1:11 your_email@example.com
		The key's randomart image is:
		+--[ RSA 4096]----+
		|     E.          |
		|     .           |
		|    . .          |
		| . + o           |
		|..= B   S        |
		|o. + + + .       |
		| .    B +        |
		|  .  o * .       |
		|   ..  .=.       |
		+-----------------+

   一路默认即可，生成的私钥和公钥位于 `~/.ssh/` : `id_rsa`(私钥) 和 `id_rsa.pub`(公钥)  

2. 把公钥添加到服务器的 `~/.ssh/authorized_keys` 末尾:  

		$ ssh-copy-id -i id_rsa.pub ifmicro@remote-host
		/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
		/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
		ifmicro@remote-host's password:

		Number of key(s) added: 1

		Now try logging into the machine, with:   "ssh 'ifmicro@remote-host'"
		and check to make sure that only the key(s) you wanted were added.

   可以看到已经成功添加  

3. 使用 ssh 登录服务器 : 

		$ ssh -i ~/.ssh/id_rsa ifmicro@remote-host
		Last login: Tue Sep 22 06:39:30 2015 from 10.18.61.57
		ifmicro@remmote-host $ 

   如果私钥是 `~/.ssh/id_rsa` ，那么可以忽略 `-i ~/.ssh/id_isa`  选项  
   否则，请用 `-i private_key` 指定私钥  

#### 登录流程

1. 客户端向服务器发送登录请求
2. 服务器收到请求后, 向客户端发送一断随机字符串  
3. 客户端收到字符串，然后用自己的私钥进行加密，发送给服务器  
4. 服务器用实现客户给的公钥进行解密, 如果解密成功, 证明用户可信，登录成功


### 第一次登录服务器  

第一次登录服务器 , 系统会有如下提示 :  

	The authenticity of host 'remote-host (10.108.79.5)' can't be established.
	RSA key fingerprint is 31:51:f8:e3:53:01:c4:76:af:60:9c:3b:b3:1b:5e:37.
	Are you sure you want to continue connecting (yes/no)?

这段话意思是本地主机在这之前没有与服务器 remote-host 建立过链接, 无法确定服务器的真实性  
只知道 RSA 公钥的指纹[^fingerprint]，是否要继续连接  

[^fingerprint]: 对 RSA 公钥进行 MD5 计算生成的一个 128 位的指纹  

使用 `ssh-keygen` 工具可以生成 SSH 密钥对，其中公钥的长度很长，对于用户来说不容易比较  
因此对其进行 MD5 计算生成的 128 位指纹进行比较就非常容易了  

为了确认主机的真实性，这里就要求我们事先知道服务器的公钥指纹  

如果你确定这是你要登录的那台服务器，那么输入 `yes` 继续连接  

1. 如果你采用密码口令登录服务器，那么

		Warning: Permanently added 'remote-host,10.108.79.5' (RSA) to the list of known hosts.
		Enter passphrase for key '/home/vagrant/.ssh/id_rsa':
	
   输入密码，如果密码正确，那么登录成功  

2. 如果你采用公钥认证登录服务器, 那么输出上面这条 `Warning`, 就直接登录上服务器

	
第一次登录成功后, 服务器的公钥会被保存到文件 `$HOME/.ssh/known_hosts` 中  
下次登录服务器，`Warning` 消失  

每个 SSH 用户都有自己的 `known_hosts` 文件  
系统也有一个这样的文件，通常是 `/etc/ssh/ssh_known_hosts` 保存一些对所有用户都可信赖的服务器的公钥  

### 中间人攻击

SSH 之所以可以保证安全，是因为采用了公钥加密信息  

在上面我们可以看到，使用密码口令的真个过程本身是安全的, 但是存在这个一个风险 ：  

	如果有攻击者截获了用户的登录请求，然后冒充服务器，将伪造后的公钥发送给用户  
	用户在不知情或难辨真伪的情况下,用这个伪造密钥进行加密，然后发送给服务器  
	然后攻击者又一次截获，获得用伪造密钥加密的密码，然后用自己的私钥进行解密，就得到了用户在服务器上的账号和密码  

对于使用口令进行 ssh 登录的情况下，伪造的公钥很难辨别真伪  
因为公钥都是自己签发的, 没有证书中心 (CA) 公正

可以设想一下 :  

	如果攻击者在用户登录服务器时, 截获登录请求，并用伪造的公钥欺骗用户, 那么很容易获取用户在服务上的登录密码  
	然后攻击者就可以在服务器上为所欲为(如果有权限的话)
	这样, SSH 的安全机制就荡然无存  

这就是著名的 [中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)(Man-in-the-middle attack)  

所以，基于密码的安全认证是无法避免中间人攻击  


## 公钥加密技术

公钥加密技术提供两个密钥 : 公钥(id_rsa.pub) 和 私钥(id_rsa)  

公钥加密技术主要是利用公钥和私钥的互相加密和解密的非对成性 :   

1. 公钥加密的文件，只能被私钥解密
2. 私钥加密的文件，只能被公钥解密  

普通的加密技术的加密运算和解密运算使用同样的密钥, 被称作对称密码学  

[数字签名是什么](http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)

## 一些思考

1. 为什么要修改 ssh 服务的默认端口 22 ?  
   默认情况下, ssh 服务的端口为 22, 所以那些骇客们都会先从 22 端口入手, 通过 "暴力手段" 获取登录密码  
   所以, 建议修改 ssh 服务默认端口, 这样能一定程度上过滤掉一些不怀好意的访客  
   (虽然说对有心者并没什么鸟用,但是多做点防护总没坏处)

2. `ssh-copy-id` 到底做了什么?  
   事实上, ssh-copy-id 做了下面脚本做的事 : 

		$ ssh ifmicro@remote-host 'mkdir -p .ssh && cat >> .ssh/authorized_keys && chmod 600 .ssh/authorized_keys' < ~/.ssh/id_rsa.pub

## 一些相关的文件  

1. `id_rsa`(私钥) 和 `id_rsa.pub`(公钥)  
   * 默认情况下, 位于 `~/.ssh/id_rsa`、`~/.ssh/id_rsa.pub`  
   * 这是使用 `ssh-keygen` 指定 `-t rsa` 默认生成的私钥和公钥, 可以在过程中指定生成的文件名    
   * 默认情况下, ssh 只会读取 `~/.sss/id_rsa` 去加密  
     如果使用非默认的私钥, 那么需要在 `ssh -i private-key` 或者使用 `ssh-agent` 去管理 
   * 要保持当前文件权限为 `600`

2. `authorized_keys` -- 存储来自客户端的公钥  
  * 默认情况下, 位于 `~/.ssh/authorized_keys`  
  * 把来自客户端的公钥添加到这个文件中，就可以实现无密码登录  
  * 要保持当前文件权限为 `600`  

##  待补充

1. ssh-agent 和 ssh 之间的关系  

4. ssh 端口转发  
   [SSH原理与运用（二）：远程操作与端口转发](http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html)

5. [Arch Linux](https://wiki.archlinux.org/index.php/Secure_Shell_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))


6. [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys/)

s. [开发自动化脚本](http://www.ibm.com/developerworks/cn/aix/library/1006_lisali_sshlogon/#major6)
