
#uboot简介
uboot是GNU开源、嵌入式领域的Bootloader，用于初始化硬件和加载内核（加载模式），并提供基础命令行环境以调试硬件和下载程序（开发模式）。
官网：http://www.denx.de；（下载）ftp://ftp.denx.de/pub/u-boot/。
#uboot分析
1.版本分析
uboot分为官网版本、Soc厂商版本和第三方版本。
官网uboot每年约2~3个月发布一个版本，到2017年为止大约有70个版本，可分为三个阶段：初阶段版本-2010.6（不含）之前的版本，中阶段版本-2010.6~2014.10（不含）之间的版本，现阶段版本-2014.10以后的版本。各版本间主要有以下变化：
版本号变化：2008年8月以前的版本按版本号命名，其后按年份命名
目录树变化：第一次从u-boot-1.3.2版本增加了“api”目录，第二次从2010.6版 本合并了“cpu”与“lib_xxx”目录到“arch”目录，并分离出通用的“lib”目录。
配置的变化：从2014.10版本开始支持图形界面配置“$make menuconfig”

![corePCB](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/CorePCB.png)
Soc厂商uboot从官网uboot移植以支持其Soc和核心PCB，第三方一般是PCB底板厂商，其uboot从Soc厂商移植以支持其底板PCB。
2.目录分析
u-boot-2019.07版本uboot有1630个目录、21757个文件，其主要目录结构及含义如下：
附：参考目录树，u-boot-2019.07版本示例

├── api							Machine/arch independent API for external apps		[用于外部应用程序的独立于机器/架构的API]
├── arch						Architecture specific files
├── board						Board dependent files
├── cmd							U-Boot commands functions
├── common						Miscellaneous architecture independent functions	[混杂的独立于体系结构的功能]
├── configs						Board default configuration files
├── disk						Code for disk drive partition handling
├── doc
├── Documentation
├── drivers						Commonly used device drivers
├── dts							Contains Makefile for building internal U-Boot fdt	[flatted device tree - 设备扁平树]
├── env		
├── examples
├── fs							Filesystem code (cramfs, ext2, jffs2, etc.)
	├── include						Header Files
	├── lib							Library routines generic to all architectures		[所有体系结构通用的库例程]
	├── Licenses
	├── net							Networking code
	├── post						Power On Self Test
	├── scripts						Various build scripts and Makefiles
	├── test
	└── tools						Tools to build S-Record or U-Boot images, etc

3.编译原理
uboot编译依赖于Makefile技术。在u-boot-2014.10版本之前，编译主要依赖顶层目录的“Makefile”、“config.mk”及各子孙目录的“Makefile”文件。在u-boot-2014.10版本之后，增加了图形界面，其编译除依赖上述文件外还依赖“Kconfig”文件。
//TBD
#uboot编写
#uboot移植
编译 移植的最终目的是生成“uboot.bin”二进制文件，其
//TBD

附录A：BIOS

BIOS（Basic Input Output System）基本输入输出系统是固化在ROM芯片内、（PC）上电后执行的第一个程序，用于开机自检（POST）、硬件配置等最底层的硬件控制。
通过BIOS可以指定Bootloader启动介质，从而进一步启动操作系统。嵌入式系统中通常使用简单的拨码方式代替BIOS的该项功能。

附录B：BootLoader

Bootloader（启动加载器）是一种引导程序，用于初始化硬件和加载操作系统内核，是计算机上电后执行的第一个或第二个程序（第一个是BIOS）。
Bootloader与硬件相关，因此都集成了很多平台，PC端有适用Linux的Lilo/Grub、适用Windows的NTLDR。嵌入式端有红帽的Redboot、ARM的blob/ARMboot、三星的vivi/Bios-it、GNU的uboot等等。


附录C：uboot（Hush-shell）命令
![cmd](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/uboo-Hush-shell命令.png)



散装知识点
----
固件（firmware）：存储于ROM中的（固定或永久性）程序。
