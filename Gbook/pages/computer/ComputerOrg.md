
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

