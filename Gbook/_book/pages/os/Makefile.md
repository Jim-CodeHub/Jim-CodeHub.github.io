
./configure ./make ./make install

项目 之 标准构建方式的生成


解析1 : *./configure* 程序读取当前目录下的*Makefile.in*文件，来生成*Makefile*

configure ------
				| ----> Makefile
Makefile.in-----


1. 生成 configure 程序 

autoconf + configure.ac --> configure

configure.ac 文件 由 autoscan命令 扫描源码而生成

autoscan + 源码 --> configure.scan --> 改成configure.ac

生成 configure 总结：
	- $ autoscan
	- $ mv configure.scan configure.ac
	- $ autoconf

注意：configure.ac 文件要做相应的修改才能达到最终自动化编译的目的

2. 生成 Makefile.in 文件

手动编写Makefile.am文件，配合configure.ac 由automake命令 生成Makefile.in文件

生成 Makefile.in 总结：
	- $ automake




最后的总结：首先源码准备好，然后准备两个依赖文件 **configure.ac** 和 **Makefile.am**，后者需要手写，前者可以通过autoscan生成，但还是要修改。

于是：

autoconf + configure.ac = configure
automake + Makefile.am  = Makefile.in

configure + Makefile.in = Makefile


注意：在生成configure的过程中，还可以添加一个aclocal.m4文件，该文件是aclocal生成的。于是：autoconf+configure.ac+aclocal.m4=configure

