# 查看中文字体与安装

2015-10-26 14:59:38

---

有的时候, 我们在 Linux 终端中可以正确看到中文, 但是很难看  
有的时候, 我们采用某种工具, 但是在使用过程中操纵了中文, 结果出现难以预料的错误, 比如 `gitbook pdf`  

这些都是因为中文字体的缺失  

## 查看已安装的中文字体  

    $ fc-list :lang=zh


如果仅仅是查看已经安装的字体, 那么 `fc-list` 即可  

## 一些中文字体  

安装文泉驿字体 :  

        $ sudo apt-get install ttf-wqy-zenhei ttf-wqy-microhei

卸载文泉驿字体 :  

        $ sudo apt-get remove ttf-wqy-zenhei ttf-wqy-microhei && sudo apt-get autoremove



