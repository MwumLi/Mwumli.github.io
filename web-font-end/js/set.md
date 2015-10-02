# Set

2015-10-02 02:36:26 by MwumLi

---

`Set` 是一组 key 的集合  

由于 key 不能重复, 所以, 在 Set 中, **没有重复的 key**  
这是一个比较好玩的特性, 如果想剔除一大批数据中的重复数据, 那就很方便啦  

这个也是 ES6 新增的 Iterable 集合类型  

## 一些操作

**初始化**  
使用 `Array` 来初始化, 或者直接创建一个空 `Set`  

	// 空 Set
	var s1 = new Set();
	// 使用 Array 来初始化  
	// 含 2, 5, 3, '3', 提出了重复数据  
	// 3 和 '3' 是不同的元素, 所以没有剔除  
	var s2 = new Set([2,5,5,3,'3']);

**添加元素**  
使用 `set.add(key)` 添加元素到 `Set` 中  
可以重复添加, 但不会有效果(Set 的奇妙特性)  

	s1.add(4);
	s1.add([2,5]);
	s1.add([2,5]);
	//输出结果为 Set {4, [2, 5], [2, 5]}
	console.log(s1); 

咦, 这里面怎么有重复元素  
其实不然, 里面两个 `[2, 5]` 是不一样的  
因为在 js 中 `Array` 是对象, 所以这是两个不同的对象, 尽管内容一样  
看看下面这段 code :  

	var arr = [4, 5, 6];
	s1.add(arr);
	s1.add(arr);
	//输出结果为 // Set {4, [2, 5], [2, 5], [4, 5, 6]}
	console.log(s1);

`arr` 是一个数组, 然后被添加多次, 依旧在 `Set` 中只保留一次  
哼哼, 请不要质疑 `Set` 的过滤能力  

**判断是否存在某个 key**  
使用 `set.has(key)` 可以获知的 key 是否存在  

	if (s1.has(4)) {
		console.log("Set s1 中包含 4");
	} else {
		console.log("Set s1 中不存在 4");
	}

**删除元素**  
使用 `set.map(key)` 来删除元素  
添加的匿名对象是无法删除的  

	var str;
	if (s1.delete(4)) {
		str = "删除 4 成功";
	} else {
		str = "删除 4 失败";
	}
	console.log(str);
	console.log(s1);

	//匿名对象无法删除, 因为无法表示
	if (s1.delete([2, 5])) {
		str = "删除 [2, 5] 成功";
	} else {
		str = "删除 [2, 5] 失败";
	}
	console.log(str);
	console.log(s1);

**Set 的 `keys()` 和 `values()`**  
这个 `Map` 中的同名方法使用一样  
只是 Set 并没有 value, 只有 key  
所以, 在 Set 中, `keys()` 和 `values()` 方法都是获取是所有 key  

**获取大小**  
读取 `set.size` 属性获取其大小  

	console.log("Set s1 的大小 : " +s1.size);

**清空**  
使用 `set.clear()` 去清空 Set  

		s1.clear();
		console.log(s1); // Set {}
