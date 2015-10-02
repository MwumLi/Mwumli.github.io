# 一些特殊的值

2015-09-28 10:40:36 by MwumLi 

---

## NaN

`NaN`, Not a Number  
当无法计算结果时用 `NaN` 表示, 比如 `0/0`  

NaN 表示不是一个数字, 但是 `typeof NaN` 结果为 `"number"`  

NaN 与其他数值进行比较总是不相等, 包括它自身在内  

唯一能判断是否值为 `NaN` 的方法为 : `isNaN()`  


## null 和 undefined  

`null` 表示一个 "空"的值, 但是和 `0`, `''`不同  
`0` 是一个数值, `''` 表示长度为 0 的字符串, 而 `null` 表示"空"  

`undefined` 表示值未定义, 比如 `var aa;`, 此时 `aa` 的值为 `undefined`, 因为它只是声明  


