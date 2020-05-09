<script src="https://github.com/Jim-CodeHub/Skills-list/raw/master/script/ImgHover.js"></script> 

# Section One - JDF

# 1 JDF Basic 

## 1.1 Background 

在印刷行业中，企业生产现状多为“信息孤岛”或“流程孤岛”形式，具体表现为：印前作业数据、印刷数据、印后数据独立处理而没有有效的对接，以使印前、印刷、印后产线形成三个“信息孤岛”。这些题传统或市场遗留的问题大大增加了印刷应用企业的生产成本、降低了生产效率。

为了解决印刷行业的“信息孤岛”难题，使印刷业信息集成化、全面自动化和高度智能化，以Adobe、HP、Agfa、Heidelberg、MAN Roland等为代表的的公司成立了**CIP4（International Cooperation for Integration of Processes in Prepress, Press and Postpress）**国际联盟，致力于促进印前、印刷、印后加工的垂直整合，并应用[JDF](#Introduction)作为信息载体标准。[CIP4 Official Website](https://www.cip4.org/).

> **[info] CIMS**
>
> Computer Infomation Management System 计算机集成制造系统，利用计算机技术把分散在产品设计制造过程中多种孤立的自动化子系统集成以实现高效管理和制造。

## 1.2 <span id = "Introduction"> Introduction </span>

JDF - Job Definition Format，作业定义格式，基于[XML](https://jim-codehub.github.io/pages/expansions/XML.html)技术，是印前、印中和印后工作流节点的数据载体，描述了生产意图、生产资源、生产过程和审计等信息，并提供作业分离与合并机制。JDF广义上包含了JDF（超集）、[JMF](#JMF)和[ICS](#ICS)标准。

## 1.3 XML Touch Upon 

涉及XML的技术有**DOM**模型、命名空间**xmlns**、路径表达式**XPath**和文档验证**Schema**。

> **[info] Note**
>
> JDF只应用元素节点和属性节点，而不使用文本节点。另外JDF提供以元素节点&#60;Comment&#62;标记的文档注释方式。[More](https://jim-codehub.github.io/pages/expansions/XML.html)

## 1.4 JDF Node Constructure

JDF文档的根元素节点为&#60;JDF&#62;&#60;/JDF&#62;，可以递归嵌套。其它所有元素都是JDF根元素节点的子元素。

![JDF Node](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JDFNode.png) <br><center> <font color=gray> JDF Node Diagram </font> </center><br>

### 1.4.1 *@Type* and Job hierarchy 

JDF元素节点的**递归嵌套**构建了一个包含完成预期项目所需的所有信息的树，形成了抽象的作业**层次结构**，树的根描述作业的产品意图（**Product Indent**），中间节点描述作业的组成过程（**ProcessGroup**），叶节点是过程组节点的详细拆分（**Process**）。

![Job Hierarchy](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JobHierarchy.png) <br><center> <font color=gray> Job Hierarchy </font> </center><br>

> **[info] Note**
>
> 层次结构是作业生产的流程示意，不表示实际JDF文档中元素节点的嵌套关系。实际嵌套与JDF元素节点的*Type*和*Types*属性节点相关：当存在*Types*属性节点时或*Type*属性节点值是[预定义的Process](#Appendix-A)时不可嵌套。

#### 1.4.1.1 Product Intent Nodes

一个JDF元素节点的*Type*属性值为：*Type=Product*，表示该组节点为产品意图节点











JDF元素节点的*Type*属性节点描述了每组JDF数据属于哪一层次结构：*Type=Product*、*Type=ProcessGroup*、*Type=Combined*、*Type=[PredefinedProcessType]*；并且当*Type=ProcessGroup*、*Type=Combined*时，必须通过*Types*属性确定具体过程的集合：*Types=[PredefinedProcessType1 PredefinedProcessType2 ...]*。



### 1.4.2 Sub Elements





### 1.4.1 AncestorPool 

**分布式处理机制**将子元素节点从原始JDF文档中分离（**Spawn**）以创建新的JDF文档来执行作业，*AncestorPool*中存储了关于祖先节点的上下文信息，当作业完成后通过该元素节点将JDF合并（**Merge**）到原始JDF文档。分离与合并机制允许递归运行。

More refer to *JDF Spec 1.5 - 3.5*

### 1.4.2 AuditPool

审计元素节点存储了JDF过程处理的日志，事件包括JDF节点的创建与删除、JDF节点的修改、分离与合并、错误、设备事件、任务调度等。

More refer to *JDF Spec 1.5 - 3.12*

### 1.4.3 ResourcePool


### 1.4.4 ResourceLinkPool


# <span id = "Appendix-A"> Appendix-A : Predefined Processes </span>

## A.1 Gneral Processes

## A.2 Prepress Processes

Omit

## A.3 Press Processes

Omit

## A.4 Postpress Processes

Processes				| Translation	| Description
:-:						| :-:			| :-:
BlockPreparation		|				|
BoxFolding				| -				| 定义了将坯料折叠并粘合到折叠的扁平盒中进行包装的过程 
BoxPacking				| 装箱			| - 
Bundling				| 捆绑			| 把书芯压紧并扎成捆 
CaseMaking				| - 			| （硬）封面的制作过程
CasingIn				| -				| 将书芯装入封面的过程
ChannelBinding			| 螺旋装订		| -
Collecting				| -				| -
CoverApplication		| -				| 定义了将软封面应用到书芯的过程
Creasing				| 压痕			| -
Cutting					| 裁切			| -
DieMaking				| 模具制造		| -
Embossing				| 印花			| 使用浮雕模具压印图形的过程
EndSheetGluing			|				|
Feeding					|				|
Folding					| 折叠			|
Gathering				|				|
Gluing					| 涂胶			| -
HeadBandApplication		|				|
HoleMaking				| 制孔			| -
Inserting				|				|
Jcketing				| 护套			| 书本外层的保护材料
Labeling				| 标签			| 标签可以包含收件人、产品、产品数量等信息
Laminating				| 层压			| 泛指**覆膜**的过程
Plletizing				| 托盘			| - 
Perforating				| 打孔			| 描述组件打孔的过程
PlasticCombBinding		| 塑料梳齿装订	| -
PrintRolling			| 				|
RingBinding				| 圆环装订		| <span onmouseover="showImg('https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JobHierarchy.png');" onmouseout="hideImg();">TTTEST</span> 



































### 1.4.1 System Structure


> **[info] Workflow**
>
> 上级直接节点的输出是下级节点的输入资源：Input resource --> JDF Node --> Output resource；一个产品可以有多种路由方案，[MIS](#MIS)会作出这些决策。

### 1.4.2 Product Intent Nodes

JDF产品意图节点以属性*Type="Product"*标记：`<JDF Type="Product" ...>...</JDF>`；

### 1.4.2 Workflow Component Roles

Roles		| Description 
:-:			|:-:
Machines	| 裸机，泛指欲集成JDF功能的物理设备
Devices		| 软件，集成到Machines中，启动Machines并执行JDF指令 
Agents		| 软件，创建、修改、读写和解析JDF，Devices和Controllers也是一种Agents
Controllers | 软件，将Agents完成的JDF路由到Devices，工作流中通常有多级Controllers，路由到最低级的Controllers具有Devices功能
MIS			| 软件，工作流中所有单元之间关系的监督者，宏观Controllers  

![Interactions](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/Interactions.png) <br><center> <font color=gray> Roles interactions </font> </center><br>

## 1.5 Coordinate Systems in JDF

TBD

# 2 xxx








---

# JMF

---

# ICS












### 1.2.2 Structure

JDF作业由一组以倒立的树型结构组织的节点组成，根节点描述了作业的总体意图，靠近根节点的节点定义了产品的组成部分（与根节点一起被命名为**产品节点**），中间节点是描述产品节点的生产过程的过程组（称为**过程组节点**），叶节点是过程组节点的详细拆分（称为**过程节点**）。


### 1.2.3 Resource

资源是JDF数据的核心内容，用于描述产品信息和生产过程，所有的资源元素节点都包含于**&#60;ResourcePool&#62;**（称为资源池）元素节点下。同一资源可能被多个[链接资源](#ResourceLink)链接。

```
	<ResourcePool>
		<RESOURCE ID="R1" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCE ID="R2" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCE ID="R3" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		...
	</ResourcePool>
```

JDF Resource | Description | Reside
:-:			 | :-:		   | :-:
Bundle		 | 			   | press and postpress
Component	 |			   | press and postpress
Device		 |			   | press and postpress





#### 1.2.3.1 <span id = "ResourceLink"> Resource link </span>

*资源链接*元素节点与资源元素节点同名+'Link'结尾，并通过*rRef*属性节点关联*ID*属性节点相同的资源元素节点，用于描述资源的数量、利用方式（*Input* or *Output*）等信息。所有的资源链接元素节点都**&#60;ResourceLinkPool&#62;**（称为资源链接池）元素节点下。

```
	<ResourceLinkPool>
		<RESOURCELink rRef="R1" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCELink rRef="R2" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCELink rRef="R3" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		...
	</ResourceLinkPool>
```

成对的ResourcePoll和ResourceLinkPoll节点为兄弟节点（但不限于），处于同一JDF元素节点或子JDF元素节点下。
#### 1.2.3.2 Resource reference

当某一节点下需要重新插入资源以重利用信息时，可以使用资源元素节点同名+'Ref'结尾的元素节点名，并通过*rRef*属性节点关联*ID*属性节点相同的资源元素节点，类似于编程语言中的"include"。

```
	<SOMEELEMENT ...>
		<RESOURCERef rRef="R1" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCERef rRef="R2" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		<RESOURCERef rRef="R3" ... /> <!-- RESOURCE占位符，抽象资源示例 -->
		...
	</SOMEELEMENT>
```

## 1.3 <span id = "JMF"> JMF </span>

JMF - Job Messaging Format，作业消息格式，基于XML技术，以HTTP(s)为通信载体，用于工作流节点的信息交互。表现为系统自举和设置、作业和设备的动态状态、资源利用和错误跟踪、管道控制、设备设置和作业变更、队列控制和作业提交、设备功能描述等。

### 1.3.1 JMF Family

#### 1.3.1.1 Query

Query用于向服务器（泛指消息被动接收方，如Device，下同）查询消息，并从服务器返回Response响应。如果Query消息包含Subscription订阅（称之为可持续通道），则服务器在所订阅的事件发生时将向所订阅的URL发送Signal消息，直到服务器收到StopPersistentChannel的Command为止（可持续通道关闭）。

在JMF-ICS-1.5中，Query包含的消息类型有：KnownDevices、KnownMessages、KnownSubscriptions、QueueStatus、SubmissionMethods

#### 1.3.1.2 Command

Command用于向服务器发送指令以改变其状态，并从服务器返回Response响应。如果Command消息包含AcknowledgeURL属性，则Response消息需包含'Acknowledge=true/false'属性，如果'Acknowledge=true'表示controller支持Acknowledge，在指令执行完毕后将向AcknowledgeURL发送Acknowledge消息以汇报执行结果。

#### 1.3.1.3 Signal

Signal是单向消息，用于服务器自动广播状态变化。服务器产生Signal消息的条件有三种：客户端（泛指上游控制器，如Agent、Controller，下同）使用包含Subscription的Query消息进行了查询、服务器接收的JDF节点中的NodeInfo节点中包含含有Subscription的Query消息、Hard-Wired。Hard-Wired的方式属于主动信号发送方式，实现方法如预设（通过文件或其它方式）一个URL列表，当设备开机或首次连接到网络时广播信号以告知设备信息和所能提供的服务等。

> **[info] Note**
>
> Signal基于属于HTTP - C/S模型，本质上也是双向消息，服务器发送时可设置ChannelMode属性值为Reliable（即可靠信号），此时客户端必须返回Response，但无论如何服务器都可以选择忽略响应。

#### 1.3.1.4 Response 

Response用于服务器同步响应Query和Command消息，或用于客户端响应服务器的Signal消息，以表明消息已接收并翻译。当Response的ReturnCode属性大于0时，Response应该包含Notification元素以描述返回状态。Response的refID属性值等同于Query或Command中的ID属性值。

#### 1.3.1.5 Acknowledge

Acknowledge是服务器对客户端的Command或Query消息的异步单向应答，其refID属性值为发送方ID值。Acknowledge仅在Command消息指定AcknowledgeURL属性或AcknowledgeFormat和AcknowledgeTemplate属性，且服务器支持应答时才产生。当服务器执行一个Command需要较长时间时，先返回Response响应，等待Command执行完成再返回Acknowledge。

### 1.3.2 JMF Message Level

1. No messaging：不使用JMF，JDF可以在每个过程结点包含Audit元素代替JMF消息机制。
2. Notification：支持Notification的服务器通过发送Signal来提供单向消息，通知消息在开始和完成作业中的某个过程时通知客户端。该服务器可能还提供一些错误情况的通知。
3. Query Support：支持Query的服务器通过传递当前的JobID属性、排队的JobID属性或当前工作过程的状态来应答其它控制器的询问。
4. Command support：这种等级为服务器提供了处理命令的能力，服务器可以接收命令，例如中断当前的作业、重启作业或者改变队列中作业的状态。
5. Submission support：服务器可以通过HTTP POST请求消息通道来接收JDF作业，在这种情况下通道应该支持MIME。

### 1.3.3 Error and Event

如果Acknowledge消息、Command消息、Query消息、Signal消息或者Registration消息没有被正确处理，程序应该有标准错误的响应，这种响应可能包含Notification元素。在Notification元素中包含的消息可用于用户界面提示错误。
Response消息和Acknowledge消息包含一个ReturnCode属性，该属性默认值为0，表示响应成功。如果成功，在响应命令时可以提供一个Notification元素（Class属性=“information”）。如果出现警告或错误，ReturnCode属性会大于0。在这种情况下应该提供Notification元素。响应错误的程序应该填充Notification元素来详细描述错误。

### 1.3.4 JMF Queue

Command消息中的队列操作是JMF对JDF作业调整的核心功能，在JMF中队列成员被（作业）称为**QueueEntry**，使用属性*QueueEntryID*标识，并支持优先级（0[Low]~100[High]）。

![Queue Life](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntryLifeCycle.png) <br><center> <font color=gray> QueueEntry lifecycle </font> </center><br>

> **[info] Note**
>
> Programming for Queue Entry: Mybe set an element Queue as a global variable, then you have an unique queue as JDF_1.5 demand. Append, set or delete QueueEntry element for your only one Queue upon to satisfy some stuff.

![Queue Entry](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntry.png) <br><center> <font color=gray> Queue and QueueEntry </font> </center><br>

## 1.4 <span id = "ICS"> ICS </span>

ICS - Interoperability Conformance Specification，协作互通性规范，定义了不同类型设备应该支持的最小的JDF指令和参数集合，是泛型JDF文档的具体实现，也是JDF程序开发的指导文件。如果把JDF文档比作抽象类，则ICS是该抽象类的派生子类。ICS对不同部分定义了互通性规范，其中Base ICS定义了任何JDF产品都应该兼容的JDF子集，即JDF产品所应该实现的最基本功能。在此基础上分别定义了若干不同部分的ICS规范，在上层ICS中不再出现下层已经出现的内容，完全的ICS文档等于所有层内容的相加。

![ICS Classes](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/ICS_Classes.png) <br><center> <font color=gray> ICS Classes </font> </center><br>

其中Binding ICS定义了具有骑马钉、装订软封面或硬封面的JDF印后设备所应该兼容的JDF子集。JMF ICS定义了一个具有JMF通讯功能的JDF产品所应该兼容的JMF子集。

Tips : ICS文档的使用方法 - ICS元素表格中可链接的表示该内容为子元素，否则是属性，属性下深色背景的是属性值，对于在ICS中没有说明的节点，可以在JDF文档中找到描述信息。

## 1.5 <span id = "MIS"> MIS </span>

MIS - Management Information System，管理信息系统，由决策支持系统、工业控制系统、办公自动化系统以及数据库、模型库、方法库、知识库和与外界信息交换接口组成，主要作用是最大限度利用计算机和网络来**加强企业的信息管理**，提高整体效益和效率。集成JDF的MIS系统能够提供作业流程控制、生产控制等功能，可以实现从作业接收、估价、报价、作业安排、作业分派和打样，最后到印刷生产的全过程的信息管理。[Case : HP HIFLEX](http://www.hp.com/hpinfo/newsroom/press_kits/2012/HPdrupa12/HP_Hiflex_MIS.pdf).

JDF工作流中监督系统组件和系统控制之间的所有过程和通信

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

![CIP4 Protocol Stack](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/CIP4_Stack.png) <br><center> <font color=gray> CIP4 Protocol Stack </font> </center><br>

## 2.2 JDF Library

CIP4项目组使用C++、Java和C#语言开发了JDF解析库，它们是对XML解析库的进一步封装，如JDFLibC++使用了Xerces-C++函数库。

## 2.3 JDF System Building

### 2.3.1 实施注意事项及指引

1. JDF分析
JDF设备必须实现JDF分析功能，至少能够查找它能够执行其PROCESS类型的节点，搜索算法的细节依赖于实现，可以简单到只搜索JDF根节点。DEVICE必须能够对其所能执行的每个PROCESS类型的节点“消费输入和生产输出”。

2. 测试运行
为了减少运行时错误，建议各个设备或它们的控制器支持测试运行功能。这可以防止设备开始处理不完整或畸形的节点。

### 2.3.2 MIME Package

信息可以用URL引用或MIME包的形式进行传递，MIME包中可以只有JDF、或只有JMF、或混合使用（CIP4推荐），当只有JDF时MIME类型为“application/vnd.cip4-jdf+xml”，可以包含多个JDF，并且可以在所有JDF的后面附加数字资产（如png、pdf、ICC等文件，在JDF中以‘cid’方式引用）。当只有JMF时MIME类型为“application/vnd.cip4-jmf+xml"，当混合打包时JMF必须在第一位，JMF在两种情况下有且只能有一个。

### 2.3.2 JDF和JMF交换协议

为了更好的互操作性，控制器和设备应该提供没有SSL层的不安全HTTP。

1. 基于文件的协议（JDF/.mjd）

基于文件的协议是JDF作业票据的解决方案，该协议可以基于热文件夹，实现热文件夹的设备必须为JDF定义一个输入热文件夹和输出热文件夹。此外，SubmitQueueEntry消息包含一个URL属性，该属性允许指定任意的JDF定位。

![JMF Communication by HotFolder](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMF_HotFolder.png) <br><center> <font color=gray> JMF Communication by HotFolder </font> </center><br>

HotFolder -> JDF
`<JDF...>
	<FileSpec URL="htt;//*" or "file://*" or "./*" />
	...
</JDF>
`
Note: 基于文件的协议不支持协议错误处理的确认收据，这就要求接收方轮询处理程序的输出热文件夹。最后，授予对热文件夹的读/写访问权限也降低了安全性。

2. 基于HTTP的协议（JMF/.mjm）

	- 消息的实现：JMF是HTTP（客户端）请求和（服务器）响应的主体。客户端使用post方法请求，JMF可以是Query或Registration或Command，也可以包含Signal和Acknowledge。对于Signal和Acknowledge请求：当Signal是可靠信号（» 索引“可靠信号”）时，服务器对其响应不能为空，否则可以为空，Acknowledge的响应可以是空的。

	- HTTP推送机制：因为HTTP是无状态协议（对事务处理无记忆，每次通讯无上下文关联），所以服务器到客户端的推送机制非常重要（如定期的状态栏更新）。客户端也可以通过定期轮询服务器来获取相关消息。

![JMF Communication by HTTP(s)](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMF_HTTPs.png) <br><center> <font color=gray> JMF Communication by HTTP(s) </font> </center><br>

HTTP(s) -> JMF
`<JMF...> 
	<SubmitQueueEntry URL="http://xxx.jdf"...>
		...
	</SubmitQueueEntry>
</JMF>`

3. 基于HTTPS的协议 - SSL双向认证

4. 管理持续通道（Persistent Channels）：控制器可以通过向设备发送一个KnownSubscriptions查询来请求有关当前活动订阅的信息。
	- 如果设备中已经存在匹配的Subscription，则控制器不应发送新的Subscription。
	- 如果设备不支持KnownSubscriptions请求，则控制器可以创建一个新的Subscription，如果设备已经存在相同的Subscription，则替换为新的。
	- 通过StopPersistentChannel来删除持续通道

---








# <span id = "Appendix-A"> Appendix-A：JDF future - XJDF </span>

XJDF是JDF的全新升级协议，同样由CIP4维护，字母“X”表“Exchange”，仅用于区分JDF。XJDF可称之为“JDF2.0”，是更精简、高效的作业传票协议，同时JDF本身也在保持着自己的发展路线，目前最新版本为JDF1.6（2017.09.01日推出）。仍然保留JDF并保持JDF更新的原因有三点：一是XJDF是全新协议，不能做到向下兼容。二是许多厂商已经在JDF协议上花费太多时间和成本，虽然很复杂，但已开发出成熟的接口，在短时间内并不能兼容XJDF。三是XJDF并未经过实际测试，在一些方面尚不成熟。

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



---

# <span id = "Appendix-D"> Appendix-D：JDF Example </span>

## D.1 ResourcePoll and ResourceLinkPoll

```
	<?xml version="1.0" encoding="UTF-8"?>
	<JDF ID="RootID" Type="Product" Status="Waiting" Version="1.2"

		 xmlns="http://www.CIP4.org/JDFSchema_1_1"									<!-- namespace : CIP4 standard namespace		-->
		 xmlns:myns="https://jim-codehub.github.io"									<!-- namespace : Extension namesapce			-->
		 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"						<!-- namespace : W3C extension namespace		-->

		 xsi:schemaLocation="http://www.CIP4.org/Schema/JDFSchema_1_4/JDF.xsd"		<!-- schema lo : CIP4 standard schema location	-->
							"https://jim-codehub.github.io/MYJDF.xsd">				<!-- schema lo : Extension schema location		--> 

		<ResoucePoll>
			<ComponentID="OutputComponent" Class="Quantity" Status="Unavailable" ComponentType="FinalProduct" />
		</ResoucePoll>

		<ResourceLinkPool>
			<ComponentLink rRef="OutputComponent" Usage="Output" />
		</ResourceLinkPool>
		<myns:info date="2020" />
	</JDF>
```

# <span id = "Appendix-E"> Appendix-E：Printing Industry Terminology </span>

Terminology					| Chinese				| Description
:-:							| :-:					| :-:
Binding						| 装订					|
Saddle Stitching			| 骑马钉				| 
Soft Cover					| 软面封装				|
Hard Cover					| 精装封装				|
Bundle						| 集装					| 将成品堆叠或装箱等操作
Palletzing					| 码垛					| Bundle的方式之一
Ink							| 油墨					|
Imposing					| 拼版					|
Printing					| 印刷					|

---

# <span id = "Appendix-F"> Appendix-F：CIP4 software license </span>

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











### 1.2.2 Coordinate Systems

TBD



JDF节点嵌套 以表达 完整的JDF作业组成

<JDF ID="N1"  JobID="job1" JobPartID="Part1">
	<JDF ID="N2"  JobPartID="Part2">
	<JDF ID="N3"  JobPartID="Part3">
	<JDF ID="N4"  JobPartID="Part4">
</JDF>

Elements of JDF Node

# AuditPool

审计池节点，类似于程序日志，用于记录工作流中的事件（如资源利用情况等）和发生的时间等信息。

审计节点有：
	ResourceAudit 

	Created
	Deleted
	Modified

	Notification

	Merged
	Spawned

	ProcessesRun

例子1:
<AuditPool>
	<ResourceAudit TimeStamp="2008-08-28T18:20:00Z">
		<MediaLink ActualAmount="421" Amount="400" Usage="Input" rRef="RLink"/>
		<MediaLink Amount="400" Usage="Input" rRef="RPrev"/>
	</ResourceAudit>
</AuditPool>


# CustomerInfo 

Custromer + delivery address

用于描述用户信息，如用户ID、用户作业名、用户联系方式、所属公司等等

# Node Info

通用的，独立于process的信息，包含作业优先级、作业计划（开始时间、结束时间）等信息，也可以在该节点中包含JMF结点（注：在Base ICS中可以不包含JMF节点）

Scheduling
Administative data
message recipients

---

JDF Nodes Combinations JDF节点的组合

不要为已知Precesses的排列重新创建新的Process Type

将多个定义的process组合成一个process，如：inline finishing = printing + folding + cutting

两种类型的组合节点可选：
1. combined node ： 所有内部接口被隐藏，如 智能多功能设备
2. processGroup ： 内部节点可访问


RunList资源
定义一组文档、指定文件位置、定义拼版的物理页码

、PageList资源

定义页面的原数据，如可读的页码、颜色信息等，可能从Runlist中引用

# JDF Spawning and merging

将一个作业中的某个部分分离(spawn)以独立/并行处理，完成后再合并回去（Merge)

分离的部分要优先（或并行）执行




-------------

# Structure of JDF Nodes and Jobs



2. 命名空间：JDF的标准命名空间为：“xmlns='http://www.CIP4.org/JDFSchema_1_1'”，同时支持[扩展命名空间](#Appendix-D)，以使用户可以合法使用自定义节点。



---

1.4.2 Comformance requriments for JDF Entities

JDF实体的一致性需求：属性Attributes、属性值Attribute values、资源Resources、过程Processes、组合资源Combined processes

-PROCESSES

所有的过程都是可选的，对于消费者来说，但对于Device，至少支持一个

- Combined Processes

所有的组合资源对于消费者Consumer来说都是可选的，如果要支持，则必须：
1. 支持所有的输入资源，
2. 支持所有的输出资源
3. 

