# 函数

2015-10-15 09:51 by MwumLi

---

## 函数定义

js 中函数定义有两种方式 :  

1. 使用 `function` 关键字  

        function abs1(x) {
            if (typeof x != 'number' ) {
                throw "Not a number";
            }
            return x >= 0 ? x : -x;
        }
        
        abs1(-1);   // 1
        abs1(1);    // 1
        abs1(0);    // 0

2. 定义匿名函数  

        var abs2 = function(x) {
             if (typeof x != 'number' ) {
                throw "Not a number";
            }
            return x >= 0 ? x : -x;
       
        };

        abs2(-1);   // 1
        abs2(1);    // 1
        abs2(0);    // 0

   这种方法是采用变量赋值把匿名函数赋给一个变量  
   所以这是一个赋值语句, 因此末尾需要添加 `;`  


## 注意

1. js 函数始终需要返回, 如果不明确用 `return` 指出返回值, 那么默认返回 `undefined`  
2. js 进行函数调用的时候并没有对参数进行限制, 即可以比实际参数多, 比实际参数少, 甚至可以不写  
   因此定义函数时, 最好在函数内部做一下参数校验  

3. js 有一个关键字 `arguments`, 在函数内部, 可以作为一个包含所有参数的参数数组来使用  


