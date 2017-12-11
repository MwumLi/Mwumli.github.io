---
layout: post
title: "使用 nc 读写 TCP/UDP 连接"
description: "`nc`, `netcat` 的缩写, 是类 unix 系统下一个功能强大的命令行网络工具, 用来在两台主机之间建立 TCP 或者 UDP 连接, 并通过标准输入输出进行读和写"
category: 记录
tags: [Linux, Net, cmd]
toc: true
modifyTime: "2017-12-12 00:22:40"
---
{% include gen_toc %}

`nc`, `netcat` 的缩写, 是类 unix 系统下一个功能强大的命令行网络工具, 用来在两台主机之间建立 TCP 或者 UDP 连接, 并通过标准输入输出进行读和写  

`nc` 强大之处在于输出是标准输出(`stdout`), 输入来自标准输入(`stdin`), 以至于可以很容易通过管道和重定向直接使用或被其他程序和脚本调用。正因为它的这种特性, 以至于你能发挥你的想象力用它做很多事情:  

* 端口扫描: 通过与目的 IP 建立连接, 从而扫描目的IP 的端口是否开放  
* 聊天工具: 一边使用 `nc` 监听一个端口, 另一边使用 `nc` 成功连接这个端口即可互相通信  
* 发送文件: 与目的 IP 建立连接, 配合重定向, 源地址读取文件, 目的地址接收文件
* 目录传输: tar 命令和管道的结合  
* 远程克隆磁盘: dd 命令和管道的结合  
* 配合 ssh config 的 ProxyCommand 命令进行跳板登录  
...


`nc` 有很多变种, `ncat`,`pnetcat`,`socat`,`sock`,`socket`,`sbd` 都是指它, 在不同的系统下, 都进行了不同程度的修改, 但是无论怎样, 都可以使用 `nc` 这个名字  

## 选项

下面列举的选项并不一定都能使用, 具体根据当前操作系统安装的 `nc` 版本有关  

* `-s source_ip_address`:  指定 `nc` 应用与远程主机建立连接的 IP  
	如果不使用此选项, 默认为使用 `0.0.0.0`  

* `-p source_port`: 指定 `nc` 应用与远程主机建立连接的源端口  
  如果不指定此选项, 则随机一个可用的端口  

* `-z`: nc 仅仅扫描指定主机的端口, 而不发送任何数据  


* `-w timeout`: 指定与远程主机建立连接成功后超过 timeout 秒自动断开连接  
  如果不使用此选项, 则默认无超时  

* `-l [ip]:port` : 监听端口 port, 相当于本机启动了一个服务  
  `ip` 是可选的, 如果不指定, 默认为 `0.0.0.0`

* `-x proxy_address[:port]`: 指定 nc 请求时使用的代理服务  
  `port` 是可选的, 如果不指定 port, 则代理服务的 port 为指定代理协议的众所周知的端口: `1080`(SOCKS), `3128`(HTTPS)  

* `-X proxy_version` - 指定 nc 请求时使用代理服务的协议  
  * `proxy_version` 为 `4` : 表示使用的代理为 SOCKS4 代理  
  * `proxy_version` 为 `5` : 表示使用的代理为 SOCKS5 代理  
  * `proxy_version` 为 `connect` : 表示使用的代理为 HTTPS 代理   
  * 如果不指定协议, 则默认使用的代理为 SOCKS5 代理  


* `-u`: 指定使用的 UDP 协议  
		如果不使用此选项, 默认为使用 TCP 协议  

* `-e command` : 执行给出的命令, `--exec`  
* `-c command` : 通过 /bin/sh 执行命令 command, `--sh-exec`  

* `-v` : 打印详细的输出  

## 使用

### 建立原始 TCP 连接

与 `www.baidu.com` 的 80 端口建立一个 TCP 连接(本地端口随机):  

	$ nc www.baidu.com 80

使用本地 `1234` 端口与 `www.baidu.com` 的 80 端口建立一个 TCP 连接:  

	$ nc -p 1234 www.baidu.com 80


与 `www.baidu.com` 的 80 端口建立一个 TCP 连接, 超过 5s 自动断开:  

	$ nc -w 5 www.baidu.com 80

与 `www.baidu.com` 的 80 端口建立一个 TCP 连接, 并发送请求头, 模拟浏览器访问百度:  

		$ echo `GET / HTTP/1.o\r\n\r\n` | nc -p 21337 www.baidu.com 80
		HTTP/1.1 200 OK
		Date: Sun, 10 Dec 2017 08:28:45 GMT
		Content-Type: text/html
		Content-Length: 14613
		...

上面用法相当于:  

		$ nc -p 31337 www.baidu.com 80
 		GET / HTTP/1.0
		(回车)
		(回车)
		HTTP/1.1 200 OK
		Date: Sun, 10 Dec 2017 08:28:45 GMT
		Content-Type: text/html
		Content-Length: 14613
		

		nc -p 31337 -w 5 host.example.com 42

* 与 `host.example.com` 的 53 端口建立一个 UDP 连接:  

		nc -u host.example.com 53

* 使用 `10.1.2.3` 作为本地 IP 与 `host.example.com` 的 42 端口建立一个 TCP 连接:  

		nc -s 10.1.2.3 host.example.com 42


### 端口扫描

端口扫描经常被系统管理员和黑客用来发现在一些机器上开放的端口，帮助他们识别系统中的漏洞  

* 检查 `127.0.0.1` 的 TCP 端口 `9324-9326` 是否开启  

		$ nc 127.0.0.1 -z 9320-9330
		Connection to 127.0.0.1 port 9325 [tcp/*] succeeded!
 
  可以看到只有 9325 端口是开放的, `-z 9320-9330` 指定了扫描的端口范围是 9320 到 9330  

* 详细展示 `127.0.0.1` 的 TCP 端口 `9324-9326` 的开启状况, 使用 `-v` 选项:  

		$ nc -v -w 2 127.0.0.1 -z 9324-9326
		nc: connectx to 127.0.0.1 port 9324 (tcp) failed: Connection refused
		found 0 associations
		found 1 connections:
				 1: flags=82<CONNECTED,PREFERRED>
						outif lo0
						src 127.0.0.1 port 65482
						dst 127.0.0.1 port 9325
						rank info not available
						TCP aux info available

		Connection to 127.0.0.1 port 9325 [tcp/*] succeeded!
		nc: connectx to 127.0.0.1 port 9326 (tcp) failed: Connection refused

   可以看到发出了三个请求, 只有 9325 端口处于监听状态, 并且显示更为详细的连接成功的请求信息  

### 发送文件

把 `192.168.11.2` 上的文件 `demo.tar.bz2` 发送到 `192.168.11.3`, 并保存为 `demo.tar.bz2`:  
* 在 `192.168.11.3` 上: `nc -l 1234 > demo.tar.bz2`  
* 在 `192.168.11.2` 上: `nc 192.168.11.3 1234 < demo.tar.bz2`

### 聊天工具

通过在 `192.168.11.2` 与 `192.168.11.3` 上建立 TCP 连接来实现聊天:  

* 在 `192.168.11.3` 上: `nc -l 1234`  
* 在 `192.168.11.2` 上: `nc 192.168.11.2 1234`  

这样, 双方就可以相互交流了, 使用 `Ctrl+C` 退出  

### 连接 memcached

连接 `memcached` 服务器, 执行命令: 假设 `192.168.11.2` 上启动了一个 `memcached`, 并且端口为 `11211`

连接 192.168.11.2 上的 memcached 服务, 并执行 stats 打印 memcached 运行状态:  

	$ echo 'stats' | nc 192.168.11.2 11211
		
充当一个 memecached 客户端, 你可以执行 memcached 的操作指令:  

	$ nc 192.168.11.2 11211

### 使用代理

有些网络不能直接访问, 只能通过代理服务才能访问  

通过代理连接 `host.example.com` 的 42 端口:  

		# 使用 HTTP 代理 http://10.2.3.4:8080 与 host.example.com 的 42 端口连接
		$ nc -x10.2.3.4:8080 -Xconnect host.example.com 42

		# 使用 socks4 代理 socks4://10.2.3.4:8080 连接 host.example.com 的 42 端口
		$ nc -x10.2.3.4:8080 -X4 host.example.com 42

		# 使用 socks5 代理 socks5://10.2.3.4:8080 连接 host.example.com 的 42 端口
		$ nc -x10.2.3.4:8080 -X5 host.example.com 42

ssh 使用代理: 在 ssh 的配置文件`~/.ssh/config` 配置选项 `ProxyCommand`  

		Host web
			HostName    192.168.11.2
			IdentityFile ~/.ssh/id_rsa
			Port        22
			User        root
			ProxyCommand nc -x127.0.0.1:7070 %h %p

###  一次性 Web Server

监听 8080 端口, 如果通过 http 访问, 则返回文件 `file` 的内容, 然后断开:  

		{ printf 'HTTP/1.0 200 OK\r\nContent-Length: %d\r\n\r\n' "$(wc -c < file)"; cat file; } | nc -l 8080">)"}

### 文件夹传输

配合 tar 命令和管道, 在两台主机之间传输文件夹内容  

把 `192.168.11.2` 的文件夹 `dir` 发往 `192.168.11.3`  

* 在 192.168.11.2 上: `tar -cvf - dir | nc -l 1234`  
* 在 192.168.11.3 上: `nc 192.168.11.2 1234 | tar xvf -`

使用 tar 的 `-j` 选项(`bzip2`) 或 `z` 选项(`gzip`) 进行数据压缩传输  

### 远程克隆磁盘

配合 dd 命令和管道, 进行远程磁盘读写  

把 `192.168.11.2` 上的 `/dev/sda` 克隆到 `192.168.11.3` 上的 `/dev/sdb`:  

* 在 192.168.11.2 上: `dd if=/dev/sda | nc -l 1234`  
* 在 192.168.11.3 上: `nc 192.168.11.2 1234 | dd of=/dev/sdb`

### shell

可以打开一个远程主机的 bash, 对远程主机进行操作  

从本地远程打开 `192.168.11.3` 的 shell:  

* 在 192.168.11.3 上: `nc -l 1234 -e /bin/bash`  
* 在本地: `nc 192.168.11.3 1234`  

如果不支持 `-e` 或 `-c` 选项, 可以这样做:  
* 在 192.168.11.3 上:  

		$ mkfifo /tmp/tmp_fifo
		$ cat /tmp/tmp_fifo | /bin/sh 2>&1 | nc -l 1234 > /tmp/tmp_fifo

* 在本地: `nc 192.168.11.3 1234`  

### 反向 shell

在服务端访问客户端的 shell  

服务器 `192.168.11.2` 访问本地 shelk:  

* 在服务器上: `nc -l 1234`  
* 在本机: `nc 192.168.11.2 1234 -e /bin/bash`
