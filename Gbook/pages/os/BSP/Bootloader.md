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













培训内容
---------------

1. 交叉编译、环境变量配置、固定的解压位置、

2. 编译tiny4412的uboot

	1. 配置 : $make tiny4412_config             <----- uboot适合该型号的板子
	2. 编译 ：$make
	3. 生成工具： $ cd sd_fuse && make
	4. 烧录到SD；
		- $dd if=/dev/zero of=/dev/sdb bs=1024 count=1
		- $./sd_fusing.sh  /dev/sdb

3. minicom

	1. 配置 : minicom -s

4. 更改uboot提示

	1. $ vim include/configs/tiny4412.h 

	将255行
	255 #define CONFIG_SYS_PROMPT       "TINY4412 # "
	改为
	255 #define CONFIG_SYS_PROMPT       "DengJin # "

5. 关闭MMU

	1. $vim include/configs/tiny4412.h + 331, 注释#define CONFIG_ENABLE_MMU
	2. 修改基地址 $ vim board/samsung/tiny4412/config.mk , CONFIG_SYS_TEXT_BASE = 0xc3e00000 改为0x43e00000
	从新编译uboot并烧录SD

6. uboot常用命令

md 显示内存的数据

mm 修改内存的数据

coninfo 打印串口设备信息

exit 退出脚本

reset 重新启动uboot

version 打印uboot版本信息


printenv 显示环境变量
setenv  设置环境变量
saveenv 保存环境变量


			1. md 
			
			查看从0x50000000 1 开始的4个字节
			DengJin # md 0x50000000  1
			
			
			查看从0x50000000 1 开始的8个字节
			DengJin # md 0x50000000  2
			
			查看从0x50000000开始的1个字节
			DengJin # md.b 0x50000000 1
			50000000: ff    .
			
			查看指定地址的内容 .w代表以两个字节为单位 1代表多少个单位
			DengJin # md.w 0x50000000 1
			50000000: ffff    ..
			
			
			查看指定地址的内容 .l代表以四个字节为单位 1代表多少个单位
			DengJin # md.l 0x50000000 1
			50000000: ffffffff    ....
			
			
			2. mm
			
			查看帮助信息
				DengJin # help mm
			mm - memory modify (auto-incrementing address)
			
				Usage:
				mm [.b, .w, .l] address
			
				每次以字节为单位修改内存的数据
				DengJin # mm.b 0x50000000
				50000000: ff ? 11
				50000001: ff ? 22
				50000002: ff ? 33
				50000003: ff ? 44
				50000004: ff ? 55
				50000005: ff ? 
				50000006: ff ? q
				DengJin # 
			
			
				每次以两个字节为单位修改内存的数据
				DengJin # mm.w 0x50000000
				50000000: 2211 ? 1111
				50000002: 4433 ? 2222
				50000004: ff55 ? 3333
				50000006: ffff ? 4444
				50000008: ffff ? q
			
				每次以四个字节为单位修改内存的数据
				DengJin # mm.l 0x50000000
				50000000: 22221111 ? 111
				50000004: 44443333 ? 222
				50000008: ffffffff ? 333
				5000000c: ffffffff ? q
			
				将所有的可编程的LED全部灭
				DengJin # md 0x110002e4 1
				110002e4: 0000000c    ....
				DengJin # mm 0x110002e4 
				110002e4: 0000000c ? f
				110002e8: 00005555 ? q
			
			
				将所有的可编程的LED全部亮
				DengJin # mm 0x110002e4  
				110002e4: 0000000f ? 0
				110002e8: 00005555 ? q
				DengJin # md 0x110002e4 1
				110002e4: 00000000    ....
				DengJin # 
			
			
			
				Buzzer 
				CON 0x114000A0
				DAT 0x114000A4
			
				设置为输出
				DengJin # mm 0x114000A0 
				114000a0: 00000000 ? 1
			
				设置为高电平 Buzzer会叫
				DengJin # mm 0x114000A4 
				114000a4: 0000000c ? 0xd
			
			
				设置为高电平 Buzzer不叫
				DengJin # mm 0x114000A4 
				114000a4: 0000000c ? 0xc
			
				3. coninfo
			
				DengJin # coninfo
				List of available devices:
				serial   80000003 SIO 
			
			
			
				4. printenv
			
				查看所有环境变量
				DengJin # printenv
			
				查看指定的环境变量的值
				DengJin # printenv bootdelay
			
			
				5. setenv
			
				设置环境变量
				DengJin # setenv bootdelay 10
			
				取消设置的环境变量
				DengJin # setenv AA
			
			
				6. saveenv
			
				保存环境变量
				DengJin # saveenv
				Saving Environment to SMDK bootable device...
				done
			
			
				7. boot
			
				执行bootcmd的命令
				DengJin # boot
				helloworld
				uplooking



				1. fdisk

				帮助信息
				DengJin # help fdisk 
				fdisk - fdisk for sd/mmc.

				Usage:
				fdisk -p <device_num>   - print partition information
				fdisk -c <device_num> [<sys. part size(MB)> <user data part size> <cache part size>]
				- create partition


				查看分区信息
				DengJin # fdisk -p 0
				partion #    size(MB)     block start #    block count    partition_Id 
				1          5804          3535680        11887200          0x0C 
				2           327           137160          670560          0x83 
				3           811           807720         1661160          0x83 
				4           520          2468880         1066800          0x83 


				DengJin #fdisk -c 0 320 806 518
				fdisk is completed

				partion #    size(MB)     block start #    block count    partition_Id 
				1          5804          3535680        11887200          0x0C 
				2           327           137160          670560          0x83 
				3           811           807720         1661160          0x83 
				4           520          2468880         1066800          0x83 



				2. fatformat

				格式化的帮助信息
				DengJin # help fatformat
				fatformat - fatformat - disk format by FAT32


				Usage:
				fatformat <interface(only support mmc)> <dev:partition num>
				- format by FAT32 on 'interface'

				格式化第一个分区
				DengJin #fatformat mmc 0:1


------------
关于32-64bit交叉编译的注意事项

PC宿主机平台是64bit的，而交叉编译器是32bit的，

32bit的交叉编译器在工作时要依赖32bit的宿主机库，如arm-a9-gcc依赖32bit宿主机的libstdc++.so.6，所以要单独下载这个缺失的库

一般情况下直接在宿主机下不支持使用yum、dnf（可能ubuntu支持apt直接安装）安装，因为与现有的64bit库冲突，所以要单独下载文件，
手动安装到某一位置。

注：最开始产生这种问题的时候，还有疑惑：管他是宿主机32还是64，交叉编译工具链是编译目标板平台的，有什么关系呢？
这样想是没有错误的，但问题出现在，交叉编译链本身也是一个软件，它依赖所工作的平台，因为你装的交叉编译工具链本身就是在别的32bit平台下
编译出来的，所以依赖的库也不同。

所以，如果你有交叉编译工具链源码的话，那就在你的宿主机平台下再编译一次工具链。

