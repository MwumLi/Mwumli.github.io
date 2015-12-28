---
layout: post
title: "构建 SSH 隧道 -- 端口转发"
toc: "true"
modifyTime: "2015-09-25 11:37:21"
description: "使用 SSH 进行端口转发被称作 SSH 隧道, 即 SSH Tunnel"
category: 记录
tags: [Linux, Tunnel, cmd, SSH, 端口转发, Port, Forwarding]
---
{% include LU/setup %}
{% include LU/gen_toc %}

## SSH 隧道  

使用 SSH 可以进行端口转发，从而实现流往某端口的数据被加密后传向另一机器,这个过程形似构造了一条通道，因此也称之为 SSH 隧道(SSH Tunnel)

使用 SSH 隧道可以让数据被加密并透明地传输到远端系统  

### SSH 隧道的类型

SSH 隧道有三种类型 :  

1. 动态端口转发 (socks 代理)
2. 本地端口转发
3. 远程端口转发  

## 参数提前说明  

* `bind_address` -- 可选的, 监听的网卡地址
  1. 省略 -- 取决于  `GatewayPorts` 的设置(man 手册可以看到，但是没有在 Ubuntu 14.04中找到)   
  2. `localhost`/`127.0.0.1` -- 监听 127.0.0.1, 仅能用于本地    
  3. `0.0.0.0`/`*` -- 监听本机所有网络接口

* `hostX` -- 主机 hostX 的 ip 或 域名  
* `hostX_port` -- 主机hostX 的空闲端口
  1. 0 - 1023 : 特权端口,只能 root 用户才能进行端口转发  
  [特权端口列表](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports)  
  2. 1024 - 65535 : 选择一个没被占用的端口

* `user@hostX` -- 用户名为 `user` 可以登录主机 hostX  

## 动态端口转发 -- SOCKS 代理

支持 SOCKS4 和 SOCKS5 代理

### 假设

1. 存在两台主机 host1, host2

2. host1 可以 SSH 连接 host2 

可以使 host1 某端口的数据发往 host2, host2 根据其应用程序协议发出到指定地址, 就好像是从 host2 直接发出的数据  

可以认为我们搭建了一个[代理服务器(Proxy Server)](https://en.wikipedia.org/wiki/Proxy_server)

于是就有了下面这个命令 (`host1上执行`)

### 命令原型

	host1 $ ssh -D [bind_address:]host1_port user@host2

动态端口转发的过程 :  

1. host1 申请了一个 socket 来监听 `bind_address:host1_port`  

2. host1 与 host2 建立一条 ssh 隧道  

3. 当 host1 有请求 `bind_address:host1_port`, 请求数据会从 ssh 隧道发往 host2  

4. host2 收到数据, 根据数据的应用程序协议去发送数据到指定的地址  

5. 返回数据会按原有路径返还


### 实际使用

	host1 $ ssh -D 127.0.0.1:7070 user@host2

1. chrome 上使用 proxy SwitchySharp 进行代理设置  
   1. 新建情景模式 `proxy`, 在 `socks代理` 那行填入 `127.0.0.1` 和 端口那栏填入 `7070`  
   2. 点击 proxy SwitchySharp 的头标, 勾选 `proxy`

2. Ubuntu 下使用 proxychains 为应用程序设置代理  
   1. 安装 -- `sudo apt-get install proxychains`  
   2. 修改配置文件(`/etc/proxychains.conf`)的 `[ProxyList]` 为自己的代理 : `socks4 127.0.0.1 7070`
   3. 让程序使用代理 : `proxychains program-name`

3. 可以使用 `curl` 进行下载验证  

		$ curl --socks5 localhost:7070 download-link

## 本地端口转发

### 假设

1. 存在三台主机 host1, host2, host3  
2. host1 和 host3 不能通信  
3. host2 可以同时和 host1 与 host3 通信  

因此, 我们可以借助 host2 实现 host1 和 host3 的通信

于是就有了下面这个命令原型(`host1 上执行`)

### 命令原型

	
	host1 $ ssh -L [bind_address:]host1_port:host3:host3_port user@host2
	

本地端口转发的过程 :  

1. 绑定 host1 的 `bind_address:host1_port`, 与 host2 构建一条 SSH 隧道  

2. 当我们请求 `bind_address:host1_port` 时, 请求的数据通过 SSH 隧道到达 host2，host2 就会把数据发送到 host3 的 `host3_port`  

3. 返回的数据按照原路返回


### 实际使用  

1. 通过访问 host1 本地 8080 端口来访问 host3 的 80 端口(host3 已经安装 Web 服务)  

		host1 $ ssh -L 8080:host3:80 user@host2
 
   执行完成，在 host1 浏览器中 输入 `localhost:8080` 即可看到 host3 的 Web 页面  
   如果使用 xshell 等工具访问 host1, 那么可以使用 `curl localhost:8080` 来查看 Web 内容

2. host1 使用 ssh 登录 host3 : 

		host1 $ ssh -L 2030:host3:22 user@host2
	
   现在你可以在另开一个 host1 终端输入 : `ssh -p 2030 user@host3` 去登录 host3



## 远程端口转发

### 假设

1. 存在三台主机 host1, host2, host3  
2. host1 和 host3 不能相互访问
3. host2 可以和 host3 相互访问
4. host2 可以 ssh 访问 host1  
5. host1 不可以访问 host2

这样的话, host1 就不可以 ssh 连接 host2 了，所以本地端口转发就不能用了  
而 host2 可以 ssh 连接 host1, 那么 host1 就可以借助这条连接与 host3 进行通信  

这就是 SSH 的远程端口转发  

于是就有了下面这个命令原型 (`host2 上执行`)

### 命令原型

	
	host2 $ ssh -R [bind_address:]host1_port:host3:host3_port user@host1
	

远程端口转发的过程 :  

1. host2 与 host1 构建了一条 ssh 隧道

2. host1 申请了一个 socket 随时监听 `bind_address:host1_port`

3. 当 host1 有请求 `bind_address:host1_port` 时, 请求的数据会从 ssh 隧道 发往 host2  

4. host2 收到数据, 然后转发数据到 `host3:host3_port`  

5. 返回数据按原路径返还

### 实际应用

1. 通过访问 host1 本地 8080 端口来访问 host3 的 80 端口(host3 已经安装 Web 服务)  

		host2 $ ssh -R 8080:host3:80 user@host1
 
   执行完成，在 host1 浏览器中 输入 `localhost:8080` 即可看到 host3 的 Web 页面  
   如果使用 xshell 等工具访问 host1, 那么可以使用 `curl localhost:8080` 来查看 Web 内容

2. host1 使用 ssh 登录 host3 : 

		host2 $ ssh -R 2030:host3:22 user@host1
	
   现在你可以在另开一个 host1 终端输入 : `ssh -p 2030 user@host3` 去登录 host3

## SSH 一些辅助参数
* `-q` -- 安静模式. 抑制警告和诊断信息    
* `-T` -- 不分配伪终端，只是使用隧道  
* `-N` -- 不运行远程命令(仅对端口转发有用)  
* `-f` -- 后台运行  
   * 配合 `-N` 一起使用, 否则产生 `Cannot fork into background without a command to execute.`的错误  
   * 或者在命令末尾加上一个简单的命令 : `sleep 30`  
	
* `-n` -- 重定向标准输入到 `/dev/null`(阻止从标准输入读)
* `-o ServerAliveInterval=60` -- 让 SSH 每隔一段时间发送一些消息,避免隧道关闭 `Write failed: Broken pipe`	
* `-v` -- 打印调试信息

		ssh -qTfnN -D 7070 xxx@yyy.com	//ssh 后台动态端口转发


## 相关命令  

* 查看端口是否占用 : `sudo lsof -i :port`
* 使用 `curl` 下载文档  


## 代理软件  

1. [proxycap](http://www.proxycap.com/download.html) -- windows
2. [Proxifier](http://www.proxifier.com/) -- windows/OS -- 全局代理
3. [proxychains](http://proxychains.sourceforge.net/) -- Linux
4. [readsocks](https://github.com/darkk/redsocks) -- Linux
5. [tsocks](http://tsocks.sourceforge.net/) -- Linux -- 全局代理
6. [Proxy SwitchySharp](https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm?utm_source=chrome-app-launcher-info-dialog) -- chrome
7. `curl` 支持 socks4/SOCKS5 等代理下载  -- 太棒了, 命令行用起来很方便  

