# 启用 oh-my-zsh 主题

Last Modify in 2015-10-07, published in 2015-10-06 by MwumLi

---

使用一个与众不同的主题, 让你的 zsh 赏心悦目起来  
oh-my-zsh 提供了上百种主题, 位于 `~/.oh-my-zsh/themes/` 下  

**指定主题**  

如果你找到主题 `~/.oh-my-zsh/themes/apple.zsh-theme`  
那么你需要在 `~/.zshrc` 中找到 `ZSH_THEME`, 然后修改它的值 :  

	ZSH_THEME='apple'


**随机主题**  

如果你觉得选择是意见令人纠结的事情, 那么你可以让设置为每开启一个终端, 都随机启用一个主题  
你需要这样做 : 

	ZSH_THEME='random'  


**注意**  

如果你按照上述方法更换了主题, 却没有达到相应效果,请注意一下几点 :  
1. 有些主题需要一些其他的支持才能表现的更好, 比如需要 [powerline](https://github.com/powerline/powerline)  
   每种主题都不一样, 请在这里看具体主题的要求 : [on-my-zsh | themes](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)  

2. 还要注意一下你的终端是否开启 256 色 : [为终端开启 256 色](http://www.ifmicro.com/book-micro_puzzles/puzzles/linux/setup_256_colors_for_term.html)  
