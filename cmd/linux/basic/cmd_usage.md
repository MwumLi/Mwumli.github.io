# 命令使用

2015-09-10 09:35:57 by MwumLi

---

## 查看篇

### ls

列出目录内容 
默认显示顺序以字母表顺序排序

**使用**

1. 列出当前目录下的内容 : `ls`
2. 列出指定目录下的内容 : `ls path_dir/`
3. 长列表格式显示
  * 当前目录所有文件 : `ls -l`
  * 指定文件 : `ls -l file_name`
  * 指定目录 : `ls -ld dir_name`
4. 使用颜色区分不同文件 : `ls --color=auto`
5. 排序 : 见 `-t`、`-u`、`-c`、`-S`、`-r` 的参数说明
6. 显示文件 inode ：`ls -i`

**参数**  

1. `--color=[auto/never]`		--  以不同的颜色显示不同文件  
   很多系统，使用了 `alias ls='ls --color'`, 这样, 直接使用 `ls` 可以就可以用不同的颜色区分文件类型  
   * `--color` 或 `--color=auto` 可以为不同的文件类型使用不同颜色显示  
   * `--color=never` 可以禁止颜色输出
2. `-l`	-- 以长列表格式显示内容
3. `-a`	-- 显示所有文件，包含隐藏文件(`.*`)  
4. `-d`  -- 只显示目录
5. `-t`	-- 以修改时间排序，最新修改的在最前
6. `-u`  -- 以 atime (访问时间)排序，最近访问的在最前  
   可以配合其他的参数 :
   * `-ltu`	-- 显示访问时间并以访问时间排序  
   * `-lu`	-- 显示访问时间但以字母表顺序排序
   * 其他	-- 以访问时间排序
7. `-c`	-- 以 ctime (最后一次文件状态改变时间)排序，最新改变的在最前
   可以配合其他的参数 :
   * `-ltc`	-- 显示最后一次文件状态改变时间并以此时间排序  
   * `-lc`	-- 显示最后一次文件状态改变时间但以字母表顺序排序
   * 其他	-- 以最后一次文件状态改变时间排序
8. `-1`	-- 一行显示一个文件
9. `-r`	-- 以相反的顺序输出  
10. `-R`	-- 递归显示  
11. `-s`	-- 输出每个文件的大小,以 block 为单位
12. `-S`  -- 以文件大小排序,最大的在最前  
13. `-i`  -- 显示文件 inode 编号 
其他参数请查看 : `man ls`


#### 长列表格式解析

见[ls -l长列表格式](ls_-l.html)

### touch

用当前时间更新文件的 atime 和 mtime 或创建文件  

如果指定的文件名不存在，那么创建新文件  
如果指定的文件名存在，根据参数来改变 file-timestamps


**使用**

1. 创建文件 fileA, 如果存在则修改器 atime 和 mtime 为 current time : `touch file`

2. 改变文件 fileA 的访问时间为当前时间 : `ls -lu fileA && touch -a fileA && ls -lu fileA`

3. 改变文件 test 的修改时间为当前时间 : `ls -lt test && touch -m test && ls -lt test`

4. 让 fileA 和 fileB 的 atime 和 mtime 一致 : `touch fileB -r fileA`

**参数**  

1. `-a`			-- 改变 atime
2. `-m`			-- 改变 mtime 
2. `-c`			-- 不创建文件
3. `-r file`	-- 使用 file 的时间替换当前时间
4. `-t STAMP`	-- 使用 `[[CC]YY]MMDDhhmm[.ss]` 替换当前时间
5. `-d STRING`	-- 解析 STRING 并且使用它替换当前时间  

其他请参考 : `man touch`


### cd 

切换目录  

**使用**

1. 切换到指定路径 : `cd path_directory/`
2. 切换到上一层目录 : `cd ..`
3. 回到用户主目录 : `cd ~`
4. 回到上一个工作目录 :  

		$ pwd 
		/home/vagrant/synced_folder/WorkSpace/micro_knows
		$ cd ~
		$ pwd
		/home/vagrant
		$ cd -
		/home/vagrant/synced_folder/WorkSpace/micro_knows

### mkdir

创建目录

Linux 下的目录即 Windows 下的文件夹

**使用**

1. 创建目录 : `mkdir dir_name`
2. 级联创建目录并显示创建过程  

		$ mkdir -pv first/seond/third
		mkdir: created directory ‘first’
		mkdir: created directory ‘first/second’
		mkdir: created directory ‘first/second/third’

   使用 `tree` 展示目录结构  

		$ tree
		.
		└── first
			└── second
				    └── third

		3 directories, 0 files

3. 创建多个目录 : `mkdir work_dir1 work_dir1 work_dir3`

4. 创建只有只读权限的目录

		$ mkdir -m 444 hello && ls -ld hello
		dr--r--r-- 2 vagrant vagrant 4096 Sep 10 03:50 hello/

**参数**  

1. `-p`		 -- 可以级联创建目录，假如目录存在，不会报错
2. `-m mode` -- 指定创建目录权限  
  默认创建的目录权限为 `rwxrwxr-x`  
  mode 是权限值, 格式与 chmod 的权限值格式一致(待续)  
3. `-v`		 -- 输出创建详细过程

其他参数请查看 `man mkdir`


### rm

删除文件和目录   

Linux 下，一切皆文件，目录也是一种文件  
说 rm 的功能是删除文件也不为过  

**使用**  

1. 删除文件 : `rm file_name`

2. 可以使用通配符  

   1. 删除文件名包含 "file" 的所有文件 :  `$ rm file`
   2. 删除文件名以 `h` 开始，包含两个字符的文件 : `rm h?`

3. 删除不存在文件不提示 : `rm -f no_exist_file`

4. 删除所有的空目录 : `rm -d *`

**参数**  

* `-f` -- 忽略不存在的文件和参数
* `-i` -- 每次删除时都提示询问  
* `-I` -- 当递归删除或删除超过三个文件时提示询问
* `-r` -- 递归删除文件和目录  
* `-d` -- 删除空目录
* `-v` -- 显示删除的过程  

## 杂篇

### history

输出历史命令,并编号  

1. 查看历史命令 : `history`

2. 命令行中特殊使用:  
	
		`!@` -- 上一个命令最后一个参数
		`!!` -- 上一条命令
		`!num` -- 编号为 num 的命令

3. 命令行中使用 `#` 注释命令，在通过 history 找回


