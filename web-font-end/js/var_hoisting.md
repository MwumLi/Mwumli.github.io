# js 的变量提升

2015-09-30 15:33:44 By MwumLi

---

Javascript 中有一个很奇特的特性 -- 变量提升(Hoisting): 
> js 代码中如果有变量的声明语句, 不管位于当前执行环境的哪个位置, 都会被提前至脚本或函数的顶部  
> 但是初始化操作还是在原来 `var` 语句的位置执行  
> 在 `var` 语句之前使用变量, 其值为 `undefined`  

有这么一段代码, 要求我们写出这段代码的执行结果 :  

	var color = "blue";
	function func() {
		console.log(color);
		var color = "red";
	}

	func();


我们可能猜测的结果是 :  `blue`  
但实际上控制台输出的是 : `undefined`  

此段代码的作用域链 :  

	window
	  |
	  |--color
	 ...
	  |
	  |--func()
	      |
		  |--color


当 `console.log(color)` 这句代码执行时, js 引擎是这么做的 :  
首先从`func()`所代表的局部作用域 中搜索 `color`, 查找是否包含一个名叫 `color`  
发现已经找到, 于是输出它当前的值  
因为变量提升只是把变量的声明提前了, 所以输出结果为 `undefined`

