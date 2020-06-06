
# 1 《设备驱动程序》

## 1.1 简介

设备驱动程序是进入Linux内核的大门

(除非特别情况) 一般情况下编写设备驱动程序时，应该注重于如何使硬件可用，而如何使用硬件留给上层应用程序，这样驱动程序就比较灵活。

设备驱动程序，就是设备硬件和应用程序之间的软件层。对于同一个设备，不同的驱动程序都可以驱动其工作，但每个驱动程序可以有不同的驱动实现，因此每种驱动程序都呈现一种特性。总的来说，驱动程序应该留给用户更多选项，并尽量保持简单。

## 1.2 功能划分

功能		| 描述
:-:			| :-:
进程管理	| 进程创建、销毁，进程间通信，外部I/O，进程调度等
内存管理	| 虚拟地址空间，内存分配等
文件系统	| **内核在没有结构的硬件上构造结构化的文件系统**
设备控制	| -
网络功能	| -

## 1.3 可装载模块 - 运行时扩展

把程序写入Linux内核有两种方式：作为一个目标文件（.o）**编译**进内核镜像或在操作系统中作为一个模块文件(.ko)在内核上进行**插拔**，前者通常在内核移植时完成。

内核模块的插拔、运行时扩展机制，克服了聚内核的缺点

## 1.4 设备和模块的分类

字符模块（字符设备）、块模块（块设备）和网络模块（网络接口），模块划分不是严格的，

- 字符设备	： 字符设备是可以向字节流一样被访问的设备，如字符终端、串口等
- 块设备	： 如磁盘等
- 网络接口	：

## 1.5 安全问题

驱动程序中尽量不要实现安全策略，这部分应该交给系统管理员完成。

编写程序时要严格，如变量清零、缓冲区溢出（如数组越界）等处理操作，很多在用户空间编写程序时可忽略的问题，在内核驱动中都必须注意。

对于内核插拔功能，在编译内核时也可选择开关，如果关闭了这个功能，那么就不能实现运行时扩展，所有的内核模块都必须在编译内核时同时编译到内核当中

## 1.6 加入内核开发团

邮件是从Linux诞生至今一直被Linux内核开发者使用的通信、交流、讨论的方式。

Linux内核邮件列表[LKML](http://vger.kernel.org/vger-lists.html)，提供了不同的主体分类，通过邮箱订阅某一类来获取该类的消息推送。

LKML是Linux内核开发者的聚集中心，这是一个顶级质量的资源。

邮件订阅格式：

接收人：majordomo@vger.kernel.org

//TBD

---

#  2 构造和运行模块

首先应该准备一个虚拟机Linux系统，用于“牺牲性”测试，因为对内核的操作很可能导致系统崩溃、甚至磁盘等硬件损坏。

## 2.1 设置测试系统

### 2.1.1 内核的来源与选择

首先内核有两种应用方向，一个是BSP、另一个是在宿主PC机，这里只讨论后者。

在PC宿主机开机时，在启动界面通常可以看到内核的选择，这是因为一个系统内是可以存在多个内核的，因为一切皆文件，所以可以理解为可以存在多个内核文件，但是在启动时只能指定一个装载运行。

www.kernel.org是Linux内核官网，是标准内核，与之相对应的就是发行版厂商的内核（如某个版本ubuntu、Fedora、Centos携带的和升级的内核等），后者会对某个版本内核打很多补丁，这些补丁会修改设备驱动程序使用的内核API。所以如果想要学习驱动程序的编写，标准内核是最好的。

为此，可以在官网上下载一个某版本的标准内核，然后手动编译安装到系统，重启时选择该内核，即可在此内核下进行模块测试。

另外，如何编译内核也是一门技术，如果没有掌握，那就暂时在发行版厂商内核下测试吧。

### 2.1.2 宿主机内核在什么目录

你正在使用的Linux操作系统中可能没有内核源码，查看目录/usr/src/kernels/xxx（在kernels目录下可能有更多的内核源码目录，这是系统自动更新的结果），更多被用到的目录是/lib/modules/xxx/build，实际上它是指向前者的软链接，这些目录下的Linux内核源码不是操作系统运行必须的，只是在有些软件要编译成在该平台的内核模块时才需用到（比如要编译一个dnw程序），所以安装完操作系统后这个目录可能为空。

可在线安装内核源码，在此之前一定要确定当前系统使用的内核源码版本“#uname -r”，然后可以通过https://pkgs.org/download/kernel-devel等网站下载安装，或者直接在线“#yum install kernel-devel”下载（red系列），后者不能保证与当前系统使用内核匹配，不匹配可能导致你所编译的模块不能在当前系统运行。

安装的过程就是简单的解压缩，你甚至可以把内核源码解压到任何目录，最好解压到默认标准目录：/usr/src/kernels/。

> **[info] Note**
>
> 2.6以上的版本内核，编译模块时依赖**源代码树**。另外目标板BSP的内核与宿主机内核源码不同，它多用于嵌入式工程，且不能直接作为开发环境使用，它需要进一步配置。从这个意义上讲，宿主机上的内核源码更应该称为“内核开发包”（kernel_devel），它不是一个完整的内核。同样的，目标板内核源码版本也要与目标板正在使用的内核一致，通常这个源码应该是移植内核时使用的、已经配置好的那一份。

## 2.2 Hello world 模块

```C

#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>

MODULE_LICENSE(“Dual BSD/GPL”); //表示该模块遵循BSD/GPL双协议，如果不指定，则在装载模块时会有“垃圾”信息的提示

int init_module(void) //回调函数
{
	printk(KERN_ALERT "module init\n”);//内核打印函数，常用于内核调试
										//该函数支持优先级设定(在格式化消息前加优先级)，优先级用字符串表示，KERN_ALTER就是代步这些字符串中的一个宏
										//显式指出优先级的目的是，默认优先级可能不会将消息输出到控制台上
	return 0;
}

void exit_module(void) //回调函数
{
	printk(KERN_ALERT “cleanup module”);
}

module_init(init_module); //装载到内核时调用
module_exit(exit_module); //从内核移除时调用

```

## 2.3 **用户空间和内核空间**

操作系统的空间划分的实现实际是由CPU硬件支持的，即CPU的“**级别**”支持，不同的级别支持的操作不同，并提供有限的级别切换功能。

Unix系统设计时利用了这种硬件特性，当前所有的处理器多至少支持两个级别，诸如X86系列的CPU可支持更多的级别，此时Unix使用其最高级别和最低级别。

在Unix中，内核运行在最高级别（也称超级用户态），在这个级别中可以进行所有的操作。而应用程序运行在最低级别（用户态），在这个级别中，处理器控制着对硬件的直接访问以及对内存的非授权访问。

常将这两种运行模式称为”内核空间“和”用户空间“，不同模式下具有不同优先级和内存映射（地址空间）。

### 2.3.1 用户空间与内核空间的切换

两种情况会引发空间的切换(用户态到内核态)：

1. 应用程序执行系统调用（应用程序调用系统API） ： 执行系统调用的内核代码运行在进程上下文，可访问该进程地址空间的所有数据
2. 应用程序被硬件中断挂起					   ： 处理硬件中断的内核代码和进程是异步的，与特定进程无关

因为模块代码运行在内核空间，所以一个驱动程序至少要执行两类任务：**系统调用** 和 **中断处理**


--------------------------
其它总结内容


## 模块

1. 简单的内核模块程序：first.c


2. 编译成内核模块：first.ko / test.ko

- 命令行编译和安装

编译：内核源码目录使用#make modules M=xxx（M指向的路径为first.c所在目录，也是fisrt.ko生成的位置）。
安装：编译成first.ko后，可手动拷贝到/lib/modules/xxx/extra目录下（目标板系统的路径为：/lib/modules/xxx/，如目录不存在可自行建立），安装不是必须的，但这有助于相关模块操作命令的使用。

- 使用Makefile编译和安装

```Makefile

obj-m = test.o
test-objs = first.o

KERNEL_DIR = /lib/modules/$(shell uname -r)/build #宿主机内核路径 
ROOTFS=

all:
make -C  $(KERNEL_DIR) M=`pwd` modules 

install:
make -C	 $(KERNEL_DIR) M=`pwd` INSTALL_MOD_PATH=$(ROOTFS) modules_install

clean:
make -C $(KERNEL_DIR) M=`pwd` clean

```

“obj-m”指定了要生成的模块名称，以模块名称为前缀的“test-objs”指定了要生成该模块依赖哪些目标文件.

3.	多个目标文件编译成模块；test.ko

```
/*增加函数声明配置文件*/
#ifndef __CONFIG_H__
#define __CONFIG_H__

void sec(void);
void thi(void);

#endif

----------

/*修改first. c*/
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include "config.h"

MODULE_LICENSE("GPL");

int init_module(void)

{
	printk("module init\n");

	second();

	return 0;
}

void cleanup_module(void)

{
	printk("module cleanup\n");

	third();
}

--------

/*增加second. c*/
#include <linux/kernel.h>

void sec(void)
{
	printk(“sec work\n”);
}

--------

/*增加third. c*/
#include <linux/kernel.h>

void thi(void)
{
	printk(“thi work\n”);
}

--------

/*修改Makefile*/
obj-m = test.o
test-objs = first.o second.o third.o

KERNEL_DIR = /lib/modules/$(shell uname -r)/build #宿主机内核路径 
ROOTFS=

all:
make -C  $(KERNEL_DIR) M=`pwd` modules 

install:
make -C	 $(KERNEL_DIR) M=`pwd` INSTALL_MOD_PATH=$(ROOTFS) modules_install

clean:
make -C $(KERNEL_DIR) M=`pwd` clean
```

可以看到，多个文件编译成模块，只要有一个文件添加了GPL协议声明即可。Makefile文件在test-objs后追加了seconed.o、third.o，指定test.ko由三个目标文件组成

4.	内核模块操作工具
->模块加载
#insmod xxx.ko
insmod 必须指定路径，上面命令是在xxx.ko文件所在目录执行的。

#depmod
#modprobe xxx
执行过depmod之后，即更新了模块依赖信息，这时命令make install就起了作用，Makefile中定义的安装路径，就是depmod命令默认的模块依赖信息更新路径；modprobe也是进行模块插入操作，这个命令依赖depmod更新的信息进行寻找指定模块，并且不用.ko后缀。
加载模块之后在目标板上可直接看到（minicom等串口信息）：“module init”，这是fisrt.c中的初始化函数打印的信息；在宿主机上需要使用#dmesg命令才能看到这些信息。

->模块信息
#modinfo xxx
modinfo同样依赖depmod更新的信息，也不用指定后缀，它打印指定模块的模块信息，比如可以在什么平台运行等。
#modinfo xxx.ko
modinfo还可以查看指定模块信息，这使得不必插入就可查看模块信息。

#lsmod 
跟ls命令类似，它列出当前内核已插入的模块，可以通过lsmod | grep “xxx”寻找已经插入的指定模块来验证该模块是否已成功插入，lsmod不依赖depmod；实际lsmod是对/sys/module的操作。

->模块卸载
#rmmod xxx
拔出指定模块，它不依赖depmod，可指定或不指定.ko后缀。

#modprobe -r xxx
使用modprobe也可删除模块。

卸载模块之后在目标板上可直接看到（minicom等串口信息）：“cleanup modules”，	这是fisrt.c中的退出函数打印的信息，同样在宿主机中要使用#dmesg。

注：
a. 在进行内核模块插拔时很有可能会修改内核对模块的校验机制（版本控制、CRC校验），使得某一时刻在此插拔模块时无效，详细解决这一问题有复杂的过程，较为简单的是重新安装内核，所以备份很重要
b. 一个只有初始化函数没有卸载退出函数的模块，只能插入不能拔出，所以要么都写，要么都不写

5. 模块中的别名机制
module_init(my_init);/module_exit(my_exit);
通过两个宏，自定义了模块初始化和退出函数，很显然这不是必须的，但别名函数可以使用static修饰。要注意这两个宏要放别名函数之下，否则宏找不到这些函数。
C语言不象C++一样有名字空间，那么你写的函数名和变量名很可能与内核冲突，所以要用static关键字修饰你的函数(前提是该函数不会外部被调用)，内核也是这么做的。

```C
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include "config.h"

MODULE_LICENSE("GPL");
MODULE_AUTHOR("zhangji");
MODULE_DESCRIPTION("test moudule");
MODULE_ALIAS("1 module");

static int my_init(void)
{
	printk("module init\n");
	second();
	return 0;
}

static void my_exit(void)
{
	printk("module cleanup\n");
	third();
}

module_init(my_init);
module_exit(my_exit);
```

6. 模块中极致的内存优化机制
Linux是节约内存的操作系统典范，任何可能节约下来的内存都不会放过，以初始函数为例，函数要被调用就要加载到内存空间，但初始化函数一般只调用一次，所以调用一次之后就应该把这段空间释放，退出函数也是一样。

```C
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include "config.h"

MODULE_LICENSE("GPL");
MODULE_AUTHOR("zhangji");
MODULE_DESCRIPTION("test moudule");
MODULE_ALIAS("1 module");

static int __init my_init(void)
{
	    printk("module init\n");
		    sec();
			    return 0;
}

static void __exit my_exit(void)
{
	    printk("module cleanup\n");
		    thi();
}

module_init(my_init);
module_exit(my_exit);
```

7. 内核模块参数
像main函数在Linux命令行环境中接受命令行参数一样，内核模块也允许在插入时使用命令行参数，这个机制通过内核宏实现，模块接受参数要发生在初始化函数之前。

内核支持的参数类型有：bool、invbool（反转值bool）、charp（字符串指针）、short、int、long、ushort、uint、ulong

```C
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/stat.h>
#include "config.h"

MODULE_LICENSE("GPL");
MODULE_AUTHOR("zhangji");
MODULE_DESCRIPTION("test moudule");
MODULE_ALIAS("1 module");

static int baudrate = 9600;
static int port[4] = {0, 1, 2, 3};
static char *name = "vser";

module_param(baudrate, int, S_IRUGO);
module_param_array(port, int, NULL, S_IRUGO);
module_param(name, charp, S_IRUGO);

static int __init my_init(void)
{
	int i;
	printk("module init\n");
	printk("baudrate: %d\n", baudrate);
	printk("port:\n");

	for(i = 0; i < ARRAY_SIZE(port); i++)
		printk("%d ", port[i]);

	printk("\n");
	printk("name: %s\n", name);

	second();
	return 0;
}

static void __exit my_exit(void)
{
	printk("module cleanup\n");
	third();
}

module_init(my_init);
module_exit(my_exit);
```

程序定义了三个参数变量，这些初始值将是没有参数传递时的默认值，module_param()是普通参数宏，其参数分别为：参数变量名、参数数据类型、参数修改权限；module_param_array()是数组参数宏，其参数分别为：数组参数名、数组参数、数据类型、数组中元素个数指针/参数修改权限
权限在linux/stat.h中定义，跟普通文件的定义方法一样，S_IRUGO，其UGO表示	user/group/other，R	表示读，同样的有S_IWUGO、S_IXUGO、...，但模块参数应尽量保持只读性。
通过inmod test.ko baudrate=115200 port=1,2,3,4 name=”mybaudrate” 可在插入模块时传入参数，插入的模块及参数可以通过#ls /sys/module/test/parameters -l查看。

8.	模块依赖之前奏 – nm符号列表命令

可以列出目标文件/可执行二进制文件/.ko模块文件的符号信息，主要导出函数和全	局变量；共三列，包括：符号值、符号类型、符号名称，其中符号类型的含义如下：
b或B - bss段/d或 D - data段/r或 R – 只读段/ t或T – text段/ U – 未决 更多信息可通过#man nm查看。

U所在行对应的信息表示此函数存在于其它文件当中，被当前文件调用，对于该函	数所在文件来说，nm列出的该函数的结果是T（T表示可以被调用，t表示不可以）。U表示一个未决符号，表示是在编译阶段不知到此符号对应函数地址，实际该函数地址是通过EXPORT_SYMBOL()宏导出，通过类似共享库函数的方式进行动态链接，内核有大量的符号导出，这为模块设计提供了丰富的基础设施。

注意：导出的即是全局的，全局的符号（全局变量/函数）是不允许重复的，因此如	果一个模块使用过了，你就必须要使用不同的。

9.	内核模块依赖

两个C文件相互调用很简单，通过包含头文件或使用extern存储类型指示即可，但当一个模块调用另一个模块中的函数或使用另外一个模块的全局变量时，该函数/变量必须是导出的。使用EXPORT_SYMBOL(变量名/函数名)导出全局变量或函数，且必须在全局环境中导出，使用EXPORT_SYMBOL_GPL()导出的模块只能被GPL许可证下的模块使用。

注意事项：
- 在插入模块时，必须先插入被依赖的模块，再插入依赖的模块，否则会出错，因为依赖的模块使用了被依赖模块的导出符号；在这一点上，可以看出modprobe插入命令的优势，它可以自动寻找依赖模块，而这又归功于depmod命令，它会将依赖模块的信息在/usr/src/kernel/xxxx/modules.dep中更新，而modprobe将会根据这些信息去依次插入模块。
- 存在依赖关系的两个模块不能分别编译，否则不能正确使用，除非被依赖模块集成到内核镜像中。
- 在拔出模块时，必须先拔出依赖的模块，再拔出被依赖的模块（这里要注意，modprobe -r 不能解决卸载依赖）。

```
//first.c中调用依赖模块中的val值和函数
...
extern int expval;
extern void dep(void);
...

------

//first_dep.c导出val和dep函数的符号
...
MODULE_LICENSE("GPL");

static int expval23 = 10;
EXPORT_SYMBOL(expval23);
...
static void dep(void)
{
	    printk("dep work\n");
}

EXPORT_SYMBOL_GPL(dep23);
...

-------

/*同时编译两个内核模块*/

obj-m = test.o
test-objs = first.o second.o third.o

obj-m += dep.o
dep-objs = first_dep.o
.....
	

```

可以看到first_dep作为单独的一个模块（当然，最终的模块起名为dep.ko）同样加入了GPL协议声明，在Makefile中编译了两个模块，注意后面的模块要使用“obj-m += ”

附： $ uname -a  查看内核版本

---

# 字符设备

## 概念

Linux操作系统一切皆文件，字符设备也通过文件维护，位于/dev目录下，称之为“字符设备文件”，通过“#ls -l /dev”可查看到以“c”开头标识的文件都是字符设备文件。

### 主次设备号

字符设备文件编码由“主次设备号”组成，主设备号标识驱动程序编号表示哪一类设备，次设备号由内核使用来标识具体设备，多个驱动程序可共享主设备号，但通常一个主设备号对应一个驱动程序。
<linux/types.h>中定义了32位的dev_t（typedef unsigned int），前12位作为主设备号，后20位作为次设备号。可以通过<linux/kdev_t.h>中定义的宏来获取主次设备号：MAJOR(dev)、MINOR(dev);也可以通过宏将主次设备号合并成dev_t类型：MKDEV(major, minor)。

### 注册设备号

<linux/fs.h>中定义了字符设备号注册函数：int register_chrdev_region(dev_t first, unsigned int count, char \*name);“first”是分配设备号的起始值，该值通常由MKDEV()产生，“count”是连续设备号的个数，“name”是所注册设备号对应的设备名。该函数执行成功返回0，错误返回负值。
以上是静态注册方式，缺点是无法提前知道哪个设备号可用，动态注册方式可随机分配可用设备号：int alloc_chrdev_region(dev_t *dev, unsigned int firstmi
		nor, unsigned int count, char *name);“dev”是出参，保存被分配的第一个设备号，“firstminor”为第一个次设备编号，“count”和“name”与静态注册函数相同。 
注册后的设备号及相关信息可从“/proc/devices”中获取。

### 注销设备号
void unregister_chardev_region(dev_t first, unsigned int count);注销和注册动作应该分别在模块释放和模块初始化函数中出现。

### 创建字符设备文件

设备文件通常是自动创建的，也可通过已有设备号手动建立设备文件：“#mknod /dev/abc c 256 0”，该命令创建了主设备号为256、次设备号为0的字符设备文件，这样就通过有效设备号与设备文件进行关联，对该设备文件进行读写，即是对已注册的设备号指向的设备进行读写。
简而言之，mknod命令就是将文件名、文件类型、主次设备号等信息保存在磁盘上

### 重要的数据结构
file_operations定义在<linux/fs.h>中，包含一组函数指针用于关联指定函数来实现用户层的系统调用（System API），具体实现的函数由用户调用时传参。结构体中涉及到\__user空宏，目的是作为一个标识方便维护程序。不使用或当函数指针被赋值为NULL时表示设备不支持该操作，内核对不同函数指针赋值为NULL的处理行为不同。
通常该结构体指针名定义为：struct file_operations \*fops;

不同于C库中的FILE结构体，内核file结构体定义在<linux/fs.h>中，file结构代表一个打开的文件，它不限于设备文件，每个打开的文件在内核中都有一个对应的机构体，它由内核在open时创建，在close时释放，在创建时会将file结构体传递给在该文件上操作的所有函数。	
通常该结构体指针名定义为：struct file \*filp;

inode结构表示文件，区别与file结构是表示打开文件的描述符，一个文件可能被多个程序打开对应多个file结构，而此文件只指向一个inode结构。inode结构包含大量有关文件的信息，但只有两个成员对驱程有用：dev_t i_rdev和struct cdev \*i_cdev;前者包含了真正的硬件层的设备编号，因内核版本变化的历史原因，该结构应该使用下列宏代替来保证最高兼容性：
unsigned int imajor(struct inode \*inode);
unsigned int iminor(struct inode \*inode);
后者表示字符设备，定义在<linux/cdev.h>。

### 字符设备的注册/注销

这里是设备注册/注销，要区分与上面的设备号注册/注销，老的办法（2.6内核之前）现在仍然可用：int register_chrdev(unsigned int major, const char \*name,struct file_operations \*fops); int unregister_chardev(unsigend int major, const char \*name);这套函数的限制是主次设备号不能大于255，注册函数会给指定的主设备号分配0~255之间的次设备号，并为每个设备建立cdev结构。注册函数的返回值是major值，这要求参数major应该是全局变量，这样可以在注销函数时正确释放。使用这套函数的驱动程序必须有处理256个次设备上open调用的能力。
新的方法使用cdev接口：
void cdev_init(struct cdev *cdev, struct file_operations *fops); 
int cdev_add(struct cdev *dev, dev_t num, unsigend int count);
void cdev_del(struct cdev *cdev);
注册函数的cdev参数是出参，这要求该参数应该是全局变量，以方便注销函数获取使用。
注：设备号注册用于内核对设备建立索引，设备注册是将设备与文件建立关联，设备注册与注销函数应该位于设备号注册与注销函数之间

- open和release操作

打开操作：int (*open)(struct inode *inode, struct file *filp);关闭操作：int (*release)(struct inode *inode, struct file *filp);
对于打开操作应该完成如下内容：首次打开进行错误检查和初始化、分配并填写filp->private_data，该成员为void类型指针，用来保存用户私有数据/结构指针以便在读写操作中对其操作。
对于关闭操作应该完成如下内容：释放由open分配的保存在filp->private_data中的所有内容、在最后一次关闭操作时关闭设备。
通常，保存在filp->private_data指针变量中的结构体地址，即用户使用结构体维护数据，为了获取该结构体地址可能用到宏：container_of(ptr,struct_type,mem)；struct_type是结构体类型，mem是结构体中的一个成员，ptr是该成员的指针(地址)。

- read和wirte操作

read拷贝数据到用户空间（从用户角度的读）：ssize_t read(struct file *filp, char __user *buff, size_t count, loff_t offp);write从用户空间拷贝数据（从用户角度的写）：ssize_t write(struct file \*filp, const char \__user \*buff, size_t count, loff_t offp);参数buff指向用户空间的缓冲区，内核代码不能直接引用其内容，而应该使用内核专用函数：unsigned long copy_to_user(void \__user \*to, const void \*from, unsigned long count);unsigned long copy_from_user(void \*to, const void \__user \*from, unsigned long count);这两个函数在<asm/uaccess.h>中定义。

注意：永远不要引用用户空间指针以危及系统安全性。以上两个内核专用拷贝函数不仅拷贝数据，还同时检查指针有效性。read与write的实现应该与系统调用保持一致，如正确执行返回读取/写入的字符个数、错误执行返回负值、返回0到达结尾等等。具体的错误值在<linux/error.h>中定义。

- readv和writev操作（暂略）

注意：内核代码必须拥有很高的质量，主要反映在内核运行和用户调用两个方面，如果调用者是自己则把关注点放在内核运行的稳定性上即可

示例：一个完整的字符设备驱动程序框架

```
/*test.ko*/
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <asm/uaccess.h>

#define DEVICE_MINOR    0
#define DEVICE_NAME     "TEST"
#define DEVICE_COUNT    1 

int m_open(struct inode *inode, struct file *filp)
{
	filp->private_data = xxx;

	return 0;
}

ssize_t m_read(struct file *filp, char __user *buff, size_t count, loff_t offp)
{
	ssize_t copied;

	copy_to_user(xxx);

	return copied;
}

ssize_t m_write(struct file *filp, const char __user *buff, size_t count, loff_t offp)
{
	ssize_t copied;

	copy_from_user(xxx);

	return copied;
}

int m_release(struct inode *inode, struct file *filp)
{
	return 0;
}

static dev_t m_dev;
static struct cdev m_cdev;
static struct file_operations m_ops={
	.owner   = THIS_MODULE,
	.open    = m_open,
	.read    = m_read,
	.write   = m_write,
	.release = m_release
};

static int m_init(void)
{
	alloc_chrdev_region(&m_dev, DEVICE_MINOR, DEVICE_COUNT, DEVICE_NAME);

	cdev_init(&m_cdev, &m_ops);
	cdev_add(&m_cdev, m_dev, DEVICE_COUNT);

	return 0;
}

static void m_exit(void)
{
	cdev_del(&m_cdev);
	unregister_chrdev_region(m_dev, DEVICE_COUNT);
}

module_init(m_init);
module_exit(m_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Dumor");
MODULE_DESCRIPTION("A test driver");
```

示例：虚拟一个串口设备

```
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/kfifo-new.h>//2.6版本内核的FIFO头文件

#define MY_MAJOR 256
#define MY_MINOR 0
#define MY_COUNT 1
#define MY_NAME  "ZJ'S CDEV"

static struct cdev my_cdev;
static DEFINE_KFIFO(myfifo, char, 32);//使用内核FIFO, 建立32个char空间

static int my_open(struct inode *inode, struct file *filp)
{
	return 0;
}

static int my_release(struct inode *inode , struct file *filp)
{
	return 0;
}

static ssize_t my_read(struct file *filp, char __user *buf, size_t count, loff_t *pos)
{
	unsigned  int  copied = 0;
	kfifo_to_user(&myfifo, buf, count, &copied);

	return copied;//系统调用的read函数要求返回读到的字节数
}

//对于支持随机访问的设备pos值才有作用
static ssize_t my_write(struct file *filp, const char __user *buf, size_t count, loff_t *pos)
{
	unsigned  int  copied = 0;
	kfifo_from_user(&myfifo, buf, count, &copied);

	return copied;
}

static struct file_operations my_ops={
	.owner = THIS_MODULE,
	.open = my_open,
	.release = my_release,
	.read = my_read,
	.write = my_write
};

static int __init my_init(void)
{
	int ret;
	dev_t dev;

	dev = MKDEV(MY_MAJOR, MY_MINOR);
	ret = register_chrdev_region(dev, MY_COUNT, MY_NAME);
	if(ret)
		return ret;

	cdev_init(&my_cdev, &my_ops);
	my_cdev.owner = THIS_MODULE;

	ret = cdev_add(&my_cdev, dev, MY_COUNT);
	if(ret)
		return ret;

	return 0;
}

static void __exit my_exit(void)
{
	dev_t dev;
	dev = MKDEV(MY_MAJOR, MY_MINOR);

	cdev_del(&my_cdev);
	unregister_chrdev_region(dev, MY_COUNT);
}

module_init(my_init);
module_exit(my_exit);
MODULE_LICENSE("GPL");

/*
   上述程序没有用到打开关闭功能，读写功能也仅用到了内核FIFO，很多形参也暂时	没有用到，通过下面命令可以进行验证：
#mknod /dev/abc c 256 0
#make && make install && depmod && modprobe cdev_fifo
#echo “hello fifo” > /dev/abc
#cat /dev/abc
hello fifo
可以看到，通过用户向字符设备写入数据，通过cat命令查看该内容，可以证明内	核FIFO生效
 */
```

示例：虚拟两个串口设备

```C
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/kfifo-new.h>

#define MY_MAJOR 256
#define MY_MINOR 0
#define MY_COUNT 2
#define MY_NAME  "ZJ'S TWO CDEVs"

static struct cdev my_dev;
static DEFINE_KFIFO(myfifo0, char, 32);
static DEFINE_KFIFO(myfifo1, char, 32);

static int my_open(struct inode *inode, struct file *filp)
{
	switch (MINOR(inode->i_rdev))
	{
		case 0:
			filp->private_data = &myfifo0;
			break;
		case 1:
			filp->private_data = &myfifo1;
			break;
	}

	return 0;
}

static int my_release(struct inode *inode, struct file *filp)
{
	return 0;
}

static ssize_t my_read(struct file *filp, char __user *buf, size_t count, loff_t *pos)
{
	unsigned int copied = 0;
	struct kfifo *myfifo = filp->private_data;

	kfifo_to_user(myfifo, buf, count, &copied);

	return copied;
}

static ssize_t my_write(struct file *filp, const char __user *buf, size_t count, loff_t *pos)
{
	unsigned int copied = 0;
	struct kfifo *myfifo = filp->private_data;

	kfifo_from_user(myfifo, buf, count, &copied);

	return copied;
}

static struct file_operations my_ops = {
	.owner = THIS_MODULE,
	.open = my_open,
	.release = my_release,
	.read = my_read,
	.write = my_write
};

static int __init my_init(void)
{
	int ret;
	dev_t dev;

	dev = MKDEV(MY_MAJOR, MY_MINOR);
	ret = register_chrdev_region(dev, MY_COUNT, MY_NAME);
	if(ret)
		return ret;

	cdev_init(&my_dev, &my_ops);
	my_dev.owner = THIS_MODULE;

	ret = cdev_add(&my_dev, dev, MY_COUNT);
	if(ret)
		return ret;

	return 0;
}

static void __exit my_exit(void)
{
	dev_t dev;

	dev = MKDEV(MY_MAJOR, MY_MINOR);
	cdev_del(&my_dev);
	unregister_chrdev_region(dev, MY_COUNT);

}

module_init(my_init);
module_exit(my_exit);

MODULE_LICENSE("GPL");

/*
   上述程序增加MY_COUNT值为2，即次设备号从0~1，同时初始化两个内核FIFO：myfifo0、myfifo1，open接口取出次设备号进行判断来决定将
   哪个FIFO结构体的地址保存到file结构体中的private_data（驱动私有数据指针）
   通过#mknod /dev/abc c 256 0 &&mknod /dev/def c 256 1建立两个字符设备文件，通过插拔模块、#echo “hello 0 ” > /dev/abc && echo 
   “hello 1” > /dev/def向字符设备文件写数据，通过#cat /dev/abc && cat /dev/def可以看到成功写入的数据
   上述程序是1个cdev对象使用1个驱动对应多个同类设备，也可以用多个cdev对象使用1个驱动对应多个同类设备
 */
```

