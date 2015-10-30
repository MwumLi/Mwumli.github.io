# js 中的 this 对象

2015-10-29 13:49:17 by MwumLi

---

在面向对象的语言中, 都一个很特殊的对象或变量用来描述当前上下文环境, 那就是 `this`  

毫无疑问, js 是一个面向对象的语言  

## 如何确定 this 对象  

在 C++, Java 等面向对象语言中, this 指的就是当前操作对象  
但是 js 不同, 尽管在一个对象中的操作, this 对象也可能不同  
它是基于当前运行环境的  

看看如下代码 :  

    var name = "Here is Global";

    var local = {
        name : "Here is Local",
        getNameFunction : function() {
            console.log(this.name);
            return function(){
                console.log(this.name);
            }
        }
    }

    local.getNameFunction()();

运行结果如下 :  

    Here is Local
    Here is Global

从运行角度分析 :  
1. 执行 `getNameFunction()` 执行的时候是基于 `local` 这个对象的 
   因此第一个 `this.name` 的值就是这个对象的属性 `name` 的值 `Here is Local`  

2. `getNameFunction()` 函数的返回值是一个匿名函数, 因此, `local.getNameFunction()()`实际上执行的是这个匿名函数  
   而这个匿名函数是在全局环境下执行的, 所以此时 this 就是 Global (如果是浏览器就是 window)  
   最后可以得到, 第二个 `name` 的值就是 `Here is Global`  

**结论** :   
> js 的 this 对象在运行时基于函数的执行环境绑定的


## 如何取得作用域外的 this 对象  

这个问题是上一问题的延伸  
上面问题的代码中, 第二个 `this.name` 的值始终是全局  
如果想访问 `local` 中的 `name` 属性, 就必须另作处理, 像下面这样 :  

    var name = "Here is Global";

    var local = {
        name : "Here is Local",
        getNameFunction : function() {
            console.log(this.name);
            var that = this;
            return function(){
                console.log(that.name);
            }
        }
    }

    local.getNameFunction()();

运行结果 :  

    Here is Local
    Here is Local

**结论** :  
> 把外部作用域的 this 对象保存到一个内部作用域可以访问的变量里  
> 对于内部作用域来说, 外部作用域的变量总是可以访问的  


