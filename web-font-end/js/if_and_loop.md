# 条件判断与循环

2015-10-01 03:20:57 by MwumLi

---

## 条件判断  

使用 `if(){...} else {...}` 进行条件判断  

具体用法和 C 语言一致  

**注意**: if 语句块并不能划分作用域, 具体请看[if 语句块下的变量不属于 if](if_var_not_belong_if.html)  


## 基本循环  

1. 标准 `for` 循环, 和 C 语言基本保持一致 :  

		var x = 0;
		var i;
		for (i=1&nbsp;i<=100;i++) {
			x = x + i;
		}

2. `for attr in object` 循环 :  循环遍历对象的属性  
   使用 `for ... in ...` 循环遍历对象 :  

		var xiaoming = {
			name : "xiaoming",
			age: 18,
			city: "ShangLuo"
		};
		for (var key in xiaoming) {
			console.log(key + " : " + xiaoming[key]);
		}
  
  由于 Array 也是对象, 它的每个元素的索引可视作对象的属性  
  因此, 使用 `for  ... in ...` 循环遍历数组 :  

		var arr = ["hello", "world", 1, 3, 4];
		for (var i in arr) {
			console.log("arr["+i+"] : " + arr[i]);
		}

  > `for ... in ...` 对 `Array` 的遍历得到的是 `String`, 而不是 `Number`  

3. `while` 循环, 和 C 语言保持一致 :  

		var x = 0;
		var n = 1;
		while (n <= 99) {
			x += n;
			n += 2;		// 奇数
		}

4. `do .. while` 循环, 和 C 语言保持一致 :  

		var x = 0;
		var n = -1;
		do {
			n += 2;
			x += n;
		}while (n < 99);


