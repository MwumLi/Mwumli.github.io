# 微尘

jekyll 3.5.1 和 github pages  

[Visit 微尘](http://mwumli.github.io)  

## 环境搭建

jekyll 2.5.3 的安装:  

	sudo gem install --no-rdoc --no-ri jekyll -v "2.5.3"

jekyll 3.5.1:

	sudo gem install jekyll bundler

如果直接使用 github 进行构建 pages, 那么必须与 github pages 使用的 jekyll,liquid 等构建工具的版本一致, 否则可能你本地环境正确, 但是 github page 并不能给你正确构建  
使用 [pages-gem](https://github.com/github/pages-gem#usage) 保持与 github-pages 一样的构建环境  
不过不用担心, 构建失败, github 会给你贴心地发封邮件, 告诉构建失败的原因  

在这儿 <https://pages.github.com/versions/> 可以看到 github pages 构建环境依赖的软件版本  

## 发布

Github Pages 开始使用 rouge 2.2.1 渲染 code, 但是 rouge 2.2.1 相比 1.x.x 有了 break changes, 致使我的样式发生变化  

为了避免以后再次出现升级造成渲染效果与本地不同, 以后不再选择让 Github 去渲染站点, 采用本地构建, 然后发布  


**2017-11-21 01:31:35**
