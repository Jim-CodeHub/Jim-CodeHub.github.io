
# 1 Endianness

Endianness (alias is byte/bit order) refers to the order of bytes/bits within a binary data of Protocols, CPU, Memory, etc. Include **Big-endianness** and **Little-endianness**. *bytes order* is the ordering of bytes within a multi-byte data and *bits order* within a byte.

https://en.wikipedia.org/wiki/Endianness

## 1.1 Big-endianness 

## 1.2 Little-endianness

# 2 Bit numbering

 位序 表示一串比特数的顺序表示，分为Most Significant Bit和Least Significant Bit，即最高有效位和最低有效位，在通信和存储中，不同的位序表达的数值结果不同，如“M 1010 S”表示数值10，而“S 1010 M”表示数值5，约定位序可使通信双方正确解码数值。

 LSB还可以用于判定一个数是奇数还是偶数，如果LSB为1，则一定是奇数，否则是偶数
 MSB还可以判定有符号数的符号（1负0正）
 TBD：SPI有两种传输配置M先或S先，这样配置的意义是什么呢？是为了发送给拥有不同序列处理的芯片？还是跟大小端有关系（位序到底与大小端是否有关？？？）

 字节序 endianness： 表示多个字节的顺序表示，分为Most significant Byte和Most significant Byte，即最高有效字节和最低有效字节，在通信和存储中，不同的字节序表达的数值不同。 在大端（Big-endian）模式中，低地址存放高字节，高地址存放低字节，如：0X1234，0X34为低字节，0X12为高字节，大端存储模型为0X34 0X12，网络通信和部分主机都是用大端模式。小端（little-endian）模式中，低地址存放低字节，高地址存放高字节，如：0X1234，按顺序存放：0X12 0X34，大部分主机都是用小端模式
 大端模式跟符合人类阅读模式，小端模式跟符合数据存储模式

 编程语言总是使用大端模式处理数据，无论在哪种系统环境下工作
 如uint16_t X = 0X1234;那么X的高地址存储0X1234中的高字节0X12，X低地址存储0X1234中的低字节0X34; 
 在编程语言中，左移，总是表示向高位移动，右移，总是表示向低位移动

 大小端对字节序和位序的影响



 https://en.wikipedia.org/wiki/Bit_numbering

----

编码

# 1 Introduction 

Character coding system is the binary set translator for the certain *charset* (which alias 'code pages'), used for data recognition and storage. 

![Coding Sys](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/Coding/charset.png) <br> <center> <font color=gray> Coding Sys trans </font> </center> <br>

---

# 2 Coding system & charset

## 2.1 ASCII

### 2.1.1 Introduction

American Standard Code for Information Interchange (ASCII).

### 2.1.2 Coding

Use **7 bits** of 1 Byte, supports **128** character encoding, and **8 bits** supports **256** character encoding of EASCII. And ASCII is subset of EASCII.

### 2.1.3 Charset

English alphabet, Control characters(0~31 and 127), Punctuations, parts of western europe characters.   

## 2.2 GB2312-80

### 2.2.1 Introduction

Guo Biao (GB) 2312, 1980, Chinese national standard.

### 2.2.2 Coding

Use **2 Bytes**, construct with *High Byte* and *Low Byte*, both from 0XA1 to 0XF7 and contain ASCII, supports **7396** + 128 character encoding. 

### 2.2.3 Charset

Simplified Chinese, Chinese punctuations, ASCII, Japanese, Roman alphabet and math symbol, etc.

### 2.2.4 GBK(CP936)

Guo Biao Kuo (GBK, which alias 'CP936') is extension of GB2312 (use remaining space of GB2312), designs by Microsoft.

### 2.2.5 GB18030

GB18030 is latest characters coding system of China, compatible with UTF-8 and supports more characters. 

## 2.3 BIG5

### 2.3.1 Coding 

Use **2 Bytes**, construct with *High Byte* from 0X81 to 0XFE and *Low Byte* from 0X40 to 0x7E + 0XA1 to 0XFE.

### 2.3.2 Charset 

Traditional Chinese, Chinese punctuations, Geek alphabet, etc.

## 2.4 UTF-8 

### 2.4.1 Introduction

8-32 bits Unicode Transformation Format. 

### 2.4.2 Coding

Use **1 to 4 Bytes**, flexiable length. 

### 2.4.3 Charset

Unicode - Universal charset, supports by ISO/IEC 10646, contains ASCII, Latin, Greek, Abaric, ..., etc. 

### 2.3.4 UTF-16 and UTF-32

UTF-16 is 16 bits Unicode Transformation Format and UTF-32 is 32 bits, but they are fixed length and preformance is not as good as UTF-8.

## 2.5 Collection diagram

![Collection](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/Coding/CharsetCollectio.png) <br> <center> <font color=gray> Charset collection </font> </center> <br>

---

# 3 Programming with character coding system 

//TBD


----------

快算：（ 一个2^10（1024）升K，两个升M，三个升G）

随便一个十六进制地址空间，如0XFFFF，首先需快速算出bit数为16bit，然后拆分2^16 = 2^6 * 2^10 = 64Kbit，更快的算法就是一
看到16，就想到2^6*2^10，而2^10代表K，于是就是64Kbit





0X0000 ~ 0XFFFF

多大地址空间？

0XFFFF 可以快速看出是16bit

Max = 2^16 = 65536bit


2^16 = 2^6 * 2^10 = 64Kbit

65536 / 1024 = 64Kbit = 8KByte

-------

实际2^10 = 1024 ，所以 直接用2^16 /2^10 = 2^6 = 64Kbit

前提是地址空间大于2^10时这样算


0X000 ~ 0XFFF 多大地址空间？

2^12 / 2^10 = 2^2 = 4Kbit
或者 2^12 = 2^2 * 2^10 = 4Kbit（ 一个2^10（1024）升K，两个升M，三个升G）

0X00 ~ 0XFF 多大地址空间？

2^8 = 256bit

0X00000000 ~ 0XFFFFFFFF 多大地址空间？

2^32 / 2^10 = 2^22 = 2^10 * 2^10 * 2^2 = 4*1024*1024 = 4G

含有一个1024升为K，两个升为M，三个升为G，四个上升为T，五个上升为P...更多见 国际单位制（SI）词头

所以2^32一看就能看出包含三个2^10，还余下2^2所以为4G

0X0000000000 ~ 0XFFFFFFFFFF 多大地址空间？

2^40 包含4个2^10，为1T

0x0000000 ~ 0xFFFFFFF 多大地址空间？

2^28 包含2个2^10，所以为256M

0X0000000000000000 ~ 0XFFFFFFFFFFFFFFFF ？

2^64 包含6个1024，所以为16E


	




附：SI词头

10E24 尧（它） Y Yotta 
10E21 泽（它） Z Zetta 
10E18 艾（可萨） E Exa 
10E15 拍（它） P Peta 
10E12 太（拉） T Tera 
10E9 吉（咖） G Giga 
10E6 兆 M Mega 
10E3 千 k Kilo 
10E2 百 h hecta 
10E1 十 da deca 
10E-1 分 d deci 
10E-2 厘 c centi 
10E-3 毫 m milli 
10E-6 微 μ micro 
10E-9 纳（诺） n nano 
10E-12 皮（可） p pico 
10E-15 飞（母托） f femto 
10E-18 阿（托） a atto 
10E-21 仄（普托） z zepto 
10E-24 幺（科托） y yocto 


----


I/O引脚的读取

	每个I/O端口都有三个寄存器：数据寄存器 PORTx、 数据方向寄存器 DDRx、 端口输入输出引脚寄存器 PINx，
	PORTx和DDRx为读/写寄存器，而PINx为只读寄存器。
		无论配置DDRx是输入（0）还是输出（1）,PINx的数据都可以读取，PINx就代表当前引脚的高低电平，这可以
		用电压表测量出来，如要读取PINx的某个位，则可以如下操作：
			设要读取PINA的第0位,判断其是否是高电平：
					uint8_t x = PINA;
							if(0x01 == (x&=0x01))
			{
							...
										}
		
		要注意的是，PINx是只读寄存器，下面这样的操作是不对的：
				if(0x01 == (PINA&=0x01))
			{
							...
										}
		
	如果针脚作为输入时要读取端口数据，则要使能该引脚的上拉电阻：
			DDRA &= 0XFE; //设置为输入
					PORTA|= 0x01; //使能上拉电阻
							
							uint8_t x = PINA;
									if(0x01 == (x&=0x01))
			{
							...
										}
		上拉电阻的意义其一是给定该引脚确定的电平，以方便程序匹配
			判断，如上述程序中先使能为高电平，然后再判断是否还是高电平，如
				果是就没有读到相关信号。其二是当将外部的电路拉低时该引脚将输出
					电流。

---

处理器的 主频、IPC与MIPS

振荡器（晶振/RC等）是硬件系统的指挥家，指挥速度就是振荡频率，处理器的主频是指处理器能接受的频率范围/适应的工作范围，比如主频500MHz（max）的处理器，使用600MHz的振荡器（在不分频的情况下）是应用不了的，IPC是指振荡器振荡一个周期处理器能处理多少条指令，于是

1秒振荡的次数（主频） x 每次振荡处理的指令数量（IPC）= 每秒处理百万条指令数（MIPS）/每秒处理的指令条数（IPS）


时钟周期？
晶振振荡一次(一个来回)的时间


指令周期？ 
假设1秒振荡100次，1次执行1000个指令，那么1秒就执行了100 000个指令，那么一个指令就是0.00001秒



-----
PLC

PLC VS DCS

PLC早期是以代替继电器目的而生产的 开关量 嵌入式计算机，随着发展，现在已经丰富了很多功能。

DCS是处理模拟量的嵌入式设备.


PLC有三种输出接口：
	1. 晶体管输出-低电压，速度快，但不能直接驱动外设（电流小）
	2. 晶闸管输出-中电压
	3. 继电器输出-高电压，因为继电器需要双接口接输出，所以设计出一个公共端子
					      速度慢（开关需要10ms，高频开关还会损坏继电器）但可以直接驱动外设（电流大mA）


在20世纪60年代末，由于发达国家工业和信息产业的快速发展，导致了PLC的出现：汽车产业一直以当时传统的控制方式来操作产线（大量的继电器开关组成的电路），随着产线的增多，这种控制方式越来越吃力（主要表现为驱动和维护），恰好信息产业出现，于是招标一种易用、耐用的电气控制产品，PLC各个厂家考虑到当时的市场环境（基本上都是电子电力人才），于是制作了梯形图为编程入口，而屏蔽了底层复杂的汇编代码

梯形图的符号，正式电子电力学科常用的符号，连线逻辑也及其相似，于是PLC市场迅速打开，沿用至今。

实际上PLC有多种编程入口（如直接指令），梯形图(间接指令)是最常用的，也是最直观的

常用的指令如下：

LD常开
LDI常闭
OUT输出
CTU增量计数器
TON接通延时指令
NOP空指令
上升沿触发
下降沿触发
SET置位（相当于74HC574保持）
RST复位（相当于74HC574保持）
\=
\>
\<等比较触点指令
MOV 移动指令
等等，使用这些指令可以解决80%的问题


PLC输入端子上标有x00 x01 x02 等等，输出端子上标有y00 y01 y02等等，而在PLC梯形图中，只要使用了这些符号，就等于操作了输入输出端口

另外要注意，这些都是8进制表示的，比如x10是第八个端子

s/s是Xn的公共端 （实际上s/s与Xn之间连接了发光二极管，所以只要导通，输出端就能输出）
com是Yn的公共端 （要注意，电流是否能驱动负载，如果不能则需要外加电源）



交流电机力巨大，但调速特性特别差，因此出现了变频器来调节交流电机速度，
直流电机调速特性好，但力矩相对较差。交流电机+变频器=直流电机，只是价格更贵


继电器，电磁继电器，一般的用法是小电流控制大电流，但在电子电力工程领域，有各式各样的继电器，已经不单单是小控大的作用了，而是成了“条件触发器”，
比如速度继电器（达到设定速度就触发）、时间继电器（定时触发）...等等

100万的项目，

10%电气 无自动化
20%电气 一般自动化
30% 有自动化
30%+ 高自动化


常开常闭是指无激励时的开关状态




## PLC的显示

因历史原因和设计原因，PLC不带显示器，因此常规的LCD、普通按键驱动起来非常麻烦，而且耗费端口，因此最常用的方式是直接连接另一个具有处理器的显示器，然后
使用modbus进行通讯

比如麦科的PLC和深圳显控制公司的LCD，后者也是一个单片机，内置modbus协议，它们通过modbus进行通讯，LCD触碰某个图形触发哪个点，可以直接在后台配置，如果被触发，则用modbus返回




-----------

I/O端口都有三个寄存器：数据寄存器 PORTx、 数据方向寄存器 DDRx、 端口输入输出引脚寄存器 PINx，
PORTx和DDRx为读/写寄存器，而PINx为只读寄存器。
无论配置DDRx是输入（0）还是输出（1）,PINx的数据都可以读取，PINx就代表当前引脚的高低电平，这可以
用电压表测量出来，如要读取PINx的某个位，则可以如下操作：
设要读取PINA的第0位,判断其是否是高电平：
uint8_t x = PINA;
if(0x01 == (x&=0x01))
{
	...
}

	要注意的是，PINx是只读寄存器，下面这样的操作是不对的：
if(0x01 == (PINA&=0x01))
{
	...
}

如果针脚作为输入时要读取端口数据，则要使能该引脚的上拉电阻：
DDRA &= 0XFE; //设置为输入
PORTA|= 0x01; //使能上拉电阻

uint8_t x = PINA;
if(0x01 == (x&=0x01))
{
	...
}
上拉电阻的意义其一是给定该引脚确定的电平，以方便程序匹配
判断，如上述程序中先使能为高电平，然后再判断是否还是高电平，如
果是就没有读到相关信号。其二是当将外部的电路拉低时该引脚将输出
电流。


-------------
定点数&浮点数

Fixed point VS floating point


浮点数，根据IEEE 754-1985：F = sign x 尾数 ^ 指数 
```
	一个32bit的浮点数定义：
	----------------------------------------
	| sign(1bit) | 尾数(8bit) | 指数(23bit)|
	----------------------------------------
```

浮点数，意味着小数点位置可变，也就是说一个浮点变量，它可以接收的浮点数不是固定的，只要在范围内的都可以接收，比如float F = 0.123，还可以F = 10000.2
浮点数变量一般用来表示小数，但也可以存储整数，其实就是存储小数点后面没有数值的数（小数点在末尾）

定点数，意味着小数点位置不变，假设一个定点数D的小数部分有3位， 则D=0.123或D=0.234，但D=0.1234就不行了
在编程语言中没有直接表示定点数的方法，需要转义实现，比如一个定点数的整数部分由2位，小数部分有10位，则可以标示为Q(2,10)

在没有浮点运算器（硬件）的CPU，浮点数运算会被编译器转换成大量的逻辑代码，运算起来非常耗时，在DSP中还不能用浮点数，因此这些情况下 如果必须使用小数表达数据，那么就需要定点数。


因为定点数是逻辑表示的，因此运算也是逻辑的。


---------------------------

ARM处理


ARM处理器之多重模式意义的猜想：

用户模式、快速中断、中断、管理模式、系统模式、ABORT、未定义...

这些模式好像可以对应到Linux操作系统中，比如用户模式下就是Linux一般用户的权限下工作，
中断/快速中断 由软件或硬件产生
管理模式，就是Linux管理员权限下的操作
系统模式 是内核上下文？？？
ABORT 终止，任何异常的终止

多重模式也可能是为了预留接口给芯片制造商使用，比如未定义模式可以用来扩展协处理器（周立功）


-----------------------------

烧录到单片机内的程序存储在哪里？在哪里运行？

第一答案肯定是烧录并存储到了FLASH中，运行肯定是在RAM了

哈弗体系的程序和数据是分开存储的，所以可以从FLASH中读取指令，而从RAM中读取数据？？？


指令与数据: 以C语言为例，任何变量和常量都是数据，而指令是各种语句，
当烧录程序到FLASH中后，单片机运行时，先将变量和常量都加载到内存中，
然后执行时从FLASH中取指令，从RAM中取数据

但冯诺依曼体系数据和程序是通过一条总线搞定的，难道在运行前程序和数据都要加载到RAM中吗？

---------------------------

冯诺依曼体系 与 哈佛体系

本质的区别是程序与数据通道， 即 冯诺依曼体系使用一条总线访问程序和数据，而哈弗体系程序和数据各有一条总线，
这就导致了速度上的差别，

一条指令被执行要经历三个步骤：取址、译码、执行；如果一条指令涉及数据运算，对于冯诺译码只能等下一个指令周期来获取数据，
而哈弗结构可以（可能）立即完成

流水线：如ARM7TDMI，采用三级流水线结构，也就是三级缓存，假设为L1,L2,L3，CPU在开始运行的时候，先将前三条指令存储L1，L2和L3，
当CPU需要取址时先从L1取，取完交给译码器，译码器译码的同时，L2被取址，此时开始执行第一条代码，当执行完第一条代码后译码器又工作完成....
这样取值、译码和执行三个步骤就无缝连接，提高了运行效率，另外预取指令也节省了CPU等待数据从RAM加载到寄存器的时间。


ARM7系列都采用冯诺依曼体系结构，ARM9-ARM11采用哈弗结构


冯 冯诺依曼体系的还将要执行的指令从FLASH加载到FLASH中诺依曼曾被普利斯顿大学聘为教授，可能其体系的研发构想与大学息息相关，所以冯诺依曼体系结构又称为普利斯顿体系结构

---------------

CPU中的特殊寄存器之

程序计数器： PC - Program counter

一条指令的执行过程：取址、译码和执行。取址时从哪里取呢？或者说是从哪个地址取呢？如何操控CPU取址的地址？

就是通过程序计数器PC，或者称为指令计数器。

CPU取址时将以 PC寄存器中存放的值 为地址 来取址。

为什么叫计数器呢？因为每次CPU取址完成，PC将自动累加预存下一条即将被执行的指令（除非人为的干预），如果没有人为
干预，那么将不断的累加，所以又叫计数器。

PC累加一次，不一定是累加1，步长是根据指令长度决定的，

如ARM7TDMI有ARM的32bit指令 也有Thumb的16bit指令，如果试用的是32bit指令，那么累加一次那就是+4（4x8=32），16就是+2（2x8=32）
，注意 无论哪种CPU，最小操作单元都是Byte，也就是一个Byte一个地址。

所以8bit的指令集，累加一次就是+1

如果是变长指令，那是多少就加多少。

---------------

PC与寻址能力：

ARM7TDMI的PC寄存器是32bit的，所以可以存放最大值是2^32，即4G，所以寻址范围是0~4G-1，或者说是0X0000 0000 ~ 0XFFFF FFFF



-------------

LPC2214有16K的RAM和256K的FLASH，采用的是ARM7TDMI-S内核，也就是采用的冯诺依曼体系结构，而冯诺依曼体系结构程序与数据共存于存储器，

如果是电脑，则掉电时代码存储在硬盘，上电时将程序和数据都拷贝到内存执行。

但LPC2214中如果存储了200K的程序，RAM只有16K，显然不可能将程序和数据都拷贝到内存执行，

但又是冯诺依曼体系结构，一条总线会从FLASH中读指令又从RAM中读数据？？？？

冯诺依曼体系描述说共存于存储器的数据和程序以地址区分，那么如果FLASH和RAM执行统一地址映射，且共有一条总线，那么就没有问题了，

这也就是说，PC不仅仅可以指向RAM，它也可以指向FLASH空间，或者说可以指向统一地址映射的所有空间，


果然，查看LPC2214手册，0~4G-1空间被统一映射，RAM空间在0X40000000~0X40003FFF，FLASH空间在0X00000000~0X0003FFFF
，AHB,VPB等等也在其中

，那就是说只要给PC赋值任一地址值，那么CPU就执行那个地址的指令，如果指向AHB/VPB的空间？那就执行那里的指令，而AHB和VPB是ARM7TDMI-S内核的外设总线
是用于连接LPC2214中的I/O AD SPI IIC USART RTC TIMER WD等部件的，这些部件显然没有指令可执行，那么

ARM中的7中模式中的未定义指令模式，应该就是未这个设计的，如果执行到了未定义的指令，就跳转到这个模式中，至于为什么未定义指令模式可以用于扩展
协处理器？未知，可能是未定义指令，可以“自定义指令”，也就是这个模式下用于激活一下协处理器，然后再跳转回来工作？？？

当然AHB还连接了外部存储控制器，用于连接外部存储器，如果外部存储器中有指令，那么就可以执行了


----------------------------------------------

LPC2214 BOOTLOADER

BootLoader是一段固件代码，存储在片上FLASH的最顶端8KByte（也就说实际用户可用的片上FLASH只有248KByte）, 在CPU复位之后这个区域也会被映射到地址0x7FFFE000-0x7FFFFFFF（这是片上**存储区域**的最顶端），也就是说从FLASH最顶端和存储区域的最顶端都能执行BootLoader。

这样做的目的是为了与将来的衍生产品兼容

----------------------------------------------

LPC2214 异常中断向量

Address				| Exception
:-:					| :-:
0x0000 0000			| Reset
0x0000 0004			| Undefined Instruction
0x0000 0008			| Software Interrupt
0x0000 000C			| Prefetch Abort (instruction fetch memory fault)
0x0000 0010			| Data Abort (data access memory fault)
0x0000 0014			| Reserved (用于存放**验证用户有效代码的值**)
0x0000 0018			| IRQ
0x0000 001C			| FIQ

0x0000 0000 ~ 0x0000 001C ~ 0X0000 0020 共32Byte

这些异常中断向量存储在地址0X0000 0000开始的32Byte，即FLASH区域的最低端

用户可以通过软件编程将自己的函数地址分配到这些对应的地址上，以便于异常发生时可以执行自己的函数。

这相当于在AVR中调用了一句

ISR（xxxx）
{
}

注意：复位后 0X0000 0000 默认包含一条跳转指令，用于跳转到BOOTLOADER映射区，来执行BOOTLOADER
所以无论如何，复位后都是执行BOOTLOADER，

为什么一切启动代码，还可以将0X000000分配到自己的函数呢？这是因为BOOTLOADER加载完成后，会将0X00000000再次装入PC，然后把控制权交给用户....
所以在BOOTLOADER执行期间，用户代码是不起作用的，或者说没有拿到执行权力

----------------------------------------------

LPC2214代码读保护 **CRP**

BOOTLODER固件从1.61开始，有了代码读保护逻辑

即FLASH地址区 0X000001FC 地址的值 是 0X87654321 时，JTAG、外部存储器BOOT和ISP命令将不允许读存储器、不能写RAM、不能执行GO跳转指令、不能将RAM拷贝到FLASH，

如果ISP指令做了这些操作，将返回CODE_READ_PROTECTION_ENABLED.

如果代码读保护使能了，那么ISP命令只允许擦除所有用户扇区

这一点类似于AVR的加密熔丝位，只不过需要用户自己来完成了。


注意：IAP不受代码读保护使能的影响。


----------------------------------------------

LPC2214芯片复位逻辑

1. **BOOTLOADER[CPU控制权期]**

上电/重启 -> PC=0X00000000, **CPU控制权期开始** -> 执行复位向量的中跳转指令跳转至BOOTLOADER程序入口 -> 初始化 -> 

《CPR使能?》[YES] -> 禁止DEBUG | 
			[NO ] -> 使能DEBUG | -> 《看门口使能?》 [YES] ---------------------------|
													[NO ] -> 《ISP模式使能？》 [NO ] |	-> 《片外BOOT使能?》 [NO ] -> 《用户代码有效?》[YES] -> 执行内部用户代码，**CPU控制权期结束** 			   
																																	   [NO ] -> TO ISP

																											 [YES] -> 《CRP使能？    》[NO ] -> 执行外部用户代码，**CPU控制权期结束** 			   
																																       [YES] -> TO ISP
																			   [YES]    -> TO ISP 

 TO ISP : 自动波特率（一直到成功）-> 接收晶振频率，处理ISP命令.


2. **CPU INIT[用户控制权期]**

3. **BOARD INIT[用户控制权期]**

4. main


