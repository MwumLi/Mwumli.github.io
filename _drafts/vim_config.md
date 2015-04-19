### 启用ballon_eval特性  

	sudo apt-get install vim-gtk  
或  

	sudo apt-get install vim-gnome  

### vim配色方案
vim的配色文件在 */usr/share/vim/vim74/colors*  
在.vimrc中指定：  
	
	colorscheme desert
然后，在vim下次启动时就会激活此主题  
To enable 256 colors in vim, put this your .vimrc before setting the colorscheme:  

	set t_Co=256  
You may also need to add:  

	set t_AB=^[[48;5;%dm
	set t_AF=^[[38;5;%dm

Your colors should at least look a little different. For full effect, use a colorscheme that supports 256 colors like desert256, inkpot, 256-grayvim, or gardener.  

### 终端色调  
1. 查看你的终端实际支持颜色:  

	$ tput colors 
2. 为ls应用新色谱，并查看:  

	$ eval $(dircolors /etc/DIR_COLORS.256color)
	$ echo $LS_COLORS | tr : '\n' | sed 's/\(.*\)=\(.*\)/\x1b[\2m\1\t\2\x1b[0m/'

其中DIR_COLORS.256color是一个符合格式的色谱文件，通过应用文件，可以使*ls命令根据不同的文件类型显示的颜色  

#### 支持256色的终端  
Debian传统终端并不支持xterm-256color,除非你安装ncurses-term包  
Ubuntu12.04之后支持256色  
Max OS X 10.7之后默认支持xterm-256color  

#### Terminal 256 color support list
##### Will be enabled with 256 colors automatically  
* gnome-terminal  
* konsole could be improved slightly  
* mate-terminal  
* Terminal  
* xterm   
* roxterm  
* terminator  
* rxvt256c (already defaults to 256 color)  
* urxvt256c (already defaults to 256 color)  
* st (already defaults to 256 color)  
* screen  
* tmux (uses screen env settings)  

##### Don't support 256 colors
* linux virtual console  
* tn5250  
* x3270  
* rxvt (8)  
* urxvt (88)  
* aterm  

#### May auto support 256 colors in future  
These terminals can support 256 colors but are not identifiable using env variables.   
It would make sense to modify these to set COLORTERM  

* lxterminal  
* termit  
* tilda  
* sakura  
* yakuake  
* guake  
* mrxvt  

Ubuntu (I've checked Hardy and Lucid) only ships with some basic terminfo definitions.   
	
	sudo aptitude install ncurses-term 
will get you the additional ones for 256 colors.   

### 快捷键  
#### 关于补全  
1. 插入内置snippet  

	使用光标移动到snip前一行+tab+tab  
或者 

	使用Ctrl+n/p移动到snip+tab  
2. 关闭补全   

	Ctrl+g  
或者  

	Ctrl+y
或者  
	
	Ctrl+e

3. 打开补全  

	Ctrl+l

4. 删除光标前的char  

	backspace
或者 
	Ctrl+h		//可能是为了没有backspace键的键盘  

