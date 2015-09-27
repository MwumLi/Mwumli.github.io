# touch

2015-09-27 00:50:07 by MwumLi

---


用当前时间更新文件的 atime 和 mtime 或创建文件  

如果指定的文件名不存在，那么创建新文件  
如果指定的文件名存在，根据参数来改变 file-timestamps


## 使用

1. 创建文件 fileA, 如果存在则修改器 atime 和 mtime 为 current time : `touch file`

2. 改变文件 fileA 的访问时间为当前时间 : `ls -lu fileA && touch -a fileA && ls -lu fileA`

3. 改变文件 test 的修改时间为当前时间 : `ls -lt test && touch -m test && ls -lt test`

4. 让 fileA 和 fileB 的 atime 和 mtime 一致 : `touch fileB -r fileA`

## 参数

1. `-a`			-- 改变 atime
2. `-m`			-- 改变 mtime 
2. `-c`			-- 不创建文件
3. `-r file`	-- 使用 file 的时间替换当前时间
4. `-t STAMP`	-- 使用 `[[CC]YY]MMDDhhmm[.ss]` 替换当前时间
5. `-d STRING`	-- 解析 STRING 并且使用它替换当前时间  

其他请参考 : `man touch`
