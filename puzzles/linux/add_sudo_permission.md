# 为用户增加 sudo 权限

2015-10-02 12:24:42 by Mwumli

---

让普通用户在某些时刻可以拥有超级用户的权限去做某些事情  
需要为普通用户增加 `sudo` 权限  

假设用户名为 : `hello`  

**有两种方式** : 

1. 修改 `/etc/sudoers` 文件   
   1. 可以使用 : `vim /etc/sudoers`  
      或者你可以使用内置命令 : `visudo`  
   2. 在 `root ALL=(ALL) ALL` 之后添加 : `hello ALL=(ALL) ALL`

   如果软件升级, `/etc/sudoers` 可能会被覆盖掉, 所以根据你的情况慎重使用  

2. 在 `/etc/sudoers.d/` 目录添加用户 
   1. 新建文件 `/etc/sudoers.d/hello`  
   2. 使用 `chmod` 修改文件权限为 `0440`  
   3. 在此文件中添加 : `hello ALL=(ALL) ALL`

   用这种方法是是个好的习惯, 有点模块化的感觉  

