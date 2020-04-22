
# 1 Introduction

# 1.1 Background 

数据脆弱、易变且易失，因此对项目持续备份和组织管理是非常必要的，**版本控制**是实现此目标的高效方案。版本控制系统（VCS）是对变更进行追踪管理（记录文件内容变化），提供增、删、改、查和回溯等功能的系统。[Tips : VCS classification](#Appendix-A).

# 1.2 Git History

在Linux内核发展初期（1991~2002年）没有VCS维护，导致绝大多数的内核维护工作都花在了提交补丁和保存归档的繁琐事物上，2002年项目组开始使用BitKeeper来维护。2005年BitKeeper在其免费版本中加入额外限制，Linux社区意识到使用第三方软件不在是长久的解决方案，于是由Linus torvalds主导开发出了快速、并行、稳定且免费的分布式VCS - Git.

Tips : This is an information management tool from hell - *Linus torvalds*.


# 2 Instructions

# 2.1 Command

$ git [OPTION] cmd [ARGS]

Cmd | Args | Description  
:-:	| :-:  | :-:

书签：2020.4.9.pm - 《版本控制管理 第2版》














![stdExp](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/git命令导图.png)

1.3GIT基础
git对待数据像“快照流”，
注意：快照技术，不同于备份。理解了快照技术，就理解了GIT的基本思想。
次你提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。 为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件


git存储和提取版本使用校验和算法（SHA-1），以保证完整性
1.4命令行
1.5安装
1.6配置
初次运行git前的配置：git config，操作gitconfig文件，来设置控制git外观和行为的配置
gitconfig存在/ect/gitconfig中、对应git config --system 选项，表示本机全局
~/.gitconfig 或~/.config/git/config，对应git config --global，表示本机当前用户
.git/config ，表示本机该仓库
每一个级别可以覆盖上一个级别的配置
用户信息配置：
git config [--system/--global/无] user.name “xxx”
git config [--system/--global/无] user.email “xxxx”
git config --list 列出所有git能找到的配置s
git config <key> 列出某一个配置，如git config user.name

2.1 获取GIT仓库
1.对现有项目管理，在项目目录使用git init
2.从服务器克隆：git clone <url>。如git clone https://github.com/libgit2/libgit2，则本地出现libgit2目录，如果想重新指定仓库名：git clone <url> [name]，如git clone https://github.com/libgit2/libgti2  mylib
git支持http https和SSH协议
2.2 命令和几个区域
git status
git add 文件，以开始跟踪这个文件
跟踪区域分为：未跟踪区、跟踪区、不跟踪区
未跟踪区到跟踪区，使用git add +文件，反之使用git checkout +文件
不跟踪的，添加到.gitignore文件中

git add是一个多功能命令，1是可以添加跟踪文件，2是如果修改了已跟踪的文件，那么需要再次add一下，来暂存更新，如果不运行这一次add，那么下一步进行提交时，就没有这部分修改更新，换句话说，add的作用是为了提交做准备。

文件 .gitignore 的格式规范如下：
所有空行或者以 ＃ 开头的行都会被 Git 忽略。
可以使用标准的 glob 模式匹配。
匹配模式可以以（/）开头防止递归。
匹配模式可以以（/）结尾指定目录。
要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。
所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。
git diff 查看尚未暂存的改动，
git diff --cache
git difftool 可以调用插件 以图形化方式对比差异

git commit  存储快照！核心的一步，这就在git中增加了一个版本 
git commit -m指定信息
如果直接使用git commit，将调用git指定的编辑器，来指定提交信息
git config ... core.editor 命令可以指定编辑器
git commit -a 可以跳过暂存，即不必add之后再commit


git rm可以从已跟踪文件清单中移除文件，并连带从工作目录删除该文件，如果只想从清单中移除，而不想删除文件，使用git rm --cache。
如果删除之前，该文件修改过，还没有放入暂存区，则需要使用git rm -f 来删除，这是安全机制，避免没有形成快照的文件被删除，因为这样的数据不能被恢复。

git mv == mv A B, git rm A, git add B

git log 查看提交历史，使用-p参数可以查看每次提交的内容差异，使用-n指定数字可以查看最近n次的内容，--stat显示简略信息，使用--prettye=子选项，可以显示不同格式信息，子选项有oneline、short、full、fuller、format等等。使用--graph可以显示使用ASCII字符模拟的图形
还有其他更多选项

撤销操作：
git commit --amend 可以修改最近一次的提交信息

git reset HEAD +文件，是git add的逆操作

对git add之后的文件做了修改，要丢弃这部分修改使用git checkout -- +文件，该命令不可逆
1.6.1
一. 简介
Git（Global Information Tracker，全局信息追踪器）是一款免费、开源的分布式-版本控制系统（VCS），由Linus Torvalds创建（2005.04上线），最初用于管理Linux内核开发。因其性能优异，现已成为主流的分布式VCS。
Git官网：https://git-scm.com/；可在线安装：“#yum install git”；也可通过下载源码编译安装，源码下载地址：https://www.kernel.org/pub/software/scm/git/，其编译安装方式同通用步骤：“#configure && make && make install”；注：Git源码依赖Python、libcurl、perl、zlib、ssh等众多库。
https://git-scm.com/book
二.入门
a)创建版本库
新建一个空目录，或在你的工程顶级目录运行“#git init”，则创建了一个Git版本库，库名为隐藏目录“.git”，以下称“.git”目录为版本库。
b)添加文件
Git只对版本库内的文件负责，而不监测除版本库以外的任何目录。可以通过“#git add xxx”命令将项目文件添加到版本库，xxx可以是当前目录或其它目录下的一个或若干个文件。
使用git status可以查看当前版本库状态

git rm --cached <文件>..." 以取消暂存

add命令是暂存操作，Git将xxx文件暂存，暂存的目的是为避免项目文件的频发变化，可以多次添加，一次性提交，可以理解为add命令是将项目文件添加到缓冲区。
使用“git commit -m "t1" --author="zi <303683086@qq.com>"”命令，可将缓冲区的文件提交到版本库，-m和--author必须使用，-m是提交的备注信息，--author指定作者，格式必须为“Name <email>”，如果提示地址有问题，则可以通过配置文件永久指定地址或通过全局参数“--global”：“vim xxx/.git/config”修改name和email。或“git config --global user.name=’xxx@yyy.com’ && git config --global user.name ‘NAME’”也可以使用全局变量：“GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL”，上述两种方式是全局设置，可以通过不指定--global来本地生效。
-m 选项也可以通过环境变量配置，使每次提交时自动打开一个编辑器编写备注：“export GIT_EDITOR=vim”，这样只需运行命令“git commit”就会打开vim编辑器，按提示编写备注，保存退出即提交成功。
此时运行“git status”显示工作区干净的提示。
对xxx文件简单的修改，此时不必再运行add命令，直接可以commit提交，因为该文件已经提交到版本库，版本库已经对该文件建立了索引，但这次提交需要指定文件名：“git commit xxx”
两次提交之后，版本库中已经有两个版本的xxx了。

git log 可查看提交历史，从最早陈列一个简易列表，每次提交历史都包含一个“commit !@#$2341”，这是由Git产生的提交码，唯一指定提交历史，使用：“git show !@#$2341”，可显示当次提交的详细信息。如果不指定提交码则显示最近一次的提交历史。
使用git diff xxx yyy，（xxx yyy为提交码）可对比两次提交历史。

一种说法：注：git版本库中t版本库中存储每一提交文件的修改，而不存储文件本身（第一次提交存储全部内容）。git记录了每一次的修改内容，给每一次的修改记录索引，通过索引可以寻找和回滚历史版本。
有了Git，就不需要其它命令行工具来管理项目，比如要从项目中删除一个文件，则执行：“#git rm xxx”（前提是该文件已经提交到版本库），这样既从项目目录删除了xxx文件，又从版本库中删除了xxx文件。
删除之后同样要进行提交“#git commit”这样才能最终实现变更。
“git mv xxx yyy”命令可实现版本库文件的重命名，然后记得进行提交操作。

通过git clone 命令可以克隆任一版本库

git配置文件：git配置文件已.ini结尾，它们记录了Git命令使用的各种选项和设置，有些设置是个人偏好，有些设置是版本库正常运作的必须，三个位置存有git配置文件：“.git/config ~/.gitconfig /etc/gitconfig”，优先级按先后生效。也可以通过git config 或 git config --global临时生效。使用git config -l 列出所有配置文件的信息。可以使用git config --unset 或 git config --unset --global 来移除设置。
c)

三.
文件：
1.git 配置文件 分别在/etc/gitconfig ~/.gitconfig .git/config
对应命令：git config --system , git config --global, git config 
2.忽略检测文件 touch .gitignore, 支持glob匹配模式，注释用#
3.重命名git mv x y= mv x y, git rm x, git add y 
mkdir src; git mv x src;git commit(新建文件夹并移动)
4.日志git log、git log -p、git log -p -2、git log --stat
git log --pretty=oline/short/full/fuller/format/
git log --pretty=oline/format --graph
git log + git show (+SHA-1)
	5.git 中任何提交(commit)的都是可以恢复的

	 当多人在一个文件中协同作业时，提交自己的代码
	 到远程仓可能失败，是否失败取决于你是否是团队
	 第一次提交这次作业源码的人，如果不是，就要pull
	 一次，以更新团队代码到自己的源码中，然后在push

	 checkout 用于从（本地）库
	 中恢复之前提交过的某一节
	 点文件（包含删除的文件）

	 git remote show origin
	 git remote rename xx
	 git remote rm

	 git push origin master
	 account:xyZaki
	 password:umbrellxxxx
	 【设置密码，免推送输入：echo https://xyZaki:umbrellaxxx@github.com > ~/.git-credentials；vim ~/.gitconfig , 输入[credential] 
	 helper = store】
	 git reset 重置分支到某一次commit的指针
	 --soft 只重置，不做指针破坏
	 --hard 删除重置后，从重置点到最芯一次commit的指针,


	 git checkout -- + 文件 恢复文件（加--是为了避免分支名与文件名冲突）
	 git checkout + 分支 切换分支

	 git branch newb 创建分支
	 git checkout newb 切换分支
	 git checkout -b newb 等于上述2条命令

	 git merge SOMEBRANCH 合并其它分支到当前分支，以更新当前文件

	 补丁操作：
	 创建补丁：git format-patch -N
	 （N表示创建几个PATCH（从最后一次提交计算），结果是每次提交的补丁）
	 补丁用于给它人使用，以更新数据（推测可能不具备克隆的条件时使用）
	 应用补丁：git am（应用补丁并提交） /git apply（应用补丁不自动提交）


	 分支：git的分支，仅在本地分支、自己使用，是没有意义的。分支应该用于开发协作，分支应该起始于远程仓中（或由本地管理者本地建立后推送至远程仓）


	 --- 分支与切换、存储问题实例：PSCC31项目需新增1.32版本，但又需要保留之前的1.31版本，所以新增分支V1.32

	 git branch V1.32 //新建分支V1.32
	 git checkout V1.32 //切换到新的分支

	 然后修改了一些（已经存在的）文件

	 修改之后，此时想回到master分支修改一些东西，
	 git checkout master 
	 但发现在V1.32里面修改的内容，也在master分支上同步了
	 原因是，在新的分支修改完内容之后，需要git add . & git commit -m “xxx”
	 再切换，内容才不同步，
	 但是，我现在又不想对新的分支进行提交，
	 那么就需要暂存起来：git stash
	 再切换到master，内容就不会同步了，
	 在master操作完成之后，要切回V1.32，把暂存的内容调出来继续编写
	 git checkout V1.32
	 git stash list //查看暂存列表，因为可能暂存多次
	 //类似这样：statsh{0}: WIP on V1.32:dca0dd7 .....
	 git stash applay stats{0}//这样就调出了指定的暂存内容  

	 刚刚进行stash的时候，没有起名字，如果stash了多次，怎么才能调用出自己想要的呢？
	 那就是要起名字：git stash save xxxx
	 使用 git stash pop 可以调用最近一次stash的内容
	 使用git stash clear 清空所有stash
	 使用 git stash show 可以查看stash的修改

	 ====================================================================

## GitHub Action
	高效易用的 CI/CD 工作流，帮助我们自动构建、测试、部署我们的代码



## <span id = "Appendix-A"> Appendix-A：VCS classification </span>

分为：本地VCS、集中VSC、分布式VCS
最简单的版本控制，就是一个版本，一个目录，但这样很蠢，容易出很多问题，
本地VCS（如RCS），利用硬盘上保存“补丁集”的办法记录文件的变化，通过所有补丁可以计算出各个版本的内容
本地VCS只能供自己使用（或只能供本台机器使用，或拥有一个磁盘的机器使用），如果想要多个开发者协同工作，那就需要一个集中式的VCS（如CVS、Subversion、Perforce等），集中式VCS使用单一的一个服务器，保存所有文件的修订版本，所有协作者通过客户端连接到服务器。
集中式VCS最大的缺点就是服务器的单点故障，在恢复之前不能进行协作开发工作，如果服务器磁盘故障，那么整个项目的变更历史都将消失，各个客户端只保存了单独的快照
于是分布式VCS出现了（如Git、Mercurial、Bazaar、Darcs），它不只提取最新版本的快照，而是克隆代码仓，这样服务器有问题，就可以使用任意一个客户端恢复。
分布式VCS还有许多新的优势

先例--
SCCS source Code control System，源码控制系统是UNIX上最终的几个系统之一，由M.J.Rochkind与20世纪70年代开发， IEEE：364-370，这是有证可查的UNIX系统上的最早的VCS

SCCS提供的数据存储中心称为版本库，这个概念一致沿用至今

提供“锁"模型来保证开发过程有序
这是中心版本库的先祖

Git从bitkeeper继承了分布式概念，从Mercurial、Monotone继承了散列指纹来唯一标识文件内容的概念，

从内部实现来说，称为“内容可寻址文件存储”CAFS。


git不是一个简单的VCS，更像是一个小型的文件管理系统

相比其他VCS，git几乎所有的操作都在本地完成，因为本地拥有项目的完整历史，因此速度极其快
没有网络时可以愉快的编写项目，直到有网络再上传，这样的操作在其它VCS是不存在的

-------

github FUNCTIONS

- 开发者中心 ： https://developer.github.com/
	- marketplace 允许在github上售卖软件，github提供售卖相关模块



