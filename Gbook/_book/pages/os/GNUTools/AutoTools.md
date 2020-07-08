
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



到此整个项目的三部曲编译就搭建完成了，一共用到了autoscan/aclocal/autoconf/autoheader/automake五个命令，修改了configure.ac文件、创建了Makefile.am文件

其它都是自动的。

实际上还有很多选项可用，中间也有其它文件可改，慢慢来吧


最后，为了发布项目，可以删除中间构建的不必要存在的文件，只需留下：

configure.ac + config.h.in + configure + Makefile.am + Makefile.in + install-sh

如果在make时又遇到missingxxx，则再运行一次automake --add-missing即可




