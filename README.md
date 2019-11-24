# 微尘

[Visit 微尘](http://mwumli.github.io)    


利用 Github Pages 的静态站点能力, 使用 jekyll 来作为静态站点生成器  

当前使用的 jekyll 版本: `3.5.1`  

> 不同 jekyll 版本渲染效果可能不一致，因此要锁定版本，当然有必要的话还是紧跟着升级。  

目前使用 docker 来解决 jekyll 安装麻烦的问题  

## 先决条件

* 安装 docker: 使用 docker 来解决 jekyll 安装麻烦的问题  
* 类 Unix 环境: 使用了 Makefile 和一些命令写运行脚本  
* nodejs: 发布到 gh-pages 分支(发布命令需求)

## 命令

**运行本地站点**:  

```bash

$ make
docker pull jekyll/minimal:3.5.1
3.5.1: Pulling from jekyll/minimal
Digest: sha256:752774f794ce52c9caf4de02bce9c0cb4c9745048bb396ce70233f366d683d26
Status: Image is up to date for jekyll/minimal:3.5.1
docker.io/jekyll/minimal:3.5.1
docker run --rm -p 4000:4000 --volume="$PWD:/srv/jekyll" --name="ifmicro-dev" -it jekyll/minimal:3.5.1 jekyll serve --incremental
Configuration file: /srv/jekyll/_config.yml
            Source: .
       Destination: ./_site
 Incremental build: enabled
      Generating...
                    done in 9.397 seconds.
 Auto-regeneration: enabled for '.'
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
```

**构建**: `make build`  
生成的静态站点在 `_site` 目录下  

**发布**: `make publish`  


## 为什么没有直接用 Github 自动渲染 Pages

如果直接使用 github 进行构建 pages, 那么必须与 github pages 使用的 jekyll,liquid 等构建工具的版本一致, 否则可能你本地环境正确, 但是 github page 并不能给你正确构建  

不过不用担心, 构建失败, github 会给你贴心地发封邮件, 告诉构建失败的原因  

为了避免以后再次出现升级造成渲染效果与本地不同, 以后不再选择让 Github 去渲染站点, 本地构建发布或使用 CI 自动发布  

使用 [pages-gem](https://github.com/github/pages-gem#usage) 保持与 github-pages 一样的构建环境  

在这儿 <https://pages.github.com/versions/> 可以看到 github pages 构建环境依赖的软件版本  


## 相关链接

* [Official Jekyll Docker Image](https://hub.docker.com/r/jekyll/jekyll)  
* [Jekyll 镜像使用说明](https://github.com/envygeeks/jekyll-docker/blob/master/README.md)  
* [jekyll 官网](https://jekyllrb.com/)  
* Github Pages:  <https://pages.github.com/>  
