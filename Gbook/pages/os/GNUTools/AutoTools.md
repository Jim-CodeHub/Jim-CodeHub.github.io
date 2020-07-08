
# 将源程序自动生成Makefile的工具，实现”./configure, make, make install"三步曲

> **[info] Note**
>
> 以下命令都可以通过`man [command]`来查看详细信息

## autoscan

`$autoscan [OPTION] [SRCDIR]`

扫描源码文件（默认是当前目录），在所指定目录生成 autoscan.log 和 configure.scan.

configure.scan要重命名为configure.ac，以便下一个命令识别。当前的cofigure.ac是一个模板文件，只填充了部分内容，所以要手动更改

configure.ac内容格式如下：

```
原：AC_INIT([FULL-PACKAGE-NAME], [VERSION], [BUG-REPORT-ADDRESS])
改：AC_INIT(socketcd, v0.1, 303683086@qq.com)
描：软件名、版本信息、BUG报告地址

添：AM_INIT_AUTOMAKE(subdir-objects)
描：这是给后续automake传递的选项参数，可多列，参考:https://www.gnu.org/software/automake/manual/automake.html#Options，这里的subdir-objects是指当前项目有子目录且要编译子目录中的源文件

添：AC_PROG_RANLIB(libsocketcd)
描：如果要生成静态库，则要声明该宏，参数是静态库名

添：AC_CONFIG_FILES([Makefile])
描：用于生成Makefile

其它默认即可

```

## aclocal

处理本地宏定义，生成aclocal.m4

## autoconf

生成configure文件

## autoheader

生成config.h.in文件

## automake

该命令生成Makefile.in文件，但依赖于**Makefile.am文件**

Makefile.am文件只能手动创建并编写，内容格式如下：

```
#GNU需求
AUTOMAKE_OPTIONS=foreign 

#表示要生成的静态库
lib_LIBRARIES=libsocketcd.a 
#表示要生成的静态库所以来的源文件
libsocketcd_a_SOURCES=./socketcd/client/socketc.cpp ./socketcd/server/socketd.cpp
#等同于CXXFLAGS，编译时将使用
libsocketcd_a_CXXFLAGS= -Werror -std=c++11 -Wall

#表示要生成动态库，并且要为动态库指定默认安装路径
libsocktecdlibdir=${prefix}
#表示要生成的动态库
libsocktecdlib_PROGRAMS=libsocketcd.so
#表示要生成的动态库所以来的源文件
libsocketcd_so_SOURCES=./socketcd/client/socketc.cpp ./socketcd/server/socketd.cpp
#等同于CXXFLAGS，编译时将使用
libsocketcd_so_CXXFLAGS= -fPIC -Werror -std=c++11 -Wall
#等同于LDFLAGS，链接时将使用
libsocketcd_so_LDFLAGS= -shared -fPIC 

```
注：如果执行automake的过程发现必要文件，可以通过automake --add_miss解决
一旦修改了Makefile.am 就重新执行以下automake



到此整个项目的三部曲编译就搭建完成了，一共用到了autoscan/aclocal/autoconf/autoheader/automake五个命令，修改了configure.ac文件、创建了Makefile.am文件

其它都是自动的。

实际上还有很多选项可用，中间也有其它文件可改，慢慢来吧


最后，为了发布项目，可以删除中间构建的不必要存在的文件，只需留下：

configure.ac + config.h.in + configure + Makefile.am + Makefile.in + install-sh

如果在make时又遇到missingxxx，则再运行一次automake --add-missing即可

---------


另一种快速的构建方式：

1. autoscan -> configure.ac

仍然首先调动autoscan扫描源码，生成configure.scan，然后重命名为configure.ac并修改内容

2. 手动编写 Makefile.am

3. autoreconf

该命令按顺序解决了之前构建的若干步骤，直接生成了configure脚本，即直接可以执行构建三部曲


***这种构建方式下，如果已经存在configure.ac和Makefile.am，那么拷贝并修改它们，然后只需调用一个命令autoreconf即可！！！***


-----------------

添加生成库的版本号

Autotools系列工具本身不支持动态库的版本号添加，而libtool支持

libtool是一个独立的工具，专门用于构建库文件（而Autotools可以构建可执行文件等其它文件），libtools可以与autotools配合使用，也可以单独使用


1. 配合使用

以生成动态库为例，

``` Autotools 在Makefile.am下的动态库代码
#表示要生成动态库，并且要为动态库指定默认安装路径
libsocktecdlibdir=${prefix}
#表示要生成的动态库
libsocktecdlib_PROGRAMS=libsocketcd.so
#表示要生成的动态库所以来的源文件
libsocketcd_so_SOURCES=./socketcd/client/socketc.cpp ./socketcd/server/socketd.cpp
#等同于CXXFLAGS，编译时将使用
libsocketcd_so_CXXFLAGS= -fPIC -Werror -std=c++11 -Wall
#等同于LDFLAGS，链接时将使用
libsocketcd_so_LDFLAGS= -shared -fPIC 
```

``` libtools 在Makefile.am下的动态库代码
lib_LTLIBRARIES=libsocketcd.la
libsocketcd_la_SOURCES=./socketcd/client/socketc.cpp ./socketcd/server/socketd.cpp
libsocketcd_la_CXXFLAGS= -fPIC -Werror -std=c++11 -Wall
#这里支持了-release选项
libsocketcd_la_LDFLAGS= -shared -fPIC -release 0.1 
```

为此要在configure.ac中添加LT_INIT宏，并重新aclocal,autoconf

注意，可能出现ltmain相关的问题，则使用libtoolize工具即可（调用一次即可）



2. 单独使用


libtool引出了lo和la文件，是libtool可识别的，用于解决库依赖关系的文件，即，使用libtools生成了A库，同时生成了A.la文件，当其它程序使用A库时，可以通过libtools去找到A及A所依赖的库，以保证程序顺利执行。是否这样利用取决于库的调用者。调用者完全可以将la等文件丢弃，只使用so动态库文件，自己去解决相关依赖。

下面讨论如何生成Makefile以生成库

TBD


