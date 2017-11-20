---
layout: post
title: "使用最大余额法计算百分比"
description: ""
category: 
tags: []
toc: true
modifyTime: "2017-11-19 18:10:50"
---
{% include gen_toc %}

最大余额法, 英文为 Largest Remainder Method, 又称数额值, 是议会选举中分配议席的一种方法:   
> 议会选举会提供固定数量的席位(total seats), 而所有的选票除以 total seats 的值就是每一个席位所占有的选票的数目(seat votes); 某政党得票总数除以 seat votes 就是这个政党的得票结果(整数部分+余数部分), 得票结果的整数部分就是该政党首次所获取的席位; 最后将剩下一部分席位尚未分配, 这些席位按照各政党的余数部分的大小按照顺序依次分配 1 个席位, 直至分配完毕,最大余额方法因而得名

具体背景介绍请参看维基百科: [最大余额法](https://zh.wikipedia.org/wiki/%E6%9C%80%E5%A4%A7%E9%A4%98%E9%A1%8D%E6%B3%95) 或 [Largest remainder method](https://en.wikipedia.org/wiki/Largest_remainder_method)  

**那最大余额法和我们这里求取百分比有什么关系呢?**  

一般情况下, 我们求取百分比的方法是这样的: `part-number/total-number*100%`, 然后遵循四舍五入(或者其他...)的原则保留一定精度, 这样做事没错的, 但是这种方式下算出来所有百分比之和有可能不是 `100%`  

而使用最大余额法求取百分比, 求取的所有百分比之后一定是 `100%`, 使用文字描述解释起来比较麻烦, 参考下面 Javascript 实现来理解:  

	/*
	 * 给定一个精度, 计算一组数据中某项数据占据的百分比, 确保所有数据的百分比之和为 1, 即 100%
	 *
	 * @param  {Array.<number>} valueList a list of all data
	 * @param  {number} idx index of the data to be processed in valueList
	 * @param  {number} precision integer number showing digits of precision
	 * @return {number} percent ranging from 0 to 100
	 */
	function getPercentWithPrecision(valueList, idx, precision) {
	  if (!valueList[idx]) return 0;

	  // 计算 valueList 中所有数据项之和
	  sum = valueList.reduce(function(acc, val) {
	  	return acc + val;
	  }, 0);

	  if (sum === 0) return 0;

	  // 中间值, 用来计算总席位数和扩大比例来保留精度
	  var digits = Math.pow(10, precision);

	  // 计算每组数据的得票结果(整数部分和余额部分): 整数部分为所得该数据首次分配席位, 余额部分决定首次分配之后剩余席位的分配 
	  var votesPerQuota = valueList.map(function(val) {
	    // 乘以 digits, 是为了通过扩大比例来保留精度, 这样可以确保正数部分是已经确定的议席位置
	    // 乘以 100, 是因为最后返回结果为百分比
	    return (val / sum) * digits * 100;
	  });

	  // 总席位数: 因为所有quota除以sum之和为1, 上一步计算为了保留精度和返回为百分比, 把得票结果扩大了 digits*100 倍, 因此总席位数计算方式如下
	  var targetSeats = digits * 100;

	  // 首次分配席位
	  var seats = votesPerQuota.map(function(votes) {
	    return Math.floor(votes); // 整数部分就是每个quota首次分配的席位
	  });

	  // 当前已经分配出去的席位总数
	  var currentSum = seats.reduce(function(acc, val) {
	    return acc + val;
	  }, 0);

	  // 计算每个quota的余额
	  var remainder = votesPerQuota.map(function(votes, idx) {
	    return votes - seats[idx];
	  });

	  // 分配剩余席位, 直到所有席位分配完毕
	  while (currentSum < targetSeats) {
	    var max = Number.NEGATIVE_INFINITY; // 最大余额, 初始重置为无穷小
	    var maxId = null; // 余数最大的 id

	    // 选出这组余额数据中最大值
	    for (var i = 0, len = remainder.length; i < len; ++i) {
	      if (remainder[i] > max) {
	      	max = remainder[i];
	      	maxId = i;
	      }
	    }

	    ++seats[maxId];       // 最大余数对应数据席位 +1
	    remainder[maxId] = 0; // 最大余数重置为 0, 保证不会再分配
	    ++currentSum;         // 当前已分配席位总数 +1, 保证最终可以退出分配循环
	  }

	  // idx 对应数据分配的席位除以总席位数就是 idx 在这组数据中保留精度 precision 的百分比
	  return seats[idx] / digits;
	}

