
# 1 Introduction

# 2

# 1 Kernel porting

# 2 Kernel programming 



inode 结构体

Unix系统一切皆文件，inode标识着这些文件，包含着所有文件的所有信息，

对文件系统操作的一些命令，本质是对inode的操作，如df ls stat find grep...命令

文件系统百分之一的空间分配给inode

文件类型：普通文件、目录、设备文件、链接文件、管道文件、套接字文件等
管理方式：目录树

inode是理解Linux文件系统和硬盘存储机制的基础

inode是在物理存储区（如硬盘、flash等）的、用于**记录文件所有信息**(除文件名)的存储区域，在系统中表现为一个结构体，文件与inode一一对应。

inode的数量再物理存储区格式化时就已经确定，每N个字节分配一个inode，每个inode占128byte
(如果N是1K，物理存储空间是1G，那么会分配1024个inode，占用空间为128M)

因为一个文件对应一个inode，所以系统可能出现 仍有剩余空间 但已无法创建新的文件的情况

使用df -i命令查看每个每个分区分配的inode数量和使用情况

每个inode都有一个唯一ID，使用ls -i可以查看

inode的存储区域与文件数据的存储区域是分开的，

对文件进行移动、重命名等操作不会影响到inode的ID
复制文件相当于创建，会增加inode

- 删除文件与inode

删除文件其实并不是删除文件数据，而是标记此inode可复用了，如果有新的文件需要覆盖这个空间，那么数据就会被清除

- 硬链接与软链接

1. 软链接
- 软件连接是一个文件，具有唯一inode ID，假设软链接文件是A，被链接文件是B，则A指向B
- 操作A会被指向B，删除A不影响B，删除B将不能访问A，除非A再指向其它(非软链接)文件 
- 可以有多个软链接文件指向链接文件

2. 硬链接 
- 硬链接也是一个文件，但其inode ID与被链接文件相同，假设硬链接文件是A，被链接文件是B
- 操作A相当于操作B，反之亦然, A和B永远保持着相同的内容，并且删除任何一个都不影响另一个
- 仍然可以有多个硬链接文件。硬链接相当于文件副本，只是文件名不同。

ext2 ext3 ext4等文件系统都支持inode，但分区和排布情况不同


从视图上看，文件系统将物理存储区划分为：引导块、超级块、inode表、文件数据块。
引导块  - 引导代码 boot区，如果没有操作系统，该块可能为空
超级块  - 存储文件系统的信息
inode表 - 存储文件    的信息， 操作文件时内核会将该表加载到内存 

要明确的概念是，文件系统与操作系统是独立的概念，文件系统可以脱离操作系统而存在，但操作系统必须依赖文件系统
。比如你可以将一个U盘或SD卡等格式化成某个文件系统，然后这个存储介质就以如上视图划分了，但显然没有任何操作系统

根文件系统 是指已经在上述视图中存在结构树的文件系统，比如Linux根文件系统，已经包含了/ /lib /bin等等，只是不同的版本包含的不一样.
显然，跟文件系统是已经布局好的文件系统，直接与操作系统运行环境相关。

- 内核、文件系统、根文件系统、操作系统之间的关系

内核是操作系统的基本核心，与文件系统、根文件系统无关，是独立的。

文件系统就是如上所述的，也是独立的，与内核、操作系统都没有关系，格式化为某种文件系统，其视图结构就已经确定。

根文件系统是在文件系统上的填充，文件系统只有结构框架，而根文件系统就是在其框架下的内容填充，填充了什么呢？这与操作系统相关，如果是Linux，一般填充/ /bin /etc /lib ...等等目录和文件，这些是操作系统必备的运行环境和工具，不同的根文件系统版本等区别也会导致内容的不同。

操作系统 在UNIX高级环境编程 中提到是 内核+shell&公共函数库 (+App) 的集合，实际就是 内核 + 根文件系统，这也是为什么在Linux移植的过程中，Uboot启动之后只需烧录Linux内核和根文件系统的原因。 shell和公共函数库都包含在了根文件系统当中。


----

/sys , 内核数据结构的可视化窗口，非磁盘文件系统，可以理解为内核在内存中的树结构视图映像，使得用户可以实时访问和调试内核




---
----------------
培训内容

1. 编译内核源码

内核官网:
www.kernel.org

a. 解压
[root@deng arm]# ls linux-3.5-20151029.tgz 
linux-3.5-20151029.tgz
[root@deng arm]# tar -xzvf linux-3.5-20151029.tgz


b. 配置内核

清除相关文件
[root@deng linux-3.5]# make distclean 

使用已经移植好的配置
[root@deng linux-3.5]# cp tiny4412_linux_defconfig  .config 


关闭TrustZone
[root@deng linux-3.5]# make menuconfig 

注意: 使用方向键控制上下移动

│ ┌────────────────────────────────────────────────────────────────────┐ │  
│ │      [*] Patch physical to virtual translations at runtime         │ │  
│ │          General setup  --->                                       │ │  
│ │      [*] Enable loadable module support  --->                      │ │  
│ │      [*] Enable the block layer  --->                              │ │  
│ │          System Type  --->         <-----选中此项 然后按回车       │ │  
│ │      [ ] FIQ Mode Serial Debugger     

出现如下界面

│ ┌─────────────────────────────────────────────────────────────────────┐ │  
│ │   [*] MMU-based Paged Memory Management Support                     │ │  
│ │       ARM system type (SAMSUNG EXYNOS)  --->                        │ │  
│ │       *** Boot options ***                                          │ │  
│ │   [ ] S3C Initialisation watchdog                                   │ │  
│ │   [ ] S3C Reboot on decompression error                             │ │  
│ │   [*] Force UART FIFO on during boot process                        │ │  
│ │   (0) S3C UART to use for low-level messages                        │ │  
│ │   (0) Number of additional GPIO pins                                │ │  
│ │   (0) Space between gpio banks                                      │ │  
│ │   -*- ADC common driver support                                     │ │  
│ │   [*] PWM device support                                            │ │  
│ │       *** Power management ***                                      │ │  
│ │   [ ] S3C2410 PM Suspend debug                                      │ │  
│ │   [ ] S3C2410 PM Suspend Memory CRC                                 │ │  
│ │       SAMSUNG EXYNOS SoCs Support  --->                             │ │  
│ │       *** Processor Type ***                                        │ │  
│ │       *** Processor Features ***                                    │ │  
│ │   [*] Support TrustZone-enabled Trusted Execution Environment       │ │  <------选中此项 按空格
│ │   [ ] Support for the Large Physical Address Extension              │ │  
│ │   [*] Support Thumb user binaries                                   │ │  
│ │   [*] Enable ThumbEE CPU extension    

不要选中Support TrustZone
│ ┌─────────────────────────────────────────────────────────────────────┐ │  
│ │   [*] MMU-based Paged Memory Management Support                     │ │  
│ │       ARM system type (SAMSUNG EXYNOS)  --->                        │ │  
│ │       *** Boot options ***                                          │ │  
│ │   [ ] S3C Initialisation watchdog                                   │ │  
│ │   [ ] S3C Reboot on decompression error                             │ │  
│ │   [*] Force UART FIFO on during boot process                        │ │  
│ │   (0) S3C UART to use for low-level messages                        │ │  
│ │   (0) Number of additional GPIO pins                                │ │  
│ │   (0) Space between gpio banks                                      │ │  
│ │   -*- ADC common driver support                                     │ │  
│ │   [*] PWM device support                                            │ │  
│ │       *** Power management ***                                      │ │  
│ │   [ ] S3C2410 PM Suspend debug                                      │ │  
│ │   [ ] S3C2410 PM Suspend Memory CRC                                 │ │  
│ │       SAMSUNG EXYNOS SoCs Support  --->                             │ │  
│ │       *** Processor Type ***                                        │ │  
│ │       *** Processor Features ***                                    │ │  
│ │   [ ] Support TrustZone-enabled Trusted Execution Environment       │ │  <-- 取消选中
│ │   [ ] Support for the Large Physical Address Extension              │ │  
│ │   [*] Support Thumb user binaries                                   │ │  
│ │   [*] Enable ThumbEE CPU extension    

然后 exit ... exit  保存


c. 编译
[root@deng linux-3.5]# make -j4

LD      arch/arm/boot/compressed/vmlinux
OBJCOPY arch/arm/boot/zImage
Kernel: arch/arm/boot/zImage is ready
出现以上信息 表示内核编译成功



2.  安装dnw工具

a. 解压 
[root@deng arm]# ls dnw-linux.tar.gz  
dnw-linux.tar.gz
[root@deng arm]# tar -xzvf dnw-linux.tar.gz 


b. 编译
[root@deng arm]# cd dnw-linux 
[root@deng dnw-linux]# make 

c. 安装
[root@deng dnw-linux]# make install


d. 测试
[root@deng dnw-linux]# dnw 
Usage: dwn [-a load_addr] <filename>
Default load address: 0x57e00000


3. 启动内核

minicom:
DengJin # dnw 0x40008000

PC:
[root@deng linux-3.5]# dnw arch/arm/boot/zImage  
load address: 0x57E00000
	Writing data...
100%    0x0048FF8A bytes (4671 K)
	speed: 3.896146M/S
	[root@deng linux-3.5]# 

	minicom:
	DengJin # bootm 0x40008000

	如果能够启动内核 表示Ok


	4. Android系统的烧写

	a. 对SD卡进行分区 

	DengJin # fdisk -c 0 500 800 500 

	b. 格式化分区
	DengJin # fatformat mmc 0:1


	c. Android工具的安装

	解压
	[root@deng arm]# ls android_tools.tgz 
	android_tools.tgz
	[root@deng arm]# tar -xvf android_tools.tgz 

	将相关命令拷贝到/usr/local/bin目录中
	[root@deng arm]# cp usr/local/bin/* /usr/local/bin/

										测试
										[root@deng arm]# fastboot
										usage: fastboot [ <option> ] <command>

										d. 编译内核

										[root@deng linux-3.5]# cp tiny4412_android_defconfig .config 

										关掉TrustZone

										[root@deng linux-3.5]# make -j4



										e. 使用fastboot烧写Android系统

										相关文件
										images\Android\zImage           Android 内核
										images\Android\ramdisk-u.img    Android 根分区映象
										images\Android\system.img       Andorid 系统分区映象
										image\Android\userdata.img      Andorid Data 分区映象


										minicom:
										DengJin # fastboot
										PC:
										烧写自己编译好的内核
										[root@deng linux-3.5]# fastboot  flash kernel arch/arm/boot/zImage  



										PC:
										(格式化userdata和cache)
										[root@deng Android4.2.2]# fastboot -w 

										烧写ramdisk
										[root@deng Android4.2.2]# fastboot flash ramdisk ramdisk-u.img 

										烧写system 
										[root@deng Android4.2.2]# fastboot flash system system.img



										minicom:
										设置启动参数
										DengJin #set bootargs "console=ttySAC0,115200n8 androidboot.console=ttySAC0 lcd=S70 ctp=2"
										DengJin #saveenv

										说明:
										bootargs 是内核启动的参数
										console 是Linux输出的串口
										androidboot.console Android的输出串口
										lcd 是屏幕的型号
										ctp 触摸点数


										设置启动命令

										DengJin #set bootcmd "movi read kernel 0 40008000;movi read rootfs 0 41000000 400000;bootm 40008000 41000000"
										DengJin #saveenv

										说明:
										bootcmd 启动uboot之后 执行的命令

										复位 重启

