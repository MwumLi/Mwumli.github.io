# Map

2015-10-02 02:36:05 by MwumLi

---

`Map` 是一组键值对的集合, 具有极快的查找速度  

JavaScrip 的默认对象也是存储键值对的, 但对象的中的 key 只能是 String   

而 `Map` 中的 key 可以是任意数据类型  


ECMAScirpt6 引入了 `Map`, 因此在使用的时候要考虑浏览器是否支持  


## 一些操作

**初始化**  
`Map` 需要一个二维数组来初始化, 或者直接初始化一个空 `Map` :  

	// 初始化一个空 Map
	var m1 = new Map();		
	// 用二维数组初始化 Map
	var m2 = new Map([['LiLuo', 23], ["ZhangSan", 21], ["WangJia", 21]]); 
	
**增添元素**  
使用 `map.set(key, value)` 的方法增添元素或更新已有 key 的 value  

	m1.set('Yefan', 22);
	m1.set('Yuntianhe', 23)
	console.log(m1);
	m1.set('Yefan', 32);	// 对已有 key 进行更新  
	console.log(m1);

**获取元素的值**  
使用 `map.get(key)` 的方法获取某一 key 对应的 value  

	var LiLuoAge = m2.get("LiLuo");
	console.log(LiLuoAge);

**判断是否存在某个 key**  
使用 `map.has(key)` 去判断是否存在 key  

	if (m2.has("ZhangSan")) {
		console.log("ZhangSan : " + m2.get("ZhangSan"));
	} else {
		console.log("不存在 ZhangSan 的信息");
	}

	if (m2.has("Lisi")) {
		console.log("Lisi : " + m2.get("Lisi"));
	} else {
		console.log("不存在 Lisi 的信息");
	}

**删除元素**  
使用 `map.delete(key)` 删除某一 key 对应的元素  

	console.log(m2);	// 删除前输出一下
	var success = m2.delete("ZhangSan");
	var str;
	if(success) {
		str = "删除成功";
	} else {
		str = "删除失败";
	}
	console.log(str);
	console.log(m2);	//删除后输出一下

**Map 大小**  
访问 Map 的 `size` 属性  

	console.log(m2.size);	// 2

**Map 的所有键**  
使用 `map.keys()` 获得 Map 的所有键组成一个 MapIterator 对象  

	var item_keys = m2.keys();	// MapIterator {"LiLuo", "WangJia"}
	for (var va of item_keys) {
		console.log(va);
	}
	console.log(item_keys); // MapIterator {}

**Map 的所有值**  
使用 `map.values()` 获得 Map 的所有值组成一个 MapIterator 对象 

	var item_vals = m2.values(); // MapIterator {23, 21}
	for (var va of item_vals) {
		console.log(va);
	}
	console.log(item_vals); // MapIterator {}

**清空**  
使用 `map.clear()` 去清空 Map  
