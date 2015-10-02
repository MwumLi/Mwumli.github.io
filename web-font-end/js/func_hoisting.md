# js 函数提升

2015-09-30 15:34:51 by MwumLi

---

函数提升的定义可以参考 [变量提升](./var_hoisting.md) 的定义   

JavaScript 函数提升的正确写法 :  

	function func() {
		subfunc();
		function subfunc() {
			console.log("正确的函数提升");
		}
	}
	func();

下面这种方式是不正确的 :  
	
	function func() {
		subfunc();

		var subfunc = function() {
			console.log("错误的函数提升");
		}
	}
	func();

原因是 `subfunc` 是一个变量, 被提前了声明了  
但是我们在其真正的初始化之前调用, 此时, `subfunc` 只是被声明, 还未曾初始化  
所以, 这样的代码会报错的  


