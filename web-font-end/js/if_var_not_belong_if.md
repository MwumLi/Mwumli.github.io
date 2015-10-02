# if 语句块下的变量不属于 if

2015-09-30 15:33:08 By MwumLi

---

C 语言中, 作用域决定了变量作用范围 : 全局(Global) 或者 局部(Local)  
从而根据其可以作用的范围划分变量为全局变量和局部变量  

JavaScript 中也是一样  
但不同的是 :  **js 具有的作用域是以函数来划分的, 没有块级作用域**


**有这么一段代码**(代码纯属演示, 并没有什么实际意义) :  


	function func() {
		if(true) 
			var name = "ZhangSan";
		}
		console.log(name);
	}
	func();
	console.log(name);

我们可能猜测的结果是(按照 C 语言的逻辑) :  

	undefined
	undefined

但实际上控制台输出的是 :  

	ZhangSan
	undefined


因此, 可以得出 if 语句块定义的 name 是可以被属于 func() 这个作用域的  


**事实上, 可以有这个结论** :   

> 1. 在 `if`、`for`、`while` 等语句块中使用 `var` 定义的变量, 是属于离它们最近的函数作用域的  
> 2. JavaScript 中的作用域是以函数作用域作为区分的, 没有所谓的块级作用域  

