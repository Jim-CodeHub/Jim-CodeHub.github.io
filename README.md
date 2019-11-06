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
&ensp;&ensp;&ensp;&ensp;![Bjarne Stroustrup](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/Bjarne_Stroustrup.jpg)

## 六. 模板
&ensp;&ensp;&ensp;&ensp;模板是C++泛型编程的基础，可以独立于任何特定变量类型的方式编写代码，包含函数模板和类模板。在设计函数和类时可以在任何关于变量类型的地方设置模板（T），在使用时可以指定任意类型变量以实现泛型编程。  
&ensp;&ensp;&ensp;&ensp;模板函数的形参必须包含所定义的所有模板，不要求返回值。模板在类中可自由定义。  
&ensp;&ensp;&ensp;&ensp;`语法：template <typename TYPE_NAME, ...> class CLASS_NAME{}; / ... function(...){}`  

&ensp;&ensp;&ensp;&ensp;<font size=4>**STL（Standard template library）**</font>   
&ensp;&ensp;&ensp;&ensp;标准模板库由HP实验室研发，现已成为C++标准。STL包含大量的数据结构和算法的类模板，并将数据结构和算法分离。  
&ensp;&ensp;&ensp;&ensp;STL包含三种类型代码：容器（Containers）、算法（Algorithms）和迭代器（iterators）；容器是抽象数据类型的模板实现（模板类），即数据结构，如动态数组、列表、队栈、图等。算法用于操作容器（模板函数），如增、删、改、查等。迭代器（又称游标）用于遍历容器，如递增、递减、定位等。  
&ensp;&ensp;&ensp;&ensp;容器类中的方法是针对特定的数据结构而设计的，更多使用的是非成员方法（即算法）来操作容器。特别的，容器类中存在与算法同名的方法，原因是相比通用算法其执行更有效率。  
&ensp;&ensp;&ensp;&ensp;**模板使得算法独立于特定的数据类型，迭代器使得算法独立于使用的容器类型**。


  

