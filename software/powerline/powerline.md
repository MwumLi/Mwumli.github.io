# powerline

Last Modify in 2015-10-07, published in 2015-10-07 by MwumLi

---

Powerline 是一个状态栏插件  
与 vim, zsh, bash, tmux, IPython, Awesome 和 Qtile 配合使用  

项目地址 : [https://github.com/powerline/powerline](https://github.com/powerline/powerline)  

项目文档 : [https://powerline.readthedocs.org/en/latest/](https://powerline.readthedocs.org/en/latest/)  


## ubuntu 下的安装

1. 安装 python-pip :  

		$ sudo apt-get install python-pip

2. 安装 powerline-status :  

		$ pip install --user powerline-status


## 查看安装路径  

	$ pip status powerline-status
	---
	Name: powerline-status
	Version: 2.2
	Location: /home/mwumli/.local/lib/python2.7/site-packages
	Requires:

## 与其他软件的适配 

### vim

便于 Vim 使用者 [使用 Vundle 对 Vim 插件进行管理及安装](http://www.ifmicro.com/vim-plugin-manage/)  

特别新建了一个仓库 : [vim-powerline](https://github.com/Lokaltog/vim-powerline)  

这样只需要在 `.vimrc` 添加 : `Plugin 'Lokaltog/vim-powerline'` 即可  

### tmux

在配置文件 `~/.tmux.conf` 末尾增添 :  

	source-file /home/mwumli/.local/lib/python2.7/site-packages/powerline/ bindings/tmux/powerline.conf
	source-file /home/mwumli/.local/lib/python2.7/site-packages/powerline/ bindings/tmux/powerline_tmux_1.8_plus.conf

### zsh

在配置文件 `~/.zshrc` 末尾增添 :  

	export PATH=$PATH:$HOME/.local/bin
	 . /home/mwumli/.local/lib/python2.7/site-packages/powerline/bindings/z sh/powerline.zsh


如果使用了 [oh-my-zsh](../zsh/oh_my_zsh.html)  
那么需要在 `export PATH`之后, 并且在`source $ZSH/oh-my-zsh.sh` 之前添加即可  

### bash

在配置文件 `~/.bashrc` 末尾增添 :  

	export PATH=$PATH:$HOME/.local/bin
	 . /home/mwumli/.local/lib/python2.7/site-packages/powerline/bindings/bash/powerline.sh

