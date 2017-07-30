# 微尘

jekyll 3.5.1 和 github pages  

[Visit 微尘](http://mwumli.github.io)  

jekyll 2.5.3 的安装:  

	sudo gem install --no-rdoc --no-ri jekyll -v "2.5.3"

jekyll 3.5.1:

	sudo gem install jekyll bundler

如果直接使用 github 进行构建 pages, 那么必须与 github pages 使用的 jekyll,liquid 等构建工具的版本一致, 否则可能你本地环境正确, 但是 github page 并不能给你正确构建  
使用 [pages-gem](https://github.com/github/pages-gem#usage) 保持与 github-pages 一样的构建环境  
不过不用担心, 构建失败, github 会给你贴心地发封邮件, 告诉构建失败的原因  

在这儿 <https://pages.github.com/versions/> 可以看到 github pages 构建环境依赖的软件版本  

**2017-07-31**  
