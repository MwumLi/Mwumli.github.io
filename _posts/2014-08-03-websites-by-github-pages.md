---
layout: post
title: "为你和你的项目建立一个站点--Github Pages"
description: ""
category: 记录
tags: [Github, Website]
toc: true
modifyTime: "2015-09-25 16:49:18"
isShow: true
---
{% include JB/setup %}
{% include custom/gen_toc %}

## 什么是GitHub Pages?    
[Github Pages][github_pages]是GitHub推出的一个新的服务  
可以用来为你的[GitHub][github]账户和你的每一个托管在[GitHub][github]的项目建立一个web站点,show you and show your projects    

### 两种站点服务  
GitHub提供两种类型的站点服务:  

* User or organization Site -- 个人或组织站点  
* Project Site -- 项目站点  
  
每一个GitHub用户只可以创建一个个人站点，同时，你可以建立多个项目站点  

### 好处不言而喻
建立个人或组织站点，让更多的人更好的认识你或你的组织  
建立项目站点，你可以可视化的展示你的每一个项目，而不是让你的partner(或者更多喜欢这个项目的人)看着一堆源代码而手足无措  

你可以很轻松建立一个网站(尽管它是static),有专门的主机托管，还可以通过git进行版本控制，那不是很酷吗？  

好了，该做出你的选择了...    

## 建站开始  

--- 

### User or organization Site  

---

#### [创建一个仓库][github_repository]  

从[GitHub][github]开始，[创建][github_repository]一个名为**username.github.io**的仓库  
其中,仓库名的第一部分*username*是你在GitHub上的用户名(或组织名)  
假如*username*和你的用户名不匹配，站点将不能工作，因此，请确保它正确  
![在GirHub上新建一个仓库][img_user_t1]  

#### 选择你正在使用的git客户端  

这里讲述三种客户端：  

* Terimal -- 这种经常用在Unix或类Unix系统下(Linux,mac当然也可以)  
* GitHub for Windows -- 一看就知道，这是windows下的客户端  
* GitHub for Mac -- 这个是Mac下的客户端  

好了，开始咯  

##### Terimal(终端)  

###### 克隆刚创建的仓库  

在terimal下转到你想存放你项目的地方，然后clone这个新的仓库  

	$ git clone https://github.com/username/username.github.io  

###### Hello World  

进入项目目录，新建一个*index.html*,如下  

	$ cd username.github.io
	$ echo "Hello World" > index.html  

###### push你的项目到github  

添加，提交，推送你对项目做出的改变  

	$ git add --all
	$ git commit -m "Initial commit"
	$ git push

---

##### GitHub for Windows or Mac  

###### Clone仓库  

点击绿色的"Set up in Desktop"按钮  
当GitHub桌面app打开，保存这个项目  
![从GitHub上启动桌面app][img_user_w1]  
假如app没有启动，那么双击的桌面app启动它，并且在app里克隆你的项目  

###### Create一个index.html文件  

使用你最喜欢的编辑器，新建index.html,内容如下  

	<!DOCTYPE html>
	<html>
	<body>
	<h1>Hello World</h1>
	<p>I'm hosted with GitHub Pages.</p>
	</body>
	</html>

然后，添加到你的项目   

###### commit && Sync

进入你的仓库(app里),commit你的变化，然后按下sync(同步)按钮  
假如你在Windows下：  
![windows提交并同步变化到项目][img_user_w2]  
假如你在Mac下：  
![Mac提交并同步变化到项目][img_user_m1]  

##### 未知区域  

假如你不知道你的平台，额，我无能为力了  

#### 浏览你的网站吧  

 启动你的浏览器，输入*http://username.github.io*,然后，回车，接着，404，哈哈  
等一下吧，新生成一个网站需要一段时间滴  
时间也不是很长，大概10分钟吧  
未来可能会做的更好，期待吧  

---

### project Site  

创建项目站点，有两种办法  

1. Generate a Site   
2. Start from scratch  

实际上两者创建了分支gh-pages，只是第一种办法是在当前项目的主分支的当前状态开辟新的分支；第二种则是开辟一个没有父节点的分支  
说的简单点，第一种的gh-pages分支有当前项目的主分支的内容,所以被称为*半路出家*；而第二种则没有当前项目主分支的内容，完全像一个新的仓库,所以被称为*白手起家*(Start from scratch)  


#### 半路出家(Generate a Site)

##### Repository Settings

访问[GirHub,com][github],创建一个新的仓库或者进入一个已存在的仓库  
然后点击右手边的*Settings*,进入项目设置页面  
![Repository settings][img_pro_1]  

##### 使用Automatic Generator

滑动settings页面到*GitHub Pages*模块  
按下*Automatic Page Generator*按钮  
![Automatic Pages Generator][img_pro_2]

##### 添加内容  

使用内置编辑器添加内容给你的网站  
假如你已经有了*README.md*在你的项目，你可以点击右手边*Load README.md*进行导入  
当你做完这些，点击*Continue to Layouts*  
![add content to your project site][img_pro_3]  

##### 选择一个主题  

在顶部的提供主题里，选择一个你喜欢的主题  
当你完成，点击右手边的*Publish page*按钮  
![choose a theme][img_pro_4]  

半路出家搞定  

---

#### 白手起家(Start from scratch)

##### 创建一个ph-pages分支  

在你的项目页面，点击左手边分支下拉菜单，输入`gh-pages`,然后按下enter进行创建  
![create gh-pages branch][img_pro_5]  
这个分支用于发布你的项目站点，你可以随时添加项目的进度等  

##### 使其成为默认分支  

假如你已经为你的项目创建了新分支*gh-pages*  
进入仓库设置界面  
在顶部的模块，改变默认分支为*gh-pages*  
![change default branch][img_pro_6]  
这一步并不是必须的，因为此步的意义只是让其看起来更像一个web site project  

##### 创建一个index.html  

返回仓库总览界面，点击紧邻仓库名旁边的plus图标创建一个名为index.html的文件    
![create file][img_pro_7]

##### Hello World  

为这个index.html文件添加内容*Hello world*  
![hello-world][img_pro_8]  

##### commit文件  

滑动到页面底部，写上提交信息，提交这个新文件  
![commit-web][img_pro_9]  
呼，打完收工  
  
对咯，这种办法创建项目站点完全可以在Terimal,GitHub for Windows,还有GitHub for Mac下进行，请自行探索吧  

####  查看你的项目站点  

领年终奖了  
启动你的浏览器，输入*http://username.github.io/repository*  
*Repository*是你的项目仓库名  
然后，回车，接着，404，额，又被坑了  
等10分钟吧，这么简单创建一个web站点，也不差这点时间对吧?  


[github]:https://pages.github.com/ "GitHub 首页"  
[github_pages]:https://pages.github.com/ "GitHub Pages"  
[github_repository]:https://github.com/new "新建一个GitHub仓库"  
[img_user_t1]:https://pages.github.com/images/user-repo@2x.png  
[img_user_w1]:https://pages.github.com/images/setup-in-desktop@2x.png  
[img_user_w2]:https://pages.github.com/images/sync-windows@2x.png  
[img_user_m1]:https://pages.github.com/images/sync-mac.png  
[img_pro_1]:https://pages.github.com/images/settings@2x.png  
[img_pro_2]:https://pages.github.com/images/automatic@2x.png  
[img_pro_3]:https://pages.github.com/images/add-content@2x.png  
[img_pro_4]:https://pages.github.com/images/choose-layout@2x.png  
[img_pro_5]:https://pages.github.com/images/create-branch@2x.png  
[img_pro_6]:https://pages.github.com/images/default-branch@2x.png  
[img_pro_7]:https://pages.github.com/images/create-file@2x.png
[img_pro_8]:https://pages.github.com/images/hello-world@2x.png
[img_pro_9]:https://pages.github.com/images/commit-web@2x.png 

