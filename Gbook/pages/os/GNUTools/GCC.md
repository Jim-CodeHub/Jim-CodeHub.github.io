
# Using LD - the GNU linker

*Free Software Foundation, ld version 2, last updated : November 07,1998. Copyright(C) 1991~1998 Free Software Foundation.*

## Overview

LD是编译工作的最后一步，利用**BFD库**将目标文件(\*.o)、归档文件(\*.a/\*.so)整合，以**重定位数据(Relocates data)**和**绑定符号引用(Ties up symbol references)**。GNU LD提供**命令行**和**脚本**环境来配置运行参数，并提供尽可能多的调试信息。
































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

