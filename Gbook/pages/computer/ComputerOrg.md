
# 1 Endianness

Endianness (alias is byte/bit order) refers to the order of bytes/bits within a binary data of Protocols, CPU, Memory, etc. Include **Big-endianness** and **Little-endianness**. *bytes order* is the ordering of bytes within a multi-byte data and *bits order* within a byte.

https://en.wikipedia.org/wiki/Endianness

## 1.1 Big-endianness 

## 1.2 Little-endianness

# 2 Bit numbering

 表示一串比特数的顺序表示，分为Most Significant Bit和Least Significant Bit，即最高有效位和最低有效位，在通信和存储中，不同的位序表达的数值结果不同，如“M 1010 S”表示数值10，而“S 1010 M”表示数值5，约定位序可使通信双方正确解码数值。
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

PLC VS DCS

PLC早期是以代替继电器目的而生产的 开关量 嵌入式计算机，随着发展，现在已经丰富了很多功能。

DCS是处理模拟量的嵌入式设备.


PLC有三种输出接口：
	1. 晶体管输出-低电压
	2. 晶闸管输出-中电压
	3. 继电器输出-高电压，因为继电器需要双接口接输出，所以设计出一个公共端子
