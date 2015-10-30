# data URI 之 浏览器编辑器

## 体验

1. <a href="data:text/html, <html contenteditable>">极简编辑器</a>  
   可以简单的书写

2. <a href='data:text/html, <html><head><link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"><style type="text/css"> html { font-family: "Open Sans" } * { -webkit-transition: all linear 1s; }</style><script>window.onload=function(){var e=false;var t=0;setInterval(function(){if(!e){t=Math.round(Math.max(0,t-Math.max(t/3,1)))}var n=(255-t*2).toString(16);document.body.style.backgroundColor="#ff"+n+""+n},1e3);var n=null;document.onkeydown=function(){t=Math.min(128,t+2);e=true;clearTimeout(n);n=setTimeout(function(){e=false},1500)}}</script></head><body contenteditable style="font-size:2rem;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;">'>速度编辑器</a>  
   随你键入字符的速度，颜色发生改变
   速度越快, 颜色越红

3. <a href='data:text/html,<style type="text/css">.e{position:absolute;top:0;right:50%;bottom:0;left:0;} .c{position:absolute;overflow:auto;top:0;right:0;bottom:0;left:50%;}</style><div class="e" id="editor"></div><div class="c"></div><script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script><script> function showResult(e){consoleEl.innerHTML=e}var e=ace.edit("editor");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/markdown");var consoleEl=document.getElementsByClassName("c")[0];var converter=new Showdown.converter;e.commands.addCommand({name:"markdown",bindKey:{win:"Ctrl-M",mac:"Command-M"},exec:function(t){var n=e.getSession().getMode().$id;if(n=="ace/mode/markdown"){showResult(converter.makeHtml(t.getValue()))}},readOnly:true})</script>'>Markdown 编辑器</a>  
   支持 Markdown 编辑
   按下 `ctrl+m` 可以在右边窗口预览效果

4. <a href='data:text/html, <style type="text/css">.e{position:absolute;top:0;right:0;bottom:0;left:0;}</style><div class="e" id="editor"></div><script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script>var e=ace.edit("editor");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/c_cpp");</script>'>支持多种语言的编辑器</a>  
   支持多种语言语法高亮

## 浏览器编辑器

仅仅在你的浏览器的地址栏中输入 :

    data:text/html, <html contenteditable>

看到什么了, 可以编辑了, 像最原始的编辑器

## More

### 速度编辑器

随着你输入文字的速度越来越快, 编辑器的颜色也越来越快
code 如下 :

    data:text/html, <html><head><link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'><style type="text/css"> html { font-family: "Open Sans" } * { -webkit-transition: all linear 1s; }</style><script>window.onload=function(){var e=false;var t=0;setInterval(function(){if(!e){t=Math.round(Math.max(0,t-Math.max(t/3,1)))}var n=(255-t*2).toString(16);document.body.style.backgroundColor="#ff"+n+""+n},1e3);var n=null;document.onkeydown=function(){t=Math.min(128,t+2);e=true;clearTimeout(n);n=setTimeout(function(){e=false},1500)}}</script></head><body contenteditable style="font-size:2rem;line-height:1.4;max-width:60rem;margin:0 auto;padding:4rem;">

### Markdown 编辑器

可以预览的 Markdown 编辑器
使用 `ctrl+m`, 右边可以预览 :
code 如下:

    data:text/html,<style type="text/css">.e{position:absolute;top:0;right:50%;bottom:0;left:0;} .c{position:absolute;overflow:auto;top:0;right:0;bottom:0;left:50%;}</style><div class="e" id="editor"></div><div class="c"></div><script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script src="http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script><script> function showResult(e){consoleEl.innerHTML=e}var e=ace.edit("editor");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/markdown");var consoleEl=document.getElementsByClassName("c")[0];var converter=new Showdown.converter;e.commands.addCommand({name:"markdown",bindKey:{win:"Ctrl-M",mac:"Command-M"},exec:function(t){var n=e.getSession().getMode().$id;if(n=="ace/mode/markdown"){showResult(converter.makeHtml(t.getValue()))}},readOnly:true})</script>

### 支持多种语言的编辑器

支持多种语言高亮
基本 code 如下 :

    data:text/html, <style type="text/css">.e{position:absolute;top:0;right:0;bottom:0;left:0;}</style><div class="e" id="editor"></div><script src="http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script><script>var e=ace.edit("editor");e.setTheme("ace/theme/monokai");e.getSession().setMode("ace/mode/java");</script>

切换语言支持 : 更改 `ace/mode/java` 为以下值

    Markdown -> `ace/mode/markdown`
    Python -> `ace/mode/ruby`
    C/C++ -> `ace/mode/c_cpp`
    Javscript -> `ace/mode/javascript`
    Java -> `ace/mode/java`
    Scala- -> `ace/mode/scala`
    CoffeeScript -> `ace/mode/coffee`
    and
    css, html, php, latex,
    tex, sh, sql, lua, clojure, dart, typescript, go, groovy, json, jsp, less,lisp,
    lucene, perl, powershell, scss, textile, xml, yaml, xquery, liquid, diff and many more...

更换主题 : 更改 `ace/theme/monokai` 为以下值

    Eclipse -> ace/theme/eclipse
    GitHub -> ace/theme/github
    TextMate -> ace/theme/textmate
    and
    ambiance, dawn, chaos, chrome, dreamweaver, xcode, vibrant_ink, solarized_dark, solarized_light, tomorrow, tomorrow_night, tomorrow_night_blue,
    twilight, tomorrow_night_eighties, pastel_on_dark and many more..


## 参考资源  

1. [One line browser notepad](https://coderwall.com/p/lhsrcq/one-line-browser-notepad?utm_source=textarea.com&utm_medium=textarea.com&utm_campaign=article)  

2. [Data URI's format](https://www.nczonline.net/blog/2009/10/27/data-uris-explained/)  

3. [a5](http://a5.gg/)
