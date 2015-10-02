# 对象

2015-09-28 11:33:55 by MwumLi

---

使用 `{...}` 包含, 内部是多个键值对  

## 创建  

``` javascript

var xiaoming = {
		name : "xiaoming",
		'middle-school' : "No1 Middle School"
	};
```
js 对象的所有属性就是字符串  
属性所对应的值为任意数据类型  

## 访问属性

1. 通过 `.` 操作符访问属性 : 要求属性名必须是一个有效的变量名  `xiaoming.name`

2. 通过 `[]` 操作符 : 没有限制 例如 : `xiaoming['middle-school']` 

3. 访问一个不存在属性, 不报错, 返回 `undefined`  

## 添加和删除属性 

	var xiaoming = {};
	xiaoming.name = "xiaoming";
	xiaoming.age; //undefined
	xiaoming.age = 18; // 新增一个 age 属性
	xiaoming.age;	// 18
	delete xiaoming.age; //删除 age 属性  
	xiaoming.age;	//undefined


检测对象是否拥有某一属性 : 

	'name' in xiaoming;		// true

用 `in` 判断一个属性存在，这个属性不一定是 指定对象的, 它可能是指定对象继承来的 :  

	`toString` in  xiaoming;	// true

用 `hasOwnProperty` 判断一个属性是否是指定对象自身拥有, 而不是继承得到的 :  

	xiaoming.hasOwnProperty("name");	// true
	xiaoming.hasOwnProperty("toString");	// false

