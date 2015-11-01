# Vim

2015-10-03 01:02:08 by MwumLi

---

Vim 是一个 Unix/类Unix 程序员必备的一个编辑器利器  
它很强大, 但是它的强大来源于那丰富多彩的插件  

## 文件部署

`.vimrc` -- 总控制器, 配置前后的一些配置  
`.vimrc.plugins` --- plugins  
`.vimrc.custom` --- custom  
`.vimec.funcs` --- 一些自定已定义函数  
`.vimrc.keys` -- 快捷键  


## 功能

1. 重新定义了前缀键 : `<Leader> -- ;`  
2. 搜索 :  
   1. 开启了实时搜索
   2. 搜索时忽略大小写
   3. 搜索内容全部高亮显示
3. 补全 :
   1. 命令行模式只能补全
   2. 采用两种代码补全方式 : neocomplete 和 YouCompleteMe
   3. 使用代码片段 : vim-snippets 和 Ultisnips
4. 缩进 :
   1. 智能缩进,自适应不同语言
   2. 将 Tab 键扩展为 4 个空格
   3. 使用 Vim 的格式化操作的时候, Tab 键占用空格书为 4 (`Visual-> 选中区域 -> =`)
   4. 让 vim 把连续数量的空格视为一个 Tab  
   5. 使用 `Backspace` 删除的时候, 一次删除 4 个空格

5. 使用 Vundle 进行插件管理

6. 主题 
   1. 开启 256 色 适应主题色彩的需要
   2. 默认使用了 molokai 主题
   3. 基本背景底色为亮色调

7. 底部状态栏
   1. 总是显示 2 层状态栏
   2. 显示光标位置在状态栏右侧

7. 显示
   1. 默认开启行号、行光标线和列光标线的显示
   2. 有快捷键可以随时切换

8. 不兼容 vi 模式 


## 快捷键

1. 窗口类

        qq -- 放弃更改并关闭当前窗口
        wq -- 保存并关闭当前窗口
        <Leader>qa -- 保存全部窗口并关闭
        sp -- 保存
        wa -- 保存所有窗口

        <Leader>lw -- 跳转至右边的窗口
        <Leader>hw -- 跳转至左边的窗口
        <Leader>jw -- 跳转至下边的窗口
        <Leader>kw -- 跳转至上边的窗口

2. 配置文件生效  

        <Leader>s

3. 移动  

        4 -- 跳到行首
        0 -- 跳到行尾        
        5 -- 结对符之间跳转,助记 pair        

4. 切换

        <Leader>cr -- 展示/隐藏行光标线
        <Leader>cl -- 展示/隐藏列光标线
        <Leader>n -- 展示/隐藏行号
        <Leader>h -- 切换中英文帮助

5. 时间
        
        'd -- 插入当前时间 2015-10-09 08:39:08       

6. 拷贝  

        <Leader>y -- 将选中文本复制到系统剪贴板
        <Leader>p -- 将系统剪贴板的内容粘贴到 Vim


7. marks  

        mx    --  Toggle mark 'x' and display it in the leftmost colu
        dmx   --  Remove mark 'x' where x is a-zA-Z
        m,    --  Place the next available mark
        m.    --  If no mark on line, place the next available mark. Otherwise,
        remove (first) existing mark.
        m-    -- Delete all marks from the current line
        m<Space> -- Delete all marks from the current buffer
        m/    --  Open location list and display marks from current buffer

8. 注释  

        <Leader>cc -- 注释当前行
        <leader>cm -- 只用一组符号来注释
        <leader>cy -- 注释并复制
        <leader>cs -- 优美的注释
        <leader>cu -- 取消注释

9. DrawIt -- 逗比模式  

        <Leader>di -- to start DrawIt and
        <Leader>ds -- to stop  DrawIt.
        
10. 补全  

        Down或Ctrl+n -- 移动到下一条补全并选中内容
        Up或Ctrl+p -- 移动到上一条补全并选中内容
        Tab -- 展开 snip/跳到snip的下一个编辑位置, 如果气泡窗口上选中项目有 snip 标识  
        S-TAB -- 跳到上一个 snip 的编辑位置

## 启动  

	$ vim

启动时不加载 `.vimrc` 配置文件, 且禁止 Vi 兼容模式  `vim -u NONE -N`  

## 支持 256 色  

`set t_Co=256`

## 参考链接  

* [初学者简易 .vimrc 编写指南](http://edyfox.codecarver.org/html/_vimrc_for_beginners.html)  

* [Vim 使用总览](http://edyfox.codecarver.org/html/vim.html)  

* [明无梦的 Vim 使用记录](http://www.dreamxu.com/books/vim/index.html)  

* [所需即所获：像 IDE 一样使用 vim](https://github.com/yangyangwithgnu/use_vim_as_ide#0)

* [快速提高 Vi/Vim 使用效率的原则与途径](https://www.ibm.com/developerworks/cn/linux/l-cn-tip-vim/)

* [跟我一起学习VIM - The Life Changing Editor](http://ju.outofmemory.cn/entry/79671)


## vim 脚本函数

	filereadable(expand(path)) -- 判断文件是否存在  
