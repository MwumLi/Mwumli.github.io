---
layout: post
title: "Vim下fancy的插件"
toc: "true"
description: ""
category: 记录
tags: [vim,plugin, linux]
---
{% include LU/setup %}

* here is toc
{:toc}

### 简要声明
以下介绍的插件的安装，均使用`Vundle管理`  

---

### TagList

#### 简述

TagList是一个标签浏览器  
所谓标签，就是那些具有表示意义的标示符，像变量，函数名，宏等  
TagList通过一个简单窗口，展示了当前文件下的所有相关的标签  
`PS`: __TagsList依赖于ctags产生的tags文件__  

#### 添加到Vundle管理
	
	Plugin 'vim-scripts/taglist.vim'

#### .vimrc中的一些配置

	let Tlist_Ctags_Cmd='ctags'         "taglist依赖于ctags,设置ctags位置
	let Tlist_Use_Right_Window=0        "窗口显示:1--右边，0--左边
	let Tlist_Show_One_File=1           "显示一个文件:1--是 0--否
	let Tlist_File_Fold_Auto_Close=1    "非当前文件，函数列表折叠隐藏
	let Tlist_GainFocus_On_ToggleOpen = 1  "打开taglist时，光标保留在taglist窗口
	let Tlist_Exit_OnlyWindow=1         "当taglist是最后一个分割窗口时，自动退出vim
	let Tlist_Process_File_Always=1     "实时更新tags 1--是　0--否
	let Tlist_Inc_Winwidth=0
	nmap <leader>tl :Tlist<CR>

#### 使用

* 打开Taglist窗口

		:Tlist	或者 	使用定义的快捷键 '\+t+l'

* 跳跃到某一item定义处  

		选中item，点击'Enter'

* 仅仅查看item原型
  
		选中要查看的item,点击'Space'

原型结果会显示在Vim命令行  

### echofunc

#### 简述  

echofunc可以帮助我们在插入函数的时候,提示当前输入函数的原型  
提示结果显示在command line里  

#### 添加到Vundle管理

	Plugin 'mbbill/echofunc'

#### 使用

需要tags文件的支持, 并且在创建tags文件的时候要加选项"--fields=+lS"（OmniCppComplete创建的tag文件也能用）  
整个创建tags文件的命令如下:  

	$ ctags -R --fields=+lS

当你在vim插入(insert)模式下紧接着函数名后输入一个"("的时候, 这个函数的声明就会自动显示在命令行中。  
  
如果这个函数有多个声明, 则可以通过按键*Alt + -*和*Alt + =*向前和向后翻页  
这个两个键可以通过设置`g:EchoFuncKeyNext`和`g:EchoFuncKeyPrev`参数来修改  

如果你在编译vim时加上了"+balloon_eval"特性  
那么当你把鼠标放在函数名上的时候会有一个tip窗口弹出, 该窗口中也会有函数的声明  

### WinManager

#### 简述

WinManager是一个窗口管理器   
在Vim中，通常使用其管理文件浏览器(netrw)和缓冲区(buffer)  
2.0以上的版本还可以管理其他IDE类型插件,不过，需要我们在插件中增加一些辅助变量和hook来支持WinManager  

这里，我们就用WinManager来管理文件浏览器netrw和标签浏览器Taglist。  
netrw是标准的vim插件, 已经随vim一起安装进系统里了, 不需要我们自行下载安装。  
而Taglist我们刚刚已经安装完成了  

#### 加入Vundle管理 

	Plugin 'MwumLi/WinManager'

#### .vimrc中的一些配置 

	" 设置我们要管理的插件
	let g:winManagerWindowLayout='FileExplorer|TagList' 	"FileExplorer和TagList同时在左边窗口显示
	let g:winManagerWindowLayout='FileExplorer,TagList' 	"FileExplorer和TagList同时仅有一个在左边窗口显示,使用Ctrl+n/p切换
	let g:persistentBehaviour=0 " 如果所有编辑文件都关闭了，退出vim
	nmap wm :WMToggle<cr> 	" 打开/关闭WinManager

个人觉得`let g:winManagerWindowLayout='FileExplorer,TagList'`看起来比较好点,大气  
虽然`let g:winManagerWindowLayout='FileExplorer|TagList'`可能看起来更像是一个IDE

#### 使用

* 打开WinMananger  

		'w + m'
* 假如采用第二种分开显示tags和files，则按以下方式切换:  

		'Ctrl + n' 	--->下一页
		'Ctrl + p' 	--->前一页
* 假如还没有安装minibufexpl(即将安装),则使用一下方式在不同窗口切换:

		'Ctrl + w + w'
* 假如安装了minibufexpl,则切换窗口变得很简单:  

		'Ctrl + h/j/k/l'  ==  'Ctrl + Arrow left/down/up/right'  //左-下-上-右移动

### minibufexpl 

#### 简述

minibufexpl,一个缓冲区显示器，假如仅仅看它的效果，更像是浏览器的多个标签页  
这个往往在编辑多个文件时显示  

#### 加入Vundle管理
	
	Plugin 'vim-scripts/minibufexpl.vim'

#### .vimrc中的一些配置

	let g:miniBufExplMapWindowNavVim = 1    " 按下Ctrl+h/j/k/l，可以切换到当前窗口的上下左右窗口
	let g:miniBufExplMapWindowNavArrows = 1 " 按下Ctrl+箭头，可以切换到当前窗口的上下左右窗口
	let g:miniBufExplMapCTabSwitchBufs = 1  "Ubuntu不适用
	let g:miniBufExplModSelTarget = 1   " 不要在不可编辑内容的窗口（如TagList窗口）中打开选中的buffer

#### 使用

	'Ctrl + h/j/k/l'	--->左/下/上/右窗口切换
	'Ctrl + Arrow'		--->same as 'Ctrl + h/j/k/l'
	'Tab'				--->缓冲区间切换

### minibufexpl引发的血案(窗口大小变化)  

在这之前，我们一切都感觉很好(真像一个IDE)  
但是在安装了minibufexpl后，我们的美好感觉破灭了(毕竟还不是IDE)  
文件浏览器的窗口显得异常小，在打开多个文件时，更小，哎，愁...  
还好，有解决办法，不过都不是很完美  a

#### 在.vimrc进行设置  
	
	let g:bufExplorerMaxHeight=30
	let g:miniBufExplorerMoreThanOne=0
这样倒是可以解决问题，但是也引来一些新的问题(至于什么，你试试呗),所以果断启用  

#### 设置快捷键  

对WinManager设置快捷键,比如`nmap wm :WMToggle<cr>`  
然后，我们只要在文件浏览器变小的时候，按动*两次wm*即可(先关闭，在开启)  
这个方法还是可以接收的  

#### 使用之前的分开显示tags和files的方式

---  

### Powerline

#### 简述  

Powerline,一个终极Vim状态栏工具  

#### 添加到Vundle管理

	Plugin 'Lokaltog/vim-powerline'

#### .vimrc中的一些配置

`$HOME/.vimrc`:

	set laststatus=2    "一直展示两行状态
	set t_Co=256        "告诉vim这个终端支持256色
	let g:Powerline_symbols = 'unicode'
	set encoding=utf8

#### Themes and ColorSchemes

主题在目录`autoload/Powerline/Themes`下,配色在`autoload/Powerline/Colorschemes`

#### 在tmux中的vim状态栏不颜色并不那么好看？   

确保你在.tmux.conf中启用了256color:  

	set -g default-terminal "screen-256color"
确保你在.vimrc中启用了终端256color:  

	set t_Co=256  

---

### Markdown

#### 简述

为vim下.md文件设置语法高亮，规则匹配,方便md文档的撰写  

#### 添加到Vundle管理

	Plugin 'plasticboy/vim-markdown'

#### .vimrc中的一些配置

	let g:vim_markdown_folding_disabled=1  			"禁用折叠
	let g:vim_markdown_initial_foldlevel=1
	"let g:vim_markdown_no_default_key_mappings=1   "禁用默认键
	"对文件名后缀为md,mdown,mkd,mkdn,markdown,mdwn的文件，使用markdown语法
	au BufRead,BufNewFile *.{md,mdown,mkd,mkdn,markdown,mdwn} set filetype=mkd
  
#### 一些默认快捷键

- `]]`: go to next header. `<Plug>(Markdown_MoveToNextHeader)`
- `[[`: go to previous header. Contrast with `]c`. `<Plug>(Markdown_MoveToPreviousHeader)`
- `][`: go to next sibling header if any. `<Plug>(Markdown_MoveToNextSiblingHeader)`
- `[]`: go to previous sibling header if any. `<Plug>(Markdown_MoveToPreviousSiblingHeader)`
- `]c`: go to Current header. `<Plug>(Markdown_MoveToCurHeader)`  
- `]u`: go to parent header (Up). `<Plug>(Markdown_MoveToParentHeader)`

#### 生成目录 with '#'

	:Toc 	--->创建一个快速垂直窗口显示文档目录  
	:Toch	--->创建一个快速水平窗口显示文档目录  

Hit `<Enter>` on a line to jump to the corresponding line of the markdown file.   

	:Toch	--->Same as `:Toc` but in an horizontal window.
	:Toct	--->Same as `:Toc` but in a new tab.
	:Tocv	--->Same as `:Toc` for symmetry with `:Toch` and `Tocv`.   


### fencview 

#### 简述  

不同系统，不同平台下，文件编码往往不太一样  
故在一个系统下为gb2312的文件，放在另一个系统下以utf-8的方式打开,往往会产生乱码  
好了，我(fencview)来了,fencview应运而生  

#### 添加到Vundle管理
	
	Plugin `Mwumli/fencview`  

#### 使用

* 自动探测文件编码，以合适的编码方式显示  

		:FencAutoDetect

* 打开编码列表窗口,选择合适编码，重新加载文件  

		:Fencview

### tohtml  

#### 简述  

我们往往需要把我们的代码展示给别人看，但是直接copy代码，可能查看效果并不如意  
现在有这么一个插件，可以把你的代码转化成html,并且如在你的vim中格式那样显示(*代码高亮*)  
当然，此插件不仅仅可以转化代码，还可以转化其他文字  
不过对于程序员来说，此功能就已足够  
  
此插件已经内置在vim的最新版本，故不需要手动安装  

#### ubuntu下的位置  

	/usr/share/vim/vim74/autoload/tohtml.vim  

#### 使用  

* 转化整片文章成html  

		:TOhtml   
工作目录下会生成以文件名为前缀，以html为后缀的文件  

* 转化指定行成html  

		:num1,num2TOhtml  
把此篇文章的num1到num2行的文本转化成html文件  
  

**假如此前vim显示行号，生成的html文件中也显示行号**

