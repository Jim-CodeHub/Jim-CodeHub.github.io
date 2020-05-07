
# 1 XML Base

## 1.1 Introduction

XML - EXtensible Markup Language 可扩展标记语言，由[W3C](www.w3.org)开发，用于传输和存储数据，是互联网进行数据传输的最常用的信息传输工具。

> **[info] VS HTML**
>
> XML是HTML语言的扩展，遵循[DOM](#DOM)模型，其标签可自定义，具有自我描述性。XML不是HTML的替代，其焦点是数据的内容而非外观，旨在信息的存储和传递。

## 1.2 Feature

XML文档内容是纯文本，仅作为**树型结构体**的信息包装载体，能处理纯文本的软件都可以处理XML文档，没有任何行为的XML是不作为的。生成和解析程序可以针对性的处理XML标签，标签的功能性意义依赖于应用程序的实现。

## 1.3 Structure

XML文档中一切皆**节点（Node）**，分为*元素节点（Element Node）*、*属性节点（Attribute Node）*和*文本节点（Text Node）*，元素节点是一对封闭的标签`<Element>...</Element>`，可嵌套，属性节点是元素节点标签中的属性，文本节点是元素节点标签之间的文本内容。

```
 <bookstore> <!-- 根元素节点 -->
	<book category="CHILDREN"> <!-- 子元素节点，包含属性category，属性值为字符串CHILDREN -->
		<title lang="en">Harry Potter</title> <!-- (book)子元素节点，包含属性lang，属性值为en，包含文本节点Harry Potter -->
 		<year>2005</year> <!-- (book)子元素节点，包含文本节点2005 -->
 		<price>29.99</price> <!-- (book)子元素节点，包含文本节点29.99 -->
 	</book>
 </bookstore>
```
> **[info] 文本节点**
>
> 包含于元素节点中的文本不是该元素节点的值，文本总是存储在文本节点中。

## 1.4 Grammer

### 1.4.1 Declaration

XLM声明定义在文档首行，用于指示该文档版本、编码等信息。XML声明是可选的，但属于W3C推荐规范。

```
 <?xml version=”1.0” encoding=”UTF-8” standalone="no"?> <!-- 版本信息1.0，编码UTF-8（默认），不引用外部文件 -->
```

### 1.4.2 Lable

XML标签大小写敏感，所有标签必须成对存在（大小写要对应），XML标签必须正确嵌套。

> **[info] Singal lable**
>
> 单标签是合法标签，如 \<Element x:y />

### 1.4.3 Attribute 

XML中的属性用于提供关于元素的额外（附加）信息，XML标签的**属性值必须加引号**（单引号或双引号，当属性值中有双引号时需要用单引号，也可以使用[引用](#Quote)代替内部引号）。**为扩展和维护，应尽量使用元素来描述数据，而使用属性来提供与数据无关的信息**。

### 1.4.4 <span id = "Quote"> Quote </span>

Quote	|Character	|Description
:-:		|:-:		|:-:
&lt		|<			|小于
&gt		|>			|大于
&amp	|&			|和
&apos	|'			|单引号
&quot	|"			|双引号

### 1.4.5 Comment/Space/Line break 

注释与HTML相同`<!-- This is a comment -->`，在HTML中连续的空格会被合并成一个，在XML中这样的空格会被保留，XML在Unix中新行以LF字符存储、在Mac中以CR字符存储、在Windows中以LF或CR存储。

### 1.4.6 Name

元素和属性名由字母、数字和下划线组成，以字母和下划线开头，不能使用屏蔽字“xml”（或XML、Xml等）。

> **[info] 经验**
>
> 作为数据存储语言，XML文档经常有一个对应的数据库，其中的字段会对应XML文档中的元素。有一个实用的经验，即使用数据库的名称规则来命名XML文档中的元素。

---

# 2 XML Advanced

## 2.1 <span id = "DOM"> XML DOM </span>

DOM - Document Object Model文档对象模型，定义了XML、HTML等文档元素的对象和属性，以及操作和访问它们的方法（接口）。

### 2.1.1 Feature 

DOM结构以数据结构中的**树**泛型来组织，当处理XML时会将整个XML文档读入内存，因此支持应用程序通过操作树的方法（增、删、改、查、遍历等）来操作DOM。

### 2.1.2 DOM Parse

1. 浏览器解析：所有现代浏览器都内建了用于读取和操作XML的解析器。解析器把XML读入内存，并把它转换为可被JavaScript访问的XML DOM对象。除了DOM之外，还有SAX、JDOM、DOM4J等不同的基于浏览器的解析技术。
2. 函数库解析：XML作为跨平台的存储和传输信息的工具，更多的应用在应用程序中，不同于浏览器的是应用程序并不集成XML解析器，因此要编程实现应用程序对XML文档的解析。
目前已经有很多成熟且开源的XML函数库可以使用，如miniXML、Xerces-C、libxml等。

## 2.2 XML SAX

SAX - Simple APIs for XML, XML简单应用程序接口，由XML-DEV邮件列表开发。SAX将XML视为数据流处理，并使用事件驱动方法，实时、高效、节省空间。SAX的出现是为了解决一些不适用的DOM接口，它不是W3C推荐标准，但拥有广泛支持API标准的接口规范，并已成为“非官方”的事实标准。

### 2.2.1 Feature

因DOM的内存处理方式，当处理大规模文档时会造成内存空间不足、速度慢、效率低等情况。SAX以数据流的方式实时解析XML文档，并在读取到任何节点时以事件（回调）的方式调用代码，因此更适合处理大规模XML文档。SAX的缺点是只具备读取XML的能力，在内容处理上要在编程实现（自定义回调函数），另外因为不建立内存模型，所以不能随机访问。

### 2.2.2 SAX Parse 

![SAX Timing](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/XML/SAX.png) <br><center> <font color=gray> SAX Timing </font> </center><br>

## 2.3 <span id = "namespace"> namespace </span>

XML标签是自定义的，解析两个或多个具有相同标签的XML文档就会产生歧义，XML解析器对此的表现是未定义的。有两种方式解决冲突：**前缀**和**命名空间**。命名空间类似面向对象语言中的命名空间，在XML文档**根元素节点**中声明为“xmlns=URL”，其中URL仅作为唯一标识，可以不具备实际意义。前缀的本质是合法的标签，在命名空间中扩展为共享命名空间的标识。

``` 冲突
	<!--出现冲突：一个表格-->							<!--出现冲突：一个桌子-->
	<table>												<table>
		<tr>												<name>Coffee table</name>
		<td>Apples</td>										<width>90</width>
		<td>Bnanas</td>										<length>120</length>
		</tr>												<high>100</high>
	</table>											</table>
```

``` 前缀
	<!--解决冲突：一个表格-->							<!--解决冲突：一个桌子-->
	<h:table>											<f:table>
		<tr>												<name>Coffee table</name>
		<td>Apples</td>										<width>90</width>
		<td>Bnanas</td>										<length>120</length>
		</tr>												<high>100</high>
	</h:table>											</f:table>
```

``` 命名空间
	<!--解决冲突：一个表格-->							<!--解决冲突：一个桌子-->
	<table xmlns = “http://www.w3.org”>					<table xmlns = “http://w3cschool.com”>
		<tr>												<name>Coffee table</name>
		<td>Apples</td>										<width>90</width>
		<td>Bnanas</td>										<length>120</length>
		</tr>												<high>100</high>
	</table>											</table>
```

### 2.3.1 Expansion namespace

扩展命名空间格式为“xmlns:namespace-prefix”，任何使用'namespace-prefix'的节点都共享所声明的同一命名空间。

``` 扩展命名空间（扩展为前缀同名）
	<!--解决冲突：一个表格-->                           <!--解决冲突：一个桌子-->
	<a:table xmlns:a =“http://www.w3.org”>              <b:table xmlns:b =“http://w3cschool.com”>
	<tr>													<name>Coffee table</name>
	<a:td>Apples</a:td>                                  	<width>90</width>
	<td>Bnanas</td>                                      	<b:length>120</b:length>
	</tr>                                                	<high>100</high>
	</a:table>                                          </b:table>
```

``` 扩展命名空间（扩展为任意前缀）
	<!--解决冲突：一个表格-->                           <!--解决冲突：一个桌子-->
	<table xmlns:x =“http://www.w3.org”>				<table xmlns:y =“http://w3cschool.com”>
	<tr>													<name>Coffee table</name>
	<x:td>Apples</x:td>                                  	<width>90</width>
	<td>Bnanas</td>                                      	<y:length>120</y:length>
	</tr>                                                	<high>100</high>
	</table>                                            </table>
```

## 2.4 Validation 

一份XML文档是否合格要满足两个层面：XML语法规范和XML自我描述规范；前者是最基本前提，后者表现在实际应用支持上，如节点名是否正确、节点组成是否完整、属性节点的值是否在枚举之内、值类型是否正确等等。

### 2.4.1 Technology

验证的方法是通过一份已准备好的验证文件来描述合格的XML文档，以约束其格式和内容。有两种验证技术：**DTD**（对应文件扩展名'.dtd'）和**Schema**（对应文件扩展名'.xsd'）；Schema是基于XML技术的DTD替代者。

### 2.4.2 xsi and schemaLocation 

使用哪个约束文档对当前XML文档进行验证是自定义的，但一般要选用**根元素节点中链接的验证文档**（如果存在的话），在XML文档的根元素节点中链接验证文档的方法是使用xsi扩展命名空间和schemaLocation属性。

```
	<RootElement xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="xxxx/x.xsd" ...> ... </RootElement>
```

> **[info] XSI and XSD**
>
> "xmlns:xsi"表示涉及到xsi项目的内容都来自该扩展命名空间，"xsi:schemaLocation"表示使用xsi扩展命名空间中的schemaLocation属性。  

## 2.5 CDATA

XML文档中所有的文本数据都会被解析器解析，只有CDATA（Character data）区段会被解析器忽略。在XML中使用“<”/“>”等字符是非法的，如需使用必须转义为“&lt”/“&gt”，但有些文本内容必须显示使用这些字符（如文本内容为Javascript代码），这就需要使用CDATA区段。

``` Javascript
	<script>
		<![CDATA[
			function fun()
			{
				if (a < b) {return 1;}
			}
		]]>
	</script>
```

---

# 3 XML Technology 

## 3.1 XPath

### 3.1.1 Introduction 

XPath是使用**路径表达式遍历XML**文档的语言，内置函数库，Javascript、Python等都实现了XPath功能及其函数。

### 3.1.2 运算符

运算符				| 描述							| 示例						| 返回值
:-:					| :-:							| :-:						| :-:
&#124;				| 计算两个节点集				| //book &#124; //cd		| 返回所有拥有 book 和 cd 元素的节点集
\+					| 加法							| 6 + 4						| 10
\-					| 减法							| 6 - 4						| 2
\*					| 乘法							| 6 * 4						| 24
div					| 除法							| 8 div 4					| 2
=					| 等于							| price=9.80				| true/false
!=					| 不等于						| price!=9.80				| true/false
<					| 小于							| price<9.80				| true/false			
<=					| 小于或等于					| price<=9.80				| true/false
\>					| 大于							| price>9.80				| true/false
>=					| 大于或等于					| price>=9.80				| true/false
or					| 或							| price=9.80 or price=9.70	| true/false
and					| 与							| price>9.00 and price<9.90	| true/false
mod					| 计算除法的余数				| 5 mod 2					| 1

### 3.1.3 路径表达式

表达式				| 描述													| 示例
:-:					| :-:													| :-:
nodename			| 相对路径-选取此节点的所有子节点						| bookstore 
/					| 绝对路径-选取根节点									| /bookstore
//					| 无视路径-选择根和所有后代节点							| book
.					| 当前路径-选取当前节点									|
..					| 上级路径-选取当前节点的父节点							|
@					| 选取属性												| /bookstore/book/@lang 
\*					| 匹配任何元素节点										| /bookstore/\* 
@\*					| 匹配任何属性节点										|	
node()				| 匹配任何节点											|

<br> <center> <font color=gray> Table 3.1.3.1 </font> </center> <br>

谓语				| 描述													| 示例
:-:					| :-:													| :-:
[X]					| 用于定位，X为**等式、不等式、数值和函数**等谓语		| /bookstroe/book[1]

<br> <center> <font color=gray> Table 3.1.3.2 </font> </center> <br>

轴（Axis）			| 描述													| 示例
:-:					| :-:													| :-:
ancestor			| 选取当前节点的所有先辈（父、祖父等）					| ancestor::book 
ancestor-or-self	| 选取当前节点的所有先辈（父、祖父等）以及当前节点本身	|
attribute			| 选取当前节点的所有属性								| attribute::lang
child				| 选取当前节点的所有子元素								| child::text()
descendant			| 选取当前节点的所有后代元素（子、孙等）				|
descendant-or-self	| 选取当前节点的所有后代元素（子、孙等）以及当前节点本身|
following			| 选取文档中当前节点的结束标签之后的所有节点			|
namespace			| 选取当前节点的所有命名空间节点						|
parent				| 选取当前节点的父节点									|
preceding			| 选取文档中当前节点的开始标签之前的所有节点			|
preceding-sibling	| 选取当前节点之前的所有同级节点						|
self				| 选取当前节点											|

<br> <center> <font color=gray> Table 3.1.3.3 </font> </center> <br>

> **[info] Note**
>
> 完整的路径表达式是由“轴::节点[谓语]”组成的，但通常只使用“表达式”或“表达式” + “谓语”的方法。

> **[info] Example**
>
> /bookstore//book[2]/child::title[text()]，选取根节点下的bookstore节点下的所有book元素中的第二个下的所有子元素中的title子元素的文本。

---

# 4 XML Parse

## 4.1 MiniXML

Mini XML是一个小型、开源的XML解析库，采用C语言开发，支持 UTF-8/UTF-16 编码（写UTF-8编码的XML文件和字符串、读UTF-8/UTF-16的文件和字符串）。Mini XML设计的初衷是为了替换大而笨重的libxml2库，它很容易移植到嵌入式系统当中，但不进行错误恢复及校验。[Official website](https://www.msweet.org/mxml/)。

## 4.2 Xerces-C++

Xerces-C++是大型、功能丰富、开源的XML解析库，包含JAVA、C++、PERL等多种版本，支持SAX和DOM，它对XML进行基本解析外还进行语法检查。[Official website](http://xerces.apache.org/xerces-c/)。

# <span id = "Appendix-A"> Appendix-A：XML Version and Specification </span>

W3C XML规范声明：如果 XML 文档存在错误，那么程序就不应当继续处理这个文档。理由是，XML 软件应当轻巧，快速，具有良好的兼容性。目前XML最新版本为1.0第五版。XML规范和时间线参看https://www.w3school.com.cn/w3c/w3c_xml.asp和https://www.w3.org/TR/xml/。

