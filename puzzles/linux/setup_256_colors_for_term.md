# 为终端开启 256 色

2015-10-03 03:55:01 by MwumLi

---

## 启用 256 色  

1. 在 `~/.bashrc` 末尾添加 :  

		export TERM=xterm-256color		# 或 export TERM=screen-256color

2. 使 `~/.bashrc` 生效 : `source ~/.bashrc`  

## 相关知识

现在的终端默认可能还是 8 色的, 但是基本上已经支持 256 色  

支持的色度越高, 意味着我们在终端上可以看到更多的色彩  

**查看你的终端类型** :  

	$ echo $TERM
	xterm

**查看你的当前终端启用的色度** :  

	$ tput colors
	8

只要更改终端类型为 256 色终端即可为终端开启 256 色  

当前系统下的所有终端都位于 `/lib/terminfo/` 和 `/usr/share/terminfo/`  
你可以这样**查找所有的 256 色终端** : `find /lib/terminfo/ /usr/share/terminfo/ -name "*256*"`

`screen-256color` 和 `xterm-256color` 是其中的两个 256 色终端  

假如你机器并没有, 那么你可以**安装终端图形数据库** :  

	$ sudo apt-get install ncurses-term


