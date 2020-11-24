
# 1 Concept
Cross-platform software development for **embedded & desktop** with C++ language, "One framework. One codebase. Any platform.", "Light and Powerful". [refer to official website](https://www.qt.io).

![QConstruct](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/QtFramework.png) <br> <center> <font color=gray> Qt framework </font> </center> <br>

## 1.1 History
1991 Norway *Eirik Chambe-Eng* & *Haavard Nord* -> 1994 Trolltech Co.,Ltd -> 2000 GPL version -> 2008 acquired by NOKIA and Add LGPL version -> 2011 sold to Digia Co.,Ltd 

## 1.2 Dowload
- 中国科学技术大学：http://mirrors.ustc.edu.cn/qtproject/
- 清华大学：https://mirrors.tuna.tsinghua.edu.cn/qt/
- 北京理工大学：http://mirror.bit.edu.cn/qtproject/
- 中国互联网络信息中心：https://mirrors.cnnic.cn/qt/

# 2 Feature
## 2.1 Design Tools
Everything you need for designing an amazing user interface and the ultimate user experience.

Name																					| Description
:-:													 									| :-:
[Qt Design Studio](https://doc.qt.io/qtdesignstudio/index.html)							| UI desing and develoment environment 
[Qt 3D Studio](https://doc.qt.io/qt3dstudio/index.html)									| 
[Qt Designer](https://doc-snapshots.qt.io/qt5-dev/qtdesigner-manual.html)				| Intergrated into Qt Creator for GUIs desgin using Qt Widgets
[Qt quick designer](https://doc.qt.io/qtcreator/creator-using-qt-quick-designer.html)	| Intergrated into Qt Creator for GUIs desgin using Qt Quick 

## 2.2 Development Tools
Qt has it's own cross-platform IDE and is chock-full of tools designed for developing applications and UIs once and deploying them across multiple operating systems.

Name																								| Description
:-:													 												| :-:
[Qt QmlLive](https://doc.qt.io/QtQmlLive/index.html) 												| 
[GammaRay](https://doc.qt.io/GammaRay/index.html)	 												| Higher level debugging tools 
[Emulator](https://doc.qt.io/emulator/index.html)	 												| Device emulation
[Qt Creator](https://doc.qt.io/qtcreator/index.html)												| Cross-platform IDE for Qt
[Qt Linguist](https://doc.qt.io/qt-5/qtlinguist-index.html)											| Qt text translator
[qmake](https://doc.qt.io/qt-5/qmake-manual.html)													| Intergrated into Qt Creator, makefile generator for Qt and other Proj
[Makeqpf](https://doc.qt.io/qt-5/qt-embedded-makeqpf.html)											| QPF2 fonts Creator for Embedded Linux
[Meta-Object Compiler (MOC)](https://doc.qt.io/qt-5/moc.html)										| Check macro 'Q\_OBJECT' and generat C++ source file (for Signal-Slots .etc)
[User Interface Compiler (UIC)](https://doc.qt.io/qt-5/uic.html)									| Read '.ui' file and generat C++ header file
[Resource Compiler (RCC)](https://doc.qt.io/qt-5/rcc.html)											| Embed resource (.qrc) into APP during the build process
[Qt D-Bus XML compiler (qdbusxml2cpp)](https://doc.qt.io/qt-5/qdbusxml2cpp.html)					| 
[D-Bus Viewer](https://doc.qt.io/qt-5/qdbusviewer.html)												| 
[Qt Quick Compiler](https://doc.qt.io/QtQuickCompiler)												| Compile QML to binary file for Qt Quick applications
[Qt VS Tools)](https://doc.qt.io/qtvstools/index.html)												| MicrosoftVisualStudio suitable tools
[Qt Distance Field Generator](https://doc.qt.io/qt-5/qtdistancefieldgenerator-index.html)			|
[Qt Installer Framework](https://doc.qt.io/qtinstallerframework/index.html)							| Qt APP installer creator for desktop Linux/Windows/MacOS  
[Qbs](https://doc.qt.io/qbs/index.html)																| Across-platform support tools
[Qt Assistant](https://doc.qt.io/qt-5/qtassistant-index.html)										| Intergrated into Qt Creator
[Qt Configuration Tool](https://doc.qt.io/QtForDeviceCreation/qt-configuration-tool.html)			| Creating and building smaller Qt binaries (Only for commercial license)
[On-device Depolyment and Debugging](https://doc.qt.io/QtForDeviceCreation/b2qt-deploying-b2qt.html)|

## 2.3 Framework Essentials
These are the APIs and libraries that provide the backbone of Qt. Qt contains a rich set of fundamental enablers,which provide higher-level UI and application development components.

Name																			| Description
:-:													 							| :-:
[Qt Core](https://doc.qt.io/qt-5/qtcore-index.html)								| Meta-Object, Signal & Slots .etc
[Qt GUI](https://doc.qt.io/qt-5/qtgui-index.html)								| Image, fonts, text, 2D graphics .etc
[Qt Multimedia](https://doc.qt.io/qt-5/qtmultimedia-index.html)					| Camera, radio, vedio .etc
[Qt Multimesia Widgets](https://doc.qt.io/qt-5/qtmultimediawidgets-index.html)	|
[Qt Network](https://doc.qt.io/qt-5/qtnetwork-index.html)						| HTTP, TCP/IP, cookies .etc
[Qt QML](https://doc.qt.io/qt-5/qtqml-index.html)								|
[Qt Quick Dialogs](https://doc.qt.io/qt-5/qtquickdialogs-index.html)			| 
[Qt Quick Layouts](https://doc.qt.io/qt-5/qtquicklayouts-index.html) 			| 
[Qt Quick](https://doc.qt.io/qt-5/qtquick-index.html)							|
[Qt Quick Controls](https://doc.qt.io/qt-5/qtquickcontrols-index.html)			|
[Qt Quick Test](https://doc.qt.io/qt-5/qtquicktest-index.html)					|
[Qt SQL](https://doc.qt.io/qt-5/qtsql-index.html)								| SQL database support
[Qt Test](https://doc.qt.io/qt-5/qttest-index.html)								|
[Qt Widgets](https://doc.qt.io/qt-5/qtwidgets-index.html)						| Provids UI, such as QLable, QTxxEdit .etc

Tips : QML (Qt Markup Language) starts from Qt5 and design for mobile devices UI design and all 'Qt Quick xxx' are based on QML.

## 2.4 Framework Addones
Qt is an unbelievably comprehensive framework full of features beyond the essentials all designed to provide you with a truly professional development experience

Name																		| Description
:-:																			| :-:
[Active Qt](https://doc.qt.io/qt-5/activeqt-index.html)						| for ActiveX and COM
[Qt 3D](https://doc.qt.io/qt-5/qt3d-index.html)								|
[Qt Android Extras](https://doc.qt.io/qt-5/qtandroidextras-index.html)		| Provides platform-specific APIs for Android
[Qt Bluetooth](https://doc.qt.io/qt-5/qtbluetooth-index.html)				| Provides access to Bluetooth hardware
[Qt Canvas 3D](https://doc.qt.io/qt-5.9/qtcanvas3d-index.html)				|
[Qt Concurrent](https://doc.qt.io/qt-5/qtconcurrent-index.html)				| High-level multi-thread support
[Qt D-Bus](https://doc.qt.io/qt-5/qtdbus-index.html)						| Inter-process communication support
[Qt Gamepad](https://doc.qt.io/qt-5/qtgamepad-index.html)					| For game
[Qt Graphical Effects](https://doc.qt.io/qt-5/qtgraphicaleffects-index.html)|
[Qt Help](https://doc.qt.io/qt-5/qthelp-index.html)							| Similar to Qt Assistant for APP
[Qt Image Formats](https://doc.qt.io/qt-5/qtimageformats-index.html)		| Plugins for additional image formats: TIFF, NMG, TGA .etc 
[Qt Location](https://doc.qt.io/qt-5/qtlocation-index.html)					| Displays map, navigation and place content in QML APP
[Qt Mac Extras](https://doc.qt.io/qt-5/qtmacextras-index.html)				|
[Qt NFC](https://doc.qt.io/qt-5/qtnfc-index.html)							| Provides access to to NFC hardware 
... ...																		| [Click to view more](https://www.qt.io/features#js-8-2) 

## 2.5 License Models 
Name		| Description
:-:			| :-:
Commercial	| $5508/Year
LGPL v3		| Free, commercial friendly
GPL v3		| Free
GPL v2		| Free

Tips : Different Qt modules are under different license conditions. Using LGPL to write commercial code on the premise of only using **QT DYNAMIC LINK LIBRARY**.

## 2.6 Development Platforms
MacOS, Windows, Linux.

##2.7 Target Platforms
Linux/X11, Windows, macOS, Android, IOS/tvOS/watchOS, WinRT/UWP10, Embedded Linux, INTEGRITY, QNX, VxWorks, Bare metal.

# 3 Development


























---
零散知识点

QFileDialog::getOpenFileName(this, tr("open"), "c:\\");

使用该函数可以实现文件浏览器的功能，open字符串是弹出的浏览对话框的标题名，c:\\ 表示默认打开路径

打印调试信息使用qDebug(); 可以类似printf一样输入格式化信息，信息是直接打印在调试框的，而不是打印在GUI上

使用QMessageBox::information()；可以弹出对话框打印信息。



















































---

Qt Creator 分析

1. 产生项目

Qt Creator新建项目将产生两个文件夹，以项目名Demo为例：
	1. build-Demo-Desktop_Qt_5_9_0_MinGW_32bit-Debug
		包含debug、release目录和Makefile、ui_mainwindows.h文件

		其中ui_mainwindows.h 是Qt 利用'mainwindow.ui'生成的，该文件见下文

		这里也有Makefile，可见qmake的机制最终也是操作Makefile

	2. Demo
		mainwindow.ui文件、Demo.pro、Demo.pro.user 和 所有源码及头文件

		- mainwindows.ui 是GUI文件，文本类型，内容使用XML格式维护:	

```
		<?xml version="1.0" encoding="UTF-8"?>
		<ui version="4.0">
		.... <!--中间这些节点表达了控件类型、位置、大小、颜色等等信息-->
		</ui>
```
		x.ui文件内容是由Qt的UI设计界面生成的，在设计界面绘制的过程，就是在x.ui写入节点信息的过程
		x.ui文件会被Qt解析(成ui_mainwindows.h)，然后调用内部绘图函数，根据上述参数来绘制界面，

		Qt利用这种： "UI界面 - XML - 代码绘制" 的方式，屏蔽了底层绘制图形的复杂性，使得开发人员/UI设计人员可以直接上手


		- xxx.pro		是项目文件， 文本类型， 内容类似Makfile， 它是qmake工具的操作对象，qmake使用该文件产生上述Makefile： Qt.pro & qmake VS Makefile & make 
		- xxx.pro.user	也是项目文件，是XML类型，是维护项目信息使用的，类似VS下的“解决方案”

		Tips : qmake工具使用中间文件的方式生成Makefile，也是跨平台编译的要点之一


2. MOC

Moc Meta Object compiler  元对象编译器

moc文件 在项目目录下的Debug或Release目录下产生

在启动调试时 MOC 读取项目中的头文件，找到所有包含 "Q_QBJECT" 宏的类， 然后为这些类生成moc_xxx.cpp源文件，
moc_xx.cpp源文件 是这些类的 meta-Object代码，主要处理“信号-槽"的机制，运行时类型信息和动态属性系统等

MOC以头文件为单位生成源文件，比如A.h中有10个包含O_QBJECT的代码 B.h中有1个包含O_QBJECT代码，则MOC生成一个moc_A.cpp和一个moc_B.cpp

https://doc.qt.io/archives/qt-4.8/moc.html
https://doc.qt.io/qt-5/why-moc.html


3. Qt中的头文件"x.h"与无后缀头文件的区别

没有区别，无后缀的头文件中，只有一句话：包含带后缀的头文件，比如a.h，则A中包含了 '#include "a.h"'



# 图形的本质

图形的本质是内存中的像素点信息，显示的过程是内存的像素点信息到显卡的显存的赋值过程

任何GUI库的工作，都是绘制内存像素点的过程

如果存在操作系统，那么操作系统一定存在一套API来对接底层显卡接口

上层软件只需调用这套API就可以显示绘制图形

如果没有操作系统，那么软件就要针对该平台的CPU、GPU、显示芯片等直接进行操作

如果裸机所接的显示屏是未知的，那么就需要程序员来构造现实接口来对接上层软件的接口

----
培训教程

下载:
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
$ cp -ar lib/libQt\* lib/fonts/ /myrootfs/xxx/lib
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







---------------------------------

触摸屏校准

1. 什么是触摸屏校准?

	一般触摸屏在校准时在屏幕上打印3~5个采样点，用户跟随点出现的顺序依次点击即是触摸屏校准。

2. 为什么要校准？目的是什么？
	
	目的：点击哪里，就可以准确的在那里显示！（或者说，点击一个点，我可以确定其范围位置）

	从用户角度看，这是理所当然的，但实际不是这样的（至少电阻触摸屏不是这样的，电容屏另讨论），电阻式触摸屏是多层设计，
	其中触摸反馈层和显示层是独立的两层结构，通过垂直叠加组合起来。
	触摸反馈层：即A/D转换层，将用户触摸到屏幕上的点的坐标转换成数值送到处理器
	显示层	  ：接收来自MCU将要显示的数据、颜色等信息
	这里提供实例系统中应用到的电路芯片：
	触摸反馈层：ADS7843
	显示层	  ：RA8875

	RA8875有四个地址的寄存器是用于确定显示位置的：46H~49H；46H和47H组成10bit空间，48H和49H组成9bit空间，46H和47H定位横向坐标，
	48H和49H定位纵向坐标，也就是说RA8875支持1024(2^10)x512(2^9)像素的LCD，MCU通过向RA8875输送坐标值和数据即可在指定位置显示数据。
	在测试实例中，RA8875将左上角定义为(0,0)，向右下延伸。

	ADS7843时12bit的A/D转换器，即精度为2^12=4096，也就是ADS7843将整个触摸屏幕（通过电压分布反馈）的X和Y方向各平分为0~4095个数值。
	在测试实例中，ADS7843将右上角定义为开始采样端（注意这里可能是[0,0]也可能不是[0,0]，因为有精度、采样频率、通讯速度等影响，但
	结果一定是一个固定的值），向左下角延伸。
	
	

	通过如上数据得知，两个系统的坐标范围、原点、精度都是不相同的，所以要想达到：“点击哪里，就准确的在那里显示”，就需要进行算法
	映射，也就是校准！！



3. 怎么校准？



