---
layout: post
title: "Linux下php扩展安装"
toc: "true"
modifyTime: "2015-12-04"
description: "Linux 下 php 扩展的安装,extension_dir 的获取,mongo,redis 等php扩展安装"
category: 记录
tags: [Web, Php, Apache]
---
{% include LU/setup %}
{% include LU/gen_toc %}

{:toc}

## 碎碎念

通过搭建 [LAMP 环境](/lamp-build), 就可以使用 php 进行动态网站开发  

但有的时候增强 php 对某些特殊功能, 比如对 mongodb 的操纵, redis 的访问等  

这时候, 你就需要为 php 安装并配置相应扩展, 即 extension  

## extension_dir 和 extension  

php 有一个变量定义了 extension 在你的系统中的存放位置, 那就是 `extension_dir`  
只有 extension 存放到 `extension_dir` 的指定路径, 那么 php 才能正确读取  

关于 `extension_dir` :  

1. 默认值 : `php -i | grep extension_dir`  
2. 重新指定  
   在  `/etc/php5/apache2/php.ini` 进行指定, 比如 :  

       extension_dir="/usr/share/php_extension"

### extension_dir 实际生效值

1. 在你的 Apache 目录下新建文件 `phpinfo.php`, 内容如下 :  

		<?php
			phpinfo();
		?>

2. 访问 `phpinfo.php`, 搜索 `extension_dir`, 可以看到当前 php 寻找 extension 的路径  

### 检验扩展是否应用

访问 `phpinfo.php`，搜索你的扩展，比如 `redis`  

如果你的扩展放到 `extension_dir` 并且已经添加到 php 的 apache 配置文件，那么就会搜索到  
如果没有搜索到 :  

1. 查看 `extension_dir` 下有没有你的 extension  
2. 确认是否在 `/etc/php5/apache2/php.ini` 中添加此 extension, 比如 redis :  

		[redis]
		extension=redis.so
3. 重启服务器 : `sudo service apache2 restart`
4. 可以留言共同讨论或者谷歌  

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

## phpize 的安装

用 C 开发的 PHP 扩展使用动态链接库的方式编译扩展模块，需要用到 `phpize`  

这个工具在使用 `apt-get install php5` 默认情况也是没安装的  

执行以下命令去安装 :  

	$ sudo apt-get install php5-dev

## 几个扩展常用扩展安装  

### MCcrypt 扩展的安装  

1. 安装 : `sudo apt-get install php5-mcrypt`  

2. 添加配置 `/etc/php5/apache2/php.ini`:  

       extension=php_mcrypt.so

3. 重启web服务器

### igbinary 扩展的安装  

1. 安装 : `sudo pecl install igbinary`  

2. 添加配置 `/etc/php5/apache2/php.ini`:  

       [igbinary]
       extension=igbinary.so

3. 重启web服务器

### redis 扩展的安装 

官方文档 : <https://github.com/phpredis/phpredis#installingconfiguring>  

1. 下载, 编辑, 安装 :  

		$ git clone https://github.com/phpredis/phpredis.git
		$ phpize
		$ ./configure [--enable-redis-igbinary]
		$ make && sudo make install
	
   这样 redis 就被安装在合适的位置  
   如果需要 `--enable-redis-igbinary`, 请先进行 `igbinary 扩展的安装`    

2. 添加扩展到配置文件`/etc/php5/apache2/php.ini`  

		[redis]                            
        extension=redis.so

3. 重启web服务器


### mongo 扩展的安装

官方文档: <http://php.net/manual/zh/mongo.installation.php>  

1. 下载，编译，安装:  

		$ git clone https://github.com/mongodb/mongo-php-driver-legacy.git
		$ cd mongo-php-driver-legacy
		$ phpize
		$ ./configure
		$ make all && sudo make install
		...
		Installing shared extensions:     
		/usr/lib/php5/20121212+lfs/

2. 添加配置 `/etc/php5/apache2/php.ini`:  

		[mongo.so]
		extension=mongo.so

3. 重启web服务器 

