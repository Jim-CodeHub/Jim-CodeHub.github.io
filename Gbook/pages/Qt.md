1.μC-GUI与emWin
μC-GUI和emWin都是嵌入式系统图形库，emWin由Segger公司研发，μC-GUI是Segger面向Micrium公司的定制产品，两款产品资料通用，但拥有各自的使用许可条文。

2.μC-GUI
Micrium公司的所有产品，在任何商业应用条件下都不是免费的，并且对所有产品拥有统一的在商业中使用的许可条文：
①单一产品许可：需指定CPU型号，最终产品名称，没有数量和时间限制
②产品线许可：无需指定CPU型号，需指定最终产品名称
③CPU类型（平台）许可：只需指定CPU型号，可以生产各种产品
④站点许可：只需指定站点，CPU、最终产品名称和数量都没有限制
价格表（Micrium中国总代 - 北京麦克泰软件技术有限公司，μC-GUI报价）：
类型				价格（元）	时间
单一产品许可		RMB130,000	永久
产品线许可			RMB650,000	永久
CPU类型（平台）许可	RMB845,000	永久
站点许可			-			-

3.emWin
Segger公司的产品，在商业应用条件下有免费使用方式：
① Segger公司提供定制服务，定制公司用于产品最终解释权，如Segger向ST公司定制STemWin，则使用含有STemWin库的ST芯片时无需支付库的使用费用；而Segger向Micrium公司定制μC-GUI，但使用μC-GUI时需要遵循Micrium公司许可条款。
② Segger公司提供合作机制，如Segger与NXP公司合作，凡使用NXP芯片的用户，都可以免费使用emWin库（信息来源：https://www.nxp.com/pages/emwin-graphics-library:EMWIN-GRAPHICS-LIBRARY）。




附录A：Micrium 总部（美）联系方式

·电话：1-954-217-2036
·传真：1-954-217-2037
·邮箱：
- 销售邮箱：sales@micrium.com
- 信息咨询：info@micrium.com
·官网：https://www.micrium.com/

---
# Qt 安装与移植

Qt分为Qt库和Qt集成开发环境两部分

Qt Library: qt-everywhere-opensource-src-4.8.6.tar.bz2
Qt Creator: qt-creator-opensource-linux-x86_64-3.2.1.run

Qt Creator用于开发Qt应用程序，Qt应用程序的编译和运行依赖于Qt库
Qt everywhere系列版本是qt库版本之一，如其名，可以应用在任何平台

以下是Qt库配置步骤：

注意：要编译Qt库，先要正确编译tslib并导出其环境变量; 要先安装g++

目的：1. 编译出qmake供Qt Creator使用，以编译出在目标板中运行的Qt应用程序
2. 移植编译好的Qt库到目标板文件系统中，以在目标板中可以运行Qt应用程序  

步骤：
1.  解压缩，进入目录
2.  $sudo ./qteverywhere.sh 
3.  $sudo make 
4.  $sudo make install
安装路径为 /usr/local/arm/qt4.8.6
5.  PC测试：
#cp /usr/local/arm/qt4.8.6/bin/qmake /usr/bin/arm-qmake
#arm-qmake -v 出现版本信息即为成功 

6.  移植到目标板中的文件系统： 
cd /usr/local/arm/qt4.8.6/
$ cp -ar lib/libQt* lib/fonts/ /myrootfs/xxx/lib
$ cp -ar demos/embeddedialogs/embeddedialogs home/forlinx/work/rootfs-mini/forlinx/qt/bin

以上目录可能不同，其拷贝的库也是挑选来的，也可以将所有的Qt lib库拷贝过去，
第二个demos目录下的文件用于测试
这种方法是拷贝到还没有烧录到FLASH的文件系统，也可以在烧录并成功运行文件系统之后再通过USB/FTP
等路径拷贝进去

7.  设置环境变量（目标板主的/etc/profile）

export QTDIR=/forlinx/qt
export LD_LIBRARY_PATH=$QTDIR/lib:$LD_LIBRARY_PATH
export QT_QPA_GENERIC_PLUGINS=tslib
export QT_QWS_FONTDIR=$QTDIR/lib/fonts
export QT_QPA_PLATFORM_PLUGIN_PATH=$QTDIR/plugins
export QT_QPA_FB_TSLIB=1
export QWS_SIZE=800x480
export QTS_DISPLAY=LinuxFb:/dev/fb0
KEYPAD_DEV=/dev/input/event0
export LD_LIBRARY_PATH=/forlinx/qt/lib/plugins/imageformats:$LD_LIBRARY_PATH
export QT_PLUGIN_PATH=/forlinx/qt/lib/plugins
export QWS_MOUSE_PROTO=”Tslib:/dev/input/event1”

配置路径和参数要跟实际一致

测试方法
#cd /forlinx/qt/bin
#./embeddedialogs –qws
执行之后在目标板屏幕上会出现Qt界面


以下是Qt Creator的配置步骤:

Qt Creator的安装就是一路下一步
Qt Creator的配置分为3步:
1. 配置编译工具，要使程序能在目标板上运行，就要指定交叉编译工具    

点击 工具-选项-编译和运行-选择编译一栏-点击添加-选择GCC-在下面路径浏览交叉编译工具xxxx-g++的路径

2.Qt version设置，这一步就是添加Qt everyone编译出来的qmake

点击 工具-选项-编译和运行-选择Qt version一栏-点击添加直接选择qmake路径

3. 添加构建套件，这一步主要是选择Qt库版本和编译器种类

点击 工具-选项-编译和运行-选择Kits一栏-点击添加-选择编译器版本GCC-选择Qt版本Qt4.8.6(qt4.8.6) 

	最后Qt版本选择，应该是系统自动提示本地存在的Qt

	over 可以开始构建工程，编写应用程序








