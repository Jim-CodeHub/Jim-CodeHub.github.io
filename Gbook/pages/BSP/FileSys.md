
# 1 Introduction

File system (alias 'filesystem', 'fs') provides the mechanism for data storage and retrieves, on physical media (permanent and volatile, local and network). And help users interactive with OS. 

https://en.wikipedia.org/wiki/File_system














VFS 是Linux内核的虚拟文件系统层，它屏蔽了不同文件系统的差异，提供统一的操作接口，


read(), write(), ...
|
-------VFS---------------
|		|		|		|
ext2	ext3	network ....



#

Linux 内核文件中包含多种文件系统，如ext2 ext3 ext4 ntfs fat ...，通过配置可使内核支持其中一种到多种，当物理磁盘按所配置的文件系统格式进行格式化，内核启动后就会识别该磁盘。

要明确的是，文件系统不等于目录文件结构，支持这个文件系统只是说明内核能够识别并操作基于该文件系统的文件，

而磁盘上有什么文件，或者说一个合格的Linux操作系统下应该有什么目录文件结构，这不是文件系统的内容，
而属于“文件系统层次标准Filesystem Hierarchy Standard”的内容（称为FHS），

FHS规定了层次结构、根目录下的各个子目录名称及其应该存放的内容.

https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard

Linux内核是不提供这些内容的，rootfs就是FHS的实现之一。rootfs提供了基本的目录结构 / /root /bin /lib /sys 等等，并且在这些目录结构下包含适当够用的命令工具和函数库。

FHS的存在，也是让内核能够顺利启动的原因之一。如果没有FHS，那么内核将没有足够的启动资源。

所以FHS一方面为内核启动准备了资源，另一方面为内核系统后的用户操作提供了磁盘的可视化窗口



https://www.docin.com/p-1779855302.html
tmpfs、ramdisk、ramfs、rootfs等都属于虚拟文件系统(VFS)系列。

tmpfs（在之前被称为shmfs），是基于ramfs代码开发的，比ramfs更优秀









软件的任何数据都不会、也不能独立存在，要么在内存（Ram）中，要么在辅存（或磁盘、硬盘、Flash、ROM）中。

RAMDISK - RAM disk, 内存磁盘，虚拟在内存的磁盘，可以像操作普通磁盘一样对其操作

RAMFS - RAM File System, 内存文件系统，

ROOTFS - Root File System，是RAMFS的特例


## Ramdisk


nux RamDisk 使用简介


来源: ChinaUnix博客 　日期： 2008.01.29 00:26　(共有条评论) 我要评论
 

linux RamDisk 使用简介
1、Ram Disk介绍
1.1   什么是Ram Disk

Ram Disk 就是将内存中的一块区域作为物理磁盘来使用的一种技术。

对于用户来说，可以把RAM disk与通常的硬盘分区（如/dev/hda1）同等对待来使用。

1.2    Ramdisk与硬盘分区的不同
RAM disk不适合作为长期保存文件的介质，掉电后Ramdisk的内容会随内存内容的消失而消失。
RAM disk的其中一个优势是它的读写速度高，内存盘的存取速度要远快于目前的物理硬盘，可以被用作需要高速读写的文件。
注意：在2.6版本后，Ramdisk的这一作用开始被tmpfs(Virtual memory file system support)取代。    

1.3    Ramdisk的作用

内存盘对于保存加密数据来说是一个福音，因为我们如果将加密的文件解密到普通磁盘的话，即使我们随后删除了解密文件，数据仍然会留在磁盘上。这样是非常不安全的。而对于 RamDisk 来说，没有这样的问题。

假设有几个文件要频繁的使用，你如果将它们加到内存当中，程序运行速度会大副提高，因为内存的读写速度远高于硬盘。
    
象WEB服务器这样的计算机，需要大量的读取和交换特定的文件，因此，在WEB服务器上建立RamDisk会大大提高网络读取速度。

RAM disks can be a great place to store temporary data.



2、前提条件

       为了能够使用RAM disk 你的内核必须要支持RAM disk，即：在编译内核时，要选中RAM disk support这一选项，会在配置文件中定义CONFIG_BLK_DEV_RAM。
       为了让内核有能力在内核加载阶段就能装入RAMDISK，并运行其中的内容，要选中initial RAM disk(initrd) support 选项，会在配置文件中定义CONFIG_BLK_DEV_INITRD。



3、操作步骤：

3.1系统中已有的“内存盘”

3.1.1 查看系统中有那些“内存盘”

Linux 内核默认创建了 16 个 ramdisks。它们目前是未启用的，不占用任何内存空间。这 16 个设备分别是 /dev/ram0 -- /dev/ram15。虽然我们可以看到还有 /dev/ram16 -- 19，但是它们默认是不可用的。

通过更改rd.c的配置，可以使系统支持的RAM disk的数量增加到255个。为了使用更多的RAM disk，我们可以使用“mknod  /dev/ramX b 1 X”命令创建更多的RAM disk设备文件，并且通过chmod命令将他们的访问权限改成我们想要的。

使用下面的命令查看：
[root]# ls -l /dev/ram\*lrwxrwxrwx    1 root     root            4 Jun 12 00:31 /dev/ram -> ram1brw-rw----    1 root     disk       1,   0 Jan 30  2003 /dev/ram0brw-rw----    1 root     disk       1,   1 Jan 30  2003 /dev/ram1brw-rw----    1 root     disk       1,  10 Jan 30  2003 /dev/ram10brw-rw----    1 root     disk       1,  11 Jan 30  2003 /dev/ram11brw-rw----    1 root     disk       1,  12 Jan 30  2003 /dev/ram12brw-rw----    1 root     disk       1,  13 Jan 30  2003 /dev/ram13brw-rw----    1 root     disk       1,  14 Jan 30  2003 /dev/ram14brw-rw----    1 root     disk       1,  15 Jan 30  2003 /dev/ram15brw-rw----    1 root     disk       1,  16 Jan 30  2003 /dev/ram16brw-rw----    1 root     disk       1,  17 Jan 30  2003 /dev/ram17brw-rw----    1 root     disk       1,  18 Jan 30  2003 /dev/ram18brw-rw----    1 root     disk       1,  19 Jan 30  2003 /dev/ram19brw-rw----    1 root     disk       1,   2 Jan 30  2003 /dev/ram2brw-rw----    1 root     disk       1,   3 Jan 30  2003 /dev/ram3brw-rw----    1 root     disk       1,   4 Jan 30  2003 /dev/ram4brw-rw----    1 root     disk       1,   5 Jan 30  2003 /dev/ram5brw-rw----    1 root     disk       1,   6 Jan 30  2003 /dev/ram6brw-rw----    1 root     disk       1,   7 Jan 30  2003 /dev/ram7brw-rw----    1 root     disk       1,   8 Jan 30  2003 /dev/ram8brw-rw----    1 root     disk       1,   9 Jan 30  2003 /dev/ram9lrwxrwxrwx    1 root     root            4 Jun 12 00:31 /dev/ramdisk -> ram0

3.1.1 查看系统中内存盘的大小

[root]# dmesg | grep RAMDISKRAMDISK driver initialized: 16 RAM disks of 4096K size 1024 blocksizeRAMDISK: Compressed image found at block 0
也就是说，默认的 RamDisk 是4MB的。


3.2 格式化RamDisk

接下来就需要做文件系统了，也就是格式化。RamDisk是临时性的，所以没有带日志的文件系统的必要，所以我们一般做 ext2 就可以了：
[root]# mke2fs -m 0 /dev/ram0mke2fs 1.32 (09-Nov-2002)Filesystem label=OS type: LinuxBlock size=1024 (log=0)Fragment size=1024 (log=0)4000 inodes, 16000 blocks0 blocks (0.00%) reserved for the super userFirst data block=12 block groups8192 blocks per group, 8192 fragments per group2000 inodes per groupSuperblock backups stored on blocks:8193Writing inode tables: doneWriting superblocks and filesystem accounting information: doneThis filesystem will be automatically checked every 22 mounts or180 days, whichever comes first.  Use tune2fs -c or -i to override.

mke2fs 的-m百分比值>选项：指定给管理员保留扇区的比例。在这里，-m 0，即：不为管理员保留任何扇区，任何普通用户都可以使用所有可用的空间。


3.3 创建挂载点并挂载 RamDisk

现在，我们的 RamDisk 已经可以使用了，只需要再将它挂接到一个可访问的目录点：
[root]# mkdir /mnt/rd[root]# mount /dev/ram0 /mnt/rd

       我们来验证一下，RamDisk是否已经挂在成功了：
[root]# mount | grep ram0/dev/ram0 on /mnt/rd type ext2 (rw)[root]# df -h | grep ram0/dev/ram0              16M   13K   16M   1% /mnt/rd





3.4 使用RamDisk

Now that it has been created, you can copy, move, delete, edit, and list files on the ramdisk exactly as if they were on a physical disk partiton.
To unmount the ramdisk, simply enter the following：
[root]# umount -v /mnt/rd/dev/ram0 umounted



4、与RAMdisk有关的命令行参数：

4.1 ramdisk_size=N

       这个参数告诉RAM磁盘驱动将RAM磁盘的大小设置为N k，默认是4096（4 MB）。

       RAM磁盘的大小会根据需要动态的增长，因此其大小有个上限加以限制以免它用光所有可用的内存而坏事。ramdisk_size这个参数实际是设置这个上限值的。

       我们可以通过命令：dmesg | grep RAMDISK来查看这个上限值。要注意的是，这个值在系统运行阶段是不能再被修改的。

       尽管RAM磁盘的大小有个最大值，但我们可以指定需要使用的RAM磁盘的容量。比如，在本例中我们设为2MB。通过写入RAM磁盘设备来创建。命令为dd if=/dev/zero of=/dev/ram0 bs=1k count=2048。当我们没有指定需要使用的RAM磁盘的容量，而直接在其上挂载文件系统时，它的容量是其上限值。


4.2 load_ramdisk=N

       这个参数告诉内核是否要载入一个RAMDISK映像。load_ramdisk =1时指定核心将软盘载入内存。默认值是0，表示内核不要去载入RAMDISK映像。
4.3 prompt_ramdisk=N

此参数告诉内核是否要给你个提示要求插入含RAMDISK映像的软盘。

在只用一张软盘的配置下RAMDISK映像与刚刚载入／启动的核心在相同的软盘上，故不需要提示，这种情况可以用 `prompt_ramdisk=0'。

在使用两张软盘的配置下你需要交换软盘，故可以使用 `prompt_ramdisk=1'。因为这是预设值，所以不必真的去指定它。


4.4 ramdisk_start=NNN

为了使内核映像能够与压缩的RAMDISK映像放在一张软盘内，所以加入这个 `ramdisk_start=' 指令。

内核不能够放在压缩过的RAMDISK磁盘的文件系统映像里，因为它得从最开始的第零磁区开始放置，这样基本输出入系统(BIOS)才能载入启动磁区而内核也才能够开始启动执行。(参考Documentation/ramdisk.txt，但是我不太明白)?????????
注意：如果你使用的是没有压缩的RAMDISK磁盘映像，那么内核可以是要载入的RAMDISK磁盘的文件统映像的一部份，且该软盘可以由 LILO 启动，两者也可以如同压缩的映像那样为分开的两部份。 
如果你使用启动／根(boot/root)两张磁盘的方式（内核一张，RAMDISK映像放第二张）那么RAMDISK磁盘会由第零磁区开始，并使用零作为偏移值(offset)。因为这是预设值，你根本不必真的去使用这个指令。



5、使用"rdev -r" 

命令“rdev –r”设置内核镜像文件中的两个字节(32bit)，这两个字节中各个位的含义如下：
低11位(0 -> 10)指定了一个偏移量(以1K的块为单位)，最到能寻址到2M，用以指定到何处去寻找RAM磁盘。
第14位指示RAM磁盘是否被加载。
第15位指示是否在加载RAM磁盘之前给出一个提示并等待用户指令。

如果随着数据被写入RAM磁盘，RAM磁盘的大小是动态增长的，那么指定RAM磁盘的大小的域将被忽略。11到13位没有被使用，所以可以为0。

上面所列的数据并非什么秘密，可以在参照下列地方：

进入内核源码所在目录：
./arch/i386/kernel/setup.c:#define RAMDISK_IMAGE_START_MASK 0x07FF
./arch/i386/kernel/setup.c:#define RAMDISK_PROMPT_FLAG 0x8000
./arch/i386/kernel/setup.c:#define RAMDISK_LOAD_FLAG 0x4000

考察一个典型的"两张软盘启动"，内核在第一张软盘上，并且已经将一个RAM磁盘镜像文件放到了第二张软盘上。

所以你希望将0到13位设置为0，这将意为着你的RAM磁盘处于从软盘起始地址偏移量为0KB的地方。相同功能的命令行参数为："ramdisk_start=0"

你希望第14位为1，即声明加载RAM磁盘。相同功能的命令行参数为："load_ramdisk=1

你希望第15位为1，这是声明希望显示一个提示并等待用户的按键以得到一个提示机会来更换软盘。形同功能的命令行参数为："prompt_ramdisk=1"

将上述的标志位综合在一起得到：2^15 + 2^14 + 0 = 49152作为参数传递给rdev用来设置内核镜像里的两个字节。所以如果创建上述的第一个磁盘，你需要进行如下操作：
/usr/src/linux# cat arch/i386/boot/zImage > /dev/fd0
/usr/src/linux# rdev /dev/fd0 /dev/fd0
/usr/src/linux# rdev -r /dev/fd0 49152

如果你创建一个使用了lilo的启动磁盘，为了得到上面说明的那些效果，你需要使用下列lilo的参数：
append = "ramdisk_start=0 load_ramdisk=1
prompt_ramdisk=1"考虑到默认的start = 0和prompt = 1，你可以简化lilo的命令行参数为：
append = "load_ramdisk=1"



6、一个创建压缩RAM磁盘的例子：

为了创建一个RAM磁盘的镜像，你需要你一个单独的块设备。这个块设备可以是一个RAM磁盘设备本身，也可以是一个未使用的磁盘分区(比如一个没有被挂载的交换分区)。在这个例子中，我们将使用RAM磁盘设备："/dev/ram0"。

a)确定你希望使用的RAM磁盘的容量

比如，在本例中我们设为2MB。通过写入RAM磁盘设备来创建。最好写入0，这样下一步创建镜像时进行最大比例压缩的时候比较方便压缩未使用的块。命令为：
dd if=/dev/zero of=/dev/ram0 bs=1k count=2048

b)创建一个文件系统。在本例中使用ext2fs。命令为：mke2fs -vm0 /dev/ram0 2048

c)挂载这个磁盘设备

无论是一个RAM磁盘设备，还是一个单独的分区，向里面拷贝你需要的文件(比如：/etc/* /dev/* ...)。然后卸载这个设备(umount)。

d)压缩这个RAM磁盘镜像。

压缩之后，被实际使用的空间大约能压缩到原来的50%，并且未被使用的空间几乎被完全压缩到0。命令为：dd if=/dev/ram0 bs=1k count=2048 | gzip -v9 > /tmp/ram_image.gz

e)将内核放入软盘。

命令为：dd if=zImage of=/dev/fd0 bs=1k

f)将RAM磁盘镜像放入软盘。

使用一个比内核所占空间略大的偏移量。之所以要有一个略大的偏移量，可以方便以后更换内核，而不会覆盖到RAM磁盘的镜像。比如，如果内核占用了350KB，那么写入RAM磁盘镜像的时候使用400KB的偏移量是比较合理的。注意：确定"偏移量+RAM磁盘镜像的体积"不会超出软盘的容量(通常是1440KB)。
命令为：dd if=/tmp/ram_image.gz of=/dev/fd0 bs=1k seek=400

g)使用rdev命令设置启动设备，RAM磁盘偏移量，是否提示换磁盘标志，等等。

比如设置：prompt_ramdisk=1, load_ramdisk=1,ramdisk_start=400,这些标志时，可以计算出来：2^15 + 2^14 + 400 = 49552，使用的命令可能为：
rdev /dev/fd0 /dev/fd0
rdev -r /dev/fd0 49552

到此为止，你已经获得了你自己的启动/根压缩RAM磁盘(软盘)，你也可以将步骤d和步骤f通过管道一步执行。

