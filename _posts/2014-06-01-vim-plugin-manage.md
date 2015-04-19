---
layout: post
title: "vim插件管理及安装"
description: ""
category: 记录
tags: [vim,plugin,manage]
---
{% include LU/setup %}

## Vim插件管理插件--->Vundle

### Github地址

	https://github.com/gmarik/vundle.git 

### 安装

	$ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim  

### 配置

把下面这些放在你的`.vimrc`中去使用`Vundle`  
移除下面不必要的插件，他们仅仅是为了演示效果   

	set nocompatible              " be iMproved, required
	filetype off                  " required

	" set the runtime path to include Vundle and initialize
	set rtp+=~/.vim/bundle/Vundle.vim
	call vundle#begin()
	" alternatively, pass a path where Vundle should install plugins
	"call vundle#begin('~/some/path/here')
	"所有的插件管理必须被添加在以上这行之后

	" let Vundle manage Vundle, required
	Plugin 'gmarik/Vundle.vim'

	" Powerline--->The ultimate vim statusline utility  
	" https://github.com/Lokaltog/vim-powerline
	Plugin 'Lokaltog/vim-powerline

	" Markdown--Syntax highlighting, matching rules and mappings for .md file
	" https://github.com/plasticboy/vim-markdown/
	Plugin 'plasticboy/vim-markdown'

	" echofunc--->automatically display function 
	" https://github.com/mbbill/echofunc 
	Plugin 'mbbill/echofunc'

	" taglist---> 列出当前文件中所有标签(宏，全局变量，函数名) 
	" https://github.com/vim-scripts/taglist.vim 
	Plugin 'vim-scripts/taglist.vim'  

	" 所有的插件必须被添加在以下这行之前
	call vundle#end()            " required
	filetype plugin indent on    " required
	" To ignore plugin indent changes, instead use:
	"filetype plugin on
	"
	"
	" see :h vundle for more details or wiki for FAQ
	" Put your non-Plugin stuff after this line

### 四种添加插件到Vundle管理的方式  

1. 指定Github中用户仓库的插件，使用“用户名/插件名称”的方式指定  
	插件名中的空格使用“-”代替  

		Plugin 'tpope/vim-fugitive'

	插件名中的空格使用“-”代替  
	当插件位于仓库的某一子目录时，需用rtp指定子目录  

		Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}

2. 指定Github中vim-scripts仓库中的插件  
	即在http://vim-scripts.org/vim/scripts.html列出的插件  
	直接指定插件名称即可  

		Plugin 'L9'

	避免插件名称与L9有冲突  
	
		Plugin 'user/L9', {'name': 'newL9'}

3. 指定非Github的Git仓库的插件，需要使用git地址  

		Plugin 'git://git.wincent.com/command-t.git'

4. 指定本地Git仓库中的插件  

		Plugin 'file:///home/gmarik/path/to/plugin'


### 使用Vundle安装插件

1. 启动vim,并且运行:  

		:PluginInstall

2. 从命令行安装:  

		$ vim +PluginInstall +qall

### Vundle的其他使用  

1. 预览模式列出已配置的Plugins

		:PluginList          - list configured plugins

2. 安装(更新)插件

		:PluginInstall(!)    - install plugins
		:PluginInstall!		 - update all plugins

3. 搜索(首先刷新缓存)

		:PluginSearch(!) foo - search (or refresh cache first) for foo

4. 清除未使用的插件

		:PluginClean(!)      - confirm (or auto-approve) removal of unused plugins

