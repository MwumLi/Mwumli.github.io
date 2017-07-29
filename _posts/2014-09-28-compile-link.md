---
layout: post
title: "编译和连接"
description: ""
category: 记录
tags: [Linux,编译,链接]
toc: true
modifyTime: "2015-09-25 16:54:14"
---

{% include gen_toc %}


## 编译和连接  
对于平常的应用程序开发，我们很少关注编译和连接的过程，因为通常的开发环境都是流行的集成开发环境(IDE)  

而IDE往往将编译和连接的过程“一气呵成”,通常编译和连接合并到一块被称为"build",也就是构建.  

即使是命令行来编译一个`hello.c`，简单一句`gcc hello.c`，然后你就可以`./a.out`来得到富有盛名的`Hello,World!`了  

正所谓“有一得必有一失”，我们享受与这种一键执行的快感，却忽略很多系统软件背后的运行机制和机理，程序中很多莫名其妙的错误常常令我们无所适从，面对程序运行时种种性能瓶颈我们束手无策，而为了解决这些问题，我们往往需要追根溯源  

因此，了解编译和连接的过程，有助于我们对软件运行的机理的了解以及对出现的各种问题能有更高效的解决途径 


## 从最简单最熟悉开始

{% highlight c%}
#include <stdio.h>
int main()
{
	printf("Hello,World\n");
	return 0;
}//hello.c
{% endhighlight %}

这样的程序，闭着眼睛，用心作笔，估计一秒钟都可以写几万次了吧  
在Linux下，当我们使用GCC来编译hello.c,这样做:  

	$ ls 
	hello.c
	$ gcc hello.c
	$ ls
	a.out hello.c
	$ ./a.out
	Hello,World

可以看到，我们使用gcc编译处理hello.c之后，生成了一个a.out的文件  
这个文件正是我们可执行程序，运行之后，输出`Hello,World`

整个过程很简单，但这只是表面上的，事实上，上述过程可以分解为4个步骤，分别是：  

	预处理(Prepressing)[.c]->编译(Compilation)[.i]->汇编(Assembly)[.o]->链接(Linking)[可执行文件]


### 预处理(.c->.i using cpp)  
Linux下对c文件进行预处理，可以使用预编译器`cpp`  
进行预处理之后，生成的预处理文件为`.i`,对于C++程序而言，预编译后的文件为`.ii`  
以下是预编译的命令:  

	$ cpp hello.c > hello.i  

或者  

	$ gcc -E hello.c -o hello.i  

无论是`cpp`还是`gcc -E`,他们的结果(在不指定目标文件的情况下)会输出到`stdout`  

预编译的过程主要处理那些源码中以"#"开始的预编译指令，比如`#include`，`#define`  
主要做了一下处理:  

1. 将所有`#define`处删除，展开所有宏定义  
	
		在include和main之间添加“#define HELLO "hello,world\n" ”,
		然后把printf()中的内容改为HELLO,接着如上预处理生成目标文件hello_micro.i
		使用diff hello.i hello_micro.i,发现两个文件完全一致 
		由此证明删除定义宏，展开所有宏  

2. 处理所有条件预编译指令，比如`#if`,`#ifdef`,`#elif`,`#else`,`#endif`  

3. 处理`#include`预编译指令，将被包含的文件插入到该预编译指令的位置。  

		注意，这个过程是递归进行的，也就是说被包含的文件可能还包含其他文件。
		因此，在多文件程序中要注意同一文件被多次包含引起的错误  
 
4. 删除所有的注释`//`和`/**/`  
5. 添加行号和文件名标识，比如`#2 "hello.c" 2`,以便于编译时产生调试用的行号信息及用于编译时产生编译错误或警告时都能显示行号  
6. 保留所有的`#pragma`编译器指令，因为编译器需要使用它们  

经过预编译后的`.i`文件不包含任何宏定义，因为所有的宏已经被展开，并且包含的文件也已经被插入到.i文件中。  
所以当我们*无法判断宏定义是否正确*或者*头文件是否正确引入*的时候，可以查看预编译后的`.i`文件来确定问题  

### 编译(.i->.s using cc1)
编译过程就是把`.i`文件进行一系列的词法分析、语法分析、语义分析以及优化后生成相应的汇编代码文件`.s`  
这个过程整个程序构建的核心部分,也是最复杂的部分，涉及到编译原理的一些内容  
Linux命令如下:  

	$ gcc -S hello.i -o hello.s  

据说，现在的gcc已经将预编译和编译两个步骤合并成一个步骤，使用一个叫做`cc1`的程序  
`cc1`在我的机器(Ubuntu 14.04 LTS)上的路径`/usr/lib/gcc/x86_64-linux-gnu/4.8/cc1`   
因此，我这样编译：  

	$ /usr/lib/gcc/x86_64-linux-gnu/4.8/cc1 hello.i

和上面的命令效果等同  
但是根据资料显示，`cc1`把预编译和编译融合，因此我使用`/usr/lib/gcc/x86_64-linux-gnu/4.8/cc1 hello.c`,结果出错  

为了研究其原因，我使用`gcc -v hello.c 2>cp.txt`打印gcc对其编译过程做了那些操作  
因为比较长，只截取有用的部分  

	/usr/lib/gcc/x86_64-linux-gnu/4.8/cc1 -quiet -v -imultiarch x86_64-linux-gnu hello.c -quiet -dumpbase hello.c -mtune=generic -march=x86-64 -auxbase hello -version -fstack-protector -Wformat -Wformat-security -o /tmp/cckHwTs6.s

可以看到cc1携带了大量的参数，最终生成汇编文件保存在`/tmp/cckHwTs6.s`  
我在命令行进行了验证，确实如此  
这里又一次证明了：IDE掩盖很多已有的参数。不过，这么多参数确实让人心烦，既然常用，默认是一个好的办法，不过，你应该了解有这么个过程  

### 汇编(.s->.o using as)
汇编器就是将汇编代码转变成机器可以执行的指令，每一个汇编语句都对应一条机器指令,所以汇编器的汇编过程相对于编译过程就显得简单多了。  

汇编过程在linux下我们调用汇编器as来完成：  

	$ as hello.s -o hello.o  

或者  

	$ gcc -c hello.s -o hello.o  

或者使用gcc从.c文件开始，经过预编译、编译、汇编直接输出*目标文件*(Object File)  

	$ gcc -c hello.s -o hello.o

同样，我们可以在cp.txt文件中看到下面一段：  

	COLLECT_GCC_OPTIONS='-v' '-mtune=generic' '-march=x86-64'

### 链接  
链接通常是一个让人费解的过程：  
为什么汇编器不直接输出可执行文件而是一个目标文件呢？  
链接过程到底包含了什么内容？  
为什么要链接?  
...  
我们通常使用ld来链接目标文件  
我们来看看cp.txt中的相应描述：  

	/usr/lib/gcc/x86_64-linux-gnu/4.8/collect2 --sysroot=/ --build-id --eh-frame-hdr -m elf_x86_64 --hash-style=gnu --as-needed -dynamic-linker /lib64/ld-linux-x86-64.so.2 -z relro /usr/lib/gcc/x86_64-linux-gnu/4.8/../../../x86_64-linux-gnu/crt1.o /usr/lib/gcc/x86_64-linux-gnu/4.8/../../../x86_64-linux-gnu/crti.o /usr/lib/gcc/x86_64-linux-gnu/4.8/crtbegin.o -L/usr/lib/gcc/x86_64-linux-gnu/4.8 -L/usr/lib/gcc/x86_64-linux-gnu/4.8/../../../x86_64-linux-gnu -L/usr/lib/gcc/x86_64-linux-gnu/4.8/../../../../lib -L/lib/x86_64-linux-gnu -L/lib/../lib -L/usr/lib/x86_64-linux-gnu -L/usr/lib/../lib -L/usr/lib/gcc/x86_64-linux-gnu/4.8/../../.. /tmp/ccfb7d3z.o -lgcc --as-needed -lgcc_s --no-as-needed -lc -lgcc --as-needed -lgcc_s --no-as-needed /usr/lib/gcc/x86_64-linux-gnu/4.8/crtend.o /usr/lib/gcc/x86_64-linux-gnu/4.8/../../../x86_64-linux-gnu/crtn.o

额，好长啊，不过貌似没有`ld`的字眼，看来gcc并没有如同我们想象的那样直接调用ld进行链接。而是调用`collect2`进行链接  

实际上，`collect2`只是一个辅助程序最终它仍调用`ld`进行链接  

举个例子：对于C++程序来说，在执行main函数前，全局静态对象必须构造完成。
也就是说，在main之前程序需要进行一些必要的初始化，gcc就是使用collect2安排初始化过程中如何调用各个初始化函数的。根据链接过程可见，除了hello.c对应的目标文件ccfb7d3z.o外，ld也链接了libc、libgcc等库，以及所谓的包含启动代码（start code）的启动文件（start/startup file），包括crt1.o、crti.o、crtbegin.o、crtend.o和crtn.o


## 参考文献  
* 《程序员的自我修养》  
* 《深度探索Linux操作系统：系统构建和原理解析》  

