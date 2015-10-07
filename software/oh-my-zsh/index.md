# 使用 oh-my-zsh 配置 zsh

Last Modify in 2015-10-07, published in 2015-10-06 by MwumLi

---

oh-my-zsh 是一套开源的 zsh 配置框架  

使用它, 你可以很快体会到经过配置后的 zsh 是如何强大  

项目地址 : [https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)  
项目主页 : [http://ohmyz.sh/](http://ohmyz.sh/)  

安装非常简单, 只要保持一个良好的网络环境  


## 自动化安装

下载 `https//raw.github.com/robbyrussell/on-my-zsh/master/tools/install.sh` 执行即可  

1. 使用 curl  

		$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

2. 使用 wget  

		$ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

## 手动安装


	$ git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
	$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
	$ chsh -s `which zsh`

