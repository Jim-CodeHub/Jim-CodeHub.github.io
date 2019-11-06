# Skills-list

## Hardware
- Theoretical basis
	- AET
	- DET

- PCB design
	- IO
	- IC
	- Layout

- Assist tools
	- Multimeter, Oscilloscope, Power Supply

## Software
- OS
	- Linux
		- BSP
			- Bootloader
			- Kernel
			- Driver
		- APP
	- uCOS
	
- Programming Language
	- C 
	- [C++](#C++)

- GUI
	- QT

- Algo
	- PID
	- SIGMOID
	- Steinhart-Hart

- Assist tools
	- VIM, Git, Makefile

## Comm Technology
- ISO/OSI - 7
	- HTTP / HTTPS
	- Modbus

- ISO/OSI - 6

- ISO/OSI - 5

- ISO/OSI - 4

- ISO/OSI - 3

- ISO/OSI - 2
	- Modbus

- ISO/OSI - 1
	- USART
	- RS232 / RS422 / RS485
	- IIC(TWI)
	- SPI
	- CAN
	- RFID

## Language
	- China / English



---
# <p id="C++">Jim C++</p>

## Catalog ##

## 一. 简介 ##
&ensp;&ensp;&ensp;&ensp;C++起源于贝尔实验室，从C派生、与C兼容、编译时绑定。C++融合了POP、OOP和泛型编程（模板）等编程方式，使用 **类** 和 **对象** 来描述数据，强调数据的表达方式，具有**封装**、**继承**、**多态**、异常处理等特性。  
&ensp;&ensp;&ensp;&ensp;附：[C++之父Bjarne Stroustrup的个人主页](http://www.stroustrup.com/index.html)。

## 六. 模板
&ensp;&ensp;&ensp;&ensp;模板是C++泛型编程的基础，可以独立于任何特定变量类型的方式编写代码，包含函数模板和类模板。在设计函数和类时可以在任何关于变量类型的地方设置模板（T），在使用时可以指定任意类型变量以实现泛型编程。  
&ensp;&ensp;&ensp;&ensp;模板要求模板函数的形参必须包含所定义的所有模板，不要求返回值。模板对类的使用没有要求。
&ensp;&ensp;&ensp;&ensp;`语法：template <typename TYPE_NAME, ...> class / function`  

&ensp;&ensp;&ensp;&ensp;<font size=4>**STL（Standard template library）**</font>   
&ensp;&ensp;&ensp;&ensp;标准模板库由惠普实验室研发，现已成为C++标准。STL包含大量的数据结构和算法的类模板，并将数据结构和算法分离。  
&ensp;&ensp;&ensp;&ensp;STL包含三类模板：容器（Containers）、算法（Algorithms）和迭代器（iterators）；容器是抽象数据类型的模板实现即数据结构，如动态数组、列表、队列、栈、图等。算法用于操作容器，如增、删、改、查等。迭代器用于遍历容器，如递增、递减、定位等。

- 