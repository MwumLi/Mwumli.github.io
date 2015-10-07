# 配置

2015-10-04 11:57:08 by MwumLi

---


Vim 默认开启了很多功能, 但更多的是需要你自己去配置的  

在 Vim 的命令行模式下, 可以使用进行配置各种选项, 但是那只是针对当前 Vim  

要想配置永久的生效, 就需要写入 Vim 的配置文件  

## 配置文件 -- vimrc

1. `/usr/share/vim/vimrc` -- Vim 全局配置文件  
  在文件末尾添加对所有用户都有效的配置  

2. `~/.vimrc` -- Vim 用户配置文件
   如果没有, 请自行创建  
   在文件末尾添加只对你有效的配置  


## 配置小常识  

查看 Vim 默认配置选项 :  
1. 打开 Vim 命令行模式 : `Esc + :`  
2. 输入并用 Enter 确认: `set all`  

假如一个 Option 为 `option`  
在 `~/.vimrc` 中启用这个选项 : `set option`  
禁用它 : `set nooption`  


## 一些简单的配置  


搜索 :  

	" 开启实时搜索
	set incsearch
	" 搜索时不区分大小写
	set ignorecase
	" 高亮显示搜索结果
	set hlsearch

状态栏 :  

	" 总是显示底部状态栏  
	set laststatus=2
	" 显示光标当前位置在状态栏右边
	set ruler

显示行号 :

	" 开启行号显示
