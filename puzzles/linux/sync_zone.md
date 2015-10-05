# 调整时区

---

一个系统的时区决定了系统显示的本地时间  

如果你的系统有很多基于本地时间的应用, 如果时区不正确会产生很大的问题  

## 调整系统时区

* Debian 系统下 :  `sudo dpkg-reconfigure tzdata`  
* 替换时区文件, 比如中国 :  

        $  sudo cp/usr/share/zoneinfo/Asia/Shanghai /etc/localtime

  `/usr/share/zoneinfo/` 目录下存储各个地区的时区文件  
  `/etc/localtime` 则是你当前系统所采用的时区信息文件  
  只要在用 `/etc/share/zoneinfo/` 下的时区文件替换 `/etc/localtime`, 那么就达到调整系统时区的目标  

## 调整用户时区  

1. 在 `~/.bashrc` 末尾添加 :  `export TZ='Asia/Shanghai'`  
2. 使 `~/.bashrc`· 生效 : `source ~/.bashrc`

如果没有设置环境变量 `TZ`, 那么就会从 `/etc/localtime` 下获取本地时间  
如果设置了, 则会根据 `TZ` 值就会从 `/usr/share/zoneinfo/$TZ` 下获取本地时间  

**如何获取 TZ 的值**  
1. 可以去 `/etc/share/zoneinfo/` 目录下寻找相应的时区信息文件  
   比如你的时区信息文件为 `/usr/share/zoneinfo/Asia/Shanghai`, 那么 `TZ` 的值就是 `Asia/Shanghai`  

2. 使用 `tzselect` 这个命令选择相应的时区即可  

## 查看时区  

1. 查看当前用户时区 :  

    $ date -R
    Mon, 05 Oct 2015 13:36:50 +0800

`+0800` 表示的正是中国所处的时区  

2. 使用 `tzselect` 选择你想查看的时区时间  
