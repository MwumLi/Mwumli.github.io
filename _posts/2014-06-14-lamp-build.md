---
layout: post
title: "LAMP 环境搭建"
description: ""
category: 记录
tags: [LAMP, linux, apache, mysql, php, web]
---
{% include LU/setup %}

## Ubuntu下LAMP环境搭建  

### 安装apache服务器 

	$ sudo apt-get install apache2

安装完成，在浏览器中输入`http://localhost`,出现`It works`okay,安装完成  

#### 默认工作目录  
不同版本的apache，工作目录有点差异  
我的机器apache版本:`Server version: Apache/2.4.7 (Ubuntu)`  
所以默认工作目录是：  

	/var/www/html

当然，你可以自定义虚拟主机目录:  
1. 修改*/etc/apache2/sites-enabled/000-default.conf*的`DocumentRoot /home/ya/LAMP`为`DocumentRoot /home/ya/LAMP`  
2. 添加目录权限，需要添加下面这句：  

	<Directory /home/ya/LAMP/>
		Options Indexes FollowSymLinks
		AllowOverride None
		Require all granted
	</Directory>

添加的地方有两处，任选一处即可：  
 * 刚才修改的那句之后添加  
 * 在*/etc/apache2/apache2.conf*中寻找`Directory`字眼，在这之后添加，其实也无所谓，只是放着之后，方便管理  


#### apache2的配置布局  	

	/etc/apache2/
	|-- apache2.conf
	|       `--  ports.conf
	|-- mods-enabled
	|       |-- *.load
	|       `-- *.conf
	|-- conf-enabled
	|       `-- *.conf
	|-- sites-enabled
	|       `-- *.conf

* `apache2.conf` 主配置文件  
当web服务器启动时，加载此文件，而此文件包含了其他配置文件  
* `ports.conf` 定制监听端口    
被包含在`apache2.conf`,并且可以随时修改  
* `mods-enabled/*.conf`, `conf-enabled/*.conf`,`sites-enabled/*.conf`下的配置文件分别是用来管理模块，全局配置片段，虚拟主机配置  


#### apache2的启动和停止  
由于环境变量和加载配置的原因，我们不能直接使用`/usr/bin/apache2`,需要使用`/etc/init.d/apache2`,或者启用服务`service apache2`  

##### apache2的启动  

	$ sudo /usr/bin/apache2 -k start	或者  	
	$ sudo service apache2 start

##### apache2的停止

	$ sudo /usr/bin/apache2 -k stop	或者  	
	$ sudo service apache2 stop  

##### apache2的再启动

	$ sudo /usr/bin/apache2 -k restart	或者  	
	$ sudo service apache2 restart

##### 查看apache2的状态  

	$ service apache2 status

或者， 直接访问`http://localhost`  

### 安装MySQL数据库 

	$ sudo apt-get install mysql-server  

安装mysql服务器的过程中，会自动安装mysql的命令行工具mysql-client，还有其他的一些工具  
同时安装途中，需要为mysql设置root用户密码  

#### 测试  
输入下面命令，按提示输入密码  

	$ mysql -uroot -p
	Enter password: 

加入安装成功，出现下面画面:  

	Welcome to the MySQL monitor.  Commands end with ; or \g.
	Your MySQL connection id is 53
	Server version: 5.5.37-0ubuntu0.14.04.1 (Ubuntu)

	Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.

	Oracle is a registered trademark of Oracle Corporation and/or its
	affiliates. Other names may be trademarks of their respective
	owners.

	Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

	mysql> 

#### 配置MySQL

##### MySQL常用命令
MySQL大部分命令是以`;`结尾  
1. 进入mysql  

		$ mysql -h [服务器地址] -u [用户名〕-p

这是访问本地服务器  

		$ mysql -h 127.0.0.1 -u [用户名〕 -p

如：`$ mysql -h 127.0.0.1 -u root -p`
认证成功之后就进入mysql的命令控制台，以下都是在mysql的命令控制台的命令。

2. 显示已经存在的数据库  

		mysql> SHOW DATABASES;

3. 创建数据库(linux下是区分大小写)  

		CREATE DATABASE [数据库名];

4. 创建一个受限用户 这个用户(testuser)只有一个数据库(这里是test库)的访问写入权限，这个数据库创建与删除表的权限，并且只能在本地登入，密码为userpasswd  


		grant select,insert,update,delete,create,alter on test.* to 'test'@'localhost' IDENTIFIED BY 'userpasswd';

5.退出数据库  

		quit 或者 \q

##### MySQL配置文件（新手、无特殊要求勿动）
	
	sudo vim /etc/mysql/my.cnf

这里有一个地方要注意 默认：是只允许本地访问数据库的这里不是说本机架设了网站，用户通过架设在的网页不能访问MySQL ,是指其它机子不能直接访问MySQL   

	bind-address 127.0.0.1

解除限制只能本地访问mysql，如果需要其他机器访问，应使用如下语句，把这`bind-address 127.0.0.1`句话用`#`注释掉  

	#bind-address 127.0.0.1


### 安装PHP以及一些必要的模块  

	$ sudo apt-get install php5 libapache2-mod-php5 php5-mysql

*为什么安装`libapache2-mod-php5`?*    

安装这个软件包时，它会自动向`/etc/apache2/mods-available`写入PHP的配置文件`php5.conf`和 `php5.load`，并把它们链接到了`/etc/apache2/mods-enabled`目录。  
安装的最后，软件包自动重新载入apache配置，php就可以在apache上跑了。无需手动的把Apache与PHP关联到一起。  
没有它，会出现`无法解析php文件，浏览器提示下载所要打开的php文件`

	$ sudo a2enmod php5

假如没安装`libapache2-mod-php5`,则提示  

	This module does not exist!

`a2enmod`和 `a2dismod`  enable or disable an apache2 module  

*为什么要安装`php5-mysql`？*  

因为该软件包会向`/etc/php5/conf.d`目录写入配置文件，使得PHP能够支持mysql。

#### 测试  
在apache的默认工作目录下(/var/www/html)中新建文件phpinfo.php,内容为:  

	<? php phpinfo() ?>
	
在浏览器窗口输入`http://localhost/phpinfo.php`,若出现php的相关信息，则安装成功  

### 安装phpmyadmin
phpmyadmin是一个图形化的数据库管理软件  
推荐从官网下载安装与配置  
首先从[官网下载](http://www.phpmyadmin.net/home_page/ "phpMyAdmin官网")  

然后解压缩到`apache`工作目录(默认为/var/www/html)下的`phpMyAdmin`(没有，自行创建)  

修改其配置文件(config.sample.inc.php)为`config.inc.php`  

	$ cd /var/www/html/phpMyAdmin
	$ sudo cp config.sample.inc.php config.inc.php
	$ vim config.inc.php

找到“blowfish_secret”在后面填上任意字母  

	$cfg['Servers'][$i]['auth_type']='cookie';
	$cfg['Servers'][$i]['host']='localhost';
	$cfg['Servers'][$i]['connect_type']='tcp';
	$cfg['Servers'][$i]['compress']='false';
	
上面这四句基本都有，只需添加下面这句即可  

	$cfg['Servers'][$i]['extension']='mysql';	

保存退出，继续安装php5-mcrypt  

	$ sudo apt-get install php5-mcrypt  

编辑php配置文件  

	$ sudo vim etc/php5/apache2/php.ini

在`extension`下面加上（任意独立一行）:  

	extension=php_mcrypt.so

保存后，重启apache2  

	$ sudo service apache2 restart

在浏览器里输入`http://localhost/phpMyAdmin`   
出现登陆数据库界面，嗯，成功了，终于不用面对那么冷淡的终端了  

### 配置文件路径
1. apache 的配置文件路径 `/etc/apache2/apache2.conf`  
2. apache 网站字符编码配置路径 `/etc/apache2/conf-enabled/charset.conf`  

3. php.ini 路径 `/etc/php5/apache2/php.ini`  

4. mysql配置文件 路径 `/etc/mysql/my.cnf`   一般不要使用，尤其是新手

5. 默认网站根目录`/var/www/html`(据说网站根目录应该是`/var/www`，但我安装完之后，却不是这样的，难道改变了?)

