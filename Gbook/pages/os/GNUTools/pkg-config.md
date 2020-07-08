
pkg-config 读取指定目录".pc"文件，以检查和打印库的相关信息，如安装库时的CFLAGS标志、库路径等等有很多选项

当你的库被别人引用时，可以通过"pkg-config opencv –libs –cflags" 来列出库的路径和CFLAGS标志

$ gcc `pkg-config --cflags 库名 --libs 库名` xx.c -o x.out，于是就可以顺利编译了


如果没有.pc文件，pkg-config是不工作的

所以，如果你的库要向被别人使用上述方式顺利使用，那么就要在安装包中配置一个.pc文件，然后在安装库时一同将.pc安装

pkg-config 会读取 PKG_CONFIG_PATH 和 /usr/lib下的 .pc文件

所以配置好PKG_CONFIG_PATH 就可以让pck-config顺利读取pc文件


编写一个pc文件：

Name: 该模块的名字，比如你的pc名字是xxxx.pc，那么名字最好也是xxxx。
Description: 模块的简单描述。上文pkg-config –list-all命令出来的结果，每个名字后面就是description。
URL: 用户可以通过该URL获得更多信息，或者下载信息。也是辅助的，可要可不要。
Version: 版本号。
Requires: 该模块有木有依赖于其他模块。一般没有。
Requires.private: 该模块有木有依赖于其他模块，并且还不需要第三方知道的。一般也没有。
Conflicts: 有没有和别的模块冲突。常用于版本冲突。比如，Conflicts: bar < 1.2.3，表示和bar模块的1.2.3以下的版本有冲突。
Cflags: 这个就很重要了。pkg-config的参数–cflags就指向这里。主要用于写本模块的头文件的路径。
Libs: 也很重要，pkg-config的参数–libs就指向这里。主要用于写本模块的库/依赖库的路径。
Libs.private: 本模块依赖的库，但不需要第三方知道。






