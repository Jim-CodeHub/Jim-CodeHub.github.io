
# 1 Unix Basic

# 2 Process 
## 2.1 Process Environment
## 2.2 Process Control
## 2.3 Process Relationships
## 2.4 Deamon Processes
## 2.5 Interprocess communication
### 2.5.1 Signals 

#### 2.5.1.1 Concept
Signal is a 'soft interrupt'.

#### 2.5.1.2 Send Signals 

#### 2.5.1.3 Processing Signals








# <span id = "Appendix-A"> Appendix-A：UNIX Standards and Implementation </span>

# Posix - ISO/IEC 9945

## ISO/IEC 9945-1 : BASE DEFINITIONS
## ISO/IEC 9945-2 : SYSTEM INTERFACES
## ISO/IEC 9945-3 : SHELL AND ULTILITIES 
## ISO/IEC 9945-4 : RATIONALE 



----

# 2 File 


# 4 Threads
## 4.1 Thread Control


# 







-----

## 散装知识点

### setpgid(pid_t pid, pid_t pgid)

将pid所在的组ID设置为pgid

如果pid=0 ，表示选择该函数所在的进程组
如果pgid=0，表示用该函数所在的进程的PID作为进程组ID 

所以，setpgid(0, 0); 的含义为：将当前进程的进程组ID设置为当前进程的PID

注意：因为进程仅能修改进程本身组ID或其子进程组ID，所以参数pid必须其函数所在进程的PID或者它的子进程PID。


### diff，patch打补丁
通过diff比较新旧文件/目录差异，并以patch命令来打补丁

A --> A + 补丁

Tips ：patch 也可以逆向补丁

A + 补丁 --> A


