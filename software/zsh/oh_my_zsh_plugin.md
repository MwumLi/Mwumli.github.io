# 启用 oh-my-zsh 插件

Last Modify in 2015-10-07, published in 2015-10-06 by MwumLi

---



on-my-zsh 这个框架集成了许多插件, 这个在你初次安装 on-my-zsh 的时候就已经下载下来  
因此, 我们只要在 `~/.zshrc` 中启用即可  

**启用插件**  

如果插件的名字是 `svn`  
那么你需要在 `~/.zshrc` 中找到 `Plugins` 字样, 在后面添加即可,像下面这样 :  

	Plugins={git svn}

默认情况下启用了 `git`  

**寻找插件**  

1. 你可以查看在线文档 [on-my-zsh/Plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)  
   这里有那些插件的说明及用法  

2. 你可以在 `~/.oh-my-zsh/plugins/` 下找到你想要的插件  
   每一个插件都是里面一个子目录, 每一个子目录名就是插件名, 每一个子目录中都有一个 `README.md` 介绍这个插件  


