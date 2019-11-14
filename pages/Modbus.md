# Modbus (OSI7/OSI2)
---
##  1. 简介
&ensp;&ensp;&ensp;&ensp;Modbus是由Modicon（施耐德）公司于1979年开发、用于PLC通信的一主（客户端）多从（服务器）式通信协议，在工业环境中应用广泛，现已成为事实上的业界标准。实现方式有：TCP/IP、串行通信（EIA/TIA-232-E, EIA-422,EIA/TIA-485-A等）和高速令牌网络Modbus PLUS。  
![ISO stack]()  
&ensp;&ensp;&ensp;&ensp;Modbus使用**功能码**来指定请求内容/应答结果，
##  2. Modbus over serial line
### 2.1 Master/Slaves protocol principle
Only **one master** (at the same time) and **1 to 247 slaves** nodes are connected to the bus. Slave nodes will always waiting for the master initiated a request and then response, slaves nodes can't comm with each other. The master initiated only one MODBUS comm at the same time.

The master initiated a request in two modes - **Unicast** and **Brodcast** :

- Unicast &ensp; &ensp; : the master addresses an individual slave, after receiving and processing the request, the slave returns a messate to the master
- Broadcast&ensp;: the master addresses all slaves  and no response from slaves
 
### 2.2 Address rules

**0** for broadcast, 1~247 for indeividual slaves and **248~255** are reserved.
The address must be unique at the same Modbus serial line, and the master has no specific address

### 2.3 Frame description

Protocol Data Unit &nbsp;&nbsp;&nbsp;&nbsp;(**PDU**)  &nbsp;  = &ensp;Function code + Data  
Application Data Unit (**ADU**) &ensp;= &ensp;Slave Address + Function Code + Data + CRC/LRC

- <u>*Slave Address*</u> : For master to address a slave, for slave to indicate who it is
- <u>*Function Code*</u>: For master to indicate what kind of action to perform, a slave set the same code when comm normally and set the code + 0X80 when exception occured
- <u>*Data*</u> : The field can be empty or set request/response parameters of function code
- <u>*CRC/LRC*</u> : Error checking field of ADU (exclude CRC/LRC)

### 2.4 Two transmission modes
**RTU**(Remote Terminal Unit) mode (default and must be inplemented) and **ASCII** mode (optional) 
#### 2.4.1 RTU transmission mode

The format(11bits) for each byte in RTU mode:  
**Coding system**&ensp;: 8-bit binary  
**Bits per Byte**&ensp;&ensp;&ensp;: 1 start bit,  8 data bits **(LSBit sent first)**, 1 bit for parity (Even is default), 1 stop bit (if no parity is selected, 2 stop bit is needed)
  
<u>Frame ADU (256Byte<sub>max</sub>) = 1 Byte Slave Address + 1 Byte Function Code + 0~252 Bytes Data + 2 Bytes CRC</u>

##### 2.4.1.1 RTU message framing

- External of frame : There is no obvious frame boundary in RTU mode, so timing is required. Message frames are separeted by a silent interval of <u>at least</u> 3.5 character times (**t3.5**).   
- Internal of frame&ensp;: The entire message frame must be transmitted as a continuous stream of characters, if a silent interval of more than 1.5 character times (**t1.5**) occurs between two characters, the message frame is declared incomplete and should be discarded by the receiver.

*Remark:*  
t1.5 and t3.5 implement will cause a heavy CPU load when high comm baud rates is used, so when baud rates <= 19200Bps these two times must be strictly respected, when baud rates > 19200Bps **750us** and **1.75ms** is used for t1.5 and t3.5

##### 2.4.1.2 <font color=red>Communication logic</font>

- Device (master/slave) power on and start t3.5 loop to receive incomplete frame until expired then turns to IDLE state, frame receive or emit will be performed (only) from IDLE state.  
- If demand of **emission** is command, t3.5 loop is started until expired then turns to IDLE state
- If demand of **reception** is command, t1.5 and t3.5 loop is started when the first character received 
	- until t1.5 expired, frame will be checked (CRC, Parity and Slave addr) meanwhile, then the flag will be set (OK or NOK) 
	- until t3.5 expired, frame will be deleted if it's NOK or will be processed if OK

**Note**  : t1.5 or t3.5 loop means that t<sub>n</sub> will be init by each character until time-out

##### 2.4.1.3 CRC Checking

The CRC field checks the entire message (ADU exclude CRC and except parity bits), CRC filed conttains 2 Byte values and low order byte is sent first

#### 2.4.2 ASCII transmission mode
#### TBD

