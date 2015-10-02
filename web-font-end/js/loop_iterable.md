# 循环--iterable 类型

2015-10-02 07:07:47 by MwumLi

---

`iterable` 类型是 ES6 引进的, 目的是为了统一集合类型  

`Array`、`Map`、`Set` 都属于 `iterable` 类型  

下面两个循环就是为了遍历 `iterable` 特意增添的  

* `for ... of` 循环 : 属于 `iterable` 类型的数据类型可以通过 `for ... of`循环来遍历  

		var arr = ['A', 'B', 'C'];
		var set = new Set(['a', 'b', 'c']);
		var map = new Map([['A', 'a'], ['B', 'b'], ['C', 'c']]);

		// 遍历数组
		for (var ele of arr) {
			console.log(ele);
		}

		// 遍历Set
		for (var ele of set) {
			console.log(ele);
		}

		// 遍历Map
		for (var ele of map) {
			console.log(ele[0] +" : "+ ele[1]);
		}

   > 使用 `for ... of` 循环只循环集合本身的元素  
   > 而使用 `for .. in` 循环遍历的是对象的属性  
   > 因此如果只是想遍历 `Array` 的元素, 那么采取 `for ... of` 是更好的选择 


* `forEach(function(value, key, obj){ ... })` : 遍历时函数处理 `iterable` 对象的每一个元素
   
		var arr = ['A', 'B', 'V'];
		var set = new Set(['a', 'b', 'c']);
		var map = new Map([['a','A'],['b','B'],['c','C']]);

		// 遍历 Array 的元素
		// Array 元素的索引为从 0 开始的数字  
		arr.forEach(function(value, key, obj){
			console.log(key + " : " + value + " in ["+obj+"]");
		});
		
		// 遍历 Set 的元素  
		// Set 元素没有 key, 故 key 和 value 的值一样
		set.forEach(function(value, key, obj){
			console.log(key + " : " + value + " in "+obj);
		});
	
		// 遍历 Map 的元素  
		// 一个 key 对应一个 value
		map.forEach(function(value, key, obj){
			console.log(key + " : " + value + " in ["+obj+"]");
		});

   `foreach()` 中的函数的函数参数的说明 :  
   * `value` : 当前元素的值  
   * `key` : 当前元素的键  
   * `obj` : 当前元素所属的集合对象  

