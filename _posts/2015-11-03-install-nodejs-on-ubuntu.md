---
layout: post
title: "Ubuntu 下安装 nodejs"
description: "简述 nodejs 在各大平台的安装以及 Ubuntu 14.04 的下具体安装"
category: 记录
tags: [Nodejs, Linux]
toc: true
modifyTime: "2015-11-03 16:23:18"
---

{% include gen_toc %}


各大平台下 nodejs 的安装看这里 : <https://nodejs.org/en/download/package-manager/#windows>  

Nodejs 发展比较快, 所以版本更新迭代快  

## Ubuntu 下的安装

### 源安装

**Nodejs v5.x**:  

    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs

**Nodejs v4.x**:  

    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs

假如你在使用 Ubuntu 12.04 以及更低版本,请升级你的系统, 再进行安装  
至于原因，看这里 : <https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md>  

### Node Version Manager

Nodejs 升级迭代很快, 不同的 Nodejs 项目，可能使用的是不同版本的 Nodejs  
因此, 要维持多个 Nodejs 项目, 那就需要一种工具来管理 nodejs  

这就是 Node Version Manager  

目前, 有两个比较有名的 Node Version Manager : [n](https://github.com/tj/n) 和 [nvm](https://github.com/creationix/nvm)  

Github 上 nvm 的 Star 明显是 n 的 2 倍多  
因此, 这里讲述一下 nvm 的安装与使用  

nvm 项目地址 : <https://github.com/creationix/nvm>  

#### 安装

nvm 给出了自动安装的脚本, 因此你可以用过 `wget`, `curl` 实现自动安装, 看这里 :  
<https://github.com/creationix/nvm#install-script>  

这里主要讲一下手动安装  
手动安装可以使你明白自动安装到底做了什么  

1. 安装前的准备 :  

        sudo apt-get install build-essential libssl-dev -y

1. 克隆仓库到 `~/.nvm` :  

        git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

2. 添加下面到 `~/.bashrc`(`~/.profile`或 `~/.zshrc`) :  

        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

#### 使用

1. 安装一个指定的版本 : `nvm install v0.10.32`  

2. 安装最新的 0.10.x 版本 : `nvm install 0.10`  

3. 使用 v0.10.32 版本的 nodejs 去运行 app.js :  

        nvm run 0.10.32 node app.js

4. 显示已安装的 v0.10.32 node 的安装路径 :  

        nvm which v0.10.32

5. `node` 代表最新版本的 node, 因此你可以直接在 `nvm use`, `nvm install`, `nvm exec`, `nvm which` 中使用  

6. 在一个 nodejs 中集成其他版本的 `npm` :  

        nvm install v5.0 --reinstall-packages-from=4.2

7. 使用系统安装的 node :  

        nvm use system
        nvm run system --version

8. 列出当前已经安装的 node :  

        nvm ls

9. 列出当前可以获得的 node :  

        nvm ls-remote
