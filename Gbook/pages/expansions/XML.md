
## XPath

### Concept
XPath是使用**路径表达式遍历XML**文档的语言，内置函数库，Javascript、Python等都实现了XPath功能及其函数。

### 路径表达式
表达式				| 描述													| 示例
:-:					| :-:													| :-:
nodename			| 相对路径-选取此节点的所有子节点						| bookstore 
/					| 绝对路径-选取根节点									| /bookstore
//					| 无视路径-选择所有匹配节点								| book
.					| 当前路径-选取当前节点									|
..					| 上级路径-选取当前节点的父节点							|
@					| 选取属性												| /bookstore/book/@lang 
\*					| 匹配任何元素节点										| /bookstore/\* 
@\*					| 匹配任何属性节点										|	
node()				| 匹配任何节点											|
[X]					| 用于定位，X为不等式、数值和函数等						| /bookstroe/book[1]
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

Tips : 示例 - /bookstore//book[2]/child::text()，选取bookstore节点下的所有book元素中的第二个下的所有子元素的文本，将该表达式作为Javascript、Python等XPath函数的形参即可返回结果。

### 运算符
+/-/\*/div/=/!=/\</<=/\>/>=/or/and/mod/|(节点集合)

### [XPath内置函数](https://www.w3school.com.cn/xpath/xpath_functions.asp)

### 路径表达式 - 步Step
轴::节点[谓语]， 节点是通过沿着路径 (path) 或者步 (steps) 来选取的 
























Chapter 一. XML基础篇

一．概念
XML- EXtensible Markup Language 可扩展标记语言，由W3C开发，用于传输和存储数据，是互联网进行数据传输的最常用的信息传输工具。
XML VS HTML：
1.XML的标签全部为自定义，具有自我描述性，而HTML的标签全部为预定义。
2.XML不是HTML的替代，它们是为不同目的而设计：XML的焦点是数据的内容、HTML的焦点是数据的外观，XML旨在传输信息、HTML旨在显示信息；
二．性质
XML文档内容仅仅是纯文本，能处理纯文本的软件都可以处理XML文档，没有任何行为的XML是不作为的：
<note>
<to> lilei </to>
<from> hanmeimei </from>
<heading> reminder </heading>
<body> Don’t forget the meeting! </body>
</note>
以上是李磊发给韩梅梅的便签，它拥有标题、留言、发送者和接受者等信息。该XML文档仅是包装一些纯粹的信息，需要编写程序才能传送、接收和显示这个文档。解析程序可以针对性的处理XML标签，标签的功能性意义依赖于应用程序的特性。
三．用途
XML应用于web开发的许多方面，常用于简化数据的存储和共享。
1.XML把数据从HTML分离
以HTML语言为框架、XML文档为数据基础，使用JavaScript进行数据嵌入，可以快速高效的维护web动态信息。
2.XML简化数据共享和传输
不同的计算机系统和数据使用不兼容的格式来存储数据。
XML数据以纯文本格式进行存储，因此提供了一种独立于软件和硬件的数据存储方法。这让创建不同应用程序可以共享和传输的数据变得更加容易。也也更容易扩展、升级到新的硬件和软件平台。
3.XML用于创建新的Internet语言
如XHTML、WSDL、WAP/WML、RSS、RDF/OWL、SMIL等。
四．结构
XML文档必须包含根元素，该元素是所有其它元素的父元素，所有元素均可拥有文本内容和属性。XML文档是以数据结构中的树来构造的，其“根”、“兄弟”、“孩子”、“父亲”等构造都与树相同。
每一个封闭标签（含独立标签）称为一个结点，结点名称为元素名，即一个结点对应一个封闭标签的元素，元素可以拥有多个属性，每个属性拥有一个值。

<bookstore>
<book category="CHILDREN">
<title lang="en">Harry Potter</title> 
<author>J K. Rowling</author> 
<year>2005</year> 
<price>29.99</price> 
</book>
</bookstore>

示例解析：唯一且必有的根元素bookstore包含子元素book，book包含子元素title、author、year和price，book的子元素都包含可选的文本内容和属性。
五．语法
XML拥有与HTML类似但更严谨的语法结构。
1.声明
XLM声明在文档首行，用于指示该文档属XML标准，并可同时指定版本、编码等信息。声明以“<? xml”开头、“?>”结尾。
XML声明是可选的，但属于W3C推荐规范，一个标准声明如下：
<?xml version=”1.0” encoding=”UTF-8” ?>
示例解析：该声明指定了版本信息1.0，和编码信息UTF-8（默认），其中编码信息是为了XML可能因包含非ASCII字符而导致解析错误。
2.标签
XML所有标签都必须关闭、XML标签大小写敏感，其成对的标签必须大小写匹配、XML标签必须正确嵌套。
注：XML所有标签都必须关闭的含义是如果有开始标签就必须有结束标签，而不是不能有单标签，如：<Element xxx:yyy />，单标签在XML中仍然是合法的。
3.属性
XML中的属性用于提供关于元素的额外（附加）信息，XML标签的属性值必须加引号（单引号或双引号，当属性值中有双引号时需要用单引号，也可以使用下面的引用代替内部引号）。
为扩展和维护，应尽量使用元素来描述数据，而使用属性来提供与数据无关的信息。
4.引用
在XML中<、&、’、”有特殊意义，使用时需要转义替代：

&lt|<|小于
&gt|>|大于
&amp|&|和
&apos|'|单引号
&quot|"|双引号

5.注释、空格与换行
注释与HTML相同“<!-- This is a comment --> ”，在HTML中连续的空格会被合并成一个，在XML中这样的空格会被保留，XML在Unix中新行以LF字符存储、在Mac中以CR字符存储、在Windows中以LF或CR存储。
六．命名
名称可以含字母、数字以及其他的字符、不能以数字或者标点符号开始、不能以字符 “xml”（或者XML、Xml）开始，名称不能包含空格但可以使用下划线。
元素名应该避免使用“-”、“.”、“:”，这些符号或可能被软件认定为分隔符，其中分号被用作命名空间。
XML文档经常有一个对应的数据库，其中的字段会对应XML文档中的元素。有一个实用的经验，即使用数据库的名称规则来命名XML文档中的元素。
七．验证
XML文档具有自我描述性，在各领域拥有不同的合法格式，否则不能流通使用。首先XML文档必须语法正确，其次要符合特定领域的格式。
DTD和XML Schema都可以定义XML文档结构（如元素、属性、元素个数、元素次序、元素数据类型等），XML Schema或成为未来的主流技术，后缀为“.xsd”，在XML根元素中以“xsi:schemaLocation”属性引用。
<JDF ... xsi:schemaLocation = "http://www.CIP4.org/Schema/JDFSchema_1_1">
... ...
</JDF>
示例解析：JDF使用XML格式共享数据，属CIP4领域，CIP4提供了JDFSchema验证文档，并在JDF根节点中以xsi:schemaLocation属性引用，以供JDF解析软件验证使用。  
八．显示
因为设计的初衷，XML文件不像HTML那样显示，它仅显示源代码结构，在浏览器中显示为可以闭合和开启的标签结构，当XML语法错误时浏览器显示错误信息。通过CSS或XSLT格式化方法可以改变显示结构。


Chapter 二. XML高级篇

一．XML DOM
“DOM 定义了所有文档元素的对象和属性，以及访问它们的方法”
DOM - Document Object Model文档对象模型，定义了XML、HTML等文档元素的对象和属性，以及操作和访问（增、删、改、查）它们的方法（接口）。
W3C DOM分为三个级别：核心DOM、XML DOM、HTML DOM。
1.节点
XML文档的每一个成分都是节点：整个文档是一个文档节点、每个XML标签是一个元素节点、包含在XML元素中的文本是文本节点、每一个XML属性是一个属性节点、注释属于注释节点。
注：包含于元素节点中的文本不是该节点的值，文本总是存储在文本节点中。
<year> 2017 </year>
示例解析：元素节点<year>拥有一个值为“2017”的文本节点。
2.节点树
XML DOM把XML文档视为树结构（节点树），树中的所有节点都有关联。节点树等同于《数据结构》中的“树”。

<bookstore>
<book category="CHILDREN">
<title lang="en">Harry Potter</title> 
<author>J K. Rowling</author> 
<year>2005</year> 
<price>29.99</price> 
</book>
</bookstore>

以树的形式组织XML文档结构，可以很容易的在忽略内容的情况下遍历所有内容。
3.DOM解析
浏览器解析
所有现代浏览器都内建了用于读取和操作 XML 的 XML 解析器。解析器把 XML 读入内存，并把它转换为可被 JavaScript 访问的 XML DOM 对象。除了DOM之外，还有SAX、JDOM、DOM4J等不同的基于浏览器的解析技术。
函数库解析
XML作为跨平台的存储和传输信息的工具，更多的应用在应用程序中，不同于浏览器的是应用程序并不集成XML解析器，因此要编程实现应用程序对XML文档的解析。
目前已经有很多成熟且开源的XML函数库可以使用，如miniXML、Xerces-C、libxml等，其本质是利用数据结构对系统标准函数库的进一步封装。
二．XML SAX
SAX - Simple APIs for XML, XML简单应用程序接口，由XML-DEV邮件列表开发。SAX将XML视为数据流处理，并使用事件驱动方法，实时、高效、节省空间。
SAX的出现是为了解决一些不适用的DOM接口，它不是W3C推荐标准，但拥有广泛支持API标准的接口规范，并已成为“非官方”的事实标准。
1.特点
DOM处理XML需将完整的文档装入内存，当处理大规模文档时会造成内存空间不足、速度慢、效率低的情况。SAX以数据流的方式实时解析XML文档，并在读取到任何元素节点时以事件（回调）的方式调用代码。
SAX的缺点是只具备读取XML的能力，在内容处理上要在编程实现；因为不建立内存模型，所以不能随机访问。
2.处理时序示例  

![QConstruct](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/SAX时序.png)

3.接口
Attributes	Interface for a list of XML attributes.
ContentHandler	Receive notification of the logical content of a doc
DTDHandler	Receive notification of basic DTD-related events
EntityResolver	Basic interface for resolving entities
ErrorHandler	Basic interface for SAX error handlers
Locator	Interface for associating a SAX event with a doc location
XMLFilter	Interface for an XML filter
XMLReader	Interface for reading an XML document using callbacks
更多SAX API内容：http://www.saxproject.org。
三．CDATA
XML文档中所有的文本数据都会被解析器解析，只有CDATA（Character data）区段会被解析器忽略。在XML中使用“<”/“>”等字符是非法的，如需使用必须转义为“&lt”/“&gt”，但有些文本内容必须显示使用这些字符（如文本内容为Javascript代码），这就需要使用CDATA区段。
<script>
	<![CDATA[
function fun()
{if (a < b) {return 1;}}
	]]>
	</script>
	示例解析：script元素节点包含JavaScript代码文本（节点），代码中包含非法字符，使用CDATA区段包含可使解析器忽略。
	四．命名空间
	XML标签是自定义的，解析两个或多个具有相同标签的XML文档就会产生歧义，XML解析器对此的表现是未定义的。有两种方式解决冲突：前缀和命名空间。
	<!--出现冲突：一个表格-->							<!--出现冲突：一个桌子-->
	<table>											<table>
	<tr>													<name>Coffee table</name>
	<td>Apples</td>										<width>90</width>
	<td>Bnanas</td>										<length>120</length>
	</tr>												<high>100</high>
	</table>											</table>
	前缀
	前缀的本质是合法的别名标签，歧义和非歧义元素/子元素节点都可以加上前缀。
	<!--解决冲突：一个表格-->							<!--解决冲突：一个桌子-->
	<h:table>										<f:table>
	<tr>												<name>Coffee table</name>
	<td>Apples</td>									<width>90</width>
	<td>Bnanas</td>									<length>120</length>
	</tr>											<high>100</high>
	</h:table>										</f:table>
	前缀的另一个作用是为命名空间指定哪些元素节点可以共享同一命名空间。
	（默认）命名空间
	xmlns属性指定命名空间，空间名称通常（不限定）是一个URL，该地址不会被解析器访问，只用来提供唯一性。
	<!--解决冲突：一个表格-->							<!--解决冲突：一个桌子-->
	<table xmlns = “http://www.w3.org”>				<table xmlns = “http://w3cschool.com”>
	<tr>												<name>Coffee table</name>
	<td>Apples</td>									<width>90</width>
	<td>Bnanas</td>									<length>120</length>
	</tr>											<high>100</high>
	</h:table>										</f:table>
	xmlns属性所在的元素节点，连通其包含的子元素节点都共享同一个命名空间。
	带前缀的命名空间
	xmlns:prefix属性指定带有前缀的命名空间，带有prefix的元素节点共享同一个命名空间。
	<!--解决冲突：一个表格-->							<!--解决冲突：一个桌子-->
	<a:table xmlns:a =“http://www.w3.org”>				<b:table xmlns:b =“http://w3cschool.com”>
	<tr>												<name>Coffee table</name>
	<a:td>Apples</a:td>								<width>90</width>
	<td>Bnanas</td>									<b:length>120</b:length>
	</tr>											<high>100</high>
	</a:table>										</b:table>
	五．更多内容
	以上初级、高级篇XML内容是对XML的简单介绍，更注重的是实际项目应用。更多有关XML的教程参看W3C：http://www.w3school.com.cn/x.asp。


	Chapter 三. XML技术篇





	Chapter 四. XML解析篇

	通过浏览器和解析函数库可以解析XML温度，解析的即是执行合法性验证、打开、存储、遍历、增、删、改等操作。
	优秀的XML函数库众多，如XML4C、Xerces c++、XMLBooster、libxml++（C++）、TinyXML、libxml2（C）、Mini XML（C）等，这些都是XML开源项目，大部分可应用于多平台下（Unix系列、windows），开发语言包括C、C++、JAVA等。
	XML库的本质就是一套API，它对C库或其它语言库进行再封装，利用数据结构和算法来建立内存模型，从而实现对XML文档的一系列操作。
	一.Mini XML
	Mini XML是一个小型、开源的XML解析库，采用C语言开发，支持 UTF-8/UTF-16 编码（写UTF-8编码的XML文件和字符串、读UTF-8/UTF-16的文件和字符串）。
	Mini XML设计的初衷是为了替换大而笨重的libxml2库，它很容易移植到嵌入式系统当中，且不进行错误恢复及校验，简单易用。
	官网：www.minixml.org或https://www.msweet.org/mxml/。
	二.Xerces-C++
	Xerces-C++是大型、功能丰富、开源的XML解析库，包含JAVA、C++、PERL等多种版本，支持SAX和DOM，它对XML进行基本解析外还进行语法检查。
	官网：http://xerces.apache.org/xerces-c/。
	1.编程
	使用Xerces-C++必须符合指定格式（头文件、命名空间、初始化和结束等）：
#include <xercesc/util/PlatformUtils.hpp>

	using namespace xercesc;

int main(void)
{
	XMLPlatformUtils::Initialize();
	... ...
		XMLPlatformUtils::Terminate();
}

$g++ myXercesc.cpp -lxerces-c
2.



附录A XML版本和规范

W3C XML规范声明：如果 XML 文档存在错误，那么程序就不应当继续处理这个文档。理由是，XML 软件应当轻巧，快速，具有良好的兼容性。
目前XML最新版本为1.0第五版。XML规范和时间线参看https://www.w3school.com.cn/w3c/w3c_xml.asp和https://www.w3.org/TR/xml/。


-----------

## 1 xerces-c 


## 1.1 编译

解压，查看doc/html/index.html文档

注意：xerces-c支持使用curl库，如果编译时使能了相关参数，那么xerces-c运行时必须要有curl库的支持，更多选项查看上述index文档 

```
$ ./configure --disable-network --prefix=./install

...

configure: Report:
configure:   File Manager: POSIX
configure:   Mutex Manager: POSIX
configure:   Transcoder: gnuiconv
configure:   NetAccessor: disabled
configure:   Message Loader: inmemory


$ make

$ install
```

结果生成xercesc的动态库和静态库


## 1.2 编程

头文件：
dom/		-- DOM 模型
		dom 中包含DOM.h，该头文件包含了该目录下的所有头文件，除了impl目录

		注：dom目录下都是DOMxx头文件，而没有实现（或者说只有几个头文件在类中实现了某个虚函数），因为它们都是抽象类，
			其doxygen文档并未提供完整的类列表，实际这些接口还是有实现这些接口的派生类的
			这些派生类都在dom/impl目录下，多数以xxxImpl.hpp xxxImpl.cpp结尾，xxx对应dom目录下的抽象类名
		
internal/ 
parsers/	-- SAX相关 分析模块、含验证功能
sax2/		-- SAX 模型 2
validators/ 
xinclude/              
framework/	-- XML架构相关，提供基础类	
sax/		-- SAX 模型 1
util/		-- 工具 以及 平台相关的代码


# 2 miniXML

https://www.msweet.org/mxml/

无依赖的纯C编写的轻量级XML库

支持DOM和XML，但不支持验证
支持Unicode - UTF-8 和 UTF-16
支持CDATA

LICENSE, Apache License Version 2.0


---源码分析

miniXML源码结构及其简单，头文件只有三个 mxml.h mxml-private.h 和 config.h

源码文件如下

1. 增
mxml-node.c

2. 删
mxml-node.c

3. 改
mxml-set.c   
mxml-attr.c	//专对属性

4. 查
mxml-get.c		
mxml-attr.c //专对属性	

5. 遍历
mxml-search.c 

6. 其它
mxml-entity.c	//XML和HTML中的实体操作，是指< > & ; \ 等需要转义使用的字符
mxml-file.c		//文件操作
mxml-index.c	//提供索引的方法
mxml-private.c  //线程安全操作
mxml-string.c   //字符串工具

testmxml.c		//demo，测试使用，没有包含在库中

---

结构体

```
typedef struct _mxml_node_s mxml_node_t

struct _mxml_node_s			/**** An XML node. ****/
{
  mxml_type_t		type;		/* Node type */
  struct _mxml_node_s	*next;		/* Next node under same parent */
  struct _mxml_node_s	*prev;		/* Previous node under same parent */
  struct _mxml_node_s	*parent;	/* Parent node */
  struct _mxml_node_s	*child;		/* First child node */
  struct _mxml_node_s	*last_child;	/* Last child node */
  _mxml_value_t		value;		/* Node value */
  int			ref_count;	/* Use count */
  void			*user_data;	/* User data */
};
```

---

编程	
```
#include <mxlm.h>
#include <mxlm-private.h>
#includ <config.h>
```



-------------


# 1 Xerces-C++

## 1.1 Introduction

## 1.2 Programming

### 1.2.1 Using DOM API

DOM APIs start with the 'DOM' prefix, and header file is '<xercesc/dom/DOM.hpp>'. 

#### 1.2.1.1 DOM writes

1. Get implementation

```
static DOMImplementation \*	getDOMImplementation (const XMLCh \*features);
static DOMImplementationList \*	getDOMImplementationList (const XMLCh \*features);

static DOMImplementation \* getDOMImplementation();
```

Note : param 'features' MUST BE formatted with 'Feature [space] version' or 'Featrue', and 'Featrue' SHALL BE 'XML'/'Range'/'Traversal'/'Core' etc.

2. Create document 

```
DOMDocument \*createDocument (const XMLCh \*namespaceURI, const XMLCh \*qualifiedName, DOMDocumentType \*doctype, MemoryManager \*const manager=XMLPlatformUtils::fgMemoryManager);
DOMDocument \*createDocument (MemoryManager *const manager=XMLPlatformUtils::fgMemoryManager);
```

3. Create nodes(element/attribute/text/comment...) 

```
DOMElement \*createElement (const XMLCh \*tagName);
DOMElement \* getDocumentElement(); //get root element 
...
```

4. Construct DOM tree(append/remove/insert/...)

```
DOMNode \*appendChild (DOMNode *newChild);
...
```

#### 1.2.1.2 DOM serializer

DOMLSSerializer provides the "Save" interface for serializing (writing) a DOM document into XML data. The XML data can be written to various type of output stream.


#### 1.2.1.3 DOM reads






### 1.2.2 Using SAX API 
### 1.2.3 Using utilities




### Use string in Xerces-C++

class XMLString and XMLStringTokenizer are used to handle string in xercesc

#
	#include <xercesc/util/XMLString.hpp>
	#include <xercesc/util/XMLStringTokenizer.hpp>



