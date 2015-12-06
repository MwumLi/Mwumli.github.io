---
layout: post
title: "Ubuntu 下搭建 go 运行环境"
toc: "true"
modifyTime: "2015-11-10"
description: "Ubuntu 14.04 下搭建 go 运行编译环境"
category: 搭建
tags: [Go, 安装, 编译, 运行环境]
---
{% include LU/setup %}
{% include LU/gen_toc %}

这里介绍一下如何搭建 go 语言的编译运行环境以及一个初始 Hello 程序  

Go 有两种构建方式 : 源码安装和二进制安装  

二进制安装比较简单, 这里主要讲述二进制安装  

## 二进制安装 Go

下载适合你系统的 Go : [https://golang.org/dl/#featured](https://golang.org/dl/#featured)  

Go 的二进制的会默认假定安装到 `/usr/local/go/` 中  

1. 如果你 **安装 Go 到默认位置** , 那么你需要这样做 :  

        $ sudo tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
        $ echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc

2. 如果你需要 **安装 Go 到指定位置** (Eg: `~/go/`), 那么这样做 :  

        $ tar -C ~/ -xzf go$VERSION.$OS-$ARCH.tar.gz

   然后在 `~/.bashrc` 末尾添加 :  

        export GOROOT=$HOME/go
        export PATH=$PATH:$GOROOT/bin

**注意** : `GOROOT` 仅仅在安装 go 到指定位置的时候才需要设置

只要你的 `.bashrc` 生效, 那么你可以通过 `go version` 打印当前 go 的版本号来确定是否安装成功  

## 升级 Go

1. 必须卸载已存在的旧的版本  
2. 按照上述方法安装新的 Go  

## 卸载 Go

1. 删除 go 安装目录, 默认 `/usr/local/go/`  
2. 在 shell 配置文件中去掉 Go 环境变量 `GOROOT` 以及 `PATH` 中 go 路径的配置  

## go 语言版的 HelloWorld

`hello.go` :  

    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, Wolrd. 你好, 世界.")
    }


然后命令行中直接运行 :  

    $ go run hello.go
    Hello,World. 你好, 世界!

`go run` 包含编译和运行两步  

你可以先生成可执行文件, 然后执行可执行文件, 比如这样 :  

    $ go build hello.go
    $ ls
    hello hello.go
    $ ./hello
    Hello,World. 你好, 世界!


## 参考链接  

1. [Go 的安装起步](http://docscn.studygolang.com/doc/install)  
   这里有各种系统下 Go 的安装与配置  

2. [如何使用 Go 编程](http://docscn.studygolang.com/doc/code.html)  
   在这里你可以看到一个简单 Go 包的开发  
   并介绍用 go 工具来获取、 构建并安装 Go 包及命令的标准方式

3. [Go 语言中文官方文档](http://docscn.studygolang.com/)  

4. [Go 语言英文官方文档](http://docs.studygolang.com/)  

5. [Go 语言中文网](http://studygolang.com/)
