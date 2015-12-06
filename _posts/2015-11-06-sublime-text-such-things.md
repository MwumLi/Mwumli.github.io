---
layout: post
title: "Sublime Text 安装与配置的那些事"
toc: "true"
modifyTime: "2015-12-06"
description: " Sublime Text 在 Linux 下的安装与系统配置"
category: 软件
tags: [Sulime Text, 前端, 编辑器]
---
{% include LU/setup %}
{% include LU/gen_toc %}

## 简介

[Sublime Text](http://www.sublimetext.com/) 是一个很好用的编辑器, 无论对于编程还是文本编辑, 都非常不错    

它小巧且速度非常快，支持 `Win/Mac/Linux` 等多种平台  
也同时支持 32 位与 64 位

它支持各种流行编程语言的语法高亮、代码补全  

它可以像 vim 一样安装插件，增强本身没有的功能，而且有比 Vim 更方便的插件浏览、安装和管理方式    
只需要一两个命令，就可以方便下载，等待使用  

它收费, 但是它提供免费使用，当然无限期，无限制，只是偶尔提醒你木有购买，而且频率很低，这点让人觉得很赞  

好的软件, 总是要付出软件创作者的巨大的心力, 如果你有足够的金子, 不妨买一个 [key](http://www.sublimetext.com/buy) 赞助一下  

## 安装

Sublimex Text 目前有两个版本 2 和 3, 2 应该属于 LTS(Long Term Support),而 3 是 beta, 不过也算稳定  

至于安装哪个, 取决于你的选择  

**下载地址** :

1. Sublime Text 2 : <http://www.sublimetext.com/2>  
2. Sulimex Text 3 : <http://www.sublimetext.com/3>  

这里只写 Ubuntu 下的安装与配置  

### Sublime Text 2

两种安装方式 :  源安装 和 下载压缩包  

**源安装**:  

    $ sudo add-apt-repository ppa:webupd8team/sublime-text-2  
    $ sudo apt-get update  
    $ sudo apt-get install sublime-text

**压缩包安装** :  
    
1. 下载 Sublime text 2 : <http://www.sublimetext.com/2>  
   (提供的是一个压缩包, 暂且命名为 Sublime-Text-2.0.2-x64.tar.bz2)  
2. 解压缩到 `/opt` 下 : `tar -xjvf Sublime-Text-2.0.2-x64.tar.bz2 -C /opt`
3. 建立软链接到 `/usr/bin` 下 : `ln -s /opt/Sublime_Text_2 /usr/bin/subl`  
   (建立在 PATH 变量任意路径下都可以)  

### Sublime Text 3

1. 下载 Sublime Text 3: <http://www.sublimetext.com/3>  
   (提供的是一个 deb 文件, 暂且命名为为 sublime-text_build-3083_amd64.deb)

2. 命令安装 : `sudo dpkg -i sublime-text_build-3083_amd64.deb`  

3. 如果出现依赖错误, 可以执行 : `sudo apt-get install -f`  

## 系统配置

在 Linux , 要想正常使用 Sublime, 你需要做些系统相关的配置  

### 中文输入和搜索

Ubuntu 下, Sublimex Text 不能输入中文, 这个网上已经给出解决方案  

通过压缩包方式安装 Sublime, 在应用程序搜索中, 不会搜索到 Sublime  
(按下 Window 键, 就唤起了应用程序搜索面板)  

解决方法如下 :  

1. 新建文件 `sublime-imfix.c` :  

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

2. 安装编译环境 :  

        sudo apt-ger install build-essential libgtk2.0-dev -y

3. 编译共享库 :  

        gcc -shared -o libsublime-imfix.so sublime-imfix.c  `pkg-config --libs --cflags gtk+-2.0` -fPIC

   移动共享库到 `/usr/lib/` 下 :  

        sudo mv libsublime-imfix.so /usr/lib/

4. 测试一下是否能输入中文 : 
        
        LD_PRELOAD=./libsublime-imfix.so subl

5. 命令行启动，自动使用共享库 :  

        echo "LD_PRELOAD=/usr/lib/libsublime-imfix.so subl" >> ~/.bashrc
   
6. 添加应用程序菜单,自动使用共享库 :  
   新建 `/usr/share/applications/sublime_text.desktop`, 内容如下 :  

        [Desktop Entry]
        Version=1.0
        Type=Application
        Name=Sublime Text
        GenericName=Text Editor
        Comment=Sophisticated text editor for code, markup and prose
        Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /opt/sublime_text/sublime_text %F'
        Terminal=false
        MimeType=text/plain;
        Icon=sublime-text
        Categories=TextEditor;Development;
        StartupNotify=true
        Actions=Window;Document;

        [Desktop Action Window]
        Name=New Window
        Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /opt/sublime_text/sublime_text -n'
        OnlyShowIn=Unity;

        [Desktop Action Document]
        Name=New File
        Exec=bash -c 'LD_PRELOAD=/usr/lib/libsublime-imfix.so /opt/sublime_text/sublime_text --command new_file'
        OnlyShowIn=Unity;
  
    重启或注销生效  

### 固化在左侧的 dock 里  

1. 通过命令行或者应用程序菜单启动 Sublime   
2. 在 dock 里会出现 Sublime 的图标, 点击右键，选择`lock from Launcher`,然后它就被锁定在 dock 中了  

以后你就可以直接可以从 dock 中打开 Sublime  

### 设置默认打开文档

希望使用 sublime 成为某种特定文档的默认打开方式, 可以这样做 : 

1. 右键文件，选择`Propertites`（属性）  

2. 点击`Open With`, `Default Application` 下选择`Sublime Text`, 点击 `Set as default`  

这样，你双击打开每一个这种类型的文件，都会自动用`Sublime Text`打开

## 注册

虽然可以一直免费使用，但是弹出来的警告框总是令人很不爽  
有幸在网络上搜集到一枚 Sublimex Text 2 的注册码   

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

不过，若是大家手头方便的话，不妨支持一下[正版](http://www.sublimetext.com/buy)，毕竟辛辛苦苦做一个软件不容易，何况还是这么好的软件(将来可能会更好)  

