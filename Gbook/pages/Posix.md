
# 1 Unix Basic

# 2 Process 

## 2.1 Process Environment

## 2.2 Process Control

## 2.3 Process Relationships

## 2.4 Deamon Processes

## 2.5 Interprocess communication

### 2.5.1 Signals 

Signal is a 'soft interrupt'.

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

