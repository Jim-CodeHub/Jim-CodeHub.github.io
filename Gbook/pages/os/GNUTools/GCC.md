
组成：
1. command 

	ENTRY, MEMORY, SECTIONS, PHDRS

	SECTIONS {
		secname : { //secname 不是随意的，它一定是跟目标文件相关的格式，比如如果目标文件是a.out，那么secname只能选择.text，.data，.bss，
					这怎么确定呢？到http://www.zap.org.au/elec2041-cdrom/gnutools/doc/gnu-assembler.pdf（gcc汇编）找就可以了

					contents
				  }
	}

	在SECTION中使用的command
		PROVIDE:https://www.cnblogs.com/tureno/articles/3741291.html


2. symbol

	可以独立在command之外，也可以在command之内，类似C语言的变量，只不过没有类型，这类似于脚本语言的变量。










# Using LD - the GNU linker

*Free Software Foundation, ld version 2, last updated : November 07,1998. Copyright(C) 1991~1998 Free Software Foundation.*

## 1 Overview

LD是编译工作的最后一步，利用**BFD库**将目标文件(\*.o)、归档文件(\*.a/\*.so)整合，以**重定位数据(Relocates data)**和**绑定符号引用(Ties up symbol references)**。GNU LD提供[**命令行**](#Command Line)和[**脚本**](#Linker Script)环境来配置运行参数，并提供尽可能多的调试信息。

> **[info] Note**
>
> 整合分配将输入文件的所有相同SECTION集中归纳并重定位SYMBOL在存储器的位置（绑定符号的绝对引用），最终服务于编译器的执行决策。

## <span id = "Command Line"> 2 Command Line </span>

## <span id = "Linker Script"> 3 Linker Script </span>

链接器脚本（*.ld/*.lds）由Command、Symbol和Keyword组成，支持C语言的运算符、符号命名规则、表达式、赋值和注释（/\*...\*/）等，由命令行`-T`选项指定。链接器脚本的部分功能也可通过命令行实现。

### 3.1 Command

Command							| Description											| Remarks
:-:								| :-:													| :-:
[ENTRY](#ENTRY)					| 定义程序入口，即输出文件中要执行的第一条指令			| 可选且唯一
[MEMORY](#MEMORY)				| 定义存储器范围，服务于SECTIONS并提供溢出报错机制		| 可选且唯一
[SECTIONS](#SECTIONS)			| 整合并定位各段										| 必选且唯一
PHDRS							| 自定义ELF头部信息										| 可选且少用
VERSION							| 定义ELF共享库版本信息									| 可选且少用
CONSTRUCTORS					| -														| 可选且少用 			
CONSTRUCTORS					| -														| 可选且少用 			
FLOAT							| -														| 可选且少用 				
NOFLOAT							| -														| 可选且少用 				
FORCE\_COMMON\_ALLOCATION		| -														| 可选且少用 				
INCLUDE *filename*				| 包含其它链接器脚本，在当前目录或`-L`选项指定的目录搜索| 可选且少用 				
INPUT							| -														| 可选且少用 				
GROUP							| -														| 可选且少用 						
OUTPUT							| -														| 可选且少用 						
OUTPUT\_ARCH					| -														| 可选且少用 						
OUTPUT\_FORMAT					| -														| 可选且少用 						
SEARCH\_DIR (*path*)			| 定义归档文件的搜素目录，同`-L`选项					| 可选且少用 						
STARTUP							| -														| 可选且少用 						
TARGET							| -														| 可选且少用 												
NOCROSSREFS						| -														| 可选且少用 						

#### <span id = "ENTRY"> 3.1.1 ENTRY </span>

```
	ENTRY(*symbol*) /**< 这里的symbol来自输入文件，通常是函数名（即入口函数）. */
```

> **[info] Note**
>
> 入口地址优先级为（降序）：命令行`-e`选项、链接脚本`ENTRY(*symbol*)`命令、链接脚本`start`符号、`.text`段的第一个字节的地址、地址0。

#### <span id = "MEMORY"> 3.1.2 MEMORY </span>

```
	MEMORY
	{
		*name [(attr)]* : ORIGIN = *origin*, LENGTH = *len* /**< name自定义，attr可选（内容选自`ALIRWX`），ORIGIN表起始地址。*/
		...
	}
```

链接器默认存储器的所有连续地址都可用，通过`MEMORY`命令可配置存储器实际利用范围，最终通过*name*服务于`SECTIONS`。

#### <span id = "SECTIONS"> 3.1.3 SECTIONS </span>


























### 3.2 Symbol 

符号类似解释语言的弱类型变量，但需直接定义使用，可定义于SECTIONS内外作为全局变量被其它链接器脚本引用。符号由点`.`、字母、下划线、数字和连字符`-`组成，并由点、字母或下划线开头，符号名不能与关键词冲突。




符号赋值表达式同C（支持所有C的赋值运算符，表达式以分号结尾）。

### 3.3 Keyword













## 2 Invocation

### 2.1 Command Line Options

### 2.2 Environment Variables

The behavior of ld can be changed with the environment variables `GNUTARGET` and `LDEMULATION`.

`GNUTARGET` determines the input-file object format if you don't use `-b` (or its synonym `--format`). Its value should be one of the BFD names for an input format (see section BFD). If there is no `GNUTARGET` in the environment, ld uses the natural format of the target. If `GNUTARGET` is set to `default` then BFD attempts to discover the input format by examining binary input files.

`LDEMULATION` determines the default emulation if you don't use the `-m` option. The emulation can affect various aspects of linker behaviour, particularly the default linker script. You can list the available emulations with the `--verbose` or `-V` options. If the `-m` option is not used, and the `LDEMULATION` environment variable is not defined, the default emulation depends upon how the linker was configured

## 3 Command Language

The command language provides explicit control over the link process, describing the mapping between the linker's input files and its output. It controls : input files, file formats, output file layout, address of sections, placement of common blocks.

A command file (also known as a linker script) SHOULD be supplied to linker through the `-T` option.

### 3.1 Linker Scripts

Every meaningful command script must have a `SECTIONS` command, it specifies a "picture" of the output file's layout, in varying degrees of detail. No other command is required in all cases.

The optional command `MEMORY` complements SECTIONS by describing the available memory in the target architecture. if a MEMORY command is not used, ld assumes sufficient memory is available in a contiguous block for all output 

Comments `/* */` can be used as in C/C++ programming language.

### 3.2 Expressions

The syntax for expressions in the command language is identical to that of C expressions, with the features: 

- All expressions evaluated as integers and are of "**long**" or "**unsigned long**" type.
- All constants are integers.
- All of the C arithmetic operators are provided.
- Global variables can be referenced, defined and created.
- Special purpose built-in functions can be called.

#### 3.2.1 Integers

Octol	| Decimal	| Hexadecimal	| Suffixes K&M
:-:		| :-:		| :-:			| :-:	 
010000	| 4096		| 0x1000/0X1000 | 4K 

The table refer to the same quantity.

#### 3.2.2 Symbol Names 

Symbol names start with a letter, underscore or point and may include any letters, underscore, digits, points and hyphens. Unquoted symbol names must not conflict with any keywords.

#### 3.2.3 The Location Counter 

The special linker dot `.` (NOT .xxx) refers to the current output location counter, and MUST always appear in an expression within a SECTIONS command. Assigning a value to the `.` symbol will cause the location counter to be moved, and a holes is created in the output section. The location counter may never be moved backwards.

```
	SECTIONS
	{
		output:
		{
			fileA(.text)
			. =. + 1000	/**< Offset 1000 Bytes.			*/
			fileB(.text)
			. =. + 1000	/**< Offset 1000 Bytes.			*/
			fileC(.text)

		} = 0X1234;		/**< Fill 0x1234 in two gaps.	*/
	}
```

#### 3.2.4 Operators 

The linker recognizes the standard C set of arithmetic operators, with the standard bindings and precedence levels.

#### 3.2.5 Evaluation 

The linker uses "lazy evaluation" for expressions, it only calculates an expression when absolutely necessary. The linker needs the value of the start address, and the lengths of memory regions, in order to do any linking at all, these values are computed as soon as possible when the linker reads in the command file. However, other values (such as symbol values) are not known or needed until after storage allocation. Such values are evaluated later, when other information (such as the sizes of output sections) is available for use in the symbol assignment expression.

#### <span id = "Assignment"> 3.2.6 Assignment: Defining Symbols </span>

#### 3.2.7 Arithmetic Functions

#### 3.2.8 Semicolons

Semicolons `;` must appear at the end of [assignment](#Assignment) expressions and [PHDRS](#PHDRS) statement.

### 3.3 Memory Layout



### 3.4 Specifying Output Sections

#### 3.4.1 Section Definitions

#### 3.4.2 Section Placement 

#### 3.4.3 Section Data Expressions 

#### 3.4.4 Optional Section Attributes 

#### 3.4.5 Overlays 

### 3.5 ELF Program Headers

### 3.6 The Entry Point 

### 3.7 Version Script 

### 3.8 Option Commands 

## 4 Machine Dependent Features

### 4.1 H8/300

### 4.2 Intel 960 family

## 5 BFD































# OLD GNU
https://ftp.gnu.org/old-gnu/Manuals/

# Linke (ld)

https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_mono/ld.html
































---

散装知识点

# 1 EABI 

EABI ： Embedded Application Binary Interface ，嵌入式应用程序二进制接口

任何符合EABI标准的编译器，编译得到的二进制文件是彼此兼容的。

ARM EABI，= AEABI，即是ARM平台下的嵌入式应用程序二进制接口

GNU EABI，或GNU AEABI，其实就是指EABI、AEABI，因为这些编译器都是以GNU编译器为基础制作的

arm-cortex_a9-linux-gnueabi

之所以gnu与eabi连写，是因为有些GNU工具要求编译器的配置名称在三个连字符及以内，所以实际上所有的GNU编译器的命名都是A-B-C，
有些GNU编译器也没有按照此方法命名，有可能出现不兼容的情况


ABI for the ARM architecture是很多规范的合集：

AADWARF      DWARF for the ARM Architecture

AAELF         ELF for the ARM Architecture

AAPCS         Procedure Call Standard for the ARM Architecture

ADDENDA      Addenda to, and errata in, the ABI for the ARM Architecture

BPABI          Base Platform ABI for the ARM Architecture

BSABI          ABI for the ARM Architecture (Base Standard)

CLIBABI        C Library ABI for the ARM Architecture

CPPABI         C++ ABI for the ARM Architecture

EHABI          Exception Handling ABI for the ARM Architecture

EHEGI          Exception handling component specimen implementations

RTABI            Run-time ABI for the ARM Architecture

---

# 2 大多数库，编译支持的选项

./configure --prefix=绝对路径 --host=平台

注意，这里的平台是编译器的前缀，如编译器为arm-cortex_a9-linux-gnueabi-gcc，则平台为arm-cortex_a9-linux-gnueabi


---

# 3 路径的指定

- 头文件路径
	- C++ 头文件路径
		- 命令行     : export CPLUS_INCLUDE_PATH=绝对路径:$(CPLUS_INCLUDE_PATH)；环境变量名还可能为'CPLUSPLUS_INCLUDE_PATH'、'CXX_INCLUDE_PATH'
		- 编译器选项 ：-I绝对路径
	- C 头文件路径
		- 命令行     ：export C_INCLUDE_PATH=绝对路径:$(C_INCLUDE_PATH)；
		- 编译器选项 ：-I绝对路径

- 库路径
	- 动态库路径
		- 命令行     ：export LD_LIBRARY_PATH=绝对路径:$(LD_LIBRARY_PATH)；环境变量名还可能为'LIBRARY_PATH'
		- 编译器选项 ：-L绝对路径 -l库名；库名是去掉lib和.so的库名称
		- 配置文件   ：echo 绝对路径 > /etc/ld.so.conf, 然后执行 ldconfig

	- 静态库路径 
		静态库路径的搜索方式与动态库相同


Tips : 对于动态库的编译器选项 -Wl,rpath=xxx，-Wl选项用于将逗号后面的参数传递给连接器ld，-rpath用于指定运行时动态库的搜索路径，而-L只能用于编译时动态库的搜索路径

## 3.1 调用动态库or静态库？

静态库和动态库的搜索方式是相同的，如果静态库和动态库放在一个目录，那么编译器会调用哪一个呢？

Linux系统下，默认先调用动态库，如果动态库不存在则调用静态库，如果强制使用静态库，可使用编译选项 : -static -l库名

## 3.2 混合链接

静态链接的库 使用-Wl,-dn -L静态库绝对路径 -l静态库名, 动态链接的库使用-Wl,-dy -L动态库绝对路径 -l动态库名：-Wl,-dn -Lxxx -lyyy -Wl,-dy -Lnnn, -lmmm
，其中-dn可以替换为-non_shared、-Bstatic、-static，其中-dy可以替换为-Bdynamic、-call_shared

