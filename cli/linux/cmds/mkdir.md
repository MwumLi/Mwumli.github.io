# mkdir

2015-09-27 00:47:45 by MwumLi

---


创建目录

Linux 下的目录即 Windows 下的文件夹

## 使用

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

## 参数

1. `-p`		 -- 可以级联创建目录，假如目录存在，不会报错
2. `-m mode` -- 指定创建目录权限  
  默认创建的目录权限为 `rwxrwxr-x`  
  mode 是权限值, 格式与 chmod 的权限值格式一致(待续)  
3. `-v`		 -- 输出创建详细过程

其他参数请查看 `man mkdir`

