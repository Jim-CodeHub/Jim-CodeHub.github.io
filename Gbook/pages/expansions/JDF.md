
# 1 JDF Component  

## 1.1 Background 

在印刷行业中，企业生产现状多为“信息孤岛”或“流程孤岛”形式，具体表现为：印前作业数据、印刷数据、印后数据没有流通和有效的对接，使得印前、印刷、印后产线形成三个“信息孤岛”；这些问题或是传统遗留的，或是市场遗留的，这种问题大大增加了印刷应用企业的生产成本、降低了企业的生产效率。
为了解决印刷行业的“信息孤岛”难题，使印刷业信息集成化、全面自动化、高度智能化，以Adobe、HP、Agfa、Heidelberg、MAN Roland等为代表的的公司成立了**CIP4(International Cooperation for Integration of Processes in Prepress, Press and Postpress)**国际联盟，致力于促进印前、印刷、印后加工的垂直整合，并应用JDF作为信息载体标准。[CIP4 Official Website](https://www.cip4.org/).

Tips : CIMS - Computer Infomation Management System 计算机集成制造系统，利用计算机技术把分散在产品设计制造过程中多种孤立的自动化子系统集成以实现高效管理和制造。

## 1.2 <span id = "JDF"> JDF </span>

JDF - Job Definition Format，作业定义格式，基于[XML](https://jim-codehub.github.io/pages/extension/XML.html)技术，是工作流节点的数据载体。JDF广义上包含了JDF、[JMF](#JMF)和[ICS](#ICS)标准。

### 1.2.1 Structure

## 1.3 <span id = "JMF"> JMF </span>

JMF - Job Messaging Format，作业消息格式，基于XML技术，以HTTP(s)为通信载体，用于工作流节点的信息交互。表现为系统自举和设置、作业和设备的动态状态、资源利用和错误跟踪、管道控制、设备设置和作业变更、队列控制和作业提交、设备功能描述等。

## 1.4 <span id = "ICS"> ICS </span>

ICS - Interoperability Conformance Specification，协作互通性规范，定义了不同类型设备应该支持的最小的JDF指令和参数集合，是泛型JDF文档的具体实现，也是JDF程序开发的指导文件。如果把JDF文档比作抽象类，则ICS是该抽象类的派生子类。ICS对不同部分定义了互通性规范，其中Base ICS定义了任何JDF产品都应该兼容的JDF子集，即JDF产品所应该实现的最基本功能。在此基础上分别定义了若干不同部分的ICS规范，在上层ICS中不再出现下层已经出现的内容，完全的ICS文档等于所有层内容的相加。

![ICS Classes](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/ICS_Classes.png) <br><center> <font color=gray> ICS Classes </font> </center><br>

其中Binding ICS定义了具有骑马钉、装订软封面或硬封面的JDF印后设备所应该兼容的JDF子集。JMF ICS定义了一个具有JMF通讯功能的JDF产品所应该兼容的JMF子集。

Tips : ICS文档的使用方法 - ICS元素表格中可链接的表示该内容为子元素，否则是属性，属性下深色背景的是属性值，对于在ICS中没有说明的节点，可以在JDF文档中找到描述信息。

## 1.5 MIS

MIS - Management Information System，管理信息系统，由决策支持系统、工业控制系统、办公自动化系统以及数据库、模型库、方法库、知识库和与外界信息交换接口组成，主要作用是最大限度利用计算机和网络来**加强企业的信息管理**，提高整体效益和效率。集成JDF的MIS系统能够提供作业流程控制、生产控制等功能，可以实现从作业接收、估价、报价、作业安排、作业分派和打样，最后到印刷生产的全过程的信息管理。[Case : HP HIFLEX](http://www.hp.com/hpinfo/newsroom/press_kits/2012/HPdrupa12/HP_Hiflex_MIS.pdf).

### 1.5.1 MIS-JDF联网结构

#### 1.5.1.1 分散式联网架构

JDF文件从一个设备的应用程序中发送到下一个设备的应用程序中，JDF可以通过程序保存在一个文件系统中或者数据库中。

![MIS Distribute Net](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/MIS_Distribute_Net.png) <br><center> <font color=gray> MIS distribute net </font> </center><br>

#### 1.5.2.1 中央式联网架构

##### 1.5.2.1.1 以JDF为中心的联网架构

所有的JDF信息存储于中央服务器的数据库中，数据库负责各个流程的统一调度管理，这可以让JDF文件可持续的受到监视，以及针对哪一流程在何时对JDF树某一节点进行操作规定规则。

![MIS JDF Center Net](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/MIS_JDF_Center_Net.png) <br><center> <font color=gray> MIS JDF center net </font> </center><br>

##### 1.5.2.1.2 以MIS为中心的联网架构

MIS担任统一调度的重要角色，它可以控制全部的作业过程，完成控制器的任务。

![MIS MIS Center Net](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/MIS_MIS_Center_Net.png) <br><center> <font color=gray> MIS center net </font> </center><br>

---

# 2 JDF Development

<table width="100%" align="center" text-align="center">
<tr>
<th> Classes </th> 
<th> Num </th> 
<th colspan="2"> Process </th> 
<th> Result</th> 
<th> Note </th> 
</tr>

<tr>
<td align="center", valign="center", rowspan="8"> Software </td>

<td align="center", valign="center"> 11 </td>
<td align="center", valign="center", colspan="2"> JDF&JMF </td>
<td align="center", valign="center", rowspan="4"> CIP4-APP </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 10 </td>
<td align="center", valign="center", colspan="2"> Xerces-C </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 9 </td>
<td align="center", valign="center" > HTTP(s) </td>
<td align="center", valign="center", rowspan="2"> HotFolder </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 8 </td>
<td align="center", valign="center" > Socket </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 7 </td>
<td align="center", valign="center", colspan="2"> Modbus </td>
<td align="center", valign="center"> InterCom </td>
<td align="center", valign="center"> Optional </td>
</tr>

<tr>
<td align="center", valign="center"> 6 </td>
<td align="center", valign="center", colspan="2"> Device drivers </td>
<td align="center", valign="center", rowspan="3"> Linux </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 5 </td>
<td align="center", valign="center", colspan="2"> Linux kernel&File system </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 4 </td>
<td align="center", valign="center", colspan="2"> uboot </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center", rowspan="3"> Hardware </td>

<td align="center", valign="center"> 3 </td>
<td align="center", valign="center", colspan="2"> PCBA </td>
<td align="center", valign="center", rowspan="3"> PCB </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 2 </td>
<td align="center", valign="center", colspan="2"> Layout </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> 1 </td>
<td align="center", valign="center", colspan="2"> Schematic design </td>
<td align="center", valign="center"> - </td>
</tr>

</table>

<br><center> <font color=gray> CIP4 Proj development framewrok  </font> </center><br>

## 2.1 JDF-XML

JDF的注释与XML注释不同，它不是<!--xxx-->形式，而是一个结点，如上表，其元素名为“comment\*”，在JDF文档中也会出现XML的注释方式。

关于JDF提取与URL更新
接收到MIME包后，如需提取JDF各部分内容并将其（分别）存储，则需要更新以下内容的URL为所存储路径的URL，这些内容包含：JMF中的QueueSubmissionParams或ResubmissionParams、JDF中的FileSpec。
二．涉及到的XML技术
JDF涉及到的XML技术有：XML、xmlns（命名空间）、XML Schema、Xpath（XML path Language）。

三．JDF的解析与测试
CIP4指出两点建议，即JDF产品需能够解析和测试JDF文档，对JDF文档的解析，其本质就是对XML文档的解析，除了做到增、删、改、查等基本功能外，还要做到JDF产品功能的初衷：消耗输入、产生输出；对于JDF的测试，是为了减少在运行中的失败，可以避免JDF设备驱动（与JDF接口、JDF产品同含义，下同）运行一个不完整的或畸形的JDF节点。
1.JDF解析
实现JDF文档的解析功能后，JDF接口还应该具备选择功能，即确定执行哪一个节点的能力。找到相关节点后，首先要根据与决策相关的元素及元素的各种状态属性等决定执行过程，然后根据节点的控制信息处理其相应的输入资源并产生输出资源。
2.JDF测试
在测试过程中，JDF设备驱动应对处理过程所规定的需求与目标设备的能力进行比较。此外，JDF设备驱动要明确地测试必须输入的资源是否存在、是否有效。如：一个输入资源可能是通过URL索引的，那么在测试式就要到指定位置查找该资源是否存在；这点对于费用昂贵或耗时的作业来首是特别有意义的。
在检测到错误时，应该把错误信息写入AuditPool节点中，如果支持JMF，还需向相关接收者反馈错误信息。之后就可以修改该错误，在无错误后开始运行。

四．JDF解析库
CIP4项目组使用C++、Java、C#语言开发了JDF解析库，它们是对XML解析库的进一步封装，如JDFLibC++使用了Xerces-C++函数库，同时也调用了许多知名开源函数库，如libpng、zlib、curl等。
注：curl是一种客户端操作URL的开源程序，更多知识请参看：jdf_docs\cURL技术。

五．JDF VS XML
1.JDF不具有XML中定义的文本节点，它把众多本应该在文本节点中出现的内容都定义在属性值当中。
2.JDF的标准命名空间为：“xmlns="http://www.CIP4.org/JDFSchema_1_1"”，同时支持前缀形式的命名空间。以前缀形式的命名空间称为JDF扩展命名空间，其标准命名空间为：“xmlns:jdfx="http://www.CIP4.org/JDFSchema_1_1_X"”。使用前缀名为“xsi”的，表示其命名空间来自于“xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"”，xsi表示XMLSchema-instance。
详细参看：jdf_link\JDF_Extend.txt。
3.JDF Schema：命名空间地址是没有任何意义的，可以无效，也可以作为有意义的链接使用，如JDF标准命名空间使用了JDF模式链接，当需要使用JDF模式文件时，可以基于命名空间属性值进行扩展。另外，不同的JDF文档需要不同的验证文件验证，验证文件的路径称为“SchemaLocation”，验证文件名称为“\*.xsd”。
4.JDF XPath：JDF使用狭义的XML XPath，即它仅表示结点树路径，而不具有复杂的语法格式。

Building a system

1.实施注意事项及指引
(1)JDF分析
JDF设备必须实现JDF分析功能，至少能够查找它能够执行其PROCESS类型的节点，搜索算法的细节依赖于实现，可以简单到只搜索JDF根节点。
DEVICE必须能够对其所能执行的每个PROCESS类型的节点“消费输入和生产输出”：» 索引“确定可执行节点”。
(2)测试运行
为了减少运行时错误，建议各个设备或它们的控制器支持测试运行功能。这可以防止设备开始处理不完整或畸形的节点。

2.JDF和JMF交换协议
为了更好的互操作性，控制器和设备应该提供没有SSL层的不安全http。
(1)基于文件的协议（JDF）
基于文件的协议是JDF作业票据的解决方案，该协议可以基于热文件夹，实现热文件夹的设备必须为JDF定义一个输入热文件夹和输出热文件夹。此外，SubmitQueueEntry消息包含一个URL属性，该属性允许指定任意的JDF定位。
注意，基于文件的协议不支持协议错误处理的确认收据，这就要求接收方轮询处理程序的输出热文件夹。最后，授予对热文件夹的读/写访问权限也降低了安全性。
(2)基于HTTP的协议（JDF+JMF）
①消息的实现
JMF是HTTP（客户端）请求和（服务器）响应的主体。客户端使用post方法请求，JMF可以是Query或Registration或Command，也可以包含Signal和Acknowledge。
对于Signal和Acknowledge请求：当Signal是可靠信号（» 索引“可靠信号”）时，服务器对其响应不能为空，否则可以为空，Acknowledge的响应可以是空的。
②HTTP推送机制
因为HTTP是无状态协议（对事务处理无记忆，每次通讯无上下文关联），所以服务器到客户端的推送机制非常重要（如定期的状态栏更新）。客户端也可以通过定期轮询服务器来获取相关消息。


(3)基于HTTPS的协议 - SSL双向认证
(4)管理持续通道（Persistent Channels）
控制器可以通过向设备发送一个KnownSubscriptions查询来请求有关当前活动订阅的信息。
A.如果设备中已经存在匹配的Subscription，则控制器不应发送新的Subscription。
B.如果设备不支持KnownSubscriptions请求，则控制器可以创建一个新的Subscription，如果设备已经存在相同的Subscription，则替换为新的。
C.通过StopPersistentChannel来删除持续通道

3.JDF包
JDF可以将消息组合成单个包：JMF、与该JMF相关的JDF、与该JDF相关的数字资产（附件）；对于数字资产，虽然可以引用任何有效的MIME文件类型，但以下外部数据文件类型是确定的：png格式的预览图片、ICC文件、预飞文件、PDL语言。
JDF包基于MIME格式，目前支持Multipart/Related类型。包内使用统一格式：包可以包含一个或多个部分，至少包含一个JDF或JMF部分。JMF可以有0或1个部分，JDF可以有多个部分，混合包需要按：JMF、JDF、其它部分的顺序排列。

Tips : 
JDF包不能是空的，要么装JMF、要么装JDF、要么都装。如果装了JDF，还可以附加一些PDF和图片等信息

JMF要么没有，如果有就只能有一个。如果有 且和JDF混合，则必须排在第一个。

JDF可以没有（当有JMF时，因为JDF包不能空），也可以有多个。


多个JDF以及其资产的排序应该是从前到后、从上到下的

![CIP4 Protocol Stack](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/CIP4_Stack.png) <br><center> <font color=gray> CIP4 Protocol Stack </font> </center><br>


![Queue Entry](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntry.png) <br><center> <font color=gray> Queue and QueueEntry </font> </center><br>


4.作业提交一致性列表

当Manager经由JMF - SubmitQueueEntry 命令消息提交一个JDF实例时，Manager有如下选择（为了符合ICS一致性，下面两种方式，Manager和Worker都应该支持）：
A：【官方推荐方式】JDF实例和JMF消息打包在MIME包中，JMF消息作为MIME包的第一部分，然后使用带有“cid”scheme的URL来关联该包中的JDF部分。(资产由JDF中的CID关联)
B：JDF实例从JMF消息中分离，JMF消息使用URL来关联JDF实例。

![JMF Communication by HTTP(s)](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMF_HTTPs.png) <br><center> <font color=gray> JMF Communication by HTTP(s) </font> </center><br>
HTTP(s) -> JMF
`<JMF...> 
	<SubmitQueueEntry URL="http://xxx.jdf"...>
		...
	</SubmitQueueEntry>
</JMF>`


![JMF Communication by HotFolder](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMF_HotFolder.png) <br><center> <font color=gray> JMF Communication by HotFolder </font> </center><br>

HotFolder -> JDF
`<JDF...>
	<FileSpec URL="htt;//*" or "file://*" or "./*" />
	...
</JDF>
`

Programming for Queue Entry:	Mybe set an element Queue as a global variable, then you have an unique queue as JDF_1.5 demand.
	Append , set or delete QueueEntry element for your only one Queue upon to satisfy some stuff.

(1)MIME基础
(2)MIME类型和文件扩展
对于基于文件的JDF，推荐扩展名“.jdf”和“.jmf”。当MIME包含JDF或JMF时，当第一个部分为jdf，则推荐扩展名为“mjd”，当第一个部分为jmf时，则推荐扩展名为“mjm”。
使用MIME对JDF和JMF打包时，Content-Type、Content-ID、Content-Transfer-Encoding、Content-Disposition头部域常被使用。
①Content-Type
MIME包使用Multipart/Related类型，其中jdf部分和单独的jdf数据使用application/vnd.cip4-jdf+xml类型、jmf部分和单独的jmf消息使用application/vnd.cip4-jmf+xml类型。
②Content-ID
该域用于一个部分向另一个部分的索引，常表现为一个部分的内容中含有URL=“cid:....”信息，以使用URL的属性值匹配该域的域值。
要求该域的域值以尖括号<>包含，并忽略大小写。
③Content-Transfer-Encoding
该域是可选的，域值与MIME标准重合，对于包含JDF或JMF的部分使用8bit编码，对于包含PDF和图片等文件的部分使用binary编码，另外使用Base64编码可将8bit、binary信息编码为7bit信息，反之亦然。
支持MIME的Consumers应该8bit、binary编码，必须支持Base64编码，其它编码可选。
④Content-Disposition
该域是可选的，用于为其主体指定一个文件名，如使用该部分，则必须使用attachment属性。使用该域要注意文件名可能是被编码过的。

---

# <span id = "Appendix-A"> Appendix-A：JDF future - XJDF </span>

XJDF是JDF的全新升级协议，同样由CIP4维护，字母“X”表“Exchange”，仅用于区分JDF。XJDF可称之为“JDF2.0”，是更精简、高效的作业传票协议，同时JDF本身也在保持着自己的发展路线，目前最新版本为JDF1.6（2017.09.01日推出）。仍然保留JDF并保持JDF更新的原因有三点：一是XJDF是全新协议，不能做到向下兼容。二是许多厂商已经在JDF协议上花费太多时间和成本，虽然很复杂，但已开发出成熟的接口，在短时间内并不能及兼容XJDF。三是XJDF并未经过实际测试，在一些方面尚不成熟。

---

# <span id = "Appendix-B"> Appendix-B：JDF market </span>

## B.1 JDF Job Ticket

- Job ticket standalone 
	- JDF编辑器。单纯地具有对JDF作业传票进行查看、检测和编写功能
	- 电子商务&Web接口工具。具有兼容JDF的电子商务功能
	- 资产转移工具。可实现PDF文件后额JDF作业传票的管理工作，如文件的输入和输出管理。

- Job ticket embedded
	- 文档创建&版面设计软件。可实现作业文档的制作（或文档的创意和编辑等），并存在创建文档或输出文档的同时创建相关的JDF作业传票
	- 预飞工具。能够对PDF文件做到预飞检查，同时能够创建相关的JDF作业传票。
	- 资产转移服务。可实现PDF文件和JDF作业传票的管理工作，如文件的输入和输出。
	- 其它的一些内嵌的作业传票软件。将属于JDF作业传票软件的范围又不具备以前功能的软件都归属到这一类型。

## B.2 MIS-JDF system

- 集成的JDF MIS系统是一种功能强大的MIS系统，能够提供作业流程控制、生产控制和常规控制的MIS功能等丰富的功能，具体来说，他可能实现从作业接收、估价、报价、作业安排、作业分派和打样，最后到印刷生产的全过程的信息管理。例如HIFLEX MIS、Prineet Prinance。
- 管理方面的JDF MIS系统和生产方面的JDF MIS系统和生产方面的JDF MIS系统是分别从功能的两个方面来划分市场。管理方面的JDF MIS系统主要是能实现在作业管理或客户关系管理方面的信息管理。它们可能实现下面的三种功能的一种。
	- 估价/报价能实现对订单进行估价与报价处理
	- 调度。能根据生产环境实现对作业的良好生产调度
	- 客户关系管理（CRM）/销售。能实现对客户关系管理和商业管理，如客户数据管理、供货商数据管理和交货清单管理等。
- 生产方面的JDF MIS系统主要是能实现对生产过程的控制与跟踪工作流程。能实现工作流程链的定义与跟踪生产控制/作业跟踪。能通过JDF作业传票对生产进行控制，并实时反馈生产情况。

## B.3 JDF compatible devices

该市场分类中包含了所有兼容JDF的生产设备，目前的JDF产品已经覆盖了印前、印刷、印后。对于印前，根据现有的JDF产品已经能实现下面的功能类别：
印前部门控制、打样、大幅面打印机、胶片输出、CTP、印前工作中心或软件、拼大版、版面设计、预飞、RIP、数字印刷、软打样和其它兼容JDF的印前设备。
对于印刷，根据现有的JDF产品已经能实现下面的功能类别：
印刷车间的部门控制、油墨系统、颜色控制、数字印刷、卷筒胶印、单张纸胶印和其它兼容JDF的印刷设备。
对于印后，根据现有的JDF产品已经能实现下面的功能类别：
印后部门控制、裁切、配帖、折页、装订和其他兼容JDF的印后设备。

## B.4 JDF tools

- Development tools
	- IDE/SDK, Provide programming env for JDF development
	- SOAP/HTTP, Provide JMF env for JDF production, such as JMF creation, JMF send and recive etc.
- Test tools
	- Validity test, Provide validity test for JDF file under JDF scheme that provide by CIP4.
	- ICS test, Provide ICS test for JDF file under CIP4 ICS

## B.5 JDF Serve

JDF consulting and training serve etc.

---

# <span id = "Appendix-C"> Appendix-C：JDF workflow components role </span>

Role		| Note				| Description 
:-:			| :-:				| :-:
Agent		| software			| 可以读取、增、删、改、查、验证、生成JDF文档的应用程序。Controller和Device通常具有修改JDF的功能，因此它们具有Agent属性。
Controller	| software			| Agent操作JDF文档，Controller将其路由到合适的Device，Controller至少能在一个Device上或一个Slave Controller上启动Process。为了能够和其它Controller以及Device通讯，Controller要具备JDF文件交换协议，也可能要支持JMF。Controller也能决定Process的计划和时序数据，例如Process时间和计划生产数量。
Device		| hardware			| 执行Agent和Controller信息
Manager		| software			|发送JDF实例、JMF消息的一方
Worker		| software			| 接收JDF实例、JMF消息的一方（接收后可以回应）
Producer	| software			| Manager发送给worker消息时，Manger是Producer，Manger发送给worker消息后，worker响应，此时worker是producer
Consumer	| software			| worker接收Manger的消息，worker是consumer，manager等待woker响应时，manager是consumer 
Server		| software/hardware	| -
Client		| software/hardware	| -

<br><center> <font color=gray> Workflow components role in JDF_1.5 and ICS_Base 1.5 </font> </center><br>

---

# <span id = "Appendix-D"> Appendix-D：CIP4 software license </span>

Copyright (c) 2001-2020 The International Cooperation for the Integration of Processes in Prepress, Press and Postpress (CIP4). All rights reserved.

PREAMBLE
This software license applies to all source code and compiled software products made available by International Cooperation for the Integration of Process in Prepress, Press and Postpress (CIP4) association, to include, but not limited to the C++ and Java Application Programming Interfaces (APIs), CheckJDF application, JDF Schema, JDF Editor, Online Documentation for C++ API, the Alces application, the Elk application, and any part or component thereof (hereinafter "CIP4 Software").

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

TERMS AND CONDITIONS FOR USE AND REDISTRIBUTIONS OF THE CIP4 SOFTWARE

1 USE AND REDISTRIBUTION
1.1 The CIP4 Software may only be copied, modified, sublicensed or distributed as expressly provided under this license. Any other use or attempt to otherwise copy, modify, sublicense or distribute the CIP4 Software is void and will automatically terminate licensee's rights under this license.

1.2 Redistributions of source code must retain this CIP4 Software License and the following copyright notice:

"Copyright (c) 2001-2006 The International Cooperation for the Integration of Processes in Prepress, Press and Postpress (CIP4). All rights reserved."

1.3 Redistributions in binary form, with or without modifications, including compiled applications, must reproduce this CIP4 Software License including the above copyright notice in the documentation and other materials provided with the distribution. Redistributions containing modifications must include a prominent modification notice stating that modifications have been made to the original CIP4 Software.

1.4 Any company that sells, markets, or attempts to sell software development kits or any development tools that include the redistribution of CIP4 Software, in whole or in part, must make clear which files, applications or components are derived from CIP4 sources and the license provided by such companies to their customers, suppliers, and business partners must include this License in whole. Such customer, suppliers, and business partners must acknowledge the terms of this License to the company providing said software development kits or development tools and are subject to all terms herein, including the membership requirement in paragraph 4 below.

2 DISCLAIMER OF WARRANTY
Licensee of the CIP4 Software expressly acknowledges and agrees that any use of the CIP4 Software is at the sole and entire risk of the user. The CIP4 Software is provided "as is" without warranty, upgrades or support of any kind. CIP4 expressly disclaims any expressed or implied warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement of third party rights. CIP4 does not warrant that the operation of the CIP4 Software will be error-free or that defects in the CIP4 Software will be corrected.

3 LIMITATION OF LIABILITY
To the extent not prohibited by law, in no event shall CIP4, CIP4 trustees, directors, officers or employees, or contributors to the CIP4 Software be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of the CIP4 Software, even if advised of the possibility of such damage.

4 CIP4 MEMBERSHIP REQUIREMENT

4.1 Any company that sells, markets or attempts to sell redistributed CIP4 Software for profit or fee, or distributed as a free component of any commercial system or package, shall maintain either Full or Partner CIP4 membership status and be a member in good standing. Any such company that fails to maintain its Full or Partner membership status must cease selling, marketing, attempting to sell any products that redistribute CIP4 Software, in whole or in part, and may only provide fixes, updates, or upgrades to customers with installations if no portion of the updates, fixes or upgrades make use of the CIP4 Software.

4.2 Any affiliate company using a different name than the member that participates in the selling, marketing or attempts to sell redistributed CIP4 Software for profit or fee must either maintain its own CIP4 Full or Partner status membership as provided under paragraph 4.1 above, or the parent company, if it holds majority ownership of both companies, shall maintain CIP4 Full or Partner status membership as provided under paragraph 4.1 above.

4.3 Distributors, resellers, and integrators that sell products that include redistributed CIP4 Software, in whole or in part, that are produced by a third party are exempt from the membership requirement in paragraph 4.1 above, provided that they do not provide any value-added programming or modifications to said products. Any distributor, reseller, or integrator that sell products that include redistributed CIP4 Software, in whole or in part, that are produced by a third party are NOT exempt from the membership requirement in paragraph 4.1 above if they make any value-added modifications or alter the said products via programming or any method that changes the functionality of the CIP4 Software. Companies that are developing and testing products that make use of CIP4 Software, in whole or in part, to include beta and alpha testing where testing companies have not paid or committed to pay anything for the product being tested and under development are also exempt from the membership requirements in paragraph 4.1 above until they begin to sell, market or attempt to sell such products.

5 END USER DOCUMENTATION
The end-user documentation included with the redistribution containing CIP4 Software, if any, must include the following acknowledgment:

"This product includes software developed by the The International Cooperation for the Integration of Processes in Prepress, Press and Postpress (www.cip4.org)"

Alternately, this acknowledgment may appear in the software itself, if and wherever such third-party acknowledgments normally appear.

6 USE OF CIP4 NAMES, TRADEMARKS, LOGOS, ICONS
6.1 The names "CIP4" and "The International Cooperation for the Integration of Processes in Prepress, Press and Postpress" may be used by Full or Partner CIP4 members in good standing to promote products that are JDF-enabled.

6.2 This license does not grant any rights to use CIP4 and JDF trademarks, trade names 
logos, and icons. The use of and JDF trademarks, trade names logos, and icons must be in accordance with CIP4's Guidelines for Logo Usage as published on the CIP4 website.

6.3 CIP4 may audit the use by any licensee of the CIP4 Software, trademarks, logos, and icons to determine compliance with these terms and conditions.

7 LICENSE VERSIONS
CIP4 retains the right to modify the terms applicable to the CIP4 Software under this CIP4 License. CIP4 may at any given time publish revised and/or new versions of this CIP4 License. Each version will be given a distinguishing version number and CIP4 Software that has been published under a particular version of this License may be used either under the terms of the original version or any subsequent version of this License.

This software consists of voluntary contributions made by many individuals on behalf of the The International Cooperation for the Integration of Processes in Prepress, Press and Postpress and was originally based on software copyright (c) 1999-2001, Heidelberger Druckmaschinen AG and copyright (c) 1999-2001, Agfa-Gevaert N.V.

For more information on The International Cooperation for the Integration of Processes in Prepress, Press and Postpress, please see http://www.cip4.org.





































### JMF消息家族

消息在根节点中包含以下六个高级元素中的一个或多个：Query、Command、Signal、Response、Acknowledge and Registration

#### Query
Query用于从controller检索信息且不改变其状态，controller收到Query消息之后，返回Response响应。
如果Query消息包含Subscription订阅，则controller在所订阅的事件发生时将向所订阅的URL发送Signal消息，直到controller收到 StopPersistentChannel的Command为止。

在JMF-ICS-1.5中，Query包含的消息类型有：KnownDevices、KnownMessages、KnownSubscriptions、QueueStatus、SubmissionMethods

#### Command

Command用于向controller发送指令以改变其状态，controller收到Command消息后，立即返回Response响应。
如果Command包含AcknowledgeURL属性，则Response消息需包含Acknowledge=true/false属性，如果Acknowledge=true表示controller支持Acknowledge，那么在指令执行完毕后将向AcknowledgeURL发送Acknowledge消息以汇报执行结果

【附】管道资源（Pipe Resource）和管道推动（PipePush）：
在印刷与印后折页两个邻近的处理过程中，折页处理过程通常并不需要等印刷处理过程把所有印张都生产完才开始，只要印刷的印张达到一定的数量，折页处理过程就可以启动生产，这就是一个重叠过程（Overlapping）。
因此，为了在重叠过程中定义如例中的印张这类不仅被消耗又能被补充的资源，JDF使用“管道资源”来描述。

#### Signal

Signal是单向消息，用于controller自动广播状态变化。有三种获取Signal消息：使用包含Subscription订阅的Query消息、使用JDF节点（该节点的NodeInfo元素中包含‘含有Subscription订阅的Query消息’）和使用“硬连线”。
前两种必须包含refID属性以标记Signal发送者，第三种方式不能包含refID属性，而必须包含响应的请求参数。
Hard-Wired硬连线
Hard-Wired的方式属于主动信号发送方式，实现方法如预设（通过文件或其它方式）一个URL列表，当设备开机或首次连接到网络时广播信号以告知设备信息。
Signal单向/双向
本质上Signal也是双向消息，属于HTTP - C/S模型，但Response消息可以被忽略。对于接收者来说，当Signal的ChannelMode属性值为Reliable时，必须返回Response消息

Signal是在某些事件发生时发送给Manager（Client下同）的一种单向消息。可以通过三种方式获得信号消息：第一种方式是通过包含了一个Subscription元素的询问消息来发起初始的询问（如第1点图示）；第二种方式是在JDF结点中通过“NodeInfo”资源中的JMF元素来发起初始的询问，在JDF“NodeInfo”资源中的JMF元素是用来定义一个JMF询问消息的，因此同样可以在该JMF询问消息中包含一个“Subscription”。
这两种方法都需要一个起始的询问消息来订阅（发起）信号消息，不同的是传递起始询问消息的路径不同。第一种方法是通过HTTP、第二种方法是通过JDF结点。这两种方法获得的信号消息都包含refID属性，以此来引用一个持久的信道（ID和refID属性是通道两端的联系（指针））。
控制器可以接收信号的第三种方式是使信号通道硬连线。例如，当一个控制器在启动服务或者中断服务时就会产生一个信号消息，然后可根据一个初始化文件中列出的控制器的URL发送给各个控制器。又例如，当某控制器连入新的网络时也可以自动产生一个信号消息，然后发送给网络中的其它控制器，以此告诉大家它所能提供的服务。

#### Response 

Response用于（同步/直接）响应Query和command消息，以表明消息已接收并翻译。当Response的ReturnCode属性大于0时，Response应该包含Notification元素以描述返回状态。
Response的refID属性值等同于Query或command中的ID属性值。当Signal消息的ChannelMode属性值为“Reliable”时，Signal将变为双向消息，此时必须对Signal返回Response

#### Acknowledge

Acknowledge是对Command或Query消息的异步（单向）应答，其refID属性值为发送方ID值。Acknowledge仅在Command消息指定AcknowledgeURL属性或AcknowledgeFormat和cknowledgeTemplate属性，且controller支持应答时才产生

## JMF 握手

JMF可以通过几种方式建立系统组件之间的通信。
1.单一的Query/Command Response通信
Query和Command方式的握手机制是相同的，控制器发送一个Query或Command消息，然后目标系统解析它们并立即产生一个合适的Response。如果发出的Command延时很长，则当命令被执行时，一个额外的Acknowledge消息可能被发送用以确认（第三章第5节图）。
2.Signal和Acknowledge
默认的，对Signal和Acknowledge消息控制器只发送而不保证是否成功，在成功的情况下只有带有空主体的标准HTTP协议响应从接收端返回。如果在接收端出现了错误，则接收端应该返回一个错误Response消息（详见第六章）。
有关Signal和Acknowledge应答属性值应该设置为false，因为Signal和Acknowledge没有“AcknowledgeURL”属性来指明这些应答消息应该发送到哪里。
3.可靠的信号
如果在设置持续的信道时设置了可靠信号，则JMF信号的接收方应该使用设置了合适的“ReturnCode”属性值的Response来响应消息。如果接收方没有响应可靠信号，则发送方应该尝试重新发送（基于在Subscription元素中指定的RetryPolicy属性）。
如果收到一个非零的ReturnCode属性值，则信号消息也要重试（依赖Error元素或Resend属性）。

4.可持续通道
使用Subscription元素可订阅Query和Command消息。
Signal的可持续通道
如第三章第1节。
Command的可持续通道
Command也可以在一个初始化的Registration中通过使用Subscription元素来订阅。Registration中的Subscription定义了初始注册消息接收者的请求，随后发送Command消息给接收端（定义在Subscription元素的URL或Format、Template属性中）。例如，MIS可能会将一个Registration发送到印前工作流系统，引导印前工作流系统在当生产板或预视图已经生产的时候向印刷系统发送Command消息。
订阅的范围
订阅应该尽可能的全局化，例如，最好为所有与作业相关的和与工作无关的消息创建一个全局状态订阅，而不是为每个单独的队列条目创建一个新的状态订阅。
注：从JDF1.5开始，已经不支持对作业和队列项的特定订阅。
可持续通道的删除
通过StopPersistentChannel可删除一个可持续通道。


## 消息等级
五．JMF消息等级
JDF整合控制器可选择由JMF提供的合适的消息等级：
No messaging - 控制器可以不使用消息。JDF可以在每个过程结点包含Audit元素代替JMF消息机制。
Notification - 大多数控制器还是选择使用JMF消息机制的，Notification是最基本的消息等级。支持Notification的设备通过发送Signal来提供单向消息。通知消息在开始和完成作业中的某个过程时通知控制器。它们可能还提供一些错误情况的通知。
Query Support
支持Query的控制器通过传递当前的JobID属性、排队的JobID属性或当前工作过程的状态来应答其它控制器的询问。
Command support
这种等级为控制器提供了处理命令的能力，控制器可以接收命令，例如中断当前的作业、重启作业或者改变队列中作业的状态。
Submission support
控制器可以通过HTTP POST请求消息通道来接收JDF作业，在这种情况下通道应该支持MIME

## 六．Error和Event消息
如果Acknowledge消息、Command消息、Query消息、Signal消息或者Registration消息没有被正确处理，程序应该有标准错误的响应，这种响应可能包含Notification元素。在Notification元素中包含的消息可用于用户界面提示错误。
Response消息和Acknowledge消息包含一个ReturnCode属性，该属性默认值为0，表示响应成功。如果成功，在响应命令时，可以提供一个Notification元素（Class属性=“information”）。如果出现警告或错误，ReturnCode属性会大于0。在这种情况下应该提供Notification元素。响应错误的程序应该填充Notification元素来详细描述错误。

## 八．JMF队列支持
在JMF中，Controller假设有一个输入队列，它接收提交的作业，然后将该作业提交给低等级的Controller或Device。换句话说，作业通过Controller级联的方式到达Device，同理，“ReturnQueueEntry”消息以同样的方式返回。
另外，Device只允许有一个队列，如果机器支持多种队列，则在JDF中它将用多种逻辑设备（Device）表示。没有队列的Device其JMF消息的Status属性有两种“Waiting”和“Full”。
JMF支持具有优先级队列的简单处理，以下是一些可能情况：
·队列支持优先级，但只有在“Wating”状态的作业才支持
·优先级从0~100，拥有100优先级的作业将会停止其它作业并立即执行自己
·一个Controller可以控制多个Device/队列
·队列入口可以使用QueueEntryID属性标识
·在提交或执行JDF期间，Controller或Device可能分析它，而队列可以视JDF为封闭的信封而避免检查。
更多的消息及处理方式参看《JDF 1.5 Specification》5.13~5.15章节。

## 九．JMF交换协议
一个独立的系统应该定义一个基于JDF和JMF的信息交换协议。在JDF1.2版本中废除了传输层的约束。目前，在JDF系统中存在三种信息交换协议：基于文件的协议、HTTP和HTTPS协议。
1.基于文件的协议
基于文件的协议以热文件夹为基础，使用热文件夹必须为JDF定义一个输入热文件夹和输出热文件夹。对JDF和JMF来说，这是一种简单的解决方案。缺点是不支持错误处理协议的接收确认，处理的结果需要去查询输出热文件夹，热文件夹的读写授权也降低了其安全性。
附：热文件夹就是在此文件夹中发现有进入的文件时，会自动触发相关操作。处理文件的软件会定时检查文件夹位置，并自动处理其中的文件。
2.HTTP协议
超文本传输协议HTTP，是一个稳定的与用户无关的协议，它具有很多有利的特征。它有一套完善的请求/响应机制（HTTP-post）。
在消息的执行时，HTTP服务器只能完成“Query”和“Command”两种类型的消息。它们可以通过一个标准的HTTP的post请求来完成，JMF文件内容就是这个HTTP的post消息的body部分。“Response”类型的消息是响应之前的HTTP的post消息的响应消息的body部分。“Signal”和“Acknowledge”两种类型的消息同样是像HTTP的post消息一样来实现，只是响应（Response）这些消息的HTTP的body部分是空的。
3.HTTPS协议
HTTPS提供广泛的防火墙支持和安全套接字（Secure Sockets Layer，SSL）的安全连接。基于HTTPS的交换方法使JMF系统的用户简单的在不同的系统间安全地交换信息。该解决方案能够支持持续鉴定，而不用在每一次的访问中都交换用户名和密码。



---

三．资源池ResourcePool与资源链接池ResourceLinkPool
1.ResourcePool
所有的资源都包含在ResourcePool元素的子元素中，或者说ResourcePool元素的子元素都是资源，而资源又只分为两种：输入资源和输出资源；所以ResourcePool元素的子元素要么是输入资源，要么是输出资源，由“Usage”属性决定。
有两个特别的资源：NodeInfo元素和CustomerInfo元素；在JDF1.3版本之前他们是JDF元素的直接子结点，在其之后它们成为了ResourcePool中的资源。
在JDF文档中，资源是核心，或者说JDF文档中要传递的信息就是资源。
2.ResourceLinkPool
ResourceLinkPool元素的每一个子元素（下称L子元素）都对应着ResourcePool元素的一个子元素（下称R子元素），如一个R子元素起名为“XXX”，则对应的L子元素起名为“XXXLink”
L子元素至少有两个属性：“rRef”和“Usage”；rRef属性对应着R子元素的ID值，它用来形成整个JDF文档的链接网络。Usage有两个值-“Output”和“Input”，它决定着对应的R子元素是输入资源还是输出资源，通过检查过程组中资源的输入和输出，可以确定过程的依赖关系，从而确定作业路由（作业工作路径）。
3.全局与局部资源和链接
ResourcePool和ResourceLinkPool可出现在全局范围中，也可出现在局部范围中，全局的概念是指在JDF根结点下，可称为root Resource、root ResourceLink。局部的概念是指在JDF过程组结点或过程结点下。
ResourceLinkPool中的\*Link元素使用“rRef”属性关联ResourcePool，ResourcePool的各资源之间还可以通过“Ref”的方式关联。


JDF是基于XML语言的数据文件，其中包含了数据信息（印前、印刷、印后相关）、生产管理信息等多种数据内容，并以“树”型数据结构维护，主干分支节点维护着JDF的重要分支信息，如印后信息就是一个主干节点。

----
`JDF 框架


每一个过程都是 ： 资源+资源连接池的组合
<JDF Type = "Product" ...><!--产品节点-->
...
<JDF Type = "ProcessGroup" ...><!--过程组节点-->
...
<AuditPool><!--审计节点-->
..
</AuditPool>
...
<JDF Type = "xxx" ...><!--过程节点xxx-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool>
...
</RsourceLinkPool><!--局部资源链接池节点-->
...
</JDF>
<JDF Type = "yyy" ...><!--过程节点yyy-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--局部资源链接池节点-->
...
</RsourceLinkPool>
...
</JDF>
...
</JDF>

...
<ResourcePool><!--全局资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--全局资源链接池节点-->
...
</RsourceLinkPool>
...

<JDF Type = "ProcessGroup" ...><!--另一个过程组节点-->
<JDF Type = "zzz" ...><!--过程节点zzz-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--局部资源链接池节点-->
...
</RsourceLinkPool>
...
</JDF>
<JDF Type = "qqq" ...><!--过程节点qqq-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--局部资源链接池节点-->
...
</RsourceLinkPool>
...
</JDF>
...
</JDF>

<JDF Type = "ProcessGroup" ...><!--另一个过程组节点-->
<JDF Type = "www" ...><!--过程节点www-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--局部资源链接池节点-->
...
</RsourceLinkPool>
...
</JDF>
<JDF Type = "eee" ...><!--过程节点eee-->
...
<ResourcePool><!--局部资源池节点-->
...
</ResourcePool>
<RsourceLinkPool><!--局部资源链接池节点-->
...
</RsourceLinkPool>
...
</JDF>
...
</JDF>
...
</JDF>
`


------



