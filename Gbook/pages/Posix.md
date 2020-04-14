
# 1 Unix Basic

# 2 Process 

## 2.1 Process Environment

## 2.2 Process Control

## 2.3 Process Relationships

## 2.4 Deamon Processes

## 2.5 Interprocess communication

### 2.5.1 Signals 

Signal is a 'soft interrupt', which used to handle asynchronous events.

#### 2.5.1.2 Send Signals 

- 终端发送
	- 快捷键：$stty -a 查看发送终端信号快捷键集合
	- 命令行：'kill [-s SigName/-n SigNum] PID/GID'. or 'Kill -L/-l' (显示系统SigName列表)

- 函数发送
	- 给指定进程发送指定信号：kill(PID, SIG)，当PID大于0时表示给指定进程发送信号，等于0时表示给当前进程发送信号，等于-1时表示给所有进程发送信号，小于-1时表示给进程组发送信号
	- 给当前进程发送指定信号：raise(SIG)
	- 给当前进程发送终止信号：abort();
	- 给当前进程发送闹钟信号：alarm(second); 超时后将发送SIGALRM信号，默认动作是杀死进程，重复调用该函数将重载设定时间并返回上次剩余时间，当参数为0时表示取消之前的闹钟，该函数一定要放置在捕捉函数之后
	- 给指定进程发送并附加值：sigqueue(PID, SIG, VAL); 使用sigaction()获取VAL值(Union).

#### 2.5.1.3 Processing Signals

- 忽略信号：被忽略的信号默认动作是忽略/终止进程
- 捕捉信号：
	- signal(SIG, CALLBACK); 同一个信号注册多次则最后一个回调函数有效，该函数适合单信号处理环境
	- sigaction(SIG, ACT, OLDACT); 


## 3 Asyn I/O (AIO)

## 3.1 I/O Multiplexing 

	背景：
	对于文件描述符的状态（如socket的文件描述符、open的文件描述符等等，系统并不主动告诉我们任何信息，文件描述符关联的文件发生的任何变化都需要我们主动去查询，

	有“阻塞+多进程/多线程”、“非阻塞查询"和”异步I/O“可选，但这些方法都不理想

	I/O多路复用是单进程下的 信号、轮询等多种方式的组合体.



	I/O多路复用 - 构造一个描述符列表，调用特定函数查询这些列表，直到这些描述符中有一个已经准备好进行I/O时才返回

	select, pselect, 和 poll 是posix标准内的，eselect在Linux中存在

- select

	int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);

	timeout - 在描述符列表中没有可读、可写、异常时，函数阻塞的时长，或描述为“没有捕捉到信号”等待的时长。 
			  NULL为永久等待，即阻塞模式
			  timeout->tv_sec==0 && timeout->tvu_sec=0 不等待，轮询一次所有的文件描述符就返回，即非阻塞模式
			  对上述成员赋值即表示等待固定时长，如果超时后返回值为0表示没有可用fd

			  文件描述符是否是阻塞的，不会影响select，它的超时只由timeout决定

	readfds/writefds/exceptfds 分别为读、写、异常文件描述符集的指针，POSIX对于fd_set类型的实现是可选择的，因为实际应用中并不会
	直接使用该结构体，而是调用如下函数宏：

	int  FD_ISSET(int fd, fd_set *set); //判断文件描述符是否属于该集合
	void FD_SET(int fd, fd_set *set);	//添加文件描述符
	void FD_CLR(int fd, fd_set *set);   //删除文件描述符
	void FD_ZERO(fd_set *set);			//删除所有文件描述符

	nfds - 最大文件描述符编号+1, 因为文件描述符编号从0开始。该参数是一个范围限制，如果设置为N，则上述三个集合的文件描述符都必须小于N才能被检测，
	非常保险的做法是设置FD_SIZE，该宏表示支持的最大文件描述符值。通常通过打开的文件描述符做比较，来确定哪一个才是最大的。

	返回值：

	-1 出错，返回0（超时没有fd准备好），>0表示已经准备好了的文件描述符的数量，如果同一个描述符同时准备好读和写则返回值对其计数两次

	准备好的含义是，select返回之后（大于0），可以read/write，且不会阻塞。另外对于普通文件，read、write和异常文件描述符总是准备好的


	注意：select 遇到文件尾端时仍然认为是可读的，直到读完该尾端。select返回后，调用read返回0，因为到达了尾端

- pselect

	int pselect(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, const struct timespec *timeout, const sigset_t *sigmask);

	pselect 将超时类型改为timspec，能精确到纳秒， 并增加了sigset_t类型，即信号量屏蔽集，
			当sigmask为NULL时，pselect与select表现相同
			信号屏蔽字，即信号屏蔽集，被屏蔽的信号不能发送给pselect所在进程（实际上是阻塞信号，因为恢复后信号仍然可用，被阻塞的信号仍然被发送），返回时恢复屏蔽信号。

- poll 
	
	poll支持任何类型的文件描述符（而select只支持读、写和异常的文件描述符），

	int poll(struct pollfd *fds, nfds_t nfds, int timeout);

	fds应该是一个数组，pollfd结构体如下：

	struct pollfd {
		int fd;		//要检测的文件描述符，当设置小于0时，poll将忽略
		short event;	//告诉用户感兴趣的事件
		short revents; //内核返回给用户当前发生的事件
	};

   nfds表示数组元素个数

   events可选值为POLLIN/.....以及它们的或值
   reevents另外可返回POLLERR/POLLHUP/POLLNVAL异常，这三个值events不能设置

   POLLUP表示挂断，此时只能读文件描述符，而不能写


   timeout = -1 表示永久等待，当有文件描述符准备好时返回一个+值，如果收到信号中断则返回-1, errno = EINTR。

   = 0 不等待

   >0 毫秒值，如果超时未准备好则poll返回0

   与select一样，文件描述符是否阻塞不影响poll，只由timeout决定





	







---

# <span id = "Appendix-A"> Appendix-A：UNIX Standards and Implementation </span>

## Posix - ISO/IEC 9945

## ISO/IEC 9945-1 : BASE DEFINITIONS
## ISO/IEC 9945-2 : SYSTEM INTERFACES
## ISO/IEC 9945-3 : SHELL AND ULTILITIES 
## ISO/IEC 9945-4 : RATIONALE 

---

## 散装知识点

### setpgid(pid_t pid, pid_t pgid)

将pid所在的组ID设置为pgid

如果pid=0 ，表示选择该函数所在的进程组
如果pgid=0，表示用该函数所在的进程的PID作为进程组ID 

所以，setpgid(0, 0); 的含义为：将当前进程的进程组ID设置为当前进程的PID

注意：因为进程仅能修改进程本身组ID或其子进程组ID，所以参数pid必须其函数所在进程的PID或者它的子进程PID。


------------

以下不是Posix接口，是Linux-specific



# 1 Inotify

The inotify API provides a mechanism for monitoring and returning filesystem (file and directory) events.

## 1.1 API

`#include <sys/inotify.h>`

### 1.1.1 int inotify_init(void) & int inotify_init1(int flags)

Initializes a new inotify instance and returns a file descriptor associated with a new inotify event queue, `inotify_init()` is same as `inotify_init1()` when param flags = 0

#### 1.1.1.1 Parameters 

IN_NONBLOCK/IN_CLOEXEC can be set for *flags* to perform block and close-on-exec behavior (for inotify_init1()). 

#### 1.1.1.2 Return value

On success, return a new file descriptor. On error, -1 is returned, and errno is set to indicate the error :

- EINVAL - (inotify_init1()) An invalid value was specified in flags.
- EMFILE - The user limit on the total number of inotify instances has been reached.
- EMFILE - The per-process limit on the number of open file descriptors has been reached.
- ENFILE - The system-wide limit on the total number of open files has been reached.
- ENOMEM - Insufficient kernel memory is available.

#### 1.1.1.3 Note

Minimum kernel/glibc version requirements is V2.3.13/V2.4 for `inotify_init()` and V2.6.27/V2.9 for `linotify_init1()`.

### 1.1.2 int inotify_add_watch(int fd, const char \*pathname, uint32_t mask)

Add a new watch or modifies an existing watch for the file or directory whose location is specified in param *pathname* to the monitor queue.

#### 1.1.2.1 Parameters 

*fd* is referring to which has been initialized instance. The events to be monitored for *pathname* are specified in the *mask* bit-mask argument.

#### 1.1.2.2 Return value 

On success, return a nonnegative watch descriptor.  On error, -1 is returned and errno is set appropriately :

- EACCES - Read access to the given file is not permitted.
- EBADF  - The given file descriptor is not valid.
- EFAULT - *pathname* points outside of the process's accessible address space.
- EINVAL - The given event mask contains no valid events; or fd is not an inotify file descriptor.
- ENAMETOOLONG - *pathname* is too long.
- ENOENT - A directory component in *pathname* does not exist or is a dangling symbolic link.
- ENOMEM - Insufficient kernel memory was available.
- ENOSPC - The user limit on the total number of inotify watches was reached or the kernel failed to allocate a needed resource.

#### 1.1.2.3 read() 

`ssize_t read(int fd, void *buf, size_t count)` SHALL called to featch filesystem events from structure `struct inotify_event{}` :  

```
struct inotify_event{  
	int      wd;       /* Watch descriptor */ 
	uint32_t mask;     /* Bits, mask describing event */  
	uint32_t cookie;   /* Unique cookie associating related events only for IN_MOVED_FROM and IN_MOVED_TO */  
	uint32_t len;      /* Size of name field (including '\0') */  
	char     name[];   /* Optional terminated with '\0', exist only when file events watched and reaturn, and may have multi '\0' endings to alignment content */  
}  
```

Object		| Macro				| Events description						| Note 
:-:			| :-:				| :-:										| :-:
file		| IN_ACCESS			| accesse									| +
file		| IN_CLOSE_WRITE	| opene for writing was closed				| +
file		| IN_MODIFY			| modify									| +
file		| IN_MOVED_FROM		| rename an old name						| +
file		| IN_MOVED_TO		| rename a new name							| +
file		| IN_MOVE			| = IN_MOVED_FROM &#124 IN_MOVED_TO			| +
file & dir	| IN_CREATE			| create									| +
file & dir  | IN_DELETE			| delete									| + 
file & dir  | IN_OPEN			| open										| *
file & dir	| IN_CLOSE_NOWRITE	| opened for non-writing was closed			| * 
file & dir  | IN_CLOSE			| = IN_CLOSE_WRITE &#124 IN_CLOSE_NOWRITE	| *
file & dir	| IN_ATTRIB			| attributes were changed					| *
file & dir  | IN_MOVE_SELF		| -											| * 
file & dir  | IN_DELETE_SELF	| -											| *
\-			| IN_ALL_EVENTS		| monitor all events						| for add
\-			| IN_EXCL_UNLINK	| except unlink events (since Linux 2.6.36) | for add
\-			| IN_DONT_FOLLOW	| - (since Linux 2.6.15)					| for add
\-			| IN_MASK_ADD		| append instead cover for the same pathname| for add
\-			| IN_ONE_SHOT		| remove it once occure (since Linux 2.6.16)| for add
\-			| IN_ONLYDIR		| monitor only if it's directory			| for add
\-			| IN_IGNORED		| objcet which monitored has been removed	| for read
\-			| IN_ISDIR			| about directory							| for read
\-			| IN_Q_OVERFLOW		| wd == -1									| for read
\-			| IN_UNMOUNT		| filesystem unmount						| for read  

<br><center> <font color=gray> mask of structure inotify_event and for inotify_add_watch() param </font> </center><br>

Tips : \* refer that both for the directory itself and for objects inside the directory and + refer that only for objects inside the directory.

#### 1.1.2.4 Note 

The param *buf* of read() should be set bigger enough for the reason of the member of structure inotify_event <u>name</u>, otherwise 0 will be return for the kernel version 2.6.21and EINVAL will be set for errno for the kernel version 2.6.21. 

### 1.1.3 inotify_rm_watch(int fd, int wd)

Remove an existing watch (*wd*) from an inotify instance which associated with the file descriptor *fd*.

#### 1.1.3.1 Parameters

-

#### 1.1.3.2 Return value 

On success, inotify_rm_watch() returns zero.  On error, -1 is returned and errno is set to indicate the cause of the error:

- EBADF - fd is not a valid file descriptor.
- EINVAL - The watch descriptor wd is not valid; or fd is not an inotify file descriptor.

#### 1.1.3.3 Note

Removing a watch causes an IN_IGNORED event to be generated for this watch descriptor.

### 1.1.4 Config 

- /proc/sys/fs/inotify/max_queued_events, config the max queue events
- /proc/sys/fs/inotify/max_user_instances, config the max user instance
- /proc/sys/fs/inotify/max_user_watches, config the max user watch

### 1.1.5 Bug & Note

NOTE: 所有wd删除后，调用close函数关闭inofiy fd，以释放内核资源

BUG:
在inotify_rm_watch从监视列表中删除项目后，如果没有调用close关闭文件描述符，那么该项目已产生的事件仍然是可读取的，
，如果inotify_add_watch在列表中增加项目，则很可能分配到那些删除但未关闭的文件描述符，如果此时用户又去读，那么读到的将不是预期的
。避免这个问题的方法是要么删除之间就把该读的读取，删除后就关闭文件描述符，那么删除后就不要在读取了。

	如果read是在阻塞模式下，没有事件发生时将一直阻塞，直到事件发生或者被signal信号中断。

	被信号中断的情况是read函数调用失败（错误为EINTR）导致的系统自发发送的。

NOTE:
fallocate函数在3.19之前不产生事件

NOTE：

inotify API不报告由于mmap（2）、msync（2）和munmap（2）而可能发生的文件访问和修改。

inotify 监视文件是通过其文件名作为ID，如果文件名改变（且监视列表中没有这个文件名）那么将失去对该文件的监视

注意：Inotify是基于inode的，可以为所监视的文件在其它任意目录建立软链接，任何对软链接的操作如同操作文件本身

由于 inotify 是基于 inode 的，所以 mv 后的目录还在监听中，并且 wd 没有变化，所以目录下文件的改动还是会触发事件。

### 1.1.6 Code example

```
#include <errno.h>
#include <poll.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/inotify.h>
#include <unistd.h>

/* Read all available inotify events from the file descriptor 'fd'.
   wd is the table of watch descriptors for the directories in argv.
   argc is the length of wd and argv.
   argv is the list of watched directories.
   Entry 0 of wd and argv is unused. */

static void handle_events(int fd, int *wd, int argc, char* argv[])
{
	/* Some systems cannot read integer variables if they are not
	   properly aligned. On other systems, incorrect alignment may
	   decrease performance. Hence, the buffer used for reading from
	   the inotify file descriptor should have the same alignment as
	   struct inotify_event. */

	char buf[4096]
		__attribute__ ((aligned(__alignof__(struct inotify_event))));
	const struct inotify_event *event;
	int i;
	ssize_t len;
	char *ptr;

	/* Loop while events can be read from inotify file descriptor. */

	for (;;) {

		/* Read some events. */

		len = read(fd, buf, sizeof buf);
		if (len == -1 && errno != EAGAIN) {
			perror("read");
			exit(EXIT_FAILURE);

		}

		/* If the nonblocking read() found no events to read, then
		   it returns -1 with errno set to EAGAIN. In that case,
		   we exit the loop. */

		if (len <= 0)
			break;

		/* Loop over all events in the buffer */

		for (ptr = buf; ptr < buf + len;
				ptr += sizeof(struct inotify_event) + event->len) {

			event = (const struct inotify_event *) ptr;

			/* Print event type */

			if (event->mask & IN_OPEN)
				printf("IN_OPEN: ");
			if (event->mask & IN_CLOSE_NOWRITE)
				printf("IN_CLOSE_NOWRITE: ");
			if (event->mask & IN_CLOSE_WRITE)
				printf("IN_CLOSE_WRITE: ");

			/* Print the name of the watched directory */

			for (i = 1; i < argc; ++i) {
				if (wd[i] == event->wd) {
					printf("%s/", argv[i]);
					break;
				}
			}

			/* Print the name of the file */

			if (event->len)
				printf("%s", event->name);

			/* Print type of filesystem object */

			if (event->mask & IN_ISDIR)
				printf(" [directory]\n");
			else
				printf(" [file]\n");
		}
	}
}

int main(int argc, char* argv[])
{
	char buf;
	int fd, i, poll_num;
	int *wd;
	nfds_t nfds;
	struct pollfd fds[2];

	if (argc < 2) {
		printf("Usage: %s PATH [PATH ...]\n", argv[0]);
		exit(EXIT_FAILURE);
	}

	printf("Press ENTER key to terminate.\n");

	/* Create the file descriptor for accessing the inotify API */

	fd = inotify_init1(IN_NONBLOCK);
	if (fd == -1) {
		perror("inotify_init1");
		exit(EXIT_FAILURE);
	}

	/* Allocate memory for watch descriptors */

	wd = calloc(argc, sizeof(int));
	if (wd == NULL) {
		perror("calloc");
		exit(EXIT_FAILURE);
	}

	/* Mark directories for events

	   - file was opened
	   - file was closed */

	for (i = 1; i < argc; i++) {
		wd[i] = inotify_add_watch(fd, argv[i],
				IN_OPEN | IN_CLOSE);
		if (wd[i] == -1) {
			fprintf(stderr, "Cannot watch '%s'\n", argv[i]);
			perror("inotify_add_watch");
			exit(EXIT_FAILURE);
		}
	}

	/* Prepare for polling */

	nfds = 2;

	/* Console input */

	fds[0].fd = STDIN_FILENO;
	fds[0].events = POLLIN;

	/* Inotify input */

	fds[1].fd = fd;
	fds[1].events = POLLIN;

	/* Wait for events and/or terminal input */

	printf("Listening for events.\n");
	while (1) {
		poll_num = poll(fds, nfds, -1);
		if (poll_num == -1) {
			if (errno == EINTR)
				continue;
			perror("poll");
			exit(EXIT_FAILURE);
		}

		if (poll_num > 0) {

			if (fds[0].revents & POLLIN) {

				/* Console input is available. Empty stdin and quit */

				while (read(STDIN_FILENO, &buf, 1) > 0 && buf != '\n')
					continue;
				break;
			}

			if (fds[1].revents & POLLIN) {

				/* Inotify events are available */

				handle_events(fd, wd, argc, argv);
			}
		}
	}

	printf("Listening for events stopped.\n");

	/* Close inotify file descriptor */

	close(fd);

	free(wd);
	exit(EXIT_SUCCESS);
}
```

Tips : function `select()`, `poll()` and `epoll()` can be used for inotify.



网上的列表

Constant Name	Linux Name	Interpretation
Access	IN_ACCESS	Object accessed
Modify	IN_MODIFY	Object modified
Attributes	IN_ATTRIB	Object attributes modified
Open	IN_OPEN	File opened
CloseWrite	IN_CLOSE_WRITE	File closed after contents changed
CloseOther	IN_CLOSE_NOWRITE	File closed without contents changed
Close	IN_CLOSE	File closed
MoveFrom	IN_MOVED_FROM	Object moved from location
MoveTo	IN_MOVED_TO	Object moved to location
Move	IN_MOVE	Object moved
MoveSelf	IN_MOVE_SELF	Object being monitored is deleted
Create	IN_CREATE	Object created
Delete	IN_DELETE	Object deleted
DeleteSelf	IN_DELETE_SELF	Object being monitored is deleted
Ignored	IN_IGNORED	Ignored
DirEvent	IN_ISDIR	The monitored object to which the event occurred is a directory
AllEvents	IN_ALL_EVENTS	Any event
The constants are set up so they can be or-ed together to create meaningful combinations of event types.
