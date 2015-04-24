---
layout: post
title: "Linux下php扩展安装"
description: ""
category: 记录
tags: [web, php, apache]
---
{% include LU/setup %}

* menu
{:toc}

## 碎碎念

进行简单的 web 动态网站开发，只需快速搭建一个 LAMP 环境即可  

但有的时候还需要一些特别的功能，这时候需要安装相应扩展[^extension]  

这里以 LAMP[^LAMP] 环境为例  

## 检验php是否安装某个扩展  

1. 检验你某个扩展是否安装，可以在你的 Apache 目录下新建文件 `phpinfo.php` :  

		<?php
			phpinfo();
		>

2. 访问此网页，使用浏览器查找功能查找你的扩展，比如 `redis`  

3. 如果你的扩展已经安装成功，并添加到 php 的 apache 配置文件，那么就会搜索到  


### 没有搜索到扩展  

1. 重启了下服务器: `sudo service apache2 restart`  

2. 检查配置文件 `/etc/php5/apache2/php.ini` 是否正确添加扩展  

3. 可能没有安装成功，请检查网络，请百度，请谷歌...  


## 安装并添加php扩展  

1. 下载并安装下载相应扩展(请自行搜索)  

		http://php.net/manual/zh/extensions.php  

2. 添加扩展到配置文件`/etc/php5/apache2/php.ini`  
	(以`redis`为例)  

		[redis]
		extension=redis.so
 
	添加文件末尾即可  

3. 重启web服务器  

		sudo service apache2 restart

### 几个扩展安装案例  

#### redis 扩展的安装[^redis-github]  

1. 使用git下载  

		$ git clone https://github.com/phpredis/phpredis.git

2. 编译扩展模块,需要`phpize`  

		$ phpize
		$ ./configure [--enable-redis-igbinary]
		$ make && make install
	
这样 redis 就被安装在合适的位置  

3. 添加扩展到配置文件`/etc/php5/apache2/php.ini`  

		[redis]                            
        extension=redis.so

4. 重启web服务器


#### mongo 扩展的安装

1. 下载，编译，安装，查看:  

		$ git clone https://github.com/mongodb/mongo-php-driver.git
		$ cd mongo-php-driver
		$ phpize
		$ ./configure
		$ sudo make install
		...
		Installing shared extensions:     
		/usr/lib/php5/20121212+lfs/
		$ ls /usr/lib/php5/20121212+lfs/
		json.so   mysqli.so  opcache.so    pdo.so       redis.so
		mongo.so  mysql.so   pdo_mysql.so  readline.so

	可以看到`mongo.so`  

2. 添加配置 `/etc/php5/apache2/php.ini`:  

		[mongo.so]
		extension=mongo.so

3. 重启web服务器 

#### 待续...

### 安装需要

#### phpize 的安装

用 C 开发 PHP 扩展的时候如果用动态链接库的方式编译扩展模块，需要用到 `phpize`  
这个工具在使用 `apt-get install php5` 默认情况也是没安装的  
可以执行以下命令:  

	$ sudo apt-get install php5-dev

[^extension]:php扩展列表:[http://php.net/manual/zh/extensions.php](http://php.net/manual/zh/extensions.php)

[^LAMP]:Linux+Apache+Mysql+Php, 安装请参考[LAMP环境搭建](/记录/2014/06/14/lamp-build/ LAMP环境搭建)  

[^redis-github]:可参考[`<`一篇来自github的安装指南-redis`>`](https://github.com/phpredis/phpredis#installation)


