---
layout: post
title: "Sublime Text 2的安装与配置"
description: ""
category: 记录
tags: [Sulime Text 2,前端,编辑器]
---
{% include LU/setup %}

### 简介
Sublime Text 2是一个超强代码编辑器或者文本编辑器  

它小巧绿色且速度非常快，跨平台支持Win/Max/Linux,支持32位与64位  

它支持各种流行编程语言的语法高亮、代码补全  

它收费，而且很贵，但是它提供免费使用，当然无限期，无限制，只是偶尔提醒你木有购买，而且频率很低，这点让人觉得很赞  

它可以像vim一样安装插件，增强本身没有的功能，而且不需要你从特殊站点下载插件，然后费尽心思的放在某处(譬如安装目录)  
只需要一两个命令，就可以方便下载，等待使用  

对咯，它有很大一个缺点，名字太长了，嘿嘿，更多的时候我们简称其为ST2  

### Ubuntu下的安装  

#### 添加源安装(简单)

	$ sudo add-apt-repository ppa:webupd8team/sublime-text-2  
	$ sudo apt-get update  
	$ sudo apt-get install sublime-text

#### 压缩包安装(还需要更多的配置)
1. 解压安装包到/opt下(当然其他目录也可以)  

		# tar -jxvf Sublime\ Text\ 2.0.2\ x64.tar.bz2 -C /opt/brackets/  

2. 建立软链接到/usr/bin下  

		# ln -s /opt/sublime_text_2/sublime_text /usr/bin/sublime-text

这样，我们就可以在命令行的任意工作目录下键入**sublime-text**打开ST2咯  

### 放到应用程序菜单

更多的时候我们更想把它放在应用程序菜单,方便打开使用  
( 当你采用添加源安装,它已经放在应用程序菜单中了 )  

因此建立一个sublime-text-2.desktop文件，放入/usr/share/applications/下  

		# touch /usr/share/applications/sublime-text-2.desktop

然后copy一下内容到此文件中:  

		#!/usr/bin/env xdg-open	
		[Desktop Entry]
		Name=Sublime Text 2
		GenericName=Text Editor
		Comment=Sophisticated text editor for code, html and prose¬
		Exec=/usr/bin/subl %F
		Terminal=false
		Type=Application
		MimeType=text/plain;text/x-chdr;text/x-csrc;text/x-c++hdr;text/x-c++src;text/x-java;text/x-dsrc;text/x-pascal;text/x-perl;text/x-python;application/x-php;application/x-httpd-php3;application/x-httpd-php4;application/x-http d-php5;application/xml;text/html;text/css;text/x-sql;text/x-diff;x-directory/normal;inode/directory;
		Icon=sublime_text
		Categories=TextEditor;Development;Utility;
		StartupNotify=true
		Actions=Window;Document;
		
		X-Desktop-File-Install-Version=0.22
		
		[Desktop Action Window]
		Name=New Window
		Exec=/usr/bin/subl -n
		OnlyShowIn=Unity;
		
		[Desktop Action Document]
		Name=New File
		Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /usr/bin/subl' --com mand new_file
		OnlyShowIn=Unity

okay,可能你还要注销或者重启一下系统  
然后按下Windows徽标键,这时候弹出搜索面板，随着你键入应用程序的名字(Sublime Text 2)，会逐渐确定你想打开的应用程序  
点击应用程序图标，打开它  

### 固化在左侧的dock里（默认都在左侧）  

1. 当你通过命令行或者应用程序菜单启动ST2后  
2. 在dock里会出现ST2的图标,点击右键，选择`lock from Launcher`,然后它就被锁定在dock中了  

以后你就可以直接可以在dock中看到ST2咯  

### 解决中文输入法的问题

安装完ST2后，发现竟然无法输入中文  
但是，不用担心，网上已经给出解决办法  

1. 新建一个.c文件**sublime-imfix.c**,内容如下:  
		
		/*
		
		 * sublime-imfix.c Use LD_PRELOAD to interpose some function to fix sublime
		 * input method support for linux. By Cjacker Huang <jianzhong.huang at
		 * i-soft.com.cn>
		 * 
		 * gcc -shared -o libsublime-imfix.so sublime_imfix.c `pkg-config --libs
		 * --cflags gtk+-2.0` -fPIC LD_PRELOAD=./libsublime-imfix.so sublime_text 
		
		 */
		
		#include <gtk/gtk.h>		
		#include <gdk/gdkx.h>
		
		typedef GdkSegment GdkRegionBox;		
		
		
		struct _GdkRegion {
			long            size;
			long            numRects;
			GdkRegionBox   *rects;
			GdkRegionBox    extents;
		};		
		GtkIMContext   *local_context;		
		
		void gdk_region_get_clipbox(const GdkRegion * region, GdkRectangle * rectangle)
		{
		
			g_return_if_fail(region != NULL);
			g_return_if_fail(rectangle != NULL);		
			

			rectangle->x = region->extents.x1;
			rectangle->y = region->extents.y1;
			rectangle->width = region->extents.x2 - region->extents.x1;
			rectangle->height = region->extents.y2 - region->extents.y1;
			GdkRectangle    rect;		
			

			rect.x = rectangle->x;
			rect.y = rectangle->y;
			rect.width = 0;
			rect.height = rectangle->height;
		
			// The caret width is 2;
			// Maybe sometimes we will make a mistake, but for most of the time, it
			// should be the caret.
			if (rectangle->width == 2 && GTK_IS_IM_CONTEXT(local_context)) {
				gtk_im_context_set_cursor_location(local_context, rectangle);
			}
		}		
		
		
		// this is needed, for example, if you input something in file dialog and
		// return back the edit area
		// context will lost, so here we set it again.		
		
		
		static GdkFilterReturn event_filter(GdkXEvent * xevent, GdkEvent * event,
											gpointer im_context)
		{
			XEvent         *xev = (XEvent *) xevent;		

			if (xev->type == KeyRelease && GTK_IS_IM_CONTEXT(im_context)) {

				GdkWindow      *win = g_object_get_data(G_OBJECT(im_context), "window");		
		
				if (GDK_IS_WINDOW(win))
					gtk_im_context_set_client_window(im_context, win);
		
			}
		
			return GDK_FILTER_CONTINUE;
		}		
		
		
		void gtk_im_context_set_client_window(GtkIMContext * context,
											  GdkWindow * window)
		{
		
			GtkIMContextClass *klass;		
		
			g_return_if_fail(GTK_IS_IM_CONTEXT(context));
			klass = GTK_IM_CONTEXT_GET_CLASS(context);
		
			if (klass->set_client_window)
				klass->set_client_window(context, window);		
				
			if (!GDK_IS_WINDOW(window))
				return;
		
			g_object_set_data(G_OBJECT(context), "window", window);

			int             width = gdk_window_get_width(window);
			int             height = gdk_window_get_height(window);		
		
			if (width != 0 && height != 0) {
		
				gtk_im_context_focus_in(context);
				local_context = context;
			}
		
			gdk_window_add_filter(window, event_filter, context);
		}

2. 安装C/C++编译环境和libgtk2.0dev  

		$ sudo apt-get install build-essential
		$ sudo apt-get install libgtk2.0-dev

3. 编译共享库  

		$ gcc -shared -o libsublime-imfix.so sublime-imfix.c  `pkg-config --libs --cflags gtk+-2.0` -fPIC

移动共享库到/usr/lib下:  

		$ sudo mv libsublime-imfix.so /usr/lib/

4. 修改启动方式  
	* 命令行启动  
	
			$ LD_PRELOAD=./libsublime-imfix.so sublime-text

	* 图形化启动  
	修改/usr/share/applications/sublime-text-2.desktop:  
	将  

			Exec=/usr/bin/subl %F  
	
		修改为  
	
			Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /usr/bin/subl %F'
		
		将  
	
			Exec=/usr/bin/subl -n

		修改为  

			Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /usr/bin/subl' -n
	
### 设置ST2默认打开文档类型
ST2不仅仅是一个超级代码编辑器，更重要的是它也是一个文档编辑器  
既然这样，我们为何还在使用gedit这个古老的东西呢?  
	
	$ vim /usr/share/applications/defaults.list

使用vim的替换功能  
	
	1,$s/gedit.desktop/sublime-text-2.desktop/g

注销或者重启一下  
这样，你右键文件，会出现使用`Open With Sublime Text 2`
有时候，这样可能不会有效果(额，我也不太清楚为什么，如果您知道，请留言)  
我们可以对单独每种类型设定:  

1. 右键文件，选择`Propertites`（属性）  
2. 点击`Open With`,默认应用下选择`Sublime Text 2`  
这样，你双击打开每一个这种类型的文件，都会自动用`Sublime Text 2`打开

### 一枚注册码
虽然可以一直免费使用，但是弹出来的警告框总是令人很不爽  
有幸在网络上搜集到一枚注册码   

	----- BEGIN LICENSE -----
	Andrew Weber
	Single User License
	EA7E-855605
	813A03DD 5E4AD9E6 6C0EEB94 BC99798F
	942194A6 02396E98 E62C9979 4BB979FE
	91424C9D A45400BF F6747D88 2FB88078
	90F5CC94 1CDC92DC 8457107A F151657B
	1D22E383 A997F016 42397640 33F41CFC
	E1D0AE85 A0BBD039 0E9C8D55 E1B89D5D
	5CDB7036 E56DE1C0 EFCC0840 650CD3A6
	B98FC99C 8FAC73EE D2B95564 DF450523
	------ END LICENSE ------

不过，若是大家手头方便的话，不妨支持一下正版，毕竟辛辛苦苦做一个软件不容易，何况还是这么好的软件(将来可能会更好)  

---

## 学学ST2的用法

假如你已经安装好了ST2,那么学学怎么[ST2的一些操作和插件管理](/记录/2014/06/08/st2-some-usage/ "Sublime Text 2的使用")吧
