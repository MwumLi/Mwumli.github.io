---
layout: post
title: "LAMP 环境搭建"
description: "Linux 下 Apache, Mysql, Php, phpMyAdmin 的安装与简单使用"
category: 记录
tags: [LAMP, Linux, Apache, Mysql, Php, Web]
toc: true
modifyTime: "2015-12-04 11:12:13"
---

{% include gen_toc %}


在 Linux 搭建一个可运行 php, 并且可以访问 mysql 数据库的服务端环境, 服务器是 Apache  
这就是 `LAMP`    

这里只是讲述了 Ubuntu 下的搭建, 并不包括所有的 Linux 发行版  


Linux 下 php 扩展安装 : [请点这里](/php-extension-install/)

## apache 服务器 

### 安装  

	$ sudo apt-get install apache2

安装完成，访问 `http://localhost`  
如果出现`It works`,安装成功  

### 重定义工作目录  

不同版本的apache，工作目录有点差异  

`/etc/apache2/sites-enabled/000-default.conf` 中 `DocumentRoot` 后就是 Apache 的工作目录  

**重定义工作目录需要** : 

1. `DocumentRoot /var/www/html` 改为 `DocumentRoot /home/ya/LAMP`  

2. 添加目录权限 :

		<Directory /home/ya/LAMP >
			Options Indexes FollowSymLinks
			AllowOverride None
			Require all granted
        </Directory>

   添加的地方有两处，任选一处即可：  

   * 刚才修改的那句之后添加  
   * 在 `/etc/apache2/apache2.conf` 中寻找 `Directory` 字眼，在这之后添加  
     (其实也无所谓，只是放着之后，方便管理)  

### 配置文件布局  	

	/etc/apache2/
	|-- apache2.conf
	|
    |-- ports.conf
    |
	|-- mods-enabled/
	|   
	|-- conf-enabled/
	|   
	|-- sites-enabled/

* `apache2.conf` 主配置文件  
  当web服务器启动时，加载此文件，而此文件包含了其他配置文件  
* `ports.conf` 定制监听端口    
  被包含在`apache2.conf`,并且可以随时修改  
* `mods-enabled/`, `conf-enabled/`, `sites-enabled/` 下的配置文件分别是用来管理模块，全局配置片段，虚拟主机配置  


### apache2 的启动和停止  

    $ service apache2 status        # 查看apache2的状态  
	$ sudo service apache2 start    # 启动
	$ sudo service apache2 stop     # 停止
	$ sudo service apache2 restart  # 重新启动

## mysql 数据库 

### 安装

	$ sudo apt-get install mysql-server mysql-client

同时安装了服务端和客户端  

输入下面命令，按提示输入密码  

	$ mysql -uroot -p
	Enter password: 

安装成功，出现下面画面:  

	Welcome to the MySQL monitor.  Commands end with ; or \g.
	Your MySQL connection id is 53
	Server version: 5.5.37-0ubuntu0.14.04.1 (Ubuntu)

	Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.

	Oracle is a registered trademark of Oracle Corporation and/or its
	affiliates. Other names may be trademarks of their respective
	owners.

	Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

	mysql> 

### mysql 服务的启动和停止
 
    $ service mysql status        # 查看mysql 服务的状态  
	$ sudo service mysql start    # 启动
	$ sudo service mysql stop     # 停止
	$ sudo service mysql restart  # 重新启动

### mysql 客户端访问 mysql 服务

1. root 用户, 密码为 hello, 登录 192.168.1.2 上的 mysql 数据库 :  

        mysql -h 192.167.1.2 -uroot -phello 	

2. 以 root 用户登录 127.0.0.1(默认), 密码等待输入
 
        $ mysql -uroot -p 
        Enter Password:

### 是否只允许本机访问
	
`/etc/mysql/my.cnf` 是 Mysql 的配置文件  

里面有一项 `bind-address 127.0.0.1`, 指定 Mysql 数据库默认只允许本地访问数据库

如果需要其他机器访问，应使用 `#` 注释掉 : 
	
	# bind-address 127.0.0.1
	


## PHP

### 安装

	$ sudo apt-get install php5 php5-dev libapache2-mod-php5 php5-mysql

* `php5` : php 解释器
* `php5-dev` : php5 module 开发的一些文件, 包含了 `phpize` 命令  
* `libapache2-mod-php5` : Apache2 的 php5 module  
  没有或disable,会出现 `无法解析php文件，浏览器提示下载所要打开的php文件`  
  `a2enmod` 和 `a2dismod` enable or disable an apache2 module  
* `php5-mysql` : Mysql module for php


### 测试  

在 apache 的工作根目录中新建文件 `phpinfo.php` ,内容为:  

	<?php phpinfo() ?>
	
访问 `http://localhost/phpinfo.php`  
若出现 php 的相关信息，则安装成功  

## phpMyadmin

phpMyadmin 是一个基于 Web 的图形化数据库管理软件  

1. 下载 : <http://www.phpmyadmin.net/home_page/>

2. 解压, 重命名为 `phpMyAdmin`, 移动到 apache 工作根目录下  

3. 生成配置文件 `config.inc.php`  

        $ cd phpMyAdmin
        $ cp config.sample.inc.php config.inc.php

4. 修改 `config.inc.php`  
   * 填写 : `$cfg['blowfish_secret'] = 'ED34DFGFF';  // 必须填写,但可以随意填写`  
   * 添加 mysql 访问 : `$cfg['Servers'][$i]['extension']='mysql';`	

