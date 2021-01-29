
LPC2214芯片复位逻辑

1. **BOOTLOADER[CPU控制权期]**

											       [MEMMAP 1:0 = 0, 挂接BOOTLOADER中断向量]
上电/重启 -> PC=0X00000000, **CPU控制权期开始** -> 执行复位向量的中跳转指令跳转至BOOTLOADER程序入口 -> 初始化 -> 

《CPR使能?》[YES] -> 禁止DEBUG | 
			[NO ] -> 使能DEBUG | -> 《看门口标志置位?》 [YES] ---------------------------|
														[NO ] -> 《ISP模式使能？》 [NO ] |	-> 《片外BOOT使能?》 [NO ] -> 《用户代码有效?》[YES] -> 执行内部用户代码，**CPU控制权期结束** 			   
																																		   [NO ] -> TO ISP

																												 [YES] -> 《CRP使能？    》[NO ] -> 执行外部用户代码，**CPU控制权期结束** 			   
																																	       [YES] -> TO ISP
																				   [YES]    -> TO ISP 

 TO ISP : 自动波特率（一直到成功）-> 接收晶振频率，处理ISP命令.

1.0 BOOTLOADER

BootLoader是一段固件代码，存储在片上FLASH的最顶端8KByte（也就说实际用户可用的片上FLASH只有248KByte）, 在CPU复位之后这个区域也会被映射到地址0x7FFFE000-0x7FFFFFFF（这是片上**存储区域**的最顶端），也就是说从FLASH最顶端和存储区域的最顶端都能执行BootLoader。

映射的目的是为了与将来的衍生产品兼容，即使用同一体系的不同FALSH&RAM存储容量的CPU可以共享BOOT处理方式。

1.1 CRP

Code Read Protection, 代码读保护，从Bootloader V1.61固件开始实现的功能，类似AVR的加密熔丝位，只不过需要编程实现，使能方法是将地址0X000001FC赋值为0X87654321。代码读保护使能后JTAG、外部存储器BOOT和ISP命令都不能写RAM、不能读存储器空间、不能执行GO指令、不能将RAM拷贝到FLASH，此时只能使用ISP命令擦除FLASH中的所有用户扇区。

另外，IAP模式不受代码读保护使能的影响。

1.2 异常(中断)向量

Address				| Exception(Interrupts)
:-:					| :-:
0x0000 0000			| Reset
0x0000 0004			| Undefined Instruction
0x0000 0008			| Software Interrupt
0x0000 000C			| Prefetch Abort (instruction fetch memory fault)
0x0000 0010			| Data Abort (data access memory fault)
0x0000 0014			| Reserved (用于存放**验证用户有效代码的值**)
0x0000 0018			| IRQ
0x0000 001C			| FIQ

0x0000 0000 ~ 0x0000 001C ~ 0X0000 0020 共32Byte，指定的异常发生时CPU会自动跳转到这些入口（也即中断），用户可以在CPU控制权期结束后重新定义这些向量，也就是当异常发生时可以指向自己的子程序。

在CPU控制权期间内，BOOTLOADER的中断向量挂接到异常向量，Reset异常向量地址包含了一条跳转指令，该指令跳转到BOOTLOADER固件入口。当CPU控制权期结束后，用户至少要重新定义Reset向量，否则将循环跳转到BOOTLOAD固件入口。

所谓“挂接”就是指在0X00000000~0X0000001C地址处存放子程序地址，如在0X0000 0000放入子程序START，因为复位时PC=0X0000 0000，那么就会执行0X0000 0000处的代码，在CPU控制权期 BOOTLOADER通过在此处放入子程序START，那么CPU就会执行START的代码，START子程序内包含一条指令：PC=XXXX，那么执行到这条指令就跳转到BOOTLOADER设定的固件入口了。

换句话说，CPU复位时由硬件自动将BOOTLOADER的某个子程序加载到地址0X0000 0000中，这个子程序中包含一条跳转到BOOTLAODER固件的入口，然后就执行了BOOTLOADER。

所以当用户获取控制权时，只需在0X0000 0000地址处放入自己的子程序入口，然后操作PC，就可以控制执行路径了。

1.3 WATCHDOG

看门狗，程序正常执行时可以周期性喂狗，一但无法及时喂狗，将产生CPU复位信号，无法喂狗的情况是自定义的。

看门狗复位标志位WDMOD.WDTOF在任何看门狗超时的情况时置位，该标志只能通过软件清除或者外部导致的CPU复位时硬件清除，也就是说一旦看门口超时导致CPU复位，这个标志是不会被硬件清除的，这样做的目的是为了重启后给BOOTLOADER做决策点，即如果是看门口复位的，则跳过ISP检测。

也就是说，如果已经烧录程序，CPU已经跑起来，并且开启了看门狗，一旦看门狗复位，即便是P0.14是低电平，也不会进入下载模式。

1.4 ISP模式

将P0.14引脚置为低电平，即表示准备进入ISP模式，一旦BOOTLOADER读取到，将进入ISP模式。下载软件可以依据LPC2214手册定义的ISP命令来编写烧录程序。

1.5 BOOT FROM  

当 P2.27(BOOT1) 和  P2.26(BOOT0) 引脚 都是高电平时，CPU从内部FLASH引导程序，否则从外部引导程序。要注意，从外部引导的程序是没有代码读保护机制的。

1.6 用户有效代码

地址0X0000 0014用于存放 验证用户代码有效 的值，该值必须为**剩余中断向量的校验和的2's complement**（此时所有中断向量的校验和是0）。如果验证成功，那么CPU将PC值重设为0X00000000，并将控制权交给用户。

1.6.1 校验和

被校验的所有数据之和，如0X01020304的校验和是0XA.

1.6.2 模与补码

一个一圈12个平均分布点的圆，分别命名为0~11，你站在1上，你想走到6有两种走法：①  1->2->3->4->5->6，即顺时针走5步. ②  1->0->11->10->9->8->7->6，即逆时针走7步；事实上，无论你处于哪一个点，你都有两种方式到达另一个点，并且这两种方式的步数是12。

12就是这个系统的模，+5和-7的结果是一致的，于是+5和-7互为补数，+5称为-7的12的补数，-7称为+5的12的补数，同理+6和-6、+4和-8、+3和-9、+2和-10、+1和-11都是互为补数，可见在这个系统中可以使用加法来替代减法，即只需将负数换成其补数即可。


补码在计算机中的存在，是为了解决**有符号数**减法运算的问题，目的是将减法换算成加法，这样就可以将负数和正数统一使用加法运算器来运算，负数的原码向补码的转化是编译器来完成的。


2's complement "2的补码”，实际上这种翻译容易被误导，2's complement 应该被视为一种运算方式，就是经常说的“取反+1”。

1.6.3 LPC2214的中断向量

1.6.3.1 统一地址分配 

LPC2214是冯诺依曼结构，采用统一地址映射，其PC寄存器是32bit，因此可以寻址 0~4G-1，FLASH、SRAM、外部存储器和AHB、VPB总线连接的设备都映射到 0~4G-1 的空间内。FLASH + SRAM + 片内存储区保留区共占2G空间（0~2G-1，包含中断向量空间）。

1.6.3.2 中断向量映射

LPC2214异常(中断)向量如1.2节所示，共占32Byte空间，并占用额外的32Byte空间（即32+32，0x00000000~0x0000001F是中断向量所占32Byte空间，0x00000020~0x0000003F是中断向量利用的额外空间），中断向量区存放于FLASH空间的起始地址的64Byte字节：0X00000000~0X0000003F。

为了不同存储器映射模式下对中断向量的利用，实际中断向量的子程序由实际的中断向量映射来实现

存储器映射模式由寄存器MEMMAP（存储器映射控制寄存器）的1:0位来控制，当=0X00时（复位默认）进入BOOTLOADER模式，此时BOOTBLOCK中的中断向量子程序将与中断向量地址挂接，以便于BOOTLOADER运行时使用其中断，当=0X01时（由BOOTLOADER自动切换）进入内部FLASH模式，因为中断向量就是存在于内部FLASH，就是不用映射，贮存于该区域的用户中断向量被挂接，当=0X10时（由用户程序切换，当需要时）进入内部SRAM模式，SRAM底部64Byte的中断向量挂接到中断向量地址。当=0X11时（复位时由引脚BOOT1:0的电平决定，即从外部启动时 BOOTLOADER完成后自动切换到该模式）进入用户外部模式，外部存储器底部64Byte挂接到中断向量地址。

也就是说，FLASH底部的64Byte可以被不同模式下的中断向量子程序覆盖使用，不同模式下执行不同的中断向量子程序，来达到不同的目的。

1.6.3.3 剩余中断向量的校验和的2'S complement

剩余中断向量，是指1.2中除了Reserved的以外的7个异常中断向量，剩余中断向量的校验和是指**异常中断向量所挂接/分配的子程序入口值的校验和**，也就是0X00000000~0X0000001C装入的（除Reserved向量）7个32bit值的校验和。

每个32bit值都是下载到FLASH后，自定义分配的对应的子程序入口地址。

这些子程序入口地址，（Reserver处可以先临时随便分配一个）需要通过反汇编来具体查看（如objdump生成的.lss文件），然后手动算出校验和的补码，最后在分配子程序入口地址时，再分配这个值。

1.6.3.4 Q&A

Q : 既然要验证用户代码有效之后才能将控制权移交给用户，那用户的程序岂不是永远没有机会将合适的数值写入验证区了？

A : LPC2214要求：所有剩余中断向量校验和的2's complement等于校验值，换句话说就是所有的中断向量地址所包含的值的和加起来是0，所以下载完程序之后、CPU移交控制权之后FLASH底64Byte完全都是0，校验和自然就是0，用户代码当然有效，除非上次有程序且所有校验和不是0，且当前烧录时又没有擦除FLASH，那就永远都不会执行用户代码了。


2. **CPU INIT[用户控制权期]**

CPU控制权期结束后，将PC赋值为0X00000000，即从统一内存映射区的起始段开始执行，而0X00000000~0X0000001C刚好是异常中断向量的入口地址，这些异常中断向量不像普通的中断向量那样拥有开关选项，而是出现异常后CPU强制跳转到这些地址，所以要做两件事：① 为每个异常中断向量分配好出现异常时要执行的子程序地址,并计算和写入用户有效代码判定值 ② 必要的初始化操作



3. **BOARD INIT[用户控制权期]**

4. main


































ARM不同模式的发生情况：
	
	CPU执行无效指令，进入Undefined模式
	CPU执行指令异常，进入Abort模式
	当有中断发生时， 进入IRQ或FIQ模式


	系统模式，权限最高模式，仅由软件配置进入该模式
















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

预取址异常和数据终止异常：

是指LPC2214统一映射的地址中有些是预留的，有些是未分配的，当程序访问到这些地址时(取址或数据访问)，将产生异常，跳转到0x0000 000C或0x0000 0010

----------------------------------------------

-----


通讯技术


CATALOG

一. 串行通信基础	1
1. 异步串行通信	1
2. 同步串行通信	1
3. 主从串行通信	2
二. 串行通信线路	2
1. 单工通信	2
2. 半双工通信	2
3. 全双工通信	3
三. 串行通信协议	3
1. UART	3
(1) UART组成	4
(2) RS232	4
(3) RS422	5
(4) RS485	6
2. SPI	6
3. IIC	7
//TBD	7
附录A：奇偶校验（Parity check）	8
附录B：波特率与比特率	9
附录C：握手（流控）	10
附录D：RS232接口标准	11
附录E：UART转RS232（DB9）	12
附录F：UART转RS422	13
附录G：共模抑制	14


一.串行通信基础
计算机的数据传输有并行和串行两种方式，并行传输的特点是每个数据位都使用独立的数据线同步传输，传输速度快、效率高，缺点是长距离传输成本高且存在电磁干扰，因此常用于短距离的计算机内部数据传输。
串行数据传输的特点是所有数据位都通过一根数据线传输，速度相对较慢，但传输距离远（几十米到上千米）、成本低，是网络通信、处理器与外设通信的主要方式。串行通信按时序分为同步和异步两种方式，按控制规则分为一主多从和多主多从两种方式。

并行接口一定都是同步的，因为为了高速，不会向异步传输那样增加很多校验位，同时 显然 就必须增加一根时钟线，传输的高速特性也同时限制了传输长度

1.异步串行通信
异步串行通信是以数据帧为单位的间歇传输形式，通过插入标志位来实现数据收发双方的协调。数据帧中包含起始位、数据位、奇偶校验位和停止位。起始位（1位）用于标志传输开始、数据位为5~9位、奇偶校验位用于数据有效性检查（见附录A）、停止位（1/1.5/2位）用于标志数据传输已结束。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/asyn_serail_comm.png)

上图方框部分表示该数据位可能是高电平“1”，也可能是低电平“0”，每一位都有固定的时间宽度，称为位时间。“MARK”表示空闲时高电平，SPACE表示有效电平，这两个术语可以追溯到二十世纪六十年代。
异步串行通信可以是连续的：上一帧的停止位之后立即发送下一帧的起始位；也可以是断续的，新的数据帧可以在任何时刻开始，并不要求整数倍的位时间。
2.同步串行通信
同步串行通信将传输数据按相等的时间间隔划分成数据帧进行传输，并同时发出同步信号以保证收发同步，每个数据帧的开始用同步字符来标志。
同步串行通信要求收发双方的时钟信号（频率、相位等）必须始终同步，且每个数据帧之间不能有间隔，如果线路空闲或没有数据传输，则需发送同步字符串。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/syn_serail_comm.png)
同步串行通信的特点是传输效率高，其数据帧大小几乎不受限制（可达几十到几千字节），但因对时钟同步的要求导致硬件实现成本较高，所以同步串行通信一般用于数据量大、对速度要求较高的串行通信场景。

同步串行通信就是在异步串行通信的基础上加了一条时钟线， 其实这就是SPI总线

3.主从串行通信
在主从通信系统中至少有一个为主机，并允许有多个主机和多个从机。主机负责发送时钟和仲裁（如片选、广播）信号，从机通过总线仲裁来判定是否与主机通信。
二.串行通信线路
串行通信线路包括单工通信、半双工通信和全双工通信，同步和异步串行通信都可以使用这几种形式：
1.单工通信
单工（Simplex）形式使用一根数据线进行数据的单向传输，通信双方固定一端为发送端，另一端为接收端。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单工通信.png)

例如，计算机与打印机之间的串行通信就是单工形式，只能有计算机向打印机传输数据，而不能有反向数据。
2.半双工通信
半双工（Harf-duplex）形式的数据传输是双向的，但任何时刻只能由其中一方发送数据，另一方接收数据。半双工形式既可以使用一根数据线，也可以使用两根数据线。下图为一根数据线示例。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/半双工通信.png)

3.全双工通信
全双工（Full-duplex）形式的数据传输是双向的，可以同时发送和接收数据，因此全双工形式的串行通信需要两条数据线。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/全双工通信.png)

三.串行通信协议
串行通信协议包含对接口电气属性的定义、电路结构及线路连接方式的实现、数据传输性能和传输方式的描述等等，所以也称串行通信协议为串行通信接口或串行通信总线。
在现代MCU内部，基本都集成了一个或多个（相同和不同的）串行通信总线，通过配置寄存器即可实现协议所定义的功能。
1.UART
UART（Universal Asynchronous Reciver/Transmitter），通用异步接收器/发送器，也称异步通信接口适配器（ACIA）。UART是最简单的串行通信实现方式。UART出现在电子通信早期，当时是一个由齿轮、继电器和电动机械寄存器组成的机械设备。
一般MCU都集成USART（通用同步和异步接收器/发送器），它可以实现UART和USRT（通用同步接收器/发送器）功能，但在单片机的串行通信中，最常用的是异步方式，因此常把USART写为UART。
异步模式的UART不分主从机，在发送数据的同时可以接收数据。如果在同步模式下，则当使用外部时钟时，UART处于从机地位，当使用内部时钟时，UART处于主机地位。
(1)UART组成
UART由发送缓冲寄存器、接收缓冲寄存器和输入移位寄存器组成，发送缓冲寄存器的本质是一个移位寄存器，它将计算机内的并行数据转换为串行数据，并按配置插入标志位形成数据帧，然后通过Tx接口输出。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/uart.png)
接收缓冲寄存器和输入移位寄存器组成双缓冲结构，以避免在数据接收过程中出现数据帧重叠错误。输入移位寄存器将Rx接口输入的串行数据过滤，并转换成并行数据，然后存入接收缓冲寄存器，计算机通过读取接收缓冲寄存器来获得数据。
(2)RS232
RS-232C（简称RS232）是古老的串行通信接口标准，可追溯到20世纪60年代，现在正逐渐被高速网络取代，但它对嵌入式系统来说仍然是一种非常重要、简单而有用的连接工具。RS232通信距离可达25米，传输速度可达38.4kbps。
RS232最开始被用来连接数据终端设备（DTE）和数据通信设备（DCE），因此RS232协议标准默认其一端连接的是DTE，另一端连接的是DCE。在计算机出现之前，DTE是一种电传打字机，DCE是一种调制解调器：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/DTE-DTE.png)

当计算机出现以后，刚开始没有更多的可靠通信接口可选用，于是RS232被应用到计算机当中（计算机既可以作为DTE设备也可以作为DCE设备），并一直沿用到现在。RS232使用DB9（D型9引脚接口）或DB25（D型25引脚接口）作为连接接口，其标准定义参看附录D。
如果单片机与计算机通信则必须将单片机看成DTE或DCE设备，此时需要将单片机UART接口改装成DB9或DB25，然后使用RS232与计算机进行通信。需要注意的是单片机使用的TTL电平与RS232电平不一致，需要进行电平转换（参看附录E）：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单片机-主机通讯.png)

当使用UART在两个单片机之间通信时只需对接Tx和Rx接口即可：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单片机与单片机通讯.png)

(3)RS422
RS232传输的数据位的电压电平是相对于本地的地，这种不平衡的传输方式有很差抗噪性。RS422使用双绞线传输数据（见附录G），传输距离可达1200m，双绞线电压差在4V~12V之间，该电压差值范围刚好在RS232逻辑电平范围之内，如果将RS422双绞线中负电压一端接地，则可实现与RS232兼容。（RS422与UART的连接参看附录F）。
注意，RS422只规定了标准电压，而没有像RS232一样规定插脚引线等实现细节，所以RS422的具体实现是未定义的，它可以按照实现者的想法自由连接。
(4)RS485
有些RS422的接口芯片具有三态功能，当RS422使用这种芯片实现时就扩展成为RS485。RS485可以实现高效率、低成本的一主多从式多机通信，并支持许多通信协议。它是最简单和最容易实现的网络之一。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/rs485.png)
如图，主机和从机之间使用一根双绞线进行通信，所有事务都有主机来初始化，从机只有在接收到特定命令后才进行传输。
2.SPI
SPI（Serial Peripheral Interface）串行外围设备接口，是由Motorola公司开发的同步、全双工、一主多从式串行通信总线，常用于微控制器与其外围设备的连接。
(1)SPI组成
SPI有4根信号线：MOSI/SI/SDI（Master Out Slave In）、MISO/SO（Master In Slave Out）、SCLK/SCK、SS/CS。大多数处理器的SPI模块带有片选接口，如果需连接多个从机，则需要使用GPIO。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/SPI_GPIO.png)
SPI主机和从机都包含一个（8bit）串行移位寄存器，主机通过写寄存器来通过MOSI信号线发起一次传输，从机同步的将寄存器中的数据通过MISO信号线返回。如果主机仅进行写操作，则忽略收到的字节（数据）即可，如果主机要读取从机一个字节，就必须发送一个空字节来引发从机的传输。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/SPI_MOSI.png)
如果主机发送连续的数据流时，有些外设（如存储器）可以进行多字节传输，在这种传输模式下，从机必须在整个传输过程中保持低电平。
(2)SPI时序
根据时钟极性和时钟相位的不同，SPI有四个工作模式以适配不同外设的时序和数据处理需求。时钟极性（CPOL）表示时钟空闲时的状态，时钟相位（CPHA）表示数据采样时的有效性。
当时钟相位为0、时钟极性为低电平时，MISO和MOSI在SCK的上升沿有效。
当时钟相位为0、时钟极性为高电平时，MISO和MOSI在SCK的下降沿有效。
当时钟相位为1、时钟极性为低电平时，MISO和MOSI在SCK的下降沿有效。
当时钟相位为1、时钟极性为高电平时，MISO和MOSI在SCK的上升沿有效。
(3)SPI速度
官方标准没有规定SPI的传输速率，目前已知器件可达Mbps水平。
3.IIC
IIC（Inter Integrated Circuit Bus，I2C、I2C、TWI）总线是飞利浦公司（Pilips）开发的同步、半双工、多主多从式串行通信总线，常用于微控制器与其外围设备的连接。
(1)IIC组成
IIC只有2根信号线：SDA串行数据线和SCL串行时钟线；两根线接上拉电阻或正极电源，挂载到IIC总线的（N个）设备通过寻址识别，每个器件都可作为主/从设备，但任何时刻只能有一个主控设备。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC.png)
(2)IIC速度
IIC标准规定标准速度为100Kbps、快速400Kbps、高速3.4Mbps。

TBD...
2.总线协议
IIC总线有三种信号和两种状态：开始信号、应答信号、停止信号、总线空闲、总线忙碌
附：SDA、SCL默认置高电平状态
开始信号：SCL保持高电平，SDA出现下降沿，表示数据开始传输
应答信号：接收设备收到8bit数据之后，发送一个ACK位给发送设备，且每			   8bit数据之后必须有一个应答位
停止信号：SCL保持高电平，SDA出现上升沿，表示数据停止传输
总线空闲：SCL和SDA都处于高电平状态
总线忙碌：开始信号之后，停止信号之前

3.传输格式
IIC总线的传输格式为主从式：主发送从接收、从发送主接收
·主发送从接收模式
主设备开始信号之后，发送第一个字节为控制字节（从到地址到低地址 = 7位地址寻址位 + 1位方向位，方向位决定主设备是从从设备读数据还是向从设备写数据，为0时表示写、1时表示读），接下来发送数据，该数据可以是一个或N个字节，从设备每接到1个字节都要返回一个应答信号（ACK = 0），主设备在应答时钟周期为高电平时释放SDA，转由从设备控制（发送应答信号），从设备在这个时钟周期的高电平期间必须拉低SDA，并使之为稳定低电平，以作为有效的应答信号

·从发送主接收模式
仍然从主设备开始信号，主设备向IIC总线发送控制字节（“广播”），从设备进行地址位比对，之后检查控制字节的第8位是1/0，当为1时，表示主控设备要读数据，此时从设备先发送一个应答信号（ACK = 0）给主设备，接着发送数据到主设备，同样的主设备收到一个字节（8bit）后，也要发送一个应答信号给从设备，不同的是如果这个ACK = 0（有效应答信号）那么从设备继续发送数据，如果ACK = 1（停止应答信号）则从设备停止发送数据。主设备也可以控制从设备从什么地址开始发送数据（默认从设备从主设备发送过来的控制字节地址发送数据），发送多少字节

4. 基本操作
IIC总线是主/从双向通信，主设备和从设备都可以发送和接收，但总线必须由主设备控制，主设备产生串行时钟SCL，并产生开始和停止条件，在开始条件之后SDA线上的数据状态仅在SCL为低电平期间内才能改变，在SCL高电平期间SDA上的数据改变用来表示开始和停止条件

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC.png)


·控制字节
在开始条件之后，第一个字节必须是控制字节，其中高4位是器件类型标识符（不同器件有不同的意义：如EEPROM为1010），接着3位为片选（这意味着同一器件不能超过8个），最低位为读写控制为，即1 - 读/0 - 写 

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC2.png)

5.总线仲裁
wating...
6.IO模拟
如果单片机带有IIC总线接口（高级单片机一般都带有若干个），则直接挂载设备即可，如果没有，则可以使用普通IO口模拟
·硬件上
硬件上只需两个GPIO引脚，一个作为串行时钟线SCL，一个作为串行数据线SDA，并且都挂接到上拉电阻或正极电源
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC3.png)

·软件上
软件上要严格模拟IIC总线数据传输规则，示例：
子程序如下：
ORG  1000H	
BSEND: MOV  R2, #08H	; 1字节8位
SENDA: CLR  P3.2		; SCL置低
RLC  A			; 左移一位
MOV  P3.3, C		; 写一位
SETB  P3.2		; SCL置高
DJNZ  R2, SENDA	; 写完8个字节？
CLR  P3.2		; 应答信号
SETB  P3.3		; SDA置高
SETB  P3.2		; SCL置低
RET	
END	

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/iic程序逻辑.png)


附：MSB与LSB
MSB：Most Significant Bit，最高有效位，在时序图中表示高字节先发送或表示最高位，在二进制数中表示最高加权位，位于数据位最左侧
LSB： Least Significant Bit，最低有效位，在时序图中表示低字节先发送或表示最低位，在二进制数中表示最低加权位，位于数据位最右侧




附录A：奇偶校验（Parity check）

奇偶校验是验证数据传输有效性的简单验证方式。一串二进制数据帧，其中“1”的个数只有两种可能：奇数或偶数。
奇校验（ODD CHECK），就是将该数据帧添加一位“0”或“1”，使得新的数据帧中“1”的个数为奇数，新添加的二进制位就是校验位，接收方收到数据后，再次对原数据帧进行奇校验，对比添加的校验位是否一致，如果一致就说明数据完好。
偶校验（EVEN CHECK），就是将该数据帧添加一位“0”或“1”，使得新的数据帧中“1”的个数为偶数，新添加的二进制位就是校验位，接收方收到数据后，再次对原数据进行偶校验，对比添加的校验位是否一致，如果一致就说明数据完好。

奇偶校验，是轻量级数据校验方式，它只适用于数据受干扰较小的情景，如果数据受干扰较大，则二进制数据帧有可能有偶数个数据位变化，导致最后校验结果无误，但实际数据已经损坏。



附录B：波特率与比特率

比特率是指每秒钟传输或处理比特（bit）或位的数量，单位为“bps或bit/s（Bit Per Second）”，常用于计算机通信领域。比特率的单位是千进制：1Kbit/s = 1000bit/s、1Mbit/s = 1000Kbit/s、1Gbit/s = 1000Mbit/s。
每秒1次的信号变化为1波特（baud），原用于表示电信设备传输速率，现用于调制解调器的数据传输速率。波特率是指每秒钟传输符号的数量，单位是波特。通过不同的信号调制方式，可以在一个符号上负载多个比特信息，当调试方式是二进制调制时，波特率与比特率的值一致，单位可使用“bps”等。



附录C：握手（流控）

当两个系统进行串行通信时，在接收者处理完接收数据之前，必须禁止发送者发送新的数据，这个过程称为握手（shake hands）或流控（flow control），握手有三种方式：软件方式、硬件方式、不握手。
不握手是最简单的方式，用于发送系统在准备和发送数据上都比接收系统慢得多的场合，比如1MHz的低速单片机发送给1GHz的高速单片机，或者手工向计算机输入数据。注意，当接收端使用高速处理器，但使用了实时反映能力较弱的操作系统，则也有可能需要握手。
硬件握手方式在不同的硬件中有不同的实现方式，以RS232为例，它使用两个信号：RTS（请求发送）和CTS（清除发送），当发送者希望发送数据时就置RTS有效，高速接收者有数据等待发送，而当接收者准备就绪时就将CTS置为有效，来通知发送者可以发送数据。
软件握手用于无法实现硬件握手的场景。软件握手用两个字符来实现流控，一个代表请求对方暂停传输、另一个代表清除暂停传输的请求，继续传输数据。通常这个两个字符是Ctrl-S（0X13）和Ctrl-Q（0X11）。



附录D：RS232接口（母口）标准

信号	功能	DB25	DB9	方向
Tx	发送数据	2	2	DTE-DCE
Rx	接收数据	3	3	DTE-DCE
RTS	请求发送	4	7	DTE-DCE
CTS	清除发送	5	8	DTE-DCE
DTR	数据终端就绪	20	4	DTE-DCE
DSR	数据设备就绪	6	6	DTE-DCE
DCD	数据载波检测	8	1	DTE-DCE
RI	振铃指示器	22	1	DTE-DCE
FG	侦测地（机壳）	1	-	共用
SG	信号地	7	5	共用

注：① DB25和DB9接口呈“D”型，它们又被称为COM口；② 这些信号中许多都是用来对调试解调器进行控制器的，如果要在一台计算机和一个终端之间建立一个很简单的链接，仅需Tx和Rx信号就够了。另外，许多系统都将FG和SG连接到一起。



附录E：UART转RS232（DB9）

TTL逻辑高电平为：输出 - >2.4V，输入 - >2.0V；逻辑低电平为：输出 - <0.8V，输入 - <1.2V。RS232逻辑高电平为：-5V ~ -15V（通常为-12V），逻辑地电平为 +5V ~ +15V（通常为+12V）。TTL向RS232转换可以使用MAX232芯片。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS232.png)

MAX232支持两个输入输出端口：T1IN、T2IN、T1OUT、T2OUT、R1IN、R2IN、R1OUT、R2OUT；通过附录D可知，DB9第2和3针为Rx、Tx，第5针为SG信号地（必要）：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS232-2.png)

注：① DB9有公头和母头之分，它们的引脚顺序定义不同，且母头的第一引脚在右上角（倒梯形时），其它引脚依次向左排列；② 没有用到的接口，可以用作嵌入式系统的电源线；③ 与PC通信时，波特率不宜设置太高，以免有乱码出现。



附录F：UART转RS422

MAX3488是一款用于RS422电平转换的芯片，同RS232一样，其Tx和Rx接口可直接与UART相连：

上图中Rt是一个终止电阻，用来消除信号反射，信号反射发生在远距离传输过程中，并且是远距离传输所必须的。Rt的标准阻值是100~120Ω。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS422.png)


附录G：共模抑制

用两根线之间的电压差来代表逻辑电平，这两根线称为双绞线或差分对（different pair），两个信号振幅相等、相位相反，当出现噪声时，双绞线同时受到干扰，于是两根线之间的电压差几乎没有变化，这种现象又称为共模抑制。

---------------------

# Modbus (OSI7/OSI2)
---
##  1. 简介
&ensp;&ensp;&ensp;&ensp;Modbus是由Modicon（施耐德）公司于1979年开发、用于PLC通信的一主（客户端）多从（服务器）式通信协议，在工业环境中应用广泛，现已成为事实上的业界标准。实现方式有：TCP/IP、串行通信（EIA/TIA-232-E, EIA-422,EIA/TIA-485-A等）和高速令牌网络Modbus PLUS。  
![ISO stack]()  
&ensp;&ensp;&ensp;&ensp;Modbus使用**功能码**来指定请求内容/应答结果，
##  2. Modbus over serial line
### 2.1 Master/Slaves protocol principle
Only **one master** (at the same time) and **1 to 247 slaves** nodes are connected to the bus. Slave nodes will always waiting for the master initiated a request and then response, slaves nodes can't comm with each other. The master initiated only one MODBUS comm at the same time.

The master initiated a request in two modes - **Unicast** and **Brodcast** :

- Unicast &ensp; &ensp; : the master addresses an individual slave, after receiving and processing the request, the slave returns a messate to the master
- Broadcast&ensp;: the master addresses all slaves  and no response from slaves
 
### 2.2 Address rules

**0** for broadcast, 1~247 for indeividual slaves and **248~255** are reserved.
The address must be unique at the same Modbus serial line, and the master has no specific address

### 2.3 Frame description

Protocol Data Unit &nbsp;&nbsp;&nbsp;&nbsp;(**PDU**)  &nbsp;  = &ensp;Function code + Data  
Application Data Unit (**ADU**) &ensp;= &ensp;Slave Address + Function Code + Data + CRC/LRC

- <u>*Slave Address*</u> : For master to address a slave, for slave to indicate who it is
- <u>*Function Code*</u>: For master to indicate what kind of action to perform, a slave set the same code when comm normally and set the code + 0X80 when exception occured
- <u>*Data*</u> : The field can be empty or set request/response parameters of function code
- <u>*CRC/LRC*</u> : Error checking field of ADU (exclude CRC/LRC)

### 2.4 Two transmission modes
**RTU**(Remote Terminal Unit) mode (default and must be inplemented) and **ASCII** mode (optional) 
#### 2.4.1 RTU transmission mode

The format(11bits) for each byte in RTU mode:  
**Coding system**&ensp;: 8-bit binary  
**Bits per Byte**&ensp;&ensp;&ensp;: 1 start bit,  8 data bits **(LSBit sent first)**, 1 bit for parity (Even is default), 1 stop bit (if no parity is selected, 2 stop bit is needed)
  
<u>Frame ADU (256Byte<sub>max</sub>) = 1 Byte Slave Address + 1 Byte Function Code + 0~252 Bytes Data + 2 Bytes CRC</u>

##### 2.4.1.1 RTU message framing

- External of frame : There is no obvious frame boundary in RTU mode, so timing is required. Message frames are separeted by a silent interval of <u>at least</u> 3.5 character times (**t3.5**).   
- Internal of frame&ensp;: The entire message frame must be transmitted as a continuous stream of characters, if a silent interval of more than 1.5 character times (**t1.5**) occurs between two characters, the message frame is declared incomplete and should be discarded by the receiver.

*Remark:*  
t1.5 and t3.5 implement will cause a heavy CPU load when high comm baud rates is used, so when baud rates <= 19200Bps these two times must be strictly respected, when baud rates > 19200Bps **750us** and **1.75ms** is used for t1.5 and t3.5

##### 2.4.1.2 <font color=red>Communication logic</font>

- Device (master/slave) power on and start t3.5 loop to receive incomplete frame until expired then turns to IDLE state, frame receive or emit will be performed (only) from IDLE state.  
- If demand of **emission** is command, t3.5 loop is started until expired then turns to IDLE state
- If demand of **reception** is command, t1.5 and t3.5 loop is started when the first character received 
	- until t1.5 expired, frame will be checked (CRC, Parity and Slave addr) meanwhile, then the flag will be set (OK or NOK) 
	- until t3.5 expired, frame will be deleted if it's NOK or will be processed if OK

**Note**  : t1.5 or t3.5 loop means that t<sub>n</sub> will be init by each character until time-out

##### 2.4.1.3 CRC Checking

The CRC field checks the entire message (ADU exclude CRC and except parity bits), CRC filed conttains 2 Byte values and low order byte is sent first

#### 2.4.2 ASCII transmission mode
#### TBD


















# 1 加密狗

## 1.1 Introduction

加密狗又称加密锁，是用于软件加密的、软硬件结合的加密产品。其内置非易失性存储器或嵌入式系统，用于与上位机软件交互通讯以实现防止软件被非法使用的加密目的。含并口（早期）和USB接口样式。

## 1.2 分类

早期加密狗以并口和并口接口卡形式出现，现代加密狗多为USB接口，外形似U盘：

![DongleType](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/DongleType.png) <br> <center> <font color=gray> Dongle type </font> </center> <br>

市场上以序列号认证使用软件的方式也是软件加密的一种形式，但通常不称为加密狗。
	 
## 1.3 原理

上位机运行的软件必须与加密狗通讯才能正常运行，其本质就是通过各种手段来实现软硬件安全交互通讯和捆绑运行。

![DongleWork](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/DongleWork.png) <br> <center> <font color=gray> Dongle runing </font> </center> <br>

生产加密狗的厂商对加密狗进行硬件设计和算法编程，软硬件的质量决定了加密狗的价格。软件厂商对加密狗设置算法因子，以使得每一个软件厂商的加密狗对外都是安全的。常见的加密狗算法有AES、ECC、RSA、DES、3DES等。

## 1.4 设计DIY

### 1.4.1 硬件设计
最简单的加密狗内部至少需要一个非易失性存储器，通过向其写入固件，在上位机软件运行时不断读取该固件来实现简易的加密。

![DongleDIY](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/DongleDIY.png) <br> <center> <font color=gray> Dongle DIY </font> </center> <br>

为增强安全系数，现代加密狗内部都是由处理器、存储器等组成的嵌入式系统。AVR单片机的智峰USB_ISP烧录器内置AVR_ATMEGA8处理器，是一个比较稳定的电路结构，其外形和加密狗相似，通过对该烧录器进行固件改造即可成为加密狗。

### 1.4.2 软件设计

//TBD

## 1.5 品牌排行榜 

品牌		| 公司						| 接口		| 算法
:-:			| :-:						| :-:		| :-:
圣天狗		| 赛孚耐/SafeNet（美）		| USB、并口	| AES/ECC/DES
Hasp HL		| 阿拉丁/Aladdin（以色列）	| USB		| AES/RSA
深思洛克	| 北京深思洛克				| USB		| RSA/3DES
飞天诚信	| 北京飞天诚信				| USB		| RSA/3DES











---------------


HTTP 之TCP/IP 拆包与粘包


在网络中的信息经常会被拆分路由，分片传送到接收端，特别是对于大文件传输。

于是在接收端一次调用recv往往不能接收到完整的数据


所以，一个循环的recv接收必须使用

char buf[10000];
char \*p = buff;
while ( true)
{
	int recvBytes = recv(fd, p, sizeof(buff), 0);

	p += recvBytes; //将包粘接
}


但是这里存在一个问题：如何知道对方发送结束？？？

recv表现的行为是：返回值-1是错误，返回值0是对方关闭，返回值大于0是接收的数量，且默认是阻塞的，所以如果对方不关闭且我方不出错，
那么将一直阻塞下去，不会退出循环。


有一个好的解决办法就是预先知道对方一共要发多少，那么通过循环接收累计接收的字节数，接收到了就不循环了-退出


char buf[10000];
char \*p = buff;
int size = 0;
while ( true)
{
	int recvBytes = recv(fd, p, sizeof(buff), 0);

	size += recvBytes;

	if ( size >= 1234) //双方约定的本次发送的字节数
	{
		break;
	}

	p += recvBytes; //将包粘接
}


那么如何确定双方约定的发送字节数呢？

HTTP头部信息有一个content_length，这个表示整个HTTP信息中body 的信息（即不包含line和所有header）

一般情况下，HTTP头部信息很小，所以不会被分包，所以先收头部信息，再将剩余的收完

如果担心HTTP头部也会被拆包，那么就一个一个字符读，一直读到\r\n\r\n，那么头部就读完了，然后将其content-length取出，循环读取剩下的信息即可


char buf[10000];
char \*p = buff;
char c;
while ( true)
{
	int cnt = 0;
	while (true)
	{
		if ( 1 == recv(fd, &c, 1, 0))
		{
			*p = c; p++; //无论如何都要将读到的存储到buff

			switch ( cnt )
			{
				case 0:
					if ( '\r' == c)
					{
						cnt++;
					}
					break;
				case 1:
					if ( '\n' == c)
					{
						cnt++;
					}
					break;
				case 2:
					if ( '\r' == c)
					{
						cnt++;
					}
					else
					{ 
						cnt = 0;
					}
					break;
				case 3:
					if ( '\n' == c)
					{
						cnt++;
					}
					break;

			}

			if ( 4 == cnt ) break;
		}
	}

	//略：解析buffer, 拿到content-length

	while (true){
		int recvBytes = recv(fd, p, sizeof(buff), 0);
		p += recvBytes; //将包粘接
		if ( recvBytes == length)
		{
			break;
		}
	}
}

特别要注意的是，在客户端和服务器都是在本地的话，数据包是不经过路由的，所以会看到可以一次性接收大文件，所以测试还是要将服务器和客户端放在不用的网络中（可以是局域网）

-----------------

关于MOdbus-RS485通讯时序问题：
关于Modbus-RS485的时序问题：使用RS232和全双工RS485时不存在额外的时序问题，但使用单双工的RS485时可能存在时序问题：既然是单双工，就存在信号方向切换动作，不同的RS485芯片（或芯片组）切换速度不同，主要问题就是这里引起的：假设主机RS485芯片每次切换信号方向时长为T1、从机RS485芯片每次切换信号方向时长为T2，则主从通信时主机发送消息后等待接收（设超时为T3），如果从机处理时长T4+T2<T1，那么主机一定收不到完整的数据，如果T4+T2>T3，那么主机就按超时处理：所以应 T4+T2>=T1, T4+T2<=T3 ---> T1<=T4+T2<=T3, 即：主机切换时长 <= 从机切换和处理时长 <= 主机超时时长，也即：主机切换要尽量的快且超时设置要合理延长
