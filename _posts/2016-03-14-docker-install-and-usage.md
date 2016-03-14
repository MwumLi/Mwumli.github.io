---
layout: post
title: "Docker 的安装与使用"
description: "Docker 的介绍, 安装, 命令使用，镜像构建，容器互联, 数据共享以及相关概念"
category: 软件
tags: [Docker, 运行环境, Dockerfile, 容器]
toc: true
modifyTime: "2016-03-14 11:39:15"
isShow: true
---
{% include JB/setup %}
{% include custom/gen_toc %}

## What is Docker?  

`Docker 就是容器`(类似虚拟机), 在很多人眼里, Docker 就是这么一个印象  
在这之前, 我也是这样认为的  

事实上, Docker 不仅仅是容器, 它是一系列 Docker 组件的集合, 包括 :  

* Docker 客户端和服务端  
* Docker 镜像  
* Docker 容器  
* Docker Registry  

[官方文档说](http://www.docker.com/what-docker "What is Docker?") :  

	Docker allows you to package an application with all of its dependencies into a standardized unit for software development.  


简而言之, Docker 可以打包应用以及相关依赖到一个相对独立的单元( Docker 镜像)  

因此, 我们只需要构建一次 Docker 镜像, 就可以在以后的开发和部署环境中保证一致的应用运行环境  
从而避免环境不一致引发应用的兼容性错误  
(前提是宿主机上已经安装了 Docker)  


## 安装

### Mac OS X  

Mac OS 下安装见这里: <https://docs.docker.com/engine/installation/mac/>  

### Windows  

Windows 下安装见这里 : <https://docs.docker.com/engine/installation/windows/>  

### Linux

Docker 支持多种 Linux 的发行版本的安装  
具体见这里 : <https://docs.docker.com/engine/installation/linux/>  

### 非 root 用户使用 docker  

假如你想以非 root 用户的身份使用 docker , 你应该考虑添加你的用户到 `docker` 用户组  
命令如下 :  

    $ sudo usermod -aG docker your-user

记住 : 只有 log out, 然后 back in 才能使之生效  

## Docker 基本命令  

### Docker 容器

1. 查看 docker 是否存在  

		$ sudo docker info

   返回所有容器和镜像的数量, 以及 docker 所使用的执行驱动和存储驱动  

2. 创建和启动容器, 并运行指定命令    

		$ sudo docker run  ubuntu ls

   `docker run` 命令首先在本地寻找命令指定的镜像 `ubuntu`  
   假如没有找到, 那么会在 Docker 官方维护的 Docker Hub Registry 上寻找,一旦找到镜像, 就会下载该镜像并存储到本地  
   接着, `docker run ` 会以此镜像为基础, 创建并启动一个容器  
   最后在容器中执行命令 `ls`  

   创建一个具有交互 Shell 的容器  

        $ sudo docker run -i -t ubuntu /bin/bash

   `-i` 保证容器中 `STDIN` 是开启的  
   `-t` 告诉 Docker 为创建的容器分配一个伪 tty 终端  
   然后指定运行命令 `/bin/bash`, 这样新创建的容器才会有一个交互式的 shell  

   如果通过管道与 shell 进行交互,仅仅使用 `-i`  

        echo "Hello,world" | sudo docker run -i ubuntu cat

3. 为容器指定主机名 :  

		$ sudo docker run --rm -h MwumLi ubuntu hostname
		MwumLi

   `-h` 或者 `--hostname` 指定容器的主机名  

4. 端口映射 :  

		# 随机分配宿主机的端口到 docker 指定端口
		# 从宿主机的端口 `49153~65535` 中随机选一个映射到容器的 80 端口  
		$ sudo docker -d -p 80 ubuntu nginx -g "daemon off;"
 
		# 指定容器与宿主机之间的端口映射关系 `-p 宿主端口:容器端口`  
		# 把宿主机的 8080 端口映射到 Docker 容器的 80 端口上  
        $ sudo docker -d -p 8080:80 ubuntu nginx -g "daemon off;"  

   `-p` 指定要暴露的容器端口号, 这个端口号是创建镜像的时候使用 `EXPOSE` 指定的端口号(`EXPOSE 可以指定多次`)  


5. 查看容器 `ps`  
   `docker ps` -- 列出当前处于运行状态的 docker container  
   `docke ps -l` -- 列出最后一次运行的容器(包括正在运行和已停止)  
   `docker ps -a` -- 列出所有的容器（包括正在运行和已停止的）  
   `docker ps -n x` -- 列出最后 X 个容器(包括运行和停止)  

6. 为容器命名 `--name`  
  
		$ docker run --name your-name -i -t ubuntu bash
   
   这会创建一个容器名为 `your-name` 的容器  
   如果你不使用 `--name` 指定，它会随机生成一个名字  
   名称必须在当前环境唯一，如果已经存在同名容器，那么会创建失败, 除非删除原有的容器  

7. 重新启动已经停止的容器 :  

        $ sudo docker start container_name/container_id
        $ sudo docker restart container_name/container_id

8. 附着到容器的会话中 :  
  
        $ sudo docker attach container_name/container_id

   (你可能还需要按下回车键才能进入会话)   
   这个和 `tmux attach` 很相似, 都是重新进入之前的会话  

9. 创建一个守护式容器  

        $ sudo docker run -d  --name mwum-daemon ubuntu /bin/sh -c "while true; do echo hello,world!; sleep 1; done"

   `-d` 表示后台运行  

10. 查看容器日志 `logs`  

        $ sudo docker logs container_name/container_id

    如果想监控 docker 的日志, 和 `tail -f` 命令非常相似,按 `Ctrl+C` 退出日志跟踪  

		$ sudo docker logs -f container_name/container_id

    查看最后 10 行内容 :  

        $ sudo docker logs --tail 10 container_name/container_id

    始终读取最新 10 行日志 :  

        $ sudo docker logs --tail 10 -f container_name/container_id

11. 查看容器内部的进程 :  
    
        $ sudo docker top container_name/container_id

12. 在运行状态的容器内部运行新进程 :  


		# 在 docker 容器内部建了个新文件 /etc/new_file
		$ sudo docker exec -d container_name/container_id touch /etc/new_file             

		# 启动交互式shell
		$ sudo docker exec -i -t container_name/container_id bash    

13. 停止容器  

        $ sudo docker stop container_name/container_id        # 发送 SIGTERM 信号
        $ sudo docker kill container_name/container_id        # 发送 SIGKILL 信号(快速停止容器)

	`stop` 和 `kill` 都是通过发送信号来实现停止容器  
	`kill -s ` 指定发送的信号  
  
14. 自动重启容器 `--restart`  

		# 无论容器退出代码是什么，都会一直重启
		$ sudo docker run --restart=always -d ubuntu command          
		
		# 当容器退出代码为非0时，才会自动重启  
		$ sudo docker run --restart=on-failure -d ubuntu command  


		# 当容器退出代码为非0时，Docker 会尝试重启该容器, 最多重启 5 次  
        $ sudo docker run --restart-on-failure:5 -d ubuntu command 

15. 获取某个容器的详细信息 `inspect`  

        $ sudo docker inspect container_name/container_id
        $ sudo docker inspect --format='{{ .State.Running }}' container_name/container_id     # 返回是否运行, --format 可用来选择查询
   
    一次也可指定多个容器  
	`--format` 可以指定打印某一项信息  

16. 删除容器  

		# 容器必须是停止运行状态
		$ sudo docker rm container_name/container_id  

### Docker 镜像的命令  

1. 列出镜像  

        $ sudo docker images  # 列出所有的镜像  

2. 删除镜像

        $ sudo docker rmi image_name/image_id 
		# 删除所有的镜像
        $ sudo docker rmi `docker images -a -q` 

   镜像删除之前, 必须保证没有使用此镜像的容器; 否则, 删除失败    

3. 拉取仓库中的镜像(比如Ubuntu)  

		# 会把顶级仓库中所有 ubuntu 镜像拉下来
        $ sudo docker pull ubuntu     
		# 会把顶级仓库中 tag 为 12.04 的 ubuntu 镜像拉取下来  
        $ sudo docker pull ubuntu:12.04 

4. 搜索镜像(仓库名或用户名)  

        $ sudo docker search chef

5. 查看镜像详细情形 :  

        $ sudo docker inspect image

6. 查看镜像的构建历史 :  

        $ sudo docker history image

## 构建镜像

这里所说的构建镜像不是真正的创建镜像, 而是基于一个已有的基础镜像构建镜像而已  
如果想从零开始, 那么参考 : <https://docs.docker.com/engine/userguide/eng-image/baseimages/>  

两种构建办法 :  

* 使用 `docker commit`  

* 使用 `docker build` 配合 `Dockerfile` 文件 

* Docker hub 与 Github 的自动化构建(请自行搜索)   

### 登录 Docker Registry

对于一般用户来说，我们都会选择使用 Docker 公司提供的 Registry : Docker Hub 来作为我们的远程 docker 仓库  
因此，需要注册一个 Docker Hub 账户  

命令行登录 Docker Hub : `sudo docker login`

认证信息会保存在 `~/.docker/config.json`, 以共后面推送使用  

命令行退出 Docker hub : `sudo docker logout`  

### docker commit  

1. 创建一个具有命令交互式的容器  
2. 在其中修改某些东西后, 安装新软件、修改配置等, 然后 `exit`  
3. 把当前已修改容器打包成镜像 :  

        $ sudo docker commit container username/repository_name
        # 可以指定一些描述信息 :  
		$ sudo docker commit -m "new custom images" --author="MwumLi" container username/repository_name

4. 提交过程暂停容器

		$ docker commit --pause=false <container_id> .
  
  在一个运行中的容器中执行提交动作是不被推荐的，这会导致文件处于不一致的状态  
  现在你可以在提交过程中暂停容器的运行  

### docker build

`docker build` 指令需要配合一个 `Dockerfile` 文件  
`Dockerfile` 是对一个构建过程的描述, 类似于 `Vagrant` 的 `Vagrantfile`  
只要建立这个文件，再加上要求的基础镜像, 使用 `docker build` 命令就可以构建出一个新的镜像  

1. 新建目录 `static_web`,进入目录，新建文件`Dockerfile`  

        $ mkdir static_web && cd static_web && touch Dockerfile
  
   这个目录会存储你的构建上下文, 构建的时候，Docker 的守护进程就可以访问到这个目录下的文件了   

2. 根据需求, 在 `Dockefile` 中写上你的指令  
   Dockefile 指令看目录 : Dockefile  

3. 开始构建 :  

		static_web $ sudo docker build -t="username/repository_name:tag" .

4. 不使用构建缓存 :  

		static_web $ sudo docker build --no-cache -t="username/repository_name:tag"

5. 新建 `.dockerignore`, 在里面添加不需要发送给 `docker daemon` 的文件, 类似于 `.gitignore`  
   在构建开始时中,会首先把构建目录下的所有文件发送给 `docker daemon`  
   我们可以指定某些文件不用被发送到 `docker daemon`, 这样可以加快构建速度  
   
#### 构建缓存是什么
		
构建过程是一步一步的, 每一条指令的执行都会进行一次提交, 这样会形成一系列镜像层  

修改 `Dockerfile` 中某条指令后再次构建, 那条指令之前的指令就不需要再次执行  

这就是构建缓存  

构建缓存可以说是加快了我们重新构建镜像的速度  

## Dockefile

使用数组方式作为命令的参数的时候，请使用双引号，不要使用单引号  

    # 指定基础镜像
    FROM ubuntu:14.04  
    # 触发器
    # 当此镜像作为基础镜像构建新镜像的时候,执行下面 ONBUILD 紧跟的 ADD 命令
    # 但是构建生成的子镜像作为基础镜像构建新的镜像的时候, 就不在起作用
    # 在子镜像构建过程中紧跟 FROM 指令之后执行
    ONBUILD ADD . /app/src

    # 添加镜像作者以及email等信息
    MAINTAINER MwumLi mwumli@hotmail.com

    # 添加环境变量 refreshed
    ENV refreshed 2016-03-02
	
	# 指定卷  
    # 具体见下文 : 数据共享
	VOLUME /opt/data

    # 指定镜像会以什么样的用户执行
    # 有以下 6 种使用方式
    # 默认用户为 root
    USER user
    USER user:group
    USER uid
    USER uid:gid
    USER user:gid
    USER uid:group

    # ADD 和 COPY 指令用来把构建上下文目录下的东西复制到镜像中  
    # 区别在于 ADD 在复制压缩文件时, 会自动解压  

    # 指定镜像构建时要运行的命令: 命令会被执行成 `bash -c "apt-get update"`
    # 更新了软件源
    RUN apt-get update

    # 指定构建时要运行的命令: 命令会直接执行 
    # 推荐这种方式, 之后的 CMD 指定也推荐这种语法
    # 安装 nginx
    RUN ["apt-get", "install", "nginx"]

    # 告诉 Docker 80 端口将会被容器的应用程序所使用
    # 可以指定多次来指定多个端口
    # 但 Docker 并不会自动打开这些端口, 需要在使用 docker run 的使用 -p 参数来指定      
    EXPOSE 80

    # 指定容器被启动时要运行命令  
    # 如果 `docker run` 并没有指定要运行的命令，那么会运行 CMD 指定的命令
    # 如果 `docker run` 指定运行的命令，那么就执行指定的命令，CMD 就会被忽略
    # CMD 只能指定一条运行的命令，如果指定多次，以最后一次为准  
    # 默认输出 "Welcome, Here is docker"
    CMD ["echo", "Welcome, Here is docker"]
    
    # 指定容器被启动时要运行的执行
    # 但这个和 CMD 有点不一样  
    # 如果 `docker run` 命令指定运行的命令，指定命令会被添加到把 ENTRYPOINT 所有参数后面执行
    # 如果没有指定, 会把 CMD 中指定的参数添加到 ENTRYPOINT 中参数末尾执行
    ENTRYPOINT ["echo", "进入点"]
    CMD ["cmd 作为 ENTRYPOINT 参数"]
    
    # 更改工作目录
    # WORKDIR 命令之后的命令执行都在这个 WORKDIR 指定目录下
    # 包括最终容器的工作目录(不是用户主目录)
    # 默认在 `/root` 下
    WORKDIR /home
    RUN mkdir MwumLi


## VOLUME 与数据共享


`VOLUME` 是 Dockerfile 中的指令, 用来在 docker 中指定一个卷  

Docker 中的卷类似于虚拟机共享文件夹的概念  
因此可以通过卷来实现 docker 容器之间, docker 容器与宿主机之间的数据共享  

### 容器与宿主机

通过指定卷来实现容器与宿主机之间的数据共享  

有两种方式指定卷 :  

1. 在 Dockerfile 使用 `VOLUME` 指令 : `VOLUME /opt/data`  
   使用此 Dockerfile 构建镜像, 并以此镜像创建的容器, 会自动在宿主机的 `/var/lib/docker/volumes/` 下新建一个文件夹(文件夹名是一串随机字符串)  
   这个文件夹会被挂载在这个容器的 `/opt/data` 下  
   如果 `/opt/data` 不存在, 那么会自动创建  
   当使用 `docker run --rm` 创建容器的时候, 一旦容器停止, 会自动删除容器及其卷  

2. 命令行中使用 `-v` 参数  

		# 这种方式和 `VOLUME` 指令的效果一样
		$ sudo docker run -it -v /opt/data ubuntu bash

		# 宿主机当前目录下的 `data/` 被挂载到容器 `/opt/data` 下
		$ sudo docker run -it -v $PWD/data:/opt/data ubuntu bash


### 容器之间  

容器之间只要共享卷, 就可以实现数据共享  

使用 `--volumes-from` :  

    $ docker run -it --volumes-from container debian /bin/bash

这样创建的容器会共享容器 container 的卷, 达到了数据共享的目的  

## 容器互联  

Docker 想要达到的目标是一个容器最好只允许运行一个应用  
然而目前互联网的应用都是多个应用组合在一起的应用程序栈  

因此，我们需要让每个 docker 容器运行一个单独的应用(比如nginx, mysql, redis 等), 然后通过某种技术实现容器间的互联  

### docker 局域网

在安装 Docker 时, 会创建一个新的网络接口 `docker0`  
每个 docker 容器都会在这个接口上分配一个 ip 地址  
接口 `docker0` 是一个虚拟的以太网桥, 用于连接容器和本地宿主网络  

如果进一步查看 Docker 宿主机的其他网络接口, 会发现一系列以 `veth*` 接口  

Docker 每创建一个容器就会创建一组互联的网络接口,这组接口就像管道的两端  
这组接口其中一端作为容器里的 `eht0` 接口  
而另一端命名为 `veth*`, 作为宿主机的一个端口  
这个虚拟网线一端插在名为 `docker0` 的网桥上, 另一端插在容器里  

通过把每个 `veth*` 接口绑定到 docker0 网桥, Docker 创建了一个虚拟子网  
这个子网由宿主机和所有的 docker 容器共享  


### link 互联

从上面我们可以得到一个结论 : 宿主机和docker 容器组成了一个虚拟子网, 在这个子网内可以互相访问  

那么互联的方案就可以得到 : 直接通过 子网 IP 相互访问  

但是这样存在这么几个问题 :  

1. 应用程序需要对容器的 IP 做硬编码  
2. 如果重启容器, Docker 会改变容器的 IP 地址  

因此, 这种方案并不时最好的方案  

docker 提供了一个参数 `--link`, 使用 `--link` 实现容器间的互联 :  

	$ sudo docker run --rm -it --name juan  --link redis:db ubuntu:14.04 bash

这样创建的容器与 `redis` 容器连接起来, `redis` 被称为子容器, 而新创建的这个 `juan` 容器被称为父容器  
在父容器内部, 会形成这样两个动态更新的信息 :  

1. `/etc/hosts` 文件, 发现 `db`(与命令行 db 对应)对应一个 ip 地址, 即子容器的地址  
2. 使用 `env | grep DB`(DB 与命令行 db 大写对应) 可以看到与子容器相关的ip、端口环境变量  

当被子容器重启，一旦 ip 地址发生变化，会自动更新链接容器中的 host 以及 环境变量  

通过这些信息, 我们就可以实现父子容器之间的通信, 并且避免了硬编码的问题以及 IP 地址改变的问题    

由于安全原因, 可以强制 Docker 只允许有连接的容器之间互相通信  
需要在启动 Docker 守护进程时加上 `--icc=false` 的标志，就会关闭所有没有连接的容器间的通信  


## 一些概念    

* Docker 是一系列 Docker 组件的集合, 是一个统称  
* Docker 是一个 C/S 架构的程序  
* Docker 服务端 : 一个守护进程, 管理容器以及响应 Docker 客户端的请求  
* Docker 客户端 : 一个命令行工具, 用户通过它与 Docker 服务端交互, 来操纵和查看容器  
* Docker 镜像 : 类似于操作系统镜像, 可以通过多种方式构建  
* Docker 容器 : 类似一个虚拟机, Docker 镜像运行在 Docker 容器中, 形成一个完整的隔离化的应用程序运行环境  
* Docker Registry : 类似于 git 服务器一样的存在, 代码是开源的，你可以搭建自己的私有 Registry    
* Docker Hub : 类似于 Github 一样的存在, 是 Docker 公司搭建的 Docker Registry 服务, 和 Github 一样公共,免费  
* Docker 仓库: 类似于 Github 上的一个个项目一样  
* Docker 仓库下可以有很多镜像 : 类似同一个 Git 项目的不同 Tag 一样, Docker 仓库下的不同镜像是靠 tag 来区分的   
* Docker 用户仓库命名 : `username/repository_name`  
* Docker 顶层仓库 : `repository_name`, 只包含仓库名, 顶层仓库是由 Docker 公司和选定的能提供优质基础镜像的厂商管理  
  用户通常基于这些基础镜像构建自己的镜像  
  同时顶层仓库也代表个厂商和 docker 公司的一种承诺, 即顶层仓库中的镜像是架构良好、安全且最新的  
* 某个具体的 Docker 镜像 :  
  用户仓库 : `username/repository_name:tag`  
  顶层仓库 : `repository_name:tag`  

* Docker 的镜像的构建和 git 仓库代码提交类似, 同样有 `commit`, `push`, `pull` 等操作，学习过程中可以类比来看  

## 相关链接  

1. Understand the architecture : <https://docs.docker.com/engine/understanding-docker/>
2. Docker 官网 : <https://www.docker.com/>  

