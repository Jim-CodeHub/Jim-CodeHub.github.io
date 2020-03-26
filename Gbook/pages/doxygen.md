doxygen 根据配置文件产生html和其它文档

格式：doxgen XXXX //XXX表示配置文件

配置文件里面都是相关的变量，如可以配置语言、搜索框、输出路径等等

OUTPUT_DIRECTORY 表示输出路径

GENERATE_LATEX 表示是否生成latex

latex是生成PDF文档的资料，要生成PDF，先使用doxygen生成latex，然后再使用latex命令在doxygen输出的latex目录下生成PDF

latex需要单独安装包支持https://www.tug.org/texlive/acquire-netinstall.html

安装包名称：install-tl-unx.tar.gz

安装好之后，运行make即可
