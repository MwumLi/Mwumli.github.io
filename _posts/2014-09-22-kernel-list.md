---
layout: post
title: "Linux内核链表的分析"
description: "" 
category: 记录
tags: [kernel, linux, list, 内核]
---
### 内核中list_head的定义  
	
	struct list_head {
		struct list_head *next, *prev;
	};

仅仅只有两个指针，prev指向前一个节点,next指向后一个节点  
但是为什么没有data域呢？  
内核出错了，显然不可能，别急，慢慢来  

#### 栈，队列，链表.....  
我们可以用这个结构定义一个新的结构  

	strutc my_list_node {
		int	data;
		strutc list_head list;
	};

* 假如我们禁用了list中的prev,它就是一个*单链表*  
* 假如(单链表的基础上)我们启用list中的prev，它就是一个*双链表*  
* 假如(单链表基础上)我们让最后一个节点next指向第一个节点，那么它就是一个*单向循环链表*  
* 假如(单向循环链表基础上)我们启用list中的prev域，那么它就是一个*双向循环链表*  
* 假如(单链表的基础上)，我们有方法可以从头部插入，头部删除，那么它就是一个*栈*  
* 假如(单链表的基础上)，我们有方法可以头部删除，尾部插入那么它就是一个*队列*  
* 假如...,它就是一个...  
  
好了,我想也不用多说了，大家应该思维澎湃了  
这正体现了一点：链表是其他数据结构的根本形式   

#### 为什么没有数据域？
怎么可能？链表没有数据，这还有什么意义  
是啊，没有数据域，我们该怎储存信息呢？  
事实上，上面我们定义的这个*struct my_list_node*就解释了为什么没有数据域  
没有数据正是为了可以容纳更多的，不同的数据类型(通过自定义)  

这就是抽象的艺术，说起抽象，谈谈面向对象也不不错  

我们常说，C++是面向对象的语言，其实面向对象并不只是说一种语言，而是一种思想：我们把具体的东西通过对其共性的分析，抽象出来，从而形成一种结构，这种结构或许单独来说么有实际意义，但是通过我们增添不同的功能，从而就有了不同的意义新的结构，那么此时，其意义得以体现，这就是我理解的面向对象  

可以看到我们抛弃了那所谓的数据，只留下了两个指针，正因为抛弃了数据域(也不能说抛弃，应该是还未迎娶),我们才可以通过自定义添加不同的数据类型(int,char等),更多的数据成员(1,2,3...)  

所有有的时候，所谓的舍弃，只是为了更好的扩展  

### 内核链表的初始化
两个宏，一个函数  

#### 两个宏

	#define LIST_HEAD_INIT(name) { &(name), &(name) }

	#define LIST_HEAD(name) strutc list_head name = LIST_HEAD_INIT(name)

#### 一个函数  

	static inline void INIT_LIST_HEAD(struct list_head *list) 
	{
		list->next = list;
		list->prev = list;
	}

这些有什么不同呢？  
我看了有看，也确实有点不同  
*LIST_HEAD*和*LIST_HEAD_INIT*是相辅相成的，如果单独使用的话，那么*LIST_HEAD_INIT*需要用在结构体变量定义初始化的时候，而*LIST_HEAD*只需要提供一个变量名即可完成定义兼初始化：  
**LIST_HEAD_INIT**  

	struct list_head lp = LIST_HEAD_INIT(lp);	

**LIST_HEAD**  

	LIST_HEAD(lp);

这两段代码看起来不一样，其实本质是一样的：定义了一个名为lp的struct list_head变量，同时用其自己的地址对其初始化  

#### static inline 
当你看过*list.h*后，我相信你对static inline已经熟的不能在熟  
但是有有点困惑，为什么这么频繁的使用呢？  
真是熟悉的陌生人!...呵呵  

**static**  
被static修饰的函数，作用域将限于本文件，也就是其他文件看不见  

可能你觉的这样说起来很模糊，而且假如我们在.h文件中定义，然后被其他.c文件*include*,那么根据*include*的定义：当预处理器具发现include的时候，就会寻找inlucde之后的文件,并把这个文件包含到当前文件,即替换include指令  

所以这样的话，.h文件也是.c文件的一部分了，那么.h文件中被static修饰的函数必然也能在.c文件中使用了，那么，static的意义不存了  

嗯哼，当然不是这样的，我们试着这样做一做吧:  
*test_static.h*:  

	static void func1(){ }
	void func2(){}

我们还有两个文件，一个是main.c, 一个是test_static.c，这两文件我们都引用了**test_static.h**,然后我们执行下面指令：  

	$ gcc -o main main.c test_static.c test_static.h
	/tmp/ccSrEpb2.o: In function `func2':
	test_static.c:(.text+0x6): multiple definition of `func2'
	/tmp/cc54UVtA.o:main.c:(.text+0x6): first defined here
	collect2: error: ld returned 1 exit status

是的报错了：func2多重定义,对就是那个没有定义为static的家伙  

好了，我们给func2加上static,在编译一次(自己操作)，啊哈，编译成功  
是的，static让错误消失了  

怎么回事儿呢？  
添加了static ,虽然每个.c文件中都定义了static函数，但是经过编译，所有的static隐藏在自己的目的文件(.o)中，连接器(linker)在找寻symbol的过程中，是会被忽略的  

所以，我们加上static是为了避免多重定义连接错误  

**inline**  
inline是内联的意思，即当定义了inline,就会暗示编译器，我有"倒插门"的倾向，然后，编译器愿不愿意接受，那就得看具体编译器的不同配置了;如果我被接受了，那么在编译的时候，我会每个call我的地方"赤身裸体"(即展开代码)  

因为代码被插入到被调用的地方，所以效率肯定提高了(相比函数调用的上下文切换)  
这也就是函数前使用inline的意义：提高效率(现在存储技术发展很快，相比之下，效率尤为重要)  

现在，关键的来了，我们同时使用了static inline：  

>When an inline function is not static, then the compiler must assume that there may be calls from other source files; since a global symbol can be defined only once in any program, the function must not be defined in the other source files, so the calls therein cannot be integrated. Therefore, a non-static inline function is always compiled on its own in the usual fashion.    

这段话来自[gcc的官方文档][gcc_inline]  
我的理解：在.h文件中定义inline,如果没有static,那么编译器(至少gcc是这样)就会认为你可能被其他文件多次调用，因为一个全局符号在任何一个程序中仅能出现一次，这个函数一定不能定义在其他源文件中，因此这此调用不能inline函数代码不能被集成到被调用处 

所以，我想应该是基于这个原因，所以内核代码中多次使用*static inline*  

### 内核链表的插入  
将new插入head之后  

	static inline void list_add(struct isr_head *new , struct list_head *head) 
	{
		__list_add(new, head, head->next);
	}

这段代码注释里有句话：This is good for implementing stacks.  

将new插入到head之前，即尾部  

	static inline void list_add_tail(struct list_head *new, struct list_head *head)  
	{
		__list_add(new, head->prev, head);
	}

这段代码注释里有句话：This is good for implementing queues.    

**__list_add**到底是何方人士，竟引得list_add和list_add_tail竞相使用?  

	static inline void __list_add(struct list_head *new,
					struct list_head *prev;
					struct list_head *next;)
	{
		next->prev = new;
		new->next = next;
		prev->next = new;
		new->prev = prev;
	}

看到代码，才知道：哦，原来只是把一个node插入到两个node之间的函数  
不用多说了，这里很简单，但是重要的是这种抽象的思想  
对了，看来那两句注释，感觉如何？  

### 内核链表之删除  

	static inline void __list_del(struct list_head * prev, 
					struct list_head * next)
	{
		next->prev = prev;
		prev->next = next;
	}

	static inline void list_del(struct list_head *entry)
	{
		__list_del(entry->prev, entry->next);  
		entry->next = LIST_POISON1;        
		entry->prev = LIST_POISON2;
	}

代码很简单，LIST_POISON1和LIST_POISON2是两个宏，被定义在poison.h中  

	#define LIST_POISON1  ((void *) 0x00100100 + POISON_POINTER_DELTA)
	#define LIST_POISON2  ((void *) 0x00200200 + POISON_POINTER_DELTA)

注释说这两个非空指针在正常情况下会导致页错误，这是它的注释：  

	/*
	 *These are non-NULL pointers that will result in page faults¬
	 * under normal circumstances, used to verify that nobody uses¬
	 * non-initialized list entries.
	 */
	
这些都可以理解，但是为什么是0x00100100和0x00200200呢？  
我查了很多资料，都没找到答案，恳请各位解惑  

### 内核链表之遍历  

	 #define list_for_each(pos, head) \
		for (pos = (head)->next; pos != (head); pos = pos->next)

这个宏很简单，但是有个难点就是我们怎么根据pos找到node的位置，例如我上面定义的struct my_list_node这个结构  
list.h给出了代码：  

	#define list_entry(ptr, type, member) \
		container_of(ptr, type, member)

这个container_of在kernel.h中有定义：  

	#define container_of(ptr, type, member) ({       \
	|	const typeof( ((type *)0)->member ) *__mptr = (ptr);   \
	|	 (type *)( (char *)__mptr - offsetof(type,member) );})  


这段代码还真不好说，还是给出一段代码，试试就知道了：  

	#include <stdio.h>
	#include <stdlib.h>

	struct list_head {
		struct list_head *self;
	};
	typedef struct Type_List {
		int a;
		struct list_head list;
	}Type_List;

	int main(int argc, const char *argv[])
	{
		Type_List *tl=(Type_List *)malloc(sizeof(Type_List));
		//打印tl的地址
		printf("%x\n", tl);

		//获取tl的成员list的地址赋给ptr
		struct list_head *ptr=&(tl->list);
		//使用ptr获取tl的地址
		Type_List *p=(Type_List *)((char *)ptr-(unsigned long)&(((Type_List *)0)->list));
		printf("%x\n", p);

		return 0;
	}

简而言之，就是使用list的地址减去list成员距my_list_head的起始地址的偏移量  
而offsetof就是求偏移量的宏  

### 内核链表删除的不安全性  

	#define list_for_each_safe(pos, n, head) \
	    for (pos = (head)->next, n = pos->next; pos != (head); \
			pos = n, n = pos->next)

这是list.h中提供的用于安全删除链表的遍历宏  
之前我们看到list_for_each这个宏  
如果我们向下面这样用：  

	list_for_each(ptr, head) {
		tmp = list_entry(ptr, struct my_list_head, list);
		list_del(ptr);
		free(tmp)
	}

这样写的话，因为ptr已经被删除，但根据list_for_each内部实现却是在删除ptr之后，调用ptr=ptr->next,因为地址已经被引入LIST_POISON1了，所以肯定报错  

而我们使用了list_for_each_safe,就不会这样，因为有一个临时的struct my_list_head类型变量n记录了ptr的下一个节点，所以就不会出现问题  


### 结束  
呵，松了口气，好长啊，不过，看了内核对list的实现，确实收获很多，尽管现在看到是”冰山一脚“，但是这一脚总算是才上去了  
对于文章中出现的问题，希望作为读者的你能提出来，帮助我改进  



[gcc_inline]:https://gcc.gnu.org/onlinedocs/gcc/Inline.html 
[gcc_static]:http://cg2010studio.wordpress.com/2011/06/27/cc-%E9%9D%9C%E6%85%8B%E5%87%BD%E5%BC%8F-static-function/  

