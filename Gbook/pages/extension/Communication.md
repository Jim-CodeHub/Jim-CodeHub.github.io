
CATALOG

一. 串行通信基础	1
1. 异步串行通信	1
2. 同步串行通信	1
3. 主从串行通信	2
二. 串行通信线路	2
1. 单工通信	2
2. 半双工通信	2
3. 全双工通信	3
三. 串行通信协议	3
1. UART	3
(1) UART组成	4
(2) RS232	4
(3) RS422	5
(4) RS485	6
2. SPI	6
3. IIC	7
//TBD	7
附录A：奇偶校验（Parity check）	8
附录B：波特率与比特率	9
附录C：握手（流控）	10
附录D：RS232接口标准	11
附录E：UART转RS232（DB9）	12
附录F：UART转RS422	13
附录G：共模抑制	14


一.串行通信基础
计算机的数据传输有并行和串行两种方式，并行传输的特点是每个数据位都使用独立的数据线同步传输，传输速度快、效率高，缺点是长距离传输成本高且存在电磁干扰，因此常用于短距离的计算机内部数据传输。
串行数据传输的特点是所有数据位都通过一根数据线传输，速度相对较慢，但传输距离远（几十米到上千米）、成本低，是网络通信、处理器与外设通信的主要方式。串行通信按时序分为同步和异步两种方式，按控制规则分为一主多从和多主多从两种方式。

并行接口一定都是同步的，因为为了高速，不会向异步传输那样增加很多校验位，同时 显然 就必须增加一根时钟线，传输的高速特性也同时限制了传输长度

1.异步串行通信
异步串行通信是以数据帧为单位的间歇传输形式，通过插入标志位来实现数据收发双方的协调。数据帧中包含起始位、数据位、奇偶校验位和停止位。起始位（1位）用于标志传输开始、数据位为5~9位、奇偶校验位用于数据有效性检查（见附录A）、停止位（1/1.5/2位）用于标志数据传输已结束。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/asyn_serail_comm.png)

上图方框部分表示该数据位可能是高电平“1”，也可能是低电平“0”，每一位都有固定的时间宽度，称为位时间。“MARK”表示空闲时高电平，SPACE表示有效电平，这两个术语可以追溯到二十世纪六十年代。
异步串行通信可以是连续的：上一帧的停止位之后立即发送下一帧的起始位；也可以是断续的，新的数据帧可以在任何时刻开始，并不要求整数倍的位时间。
2.同步串行通信
同步串行通信将传输数据按相等的时间间隔划分成数据帧进行传输，并同时发出同步信号以保证收发同步，每个数据帧的开始用同步字符来标志。
同步串行通信要求收发双方的时钟信号（频率、相位等）必须始终同步，且每个数据帧之间不能有间隔，如果线路空闲或没有数据传输，则需发送同步字符串。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/syn_serail_comm.png)
同步串行通信的特点是传输效率高，其数据帧大小几乎不受限制（可达几十到几千字节），但因对时钟同步的要求导致硬件实现成本较高，所以同步串行通信一般用于数据量大、对速度要求较高的串行通信场景。

同步串行通信就是在异步串行通信的基础上加了一条时钟线， 其实这就是SPI总线

3.主从串行通信
在主从通信系统中至少有一个为主机，并允许有多个主机和多个从机。主机负责发送时钟和仲裁（如片选、广播）信号，从机通过总线仲裁来判定是否与主机通信。
二.串行通信线路
串行通信线路包括单工通信、半双工通信和全双工通信，同步和异步串行通信都可以使用这几种形式：
1.单工通信
单工（Simplex）形式使用一根数据线进行数据的单向传输，通信双方固定一端为发送端，另一端为接收端。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单工通信.png)

例如，计算机与打印机之间的串行通信就是单工形式，只能有计算机向打印机传输数据，而不能有反向数据。
2.半双工通信
半双工（Harf-duplex）形式的数据传输是双向的，但任何时刻只能由其中一方发送数据，另一方接收数据。半双工形式既可以使用一根数据线，也可以使用两根数据线。下图为一根数据线示例。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/半双工通信.png)

3.全双工通信
全双工（Full-duplex）形式的数据传输是双向的，可以同时发送和接收数据，因此全双工形式的串行通信需要两条数据线。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/全双工通信.png)

三.串行通信协议
串行通信协议包含对接口电气属性的定义、电路结构及线路连接方式的实现、数据传输性能和传输方式的描述等等，所以也称串行通信协议为串行通信接口或串行通信总线。
在现代MCU内部，基本都集成了一个或多个（相同和不同的）串行通信总线，通过配置寄存器即可实现协议所定义的功能。
1.UART
UART（Universal Asynchronous Reciver/Transmitter），通用异步接收器/发送器，也称异步通信接口适配器（ACIA）。UART是最简单的串行通信实现方式。UART出现在电子通信早期，当时是一个由齿轮、继电器和电动机械寄存器组成的机械设备。
一般MCU都集成USART（通用同步和异步接收器/发送器），它可以实现UART和USRT（通用同步接收器/发送器）功能，但在单片机的串行通信中，最常用的是异步方式，因此常把USART写为UART。
异步模式的UART不分主从机，在发送数据的同时可以接收数据。如果在同步模式下，则当使用外部时钟时，UART处于从机地位，当使用内部时钟时，UART处于主机地位。
(1)UART组成
UART由发送缓冲寄存器、接收缓冲寄存器和输入移位寄存器组成，发送缓冲寄存器的本质是一个移位寄存器，它将计算机内的并行数据转换为串行数据，并按配置插入标志位形成数据帧，然后通过Tx接口输出。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/uart.png)
接收缓冲寄存器和输入移位寄存器组成双缓冲结构，以避免在数据接收过程中出现数据帧重叠错误。输入移位寄存器将Rx接口输入的串行数据过滤，并转换成并行数据，然后存入接收缓冲寄存器，计算机通过读取接收缓冲寄存器来获得数据。
(2)RS232
RS-232C（简称RS232）是古老的串行通信接口标准，可追溯到20世纪60年代，现在正逐渐被高速网络取代，但它对嵌入式系统来说仍然是一种非常重要、简单而有用的连接工具。RS232通信距离可达25米，传输速度可达38.4kbps。
RS232最开始被用来连接数据终端设备（DTE）和数据通信设备（DCE），因此RS232协议标准默认其一端连接的是DTE，另一端连接的是DCE。在计算机出现之前，DTE是一种电传打字机，DCE是一种调制解调器：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/DTE-DTE.png)

当计算机出现以后，刚开始没有更多的可靠通信接口可选用，于是RS232被应用到计算机当中（计算机既可以作为DTE设备也可以作为DCE设备），并一直沿用到现在。RS232使用DB9（D型9引脚接口）或DB25（D型25引脚接口）作为连接接口，其标准定义参看附录D。
如果单片机与计算机通信则必须将单片机看成DTE或DCE设备，此时需要将单片机UART接口改装成DB9或DB25，然后使用RS232与计算机进行通信。需要注意的是单片机使用的TTL电平与RS232电平不一致，需要进行电平转换（参看附录E）：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单片机-主机通讯.png)

当使用UART在两个单片机之间通信时只需对接Tx和Rx接口即可：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/单片机与单片机通讯.png)

(3)RS422
RS232传输的数据位的电压电平是相对于本地的地，这种不平衡的传输方式有很差抗噪性。RS422使用双绞线传输数据（见附录G），传输距离可达1200m，双绞线电压差在4V~12V之间，该电压差值范围刚好在RS232逻辑电平范围之内，如果将RS422双绞线中负电压一端接地，则可实现与RS232兼容。（RS422与UART的连接参看附录F）。
注意，RS422只规定了标准电压，而没有像RS232一样规定插脚引线等实现细节，所以RS422的具体实现是未定义的，它可以按照实现者的想法自由连接。
(4)RS485
有些RS422的接口芯片具有三态功能，当RS422使用这种芯片实现时就扩展成为RS485。RS485可以实现高效率、低成本的一主多从式多机通信，并支持许多通信协议。它是最简单和最容易实现的网络之一。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/rs485.png)
如图，主机和从机之间使用一根双绞线进行通信，所有事务都有主机来初始化，从机只有在接收到特定命令后才进行传输。
2.SPI
SPI（Serial Peripheral Interface）串行外围设备接口，是由Motorola公司开发的同步、全双工、一主多从式串行通信总线，常用于微控制器与其外围设备的连接。
(1)SPI组成
SPI有4根信号线：MOSI/SI/SDI（Master Out Slave In）、MISO/SO（Master In Slave Out）、SCLK/SCK、SS/CS。大多数处理器的SPI模块带有片选接口，如果需连接多个从机，则需要使用GPIO。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/SPI_GPIO.png)
SPI主机和从机都包含一个（8bit）串行移位寄存器，主机通过写寄存器来通过MOSI信号线发起一次传输，从机同步的将寄存器中的数据通过MISO信号线返回。如果主机仅进行写操作，则忽略收到的字节（数据）即可，如果主机要读取从机一个字节，就必须发送一个空字节来引发从机的传输。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/SPI_MOSI.png)
如果主机发送连续的数据流时，有些外设（如存储器）可以进行多字节传输，在这种传输模式下，从机必须在整个传输过程中保持低电平。
(2)SPI时序
根据时钟极性和时钟相位的不同，SPI有四个工作模式以适配不同外设的时序和数据处理需求。时钟极性（CPOL）表示时钟空闲时的状态，时钟相位（CPHA）表示数据采样时的有效性。
当时钟相位为0、时钟极性为低电平时，MISO和MOSI在SCK的上升沿有效。
当时钟相位为0、时钟极性为高电平时，MISO和MOSI在SCK的下降沿有效。
当时钟相位为1、时钟极性为低电平时，MISO和MOSI在SCK的下降沿有效。
当时钟相位为1、时钟极性为高电平时，MISO和MOSI在SCK的上升沿有效。
(3)SPI速度
官方标准没有规定SPI的传输速率，目前已知器件可达Mbps水平。
3.IIC
IIC（Inter Integrated Circuit Bus，I2C、I2C、TWI）总线是飞利浦公司（Pilips）开发的同步、半双工、多主多从式串行通信总线，常用于微控制器与其外围设备的连接。
(1)IIC组成
IIC只有2根信号线：SDA串行数据线和SCL串行时钟线；两根线接上拉电阻或正极电源，挂载到IIC总线的（N个）设备通过寻址识别，每个器件都可作为主/从设备，但任何时刻只能有一个主控设备。

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC.png)
(2)IIC速度
IIC标准规定标准速度为100Kbps、快速400Kbps、高速3.4Mbps。

TBD...
2.总线协议
IIC总线有三种信号和两种状态：开始信号、应答信号、停止信号、总线空闲、总线忙碌
附：SDA、SCL默认置高电平状态
开始信号：SCL保持高电平，SDA出现下降沿，表示数据开始传输
应答信号：接收设备收到8bit数据之后，发送一个ACK位给发送设备，且每			   8bit数据之后必须有一个应答位
停止信号：SCL保持高电平，SDA出现上升沿，表示数据停止传输
总线空闲：SCL和SDA都处于高电平状态
总线忙碌：开始信号之后，停止信号之前

3.传输格式
IIC总线的传输格式为主从式：主发送从接收、从发送主接收
·主发送从接收模式
主设备开始信号之后，发送第一个字节为控制字节（从到地址到低地址 = 7位地址寻址位 + 1位方向位，方向位决定主设备是从从设备读数据还是向从设备写数据，为0时表示写、1时表示读），接下来发送数据，该数据可以是一个或N个字节，从设备每接到1个字节都要返回一个应答信号（ACK = 0），主设备在应答时钟周期为高电平时释放SDA，转由从设备控制（发送应答信号），从设备在这个时钟周期的高电平期间必须拉低SDA，并使之为稳定低电平，以作为有效的应答信号

·从发送主接收模式
仍然从主设备开始信号，主设备向IIC总线发送控制字节（“广播”），从设备进行地址位比对，之后检查控制字节的第8位是1/0，当为1时，表示主控设备要读数据，此时从设备先发送一个应答信号（ACK = 0）给主设备，接着发送数据到主设备，同样的主设备收到一个字节（8bit）后，也要发送一个应答信号给从设备，不同的是如果这个ACK = 0（有效应答信号）那么从设备继续发送数据，如果ACK = 1（停止应答信号）则从设备停止发送数据。主设备也可以控制从设备从什么地址开始发送数据（默认从设备从主设备发送过来的控制字节地址发送数据），发送多少字节

4. 基本操作
IIC总线是主/从双向通信，主设备和从设备都可以发送和接收，但总线必须由主设备控制，主设备产生串行时钟SCL，并产生开始和停止条件，在开始条件之后SDA线上的数据状态仅在SCL为低电平期间内才能改变，在SCL高电平期间SDA上的数据改变用来表示开始和停止条件

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC.png)


·控制字节
在开始条件之后，第一个字节必须是控制字节，其中高4位是器件类型标识符（不同器件有不同的意义：如EEPROM为1010），接着3位为片选（这意味着同一器件不能超过8个），最低位为读写控制为，即1 - 读/0 - 写 

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC2.png)

5.总线仲裁
wating...
6.IO模拟
如果单片机带有IIC总线接口（高级单片机一般都带有若干个），则直接挂载设备即可，如果没有，则可以使用普通IO口模拟
·硬件上
硬件上只需两个GPIO引脚，一个作为串行时钟线SCL，一个作为串行数据线SDA，并且都挂接到上拉电阻或正极电源
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/IIC3.png)

·软件上
软件上要严格模拟IIC总线数据传输规则，示例：
子程序如下：
ORG  1000H	
BSEND: MOV  R2, #08H	; 1字节8位
SENDA: CLR  P3.2		; SCL置低
RLC  A			; 左移一位
MOV  P3.3, C		; 写一位
SETB  P3.2		; SCL置高
DJNZ  R2, SENDA	; 写完8个字节？
CLR  P3.2		; 应答信号
SETB  P3.3		; SDA置高
SETB  P3.2		; SCL置低
RET	
END	

![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/iic程序逻辑.png)


附：MSB与LSB
MSB：Most Significant Bit，最高有效位，在时序图中表示高字节先发送或表示最高位，在二进制数中表示最高加权位，位于数据位最左侧
LSB： Least Significant Bit，最低有效位，在时序图中表示低字节先发送或表示最低位，在二进制数中表示最低加权位，位于数据位最右侧




附录A：奇偶校验（Parity check）

奇偶校验是验证数据传输有效性的简单验证方式。一串二进制数据帧，其中“1”的个数只有两种可能：奇数或偶数。
奇校验（ODD CHECK），就是将该数据帧添加一位“0”或“1”，使得新的数据帧中“1”的个数为奇数，新添加的二进制位就是校验位，接收方收到数据后，再次对原数据帧进行奇校验，对比添加的校验位是否一致，如果一致就说明数据完好。
偶校验（EVEN CHECK），就是将该数据帧添加一位“0”或“1”，使得新的数据帧中“1”的个数为偶数，新添加的二进制位就是校验位，接收方收到数据后，再次对原数据进行偶校验，对比添加的校验位是否一致，如果一致就说明数据完好。

奇偶校验，是轻量级数据校验方式，它只适用于数据受干扰较小的情景，如果数据受干扰较大，则二进制数据帧有可能有偶数个数据位变化，导致最后校验结果无误，但实际数据已经损坏。



附录B：波特率与比特率

比特率是指每秒钟传输或处理比特（bit）或位的数量，单位为“bps或bit/s（Bit Per Second）”，常用于计算机通信领域。比特率的单位是千进制：1Kbit/s = 1000bit/s、1Mbit/s = 1000Kbit/s、1Gbit/s = 1000Mbit/s。
每秒1次的信号变化为1波特（baud），原用于表示电信设备传输速率，现用于调制解调器的数据传输速率。波特率是指每秒钟传输符号的数量，单位是波特。通过不同的信号调制方式，可以在一个符号上负载多个比特信息，当调试方式是二进制调制时，波特率与比特率的值一致，单位可使用“bps”等。



附录C：握手（流控）

当两个系统进行串行通信时，在接收者处理完接收数据之前，必须禁止发送者发送新的数据，这个过程称为握手（shake hands）或流控（flow control），握手有三种方式：软件方式、硬件方式、不握手。
不握手是最简单的方式，用于发送系统在准备和发送数据上都比接收系统慢得多的场合，比如1MHz的低速单片机发送给1GHz的高速单片机，或者手工向计算机输入数据。注意，当接收端使用高速处理器，但使用了实时反映能力较弱的操作系统，则也有可能需要握手。
硬件握手方式在不同的硬件中有不同的实现方式，以RS232为例，它使用两个信号：RTS（请求发送）和CTS（清除发送），当发送者希望发送数据时就置RTS有效，高速接收者有数据等待发送，而当接收者准备就绪时就将CTS置为有效，来通知发送者可以发送数据。
软件握手用于无法实现硬件握手的场景。软件握手用两个字符来实现流控，一个代表请求对方暂停传输、另一个代表清除暂停传输的请求，继续传输数据。通常这个两个字符是Ctrl-S（0X13）和Ctrl-Q（0X11）。



附录D：RS232接口（母口）标准

信号	功能	DB25	DB9	方向
Tx	发送数据	2	2	DTE-DCE
Rx	接收数据	3	3	DTE-DCE
RTS	请求发送	4	7	DTE-DCE
CTS	清除发送	5	8	DTE-DCE
DTR	数据终端就绪	20	4	DTE-DCE
DSR	数据设备就绪	6	6	DTE-DCE
DCD	数据载波检测	8	1	DTE-DCE
RI	振铃指示器	22	1	DTE-DCE
FG	侦测地（机壳）	1	-	共用
SG	信号地	7	5	共用

注：① DB25和DB9接口呈“D”型，它们又被称为COM口；② 这些信号中许多都是用来对调试解调器进行控制器的，如果要在一台计算机和一个终端之间建立一个很简单的链接，仅需Tx和Rx信号就够了。另外，许多系统都将FG和SG连接到一起。



附录E：UART转RS232（DB9）

TTL逻辑高电平为：输出 - >2.4V，输入 - >2.0V；逻辑低电平为：输出 - <0.8V，输入 - <1.2V。RS232逻辑高电平为：-5V ~ -15V（通常为-12V），逻辑地电平为 +5V ~ +15V（通常为+12V）。TTL向RS232转换可以使用MAX232芯片。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS232.png)

MAX232支持两个输入输出端口：T1IN、T2IN、T1OUT、T2OUT、R1IN、R2IN、R1OUT、R2OUT；通过附录D可知，DB9第2和3针为Rx、Tx，第5针为SG信号地（必要）：
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS232-2.png)

注：① DB9有公头和母头之分，它们的引脚顺序定义不同，且母头的第一引脚在右上角（倒梯形时），其它引脚依次向左排列；② 没有用到的接口，可以用作嵌入式系统的电源线；③ 与PC通信时，波特率不宜设置太高，以免有乱码出现。



附录F：UART转RS422

MAX3488是一款用于RS422电平转换的芯片，同RS232一样，其Tx和Rx接口可直接与UART相连：

上图中Rt是一个终止电阻，用来消除信号反射，信号反射发生在远距离传输过程中，并且是远距离传输所必须的。Rt的标准阻值是100~120Ω。
![1](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/UART转RS422.png)


附录G：共模抑制

用两根线之间的电压差来代表逻辑电平，这两根线称为双绞线或差分对（different pair），两个信号振幅相等、相位相反，当出现噪声时，双绞线同时受到干扰，于是两根线之间的电压差几乎没有变化，这种现象又称为共模抑制。

---------------------

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

