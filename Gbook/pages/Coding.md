
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

