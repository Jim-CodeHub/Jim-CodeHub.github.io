<script src="https://github.com/Jim-CodeHub/Skills-list/raw/master/script/ImgHover.js"></script> 
<style type="text/css" > p{word-wrap:break-word; word-break:break-all;} </style>

# 1 Introduction

CIP4 (International Cooperation for Integration of Processes in **Prepress**, **Press** and **Postpress**) is committed to building **CIMS** (Computer Information Management System) of printing industry for prepress, press and postpress. And JDF (used as data carrier) and JMF (used as info carrier) are applied. [CIP4 Official Website](https://www.cip4.org/).

JDF (Job Definition Format) is superset of [**JDF**](#JDF), [**JMF**](#JMF) (Job Messaging Format) and [**ICS**](#Appendix-A) (Interoperability Conformance Specification), based on **XML** (EXtensible Markup Language) technology.

> **[warning] XML vs JDF**
>
> JDF applies only *Element Node* and *Attribute Node*, not *Text Node* (except *&#60;Comment&#62;* ). And **DOM** (document OBJ model), **xmlns** (namespace), **XPath** (path expression) and **Schema** (verification) Tech are used. [More](https://jim-codehub.github.io/pages/expansions/XML.html).

## 1.1 Workflow Components

Roles								| ATTR		| Description 
:-:									| :-:		| :-:
Machine								| bare metal| prepress, press or postpress machines without JDF integrated 
Device								| software	| interprets JDF and executes the instructions, MAY controls a *Machine*
Agent								| software	| create, modify, read and write JDF 
Controller							| software	| initiates *Devices* and routes JDF
MIS (Management Information System)	| software	| master controller 

 <br><center> <font color=gray> Components Roles </font> </center><br>

> **[info] Note**
>
> Low-level *Agent* and *Controller* SHALL implement *Device* functions. 

## 1.2 Components interactions  

![Interactions](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/Interactions.png) <br><center> <font color=gray> Components interactions </font> </center><br>

> **[info] Note**
>
> Components interactions by JDF as **Data Flow** and JMF as **Info Flow**, and JDF is created by top-level *Controller/Agent*, modified, spwan and merged by intermidiate *Controller/Agent*, and finally executed by *Device*.

## 1.3 Components communication

![CIP4 Stack](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/CIP4_Stack.png) <br><center> <font color=gray> Components communication </font> </center><br>

> **[info] Note**
>
> HotFolder via network MAY supported by FTP, SOAP, etc. 

---

# <span id = "JDF"> 2 Data Flow - JDF </span>

Jobs are organized in the XML DOM Tree (JDF Instance or Job Ticket) by JDF and recursive nesting element nodes which describes [**Processes**](#Appendix-B) and [**Resources**](#Appendix-C) necessary to complete the job.

![JDF Node](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JDFNode.png) <br><center> <font color=gray> JDF Node Diagram </font> </center><br>

![Job Hierarchy](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JobHierarchy.png) <br><center> <font color=gray> Job Hierarchy </font> </center><br>

## 2.1 Processes

Product Nodes with *JDF/@Type="Product"* describes the job intent. Process Group Nodes with *JDF/@Type="ProcessGroup"* describes the job processes group. Process Nodes with *JDF/@Type="[Predefined Process]"* or *JDF/@Type="Combined"* with *JDF/@Types="[Predefined Process List]"* describes the specific job process.

```XML
<JDF Type="Product">
	<!-- Global Resouces and Links Here ->
	<JDF Type="ProcessGroup">
		<JDF Type="[Predefined Process]">
			<!-- Local Resouces and Links Here ->
		</JDF>
		<JDF Type="Combined" Types="[Predefined Process List]">
			<!-- Local Resouces and Links Here ->
		</JDF>
	</JDF>
</JDF>
```

<br><center> <font color=gray> Classic Processes Model </font> </center><br>

> **[info] Note**
>
> Combined nodes are designed for multi-function devices that can excute multi processes.

## 2.2 Resouces

*JDF/ResoucePool* contains various resources and implemented in **current or root process node** in each processes described upon. And *JDF/ResouceLinkPool* describes the usage (Input/Output) of resources and implemented in **current process node**. *JDF/ResoucePool/ResouceRef* is used to including resources from other resource pool.

```XML
<JDF>
	<ResoucePool>
		<!-- Resources List Here -->
	</ResoucePool>
	<ResouceLinkPool>
		<!-- Resources Links List Here -->
	</ResouceLinkPool>
	<JDF>
		<ResouceLinkPool>
			<!-- Resources Links List Here (Link to global resources)-->
		</ResouceLinkPool>
	</JDF>
	<JDF>
		<ResoucePool>
			<!-- Resources List Here -->
		</ResoucePool>
		<ResouceLinkPool>
			<!-- Resources Links List Here (Link to local (and MAY link to global) resources)-->
		</ResouceLinkPool>
	</JDF>
</JDF>
```

<br><center> <font color=gray> Classic Resouces Model </font> </center><br>

> **[info] Gray Box**
>
> *JDF/@Type="ProcessGroup"* with *JDF/@Types=[Predefined Porcess List]* is deformed node that lacks resources and **SHALL NOT BE EXCUTED BY DEVICE**. [More](#Appendix-W).

## 2.3 Job's History 

*JDF/AuditPool* stores the Job’s history and can support daily quality control and troubleshooting management reporting needs. And the history SHALL place in output folder after the job ends (when HotFolder communication method is used). 

> **[info] Spawn and Merge**
>
> Jobs may be spawned by *Controller/Agent* from a complete instance due to purpose of parallel execution, and *JDF/AncestorPool* stores these info for merge later.

---

# <span id = "JMF"> 3 Info Flow - JMF   </span>

Job Messaging Format, based on XML, take HTTP(s) as the communication carrier, used for communication between JDF workflow components.

![JMF Node](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMFNode.png) <br><center> <font color=gray> JMF Node Diagram </font> </center><br>

Family		| Description
:-:			| :-:
Query		| client *Query* server for messages
Command		| client sends *Command* to the server
Response	| server sync *Response* for client *Query* or *Command*. Or client sync *Response* for server *Signal*
Signal		| server push *Signal* to the client 
Acknowledge	| server async *Response* for client *Query/@AcknowledgeURL='True'* or *Command/@AcknowledgeURL='True'*

<br><center> <font color=gray> JMF Family </font> </center><br>

> **[info] Acknowledge**
>
> When the server cannot output the result in time, return the *Response* first and then return the *Acknowledge*.

## 3.1 Queue

The sets of queue operation is core of *JMF/Command* to scheduling jobs, and each job is a **QueueEntry** identified by *JMF/Command/@QueueEntryID*, and supports priority (0[Low]~100[High]) adjustment.

![Queue Entry](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntry.png) <br><center> <font color=gray> Queue and QueueEntry </font> </center><br>

![Queue Life](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntryLifeCycle.png) <br><center> <font color=gray> QueueEntry Lifecycle </font> </center><br>

> **[info] For Programming**
>
> The program can provide a memory map with the same status as the queue to synchronize the changes of the queue. 

> **[warning] About QueueEntry Sort**
>
> *QueueEntry/@Status="Running"*  sort before other status, and *QueueEntry/@Status="Waiting"* watting in Queue with priority sort (DSC 100~0). 

## 3.2 Persistent Channel 

If the client sends *Query/Subscription/@URL*, the server will push *Signal* to the client when the subscribed event occurs, util the server recives the client's *Command/StopPersistentChannel*.   

![Persistent Channel](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/PersChannel.png) <br><center> <font color=gray> Persistent Channel </font> </center><br>

The server can send *Signal* to clients (Select from the list of configured URLs) actively without any subscription, to broadcast device functions. That is **Hard-Wired**.

> **[info] Reliable Signal**
>
> If the server sends *Signal/@ChannelMode='Reliable'*, the client SHALL do *Response* with non-empty body. If the client do not response or *Response/@ReturnCode!=0*, the server SHALL retry until the client do response and *Response/@ReturnCode=0*.  

> **[warning] Note**
>
> The *Signal* message a combination of *Query* and *Response* messages, and the *Query* part tells subscribers what to subscribe at that time, and the *Response* part tells the subscribers what specific events happened. 

## 3.3 Error handling

When the JMF message family cannot be processed correctly by the server, *Response/@ReturnCode=[ERR CODE](#Appendix-D)* SHALL be returned. and *Response/Notification* SHOULD implement.

---

# 4 System Building 

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

<br><center> <font color=gray> CIP4 Proj development framework  </font> </center><br>

> **[info] Note**
>
> PCB (1/2/3), Linux (4/5/6) and InterCom (7) are omitted. 

## 4.1 Packaging

JDF (and digital assets which it refers) and/or JMF MAY be exist standalone or packaged as [MIME](#https://www.rfc-editor.org/info/rfc2045) and sent to *Device* from *Controller/Agent*.

<table width="100%" align="center" text-align="center">
<tr>
<th> MIME Headers </th> 
<th> Values </th> 
<th> Description </th> 
</tr>

<tr>
<td align="center", valign="center" rowspan="3"> Content-Type </td>
<td align="center", valign="center"> application/vnd.cip4-jdf+xml </td>
<td align="center", valign="center">  JDF entity </td>
</tr>

<tr>
<td align="center", valign="center"> application/vnd.cip4-jmf+xml </td>
<td align="center", valign="center"> JMF entity </td>
</tr>
<tr>
<td align="center", valign="center"> multipart/related </td>
<td align="center", valign="center"> mixed entity </td>
</tr>

<tr>
<td align="center", valign="center"> Content-ID </td>
<td align="center", valign="center"> US-ASCII character </td>
<td align="center", valign="center"> refer to 'cid:' </td>
</tr>

<tr>
<td align="center", valign="center" rowspan="2"> Content-Transfer-Encoding </td>
<td align="center", valign="center"> 8bit </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> binary </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center"> base64 </td>
<td align="center", valign="center"> - </td>
</tr>

</table>

<br><center> <font color=gray> MIME entity used in CIP4 </font> </center><br>

> **[info] Suffix**
>
> \*.mjd suffix is used when JDF is the first entity of MIME, and \*.mjm suffix is used when JMF is the first entity of MIME.   

The first body part of the MIME 'Content-Type:multipart/related' message SHALL be the JMF Message. Internal links are defined using the cid URL (which corresponding Content-ID without '<' and '>'). Subsequent sections are the JDF Jobs followed by the linked entities.

> **[info] Note**
>
> Only one JMF can exsit (if it must exist) and but multi JDF and digital assets can exsits in mixed entity. 

## 4.2 Communication

[**HotFolder**](#FileBP) and [**HTTP(s)**](#HTTPBP) are used to exchange data and info between *Controllers/Agents* and *Devices*. 

### 4.2.1 <span id = "FileBP"> File Based Portocol (JDF) </span>

HotFolder is a directory that is monitored by OS in real-time, once a file is entered, it will be processed immediately. An *Input HotFolder* and *Output HotFolder* (which provides for opposite system) SHALL be implemented. 

![Communication by HotFolder](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/HotFolder.png) <br><center> <font color=gray> Communication by HotFolder </font> </center><br>

JDF instance with element node *&#60;AuditPool&#62;&#60;/AuditPool&#62;* SHALL be written to *Output HotFolder* when *Devices* finishes processing, for *Controllers/Agents* polling. 

> **[info] Note**
>
> \*.jdf/\*.mjd reference files MAY be written into a exsiting directory of the *Input HotFolder*, or a new directory '**D**' which created by *Controllers/Agents* in *Input HotFolder*.   

### 4.2.2 <span id = "HTTPBP"> HTTP Based Protocol (JDF+JMF) </span>

HTTP is a stable protocol with a well defined query-response mechanism, and only **post** method is used for CIP4, the content is MIME package.

![Communication by HTTP(s)](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/HTTP.png) <br><center> <font color=gray> Communication by HTTP(s) </font> </center><br>

> **[info] Note**
>
> *Controllers/Agents* implements HTTP Server and *Devices* implements HTTP Client. 

---

# 5 Development

## 5.1 Library Building

Linux based and *gcc* (including cross-compilation toolchains) and *cmake* SHALL BE up to date, 

### 5.1.1 Packages

JDFLibC-sources-b11.tar.gz (depend on : curl, xerces-c++), and syswatcher, superline, httpcd (depend on : libmime + socketcd).

> **[info] Note**
>
> In fact, *zlib* and *libpng* are also required, but are usually included in cross-compilation toolchains or system environments.

### 5.1.2 Building 

#### 5.1.2.1 xerces-c 

```Shell
	$ tar -xvf xerces-c-3.2.2.tar.gz && cd xerces-c-3.2.2 
	$ ./configure --host=[HOST] CFLAGS=-fPIC CXXLAGS=-fPIC 

	//Alter macro 'XERCES_XMLCH_T' with value 'wchar_t' for ./configure and ./src/xercesc/util/Xerces_autoconf_config.hpp.

	$ make 
	$ mkdir ./lib/[Linux]/[BITW]
	$ cp ./src/.libs/* ./lib/Linux/[BITW]
```

> **[info] Note**
>
> 1. [HOST ] : if the format is A-B-C-XXX, then A-B-C is host name, such as 'arm-linux-gnueabihf'. If it's the host, the --host option can be ignored.
> 2. [BITW ] : x86 or x64.
> 3. [Linux] : Windows, MacOS or Linux

#### 5.1.2.2 curl 

```Shell
	$ tar -xvf curl-7.55.1.tar.gz && cd curl-7.55.1
	$ mkdir ./install
	$ ./configure --host=[HOST] --prefix=`pwd`/install 
	$ make && make install
```

> **[info] Note**
>
> The library SHALL copy into somewhere where the compiler can be detected. 

#### 5.1.2.3 JDF 

```Shell
	$ mkdir JDFLibC
	$ tar -xvf JDFLibC-sources-b11.tar.gz -C ./JDFLibC
	$ cd JDFLibC
	$ mkdir ./external/Xerces-C
	$ cp -rf ../xerces-c-3.2.2/* ./external/Xerces-C
	$ chmod +x build_[linux].sh && ./build_[linux].sh
	$ ls ./bin/[Linux]/[x64]

	AddJDF  BookJDF  CheckJDF  libJDFTools.so  libJDFToolsWrapper.so  MergeJDF  SpawnJDF  SpecJDF
```

> **[info] Note**
>
> libJDF\*.so is dynamic library for development, and others is command line program for JDF test. 

## 5.2 Programming 

IT INVOLVES COMPANY SECRETS, SO IGNORE.

---

# <span id = "Appendix-A"> Appendix-A : Interoperability Conformance Specification </span>

ICS defines the minimum set of JDF with multi parts. Base ICS defines the most basic functions that any JDF products should implement. Other ICSs are based on the *Base ICS* and describes the minimum implementation in different aspects.

![ICS Classes](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/ICS_Classes.png) <br><center> <font color=gray> ICS Classes </font> </center><br>

---

# <span id = "Appendix-B"> Appendix-B : Predefined Processes </span>

> **[info] Note**
>
> Prepress and Press processes are omitted.

## B.1 Postpress Processes

Processes				| Translation	| Description
:-:						| :-:			| :-:
BlockPreparation		|				|
BoxFolding				| -				| 定义了将坯料折叠并粘合到折叠的扁平盒中进行包装的过程 
BoxPacking				| 装箱			| - 
Bundling				| 捆绑			| 把书芯压紧并扎成捆 
CaseMaking				| - 			| （硬）封面的制作过程
CasingIn				| -				| 将书芯装入封面的过程
ChannelBinding			| 螺旋装订		| -
Collecting				| 配帖			| 将书帖或多张散印书页按照页码的顺序配集成书 
CoverApplication		| -				| 定义了将软封面应用到书芯的过程
Creasing				| 压痕			| -
Cutting					| 裁切			| -
DieMaking				| 模具制造		| -
Embossing				| 印花			| 使用浮雕模具压印图形的过程
EndSheetGluing			|				|
Feeding					|				|
Folding					| 折叠			|
Gathering				|				|
Gluing					| 涂胶			| 在书皮贴紧书脊处涂胶 
HeadBandApplication		|				|
HoleMaking				| 制孔			| -
Inserting				|				|
Jcketing				| 护套/书皮		| 书本外层的保护材料
Labeling				| 标签			| 标签可以包含收件人、产品、产品数量等信息
Laminating				| 层压			| 泛指**覆膜**的过程
Plletizing				| 托盘			| - 
Perforating				| 打孔			| 描述组件打孔的过程
PlasticCombBinding		| 塑料梳齿装订	| -
PrintRolling			| 				|
RingBinding				| 圆环装订		| <span onmouseover="showImg('https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/RingBinding.png');" onmouseout="hideImg();">-</span> 
SaddleStitching			| 骑马订		| 
ShapeCutting			|				|
ShapeDefProduction		|				|
Shrinking				| 收缩			|
SpinePreparation		| -				| 书芯脊柱的生产的准备过程
SpineTaping				| -				| 书芯脊柱贴胶带（和牛皮纸等）的过程
Stacking				| 堆叠			| - 
StaticBlocking			|				|
Stitching				| 装订			| -
Strapping				|				|
StripBinding			|				|
ThreadSealing			|				| 
ThreadSewing			|				|
Trimming				| 三面裁切		| - 
WebInlineFinishing		|				|
Winding					|				|
WireCombBinding			| 线梳齿装订	| -
Wrapping				| 包裹			| 将捆扎物、托盘等物体打包的过程

## B.2 General Processes

Processes				| Translation	| Description
:-:						| :-:			| :-:
Approval				|				|
Buffer					| 缓冲			| 用于资源缓冲，如管道资源等
Combine					| 合并			| 将多个物理资源（PhysicalResource）或逻辑资源（如RunList）合并
Delivery				| 递送			| 描述物理资源（PhysicalResource）的传送过程
ManualLabor				| -				| 描述任何情况下资源被手动处理的过程
QualityControl			| 质量控制		| -
ResourceDefinition		| 资源定义		| - 
Split					| 分割			| 将多个物理资源（PhysicalResource）或逻辑资源（如RunList）分割
Verification			| 验证			|

---

# <span id = "Appendix-C"> Appendix-C : Predefined Resources </span>

> **[info] Note**
>
> Prepress and Press resources are omitted.

## C.1 Intent Resources

Resources				| Description
:-:						| :-:
BindingIntent			| -
Component				| 组件，用于描述（印前和印后）中间件或成品的组成部分
DeliveryIntent			| 交付，物力资源、中间产品等交付
EmbossingIntent			| 压花、烫金
FoldingIntent			| -
HoleMakingIntent		| -
InsertingIntent			| -
LaminatingIntent		| 层压
LayoutIntent			| 记录产品组件的完成页面的大小
MediaIntent				| 描述用于产品组件的媒介
PackingIntent			| - 
PublishingIntent		| - 
ShapeCuttingIntent		| -

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Intent" </font> </center><br>

## C.2 Parameter Resources

Resources					| Description
:-:							| :-:
ApprovalParams				| -
ApprovalSuccess				| -
Assembly					| - 
BinderySignature			| 一套印刷好的纸张
BoxFoldingParams			| -
BoxPackingParams			| -
BufferParams				| - 
BundlingParams				| - 
ByteMap						| -
CaseMakingParams			| - 
CasingInParams				| - 
ChannelBindingParams		| - 
CoilBindingParams			| -
CollectingParams			| -
Company						| 描述公司、联系人和地址等信息
Contact						| 人或地址的联系
ContentList					| -
CoverApplicationParams		| 定义将封面应用到书块的参数
CreasingParams				| 定义了纸张折痕或刻槽的参数
CustomerInfo				| - 
CutBlock					| -
CutMark						| -
CuttingParams				| -
DeliveryParams				| -
DensityMeasuringField		| 定义密度测量领域的信息
EmbossingParams				| -
Employee					| 关于设备或机器操作员的信息
EndSheetGluingParams		| -
FeedingParams				| -
FileSpec					| 文件或一组文件的说明
FoldingParams				| 描述了折叠参数，包括折叠步骤、顺序
GatheringParams				| -
GlueApplication				| 硬皮书和软皮书的胶水应用 
GluingParams				| -
HeadBandApplicationParams	| -
HoleList					| -
HoleMakingParams			| -
InsertingParams				| -
InsertSheet					| - 
JacketingParams				| -
LabelingParams				| -
LaminatingParams			| -
Layout						| 布局结构的根元素
ManualLaborParams			| 手工工作参数的限定
**NodeInfo**				| 包含关于计划的调度和消息路由的信息
PalletizingParams			| -
PerforatingParams			| -
PlasticCombBindingParams	| -
PrintRollingParams			| -
ProductionPath				| -
QualityControlParams		| -
QualityControlResult		| -
ResourceDefinitionParams	| -
RingBindingParams			| -
Shape						| -
ShapeCuttingParams			| -
ShapeDef					| 描述二维曲面的结构设计，其路径描述了不同的加工操作，如切割、压痕、穿孔等
ShapeDefProductionParams	| 结构设计参数
ShrinkingParams				| -
SpinePreparationParams		| -
SpineTapingParams			| -
StackingParams				| -
StaticBlockingParams		| -
StitchingParams				| -
StrappingParams				| -
StripBindingParams			| -
ThreadSealingParams			| -
ThreadSewingParams			| -
TrimmingParams				| -
VarnishingParams			| -
WebInlineFinishingParams	| -
WindingParams				| -
WireCombBindingParams		| -
WrappingParams				| -

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Parameter" </font> </center><br>

## C.3 Consumable Resources

Resources					| Description
:-:							| :-:
Media						| 物理媒介
MiscConsumable				| -
Pallet						| 用于装货的托盘
RegisterRibbon				| -
Strap						| -

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Consumable" </font> </center><br>

## C.4 Handling Resources

Resources					| Description
:-:							| :-:
PrintRolling				| -
Tool						| -
UsageCounter				| 用于跟踪设备的使用情况	

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Handling" </font> </center><br>

## C.5 Implementation Resources

Resources					| Description
:-:							| :-:
Device						| 关于特定设备的信息，如功能 

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Implementation" </font> </center><br>

## C.6 Quantity Resources

Resources					| Description
:-:							| :-:
Bundle						| 用于描述各种Compnents的设置，该资源可被许多印前和印后过程创建 
Component					| - 

<br><center> <font color=gray> JDF/ResoucePool/[Resources]/@Class="Quantity" </font> </center><br>

> **[info] Component**
>
> Almost every post-press process contains one or more components resources (input and ouput).

---

# <span id = "Appendix-D"> Appendix-D : Error Codes </span>

ReturnCode	| Description
:-:			| :-
0			| Success

ReturnCode	| Description
:-:			| :-
1			| General error
2			| Internal error
3			| XML parser error (e.g., if a MIME file is sent to an XML Controller).
4			| XML validation error
5			| Query Message/Command Message not implemented
6			| Invalid parameters
7			| Insufficient parameters
8			| Device not available (Controller exists but not the Device or queue)
9			| Message incomplete.
10			| Message Service is busy.
11 			| Synchronous mode not supported for message. No @ AcknowledgeURL is specified and the Message can only be processed asynchronously and was not processed. (Error)
12 			| Asynchronous acknowledge not supported for message. No @ AcknowledgeURL is specified and the Message was processed. The resulting  Acknowledge can only be emitted asynchronously. (Warning)
13			| Reliable Signals not supported. Subscription denied.

<br><center> <font color=gray> Protocol errors </font> </center><br>

ReturnCode	| Description
:-:			| :-
100			| Device not running
101 		| Device incapable of fulfilling request (e.g., a RIP that has been asked to cut a Sheet).
102 		| No executable Node exists in the JDF
103 		| JobID not known by Controller
104 		| JobPartID not known by Controller
105 		| Queue entry not in queue
106 		| Queue request failed because the queue entry is already executing
107 		| The queue entry is already executing. Late change is not accepted
108 		| Selection or applied filter results in an empty list
109 		| Selection or applied filter results in an incomplete list. A buffer cannot provide the complete list queried for.
110 		| Queue request of a Job submission failed because the requested completion time of the Job cannot be fulfilled.
111 		| Subscription request denied.
112 		| Queue request failed because the Queue is  "Closed" or  "Blocked" and does not accept new entries.
113 		| Queue entry is already in the resulting status.
114 		| QueueEntry /@ Status is already  "PendingReturn" , "Completed" or "Aborted" and therefore does not accept changes. Modification note: starting with JDF 1.4,  "PendingReturn" added.
115 		| Queue entry is not running.
116 		| Queue entry already exists. Used when a  QueueEntry with identical  JobID ,  JobPartID and  Part already exists.
120 		| Cannot access referenced URL. URI Reference cannot be resolved. Used when a referenced entity (e.g., a  JDF in a  SubmitQueueEntry cannot be found).
121 		| Unknown  DeviceID . No Device is known with the  DeviceID specified.
130 		| Ganging is not supported. A gang Job has been submitted to a queue that does not support ganging.
131 		| GangName not known. A Job has been submitted with an unknown  GangName .

<br><center> <font color=gray> Device and Controller errors </font> </center><br>

ReturnCode	| Description
:-:			| :-
200			| Invalid Resource parameters
201 		| Insufficient Resource parameters
202 		| PipeID unknown
203 		| Unlinked  ResourceLink
204 		| Could not create new  JDF Node.
300 		| Authentication denied.
301 		| Secure channel not supported - I don't support secure channel for this Message.
302 		| Secure channel required - I require secure channel for this Message.
303 		| Certificate expired (Some implementations might not be able to send this response because the SSL layer will reject the Message before passing it to the JMF implementation for parsing)
304 		| Authentication pending.
305 		| Authentication already established.
306 		| No authentication request in process
307 		| Certificate Invalid

<br><center> <font color=gray> Job and pipe specific errors </font> </center><br>

---

# <span id = "Appendix-T"> Appendix-T : JDF Tools </span>

CIP4 official JDF Tools, development by Java : Alces、Bambi、EasyXJDF、JDFEditor

## T.1 Alces

[Alces](https://confluence.cip4.org/display/PUB/Manual+Alces)的角色是Manager，包含Test、Client、Server三个模块，它向Worker（eg.RIP、印刷系统、装订机等Controller设备）发送JDF/JMF消息，并接收和处理Worker的返回消息，同时验证消息是否合法（是否为正确的JDF/JMF文档、是否符合ICS规范、是否符合当前上下文），验证的结果将形成XML Log文件。

## T.2 Bambi

[Bambi](https://confluence.cip4.org/display/PUB/Manual+Bambi)的角色是Controller，它被设计的初衷是为MIS系统开发提供测试框架，它有一个配置文件，通过配置文件可以将Bambi设定模拟为印刷、印后等设备。Bambi的另一个使用场景是“printing house”，同样通过适当的配置文件完成，这对高标准的生产线是非常有用的。

> **[info] Note**
>
> Alces和Bambi的取名可能来自迪士尼著名动画片《小鹿斑比》. 

## T.3 EasyXJDF

[EsayXJDF](https://confluence.cip4.org/display/PUB/EasyXJDF)是生成XJDF文档的工具，目前它只能用于“WebToPrint”环境，以便于MIS对接。EsayXJDF同时提供HTTP发送接口，可以将XJDF文档发送给MIS.

## T.4 JDFEditor

[JDFEditor](https://confluence.cip4.org/display/PUB/JDFEditor)是JDF编辑器，它可以显示、修改和验证JDF文档和JMF消息，同时具有转换JDF文档和XJDF文档的功能。为操作遍历，JDFEditor提供HTTP接口，可以通过网络链接并操作JDF/JMF文档。

---

# <span id = "Appendix-U"> Appendix-U : JDF Instance Template </span>

```XML
<?xml version="1.0" encoding="UTF-8" ?> <!-- Optional attribute : standalone="yes"/"no" -->

<JDF Activation="" CommentURL="" DescriptiveName="" ICSVersions="" ID="" JobID="" JobPartID="" MaxVersion="" Status="" Type="" Types="" Version="" xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="" xsi:schemaLocation="http://www.CIP4.org/Schema/JDFSchema_1_4/JDF.xsd">

	<AuditPool>
		<Created  AgentName="" AgentVersion="" ID="" TimeStamp="" />
		<Modified  AgentName="" AgentVersion="" ID="" TimeStamp="" />
	</AuditPool>

	<AncestorPool>
		<Ancestor Activation="" CommentURL="" DescriptiveName="" ICSVersions="" ID="" JobID="" JobPartID="" MaxVersion="" Status="" Type="" Version="" xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="" xsi:schemaLocation="http://www.CIP4.org/Schema/JDFSchema_1_4/JDF.xsd" NodeID="">
			<CustomerInfo...> ... </CustomerInfo>
			<NodeInfo DescriptiveName="" NodeStatus="" TargetRoute="" />
		</Ancestor>
	</AncestorPool>

	<ResoucePool>

		<!-- --------------------------- Base-ICS-1.5 --------------------------- -->
		<Device Class="" ID="" Status="" />
		<NodeInfo DescriptiveName="" NodeStatus="" TargetRoute="" />
		<xxxRef rRef=""> <!-- "xxx" refer to the same name of resources in other <ResoucePool> -->
			<Part Condition="" />
		</xxxRef>

		<!-- --------------------------- Binding-ICS-1.5 ------------------------ -->
		<Component Dimensions="" Overfold="" OverfoldSide="" SurfaceCount="" >
			<Layout>
				<Media Weight="" MediaType="" />
				<Signature>
					<Media Weight="" MediaType="" />
					<Sheet>
						<Media Weight="" MediaType="" />
					</Sheet>
				</Signature>
			</Layout>
		</Component>
		<GlueApplication GluingTechnique="" >
			<GlueLine AreaGlue="" GlueType="" />
		</GlueApplication>
		<Media Weight="" MediaType="" />

		<!-- --------------------------- LayCrImp-ICS-1.4 ----------------------- -->
		<BindingIntent BindingOrder="" BindingSide="" BindingType="" />
		<DeviceMark Font="" FontSize="" />
		<FileSpec Compression="" MimeType="" URL="" />
		<JobField OperatorText="" ShowList="" UserText="" />
		<Layout Automated="" PartIDKeys="" SourceWorkStyle="" SurfaceContentsBox=""> 
			<ContentObject DocOrd="" Ord="" OrdExpression="" SetOrd="" />
			<MarkObject Ord="" DynamicField=""> 
				<DeviceMark Font="" FontSize="" />
				<JobField OperatorText="" ShowList="" UserText="" />
			</MarkObject>
			<Media Dimension="" MediaType="" />
			<SourceResource>
				<BindingIntent BindingOrder="" BindingSide="" BindingType="" />
			</SourceResource>
			<TransferCurvePool>
				<TransferCurveSet CTM="" Name="" />
			</TransferCurvePool>
		</Layout>
		<LayoutElement ElementType="" IsBlank=""> 
			<FileSpec Compression="" MimeType="" URL="" />
		</LayoutElement>
		<Media Dimension="" MediaType="" />
		<RunList NPage="" ByteMap="" InsertSheet="" InterpretedPDLData="">
			<LayoutElement ElementType="" IsBlank=""> 
				<FileSpec Compression="" MimeType="" URL="" />
			</LayoutElement>
		</RunList>
		<TransferCurvePool>
			<TransferCurveSet CTM="" Name="" />
		</TransferCurvePool>

		<!-- --------------------------- Other ICS List ------------------------- -->

	</ResoucePool>

	<ResourceLinkPool>

		<!-- --------------------------- Base-ICS-1.5 --------------------------- -->
		<xxxLink ActualAmount="" Amount="" MaxAmount="" MinAmount="" MinStatus="" ProcessUsage="" rRef="" Usage=""> <!-- "xxx" refer to the same name of resources in <ResoucePool> -->
			<AmountPool>
				<PartAmount ActualAmount="" Amount="" MaxAmount="" MinAmount="" MinStatus="" ProcessUsage="" rRef="" Usage="">	
					<Part Condition="" />
				</PartAmount>
			</AmountPool>
			<Part Condition="" />
		</xxxLink>

		<!-- --------------------------- Binding-ICS-1.5 ------------------------ -->
		<ComponentLink Usage="" Orientation="" Transformation="" ActualAmount="" Amount="" MaxAmount="" MinAmount="" MinStatus="" ProcessUsage="" rRef="">
			<Part SignatureName="" SheetName="" BlockName="" Condition="" />
		</ComponentLink>

		<!-- --------------------------- Other ICS List ------------------------- -->

	</ResourceLinkPool>

	<JDF Activation="" CommentURL="" DescriptiveName="" ICSVersions="" ID="" JobID="" JobPartID="" MaxVersion="" Status="" Type="" Types="" Version="" xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="" xsi:schemaLocation="http://www.CIP4.org/Schema/JDFSchema_1_4/JDF.xsd"> <!-- Nest JDF Node --> </JDF>
	<JDF ...><!-- Nest JDF Node --> </JDF>
	<JDF ...><!-- Nest JDF Node --> </JDF>

</JDF>
```

## U.1 JDF Instance 

TBD

## U.2 MJD Instance 

TBD

---

# <span id = "Appendix-V"> Appendix-V : JMF Instance Template </span>

```XML
<?xml version="1.0" encoding="UTF-8" ?> <!-- Optional attribute : standalone="yes"/"no" -->

<JMF DeviceID="" ICSVersions="" MaxVersion="" ResponseURL="" SenderID="" TimeStamp="" Version="" xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

	<!-- ---------------------------------- For Query ---------------------------------- -->

	<Query ID="" Time="" Type="" xsi:type="" AcknowledgeURL=""> 
		<Subscription MinDelayTime="" RepeatTime="" URL="">
			<ObservationTarget ObservationPath="" />
		</Subscription>
		<DeviceFilter DeviceDetails="" /> <!-- If Query/@Type="KnownDevices" -->
		<KnownMsgQuParams ChannelMode="" Exact="" ListCommands="" ListQueries="" ListRegistrations="" ListSignals="" Persistent="" /> <!-- If Query/@Type="KnownMessages" -->
		<SubscriptionFilter ChannelID="" DeviceID="" URL="" /> <!-- If Query/@Type="KnownSubscriptions" -->
		<QueueFilter MaxEntries="" QueueEntryDetails="" /> <!-- If Query/@Type="QueueStatus" -->
	</Query>

	<!-- ---------------------------------- For Response ------------------------------- -->

	<Response ID="" refID="" Type="" xsi:type=""  Acknowledged=""  ReturnCode="" Subscribed="">
		<DeviceList> <!-- If Response/@Type="KnownDevices" -->
			<DeviceInfo DeviceID="" DeviceStatus="">
				<Device DescriptiveName="" DeviceID="" JDFVersions="" JMFSenderID="" JMFURL=""/>
			</DeviceInfo>
		</DeviceList>
		<MessageService Acknowledge="" ChannelMode="" Command="" JMFRole="" Persistent="" Query="" Registration="" Signal="" Type="" URLSchemes="" /> <!-- If Response/@Type="KnownMessages" -->
		<SubscriptionInfo ChannelID="" Family="" MessageType="" SenderID=""> <!-- If Response/@Type="KnownSubscriptions" -->
			<Subscription RepeatTime="" URL="" />
		</SubscriptionInfo>
		<Queue DeviceID="" Status=""> <!-- If Response/@Type="QueueStatus" -->
			<QueueEntry JobID="" JobPartID="" Priority="" QueueEntryID="" Status="" SubmissionTime="" Part="" />
		</Queue>
		<QueueEntry JobID="" JobPartID="" Priority="" QueueEntryID="" Status="" SubmissionTime="" Part="" /> <!-- If Response/@Type="ResourcePullQueueStatus" or "SubmitQueueEntry" -->
		<SubmissionMethods Packaging="" URLSchemes="" /> <!-- If Response/@Type="SubmissionMethods" -->
	</Response>

	<!-- ---------------------------------- For Signal --------------------------------- -->

	<Signal refID="" >
		<!-- Corresponding subscription or hardwire configuration and MAY same with the Response/child -->
	</Signal>

	<!-- ---------------------------------- For Command -------------------------------- -->

	<Command AcknowledgeURL="" ID="" Type="" xsi:type="">
		<AbortQueueEntryParams EndStatus=""> <!-- If Command/@Type="AbortQueueEntry" -->
			<QueueFilter>
				<QueueEntryDef QueueEntryID="" />
			</QueueFilter>
		</AbortQueueEntryParams>
		<HoldQueueEntryParams> <!-- If Command/@Type="HoldQueueEntry" -->
			<QueueFilter>
				<QueueEntryDef QueueEntryID="" />
			</QueueFilter>
		</HoldQueueEntryParams>
		<RemoveQueueEntryParams> <!-- If Command/@Type="RemoveQueueEntry" -->
			<QueueFilter>
				<QueueEntryDef QueueEntryID="" />
			</QueueFilter>
		</RemoveQueueEntryParams>
		<RequestQueueEntryParams JobID="" JobPartID="" QueueURL="" Part /> <!-- If Command/@Type="RequestQueueEntry" -->
		<ResourcePullParams Amount="" JobID="" ResourceID="" Part="" /> <!-- If Command/@Type="ResourcePull" -->
		<Comment Name=""><!-- content --></Comment> <!-- If Command/@Type="ResubmitQueueEntry" -->
		<ReturnQueueEntryParams Aborted="" Completed="" QueueEntryID="" URL="" /> <!-- If Command/@Type="ReturnQueueEntry" -->
		<QueueEntryPosParams NextQueueEntryID="" Position="" PrevQueueEntryID="" QueueEntryID="" /> <!-- If Command/@Type="SetQueueEntryPosition" -->
		<QueueEntryPriParams Priority="" /> <!-- If Command/@Type="SetQueueEntryPriority" -->
		<StopPersChParams ChannelID="" DeviceID="" URL="" /> <!-- If Command/@Type="StopPersistentChannel" -->
		<QueueSubmissionParams Hold="" Priority="" ReturnJMF="" ReturnURL="" URL=""> <!-- If Command/@Type="SubmitQueueEntry" -->
			<Comment Name=""><!-- content --></Comment>
		</QueueSubmissionParams>
		<SuspendQueueEntryParams> <!-- If Command/@Type="SuspendQueueEntry" -->
			<QueueFilter>
				<QueueEntryDef QueueEntryID="" />
			</QueueFilter>
		</SuspendQueueEntryParams>
	</Command>

	<!-- ---------------------------------- For Acknowledge ---------------------------- -->

	<Acknowledge AcknowledgeType="" refID="" ReturnCode="">
		<QueueEntry JobID="" JobPartID="" Priority="" QueueEntryID="" Status="" SubmissionTime="" Part="" /> <!-- If Acknowledge/@Type="SubmitQueueEntry" -->
	</Acknowledge>

</JMF>
```

> **[info] Note**
>
> This template is the superset of possible JMF instances. Only one Query/Response/Signal/Command/Acknowledge element can exist, and its attributes and child element nodes also exist under different conditions. 

## V.1 JMF Instance

### V.1.1 Query

```XML
<?xml version="1.0" encoding="UTF-8"?>
<JMF xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" DeviceID="Dumor_JDF_proxy" SenderID="CIP4 Alces Cambridge-17.03" TimeStamp="2018-01-10T16:23:48+08:00" Version="1.3">
	<Query ID="ALCES_IMJXD0_718_20180110162348" Type="QueueStatus" xsi:type="QueryQueueStatus">
		<Subscription URL="http://192.168.14.144:9191">
			<ObservationTarget ObservationPath="//*/@*" />
		</Subscription>
		<QueueFilter QueueEntryDetails="Brief" />
	</Query>
</JMF>
```

### V.1.2 Command

```XML
<?xml version="1.0" encoding="UTF-8"?>
<JMF xmlns="http://www.CIP4.org/JDFSchema_1_1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" SenderID="CIP4 Alces Cambridge-17.03" TimeStamp="2018-01-10T09:40:52+08:00" Version="1.3">
	<Command ID="ALCES_IMJXD0_300_20180110094052" Type="SubmitQueueEntry" xsi:type="CommandSubmitQueueEntry">
		<QueueSubmissionParams Priority="2" ReturnJMF="http://192.168.1.30:9090/alces/jmf" URL="http://192.168.1.30:9090/jdf/uNCSMLt4BsnxCOuc.jdf" />
	</Command>
</JMF>
```

### V.1.3 Acknowledge 

```XML
<JMF xmlns="http://www.CIP4.org/JDFSchema_1_1" SenderID="A3 Printer" TimeStamp="2000-07-25T12:32:48+02:00" MaxVersion="1.4" Version="1.4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Acknowledge ID="M109" Type="PipePush" xsi:type="AcknowledgePipePush" refID="M010">
		<JobPhase JobID="J1" JobPartID="1" Status="InProgress" />
	</Acknowledge>
</JMF>
```

### V.1.4 Response

```XML
<JMF xmlns="http://www.CIP4.org/JDFSchema_1_1" SenderID="A3 Printer" TimeStamp="2013-03-25T12:32:48+02:00" MaxVersion="1.5" Version="1.5" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Response ID="M109" ReturnCode="5" Type="ResumeQueueEntry" xsi:type="ResponseResumeQueueEntry" refID="M009">
		<Notification Class="Error" TimeStamp="2005-03-25T12:32:48+02:00" Type="Error">
			<Comment>StartJob unsuccessful - Device does not handle commands</Comment>
				<Error ErrorID="1234" Resend="Prohibited">
				<ErrorData Path="/JMF/Command" ErrorType="Unsupported"/>
			</Error>
		</Notification>
	</Response>
</JMF>
```

## V.2 MJM Instance 

```MIME
Message-ID: <3018287.1131706450069.JavaMail.clabu@Elvis.local>
MIME-Version: 1.0
Content-Type: multipart/related; 
boundary="----=_Part_0_2409003.1131706449797"

------=_Part_0_2409003.1131706449797
Content-Type: application/vnd.cip4-jmf+xml
Content-Transfer-Encoding: 7bit

<?xml version="1.0" encoding="UTF-8"?>
<JMF SenderID="Alces" TimeStamp="2005-10-09T17:42:00+01:00" Version="1.2" xmlns="http://www.CIP4.org/JDFSchema_1_1">
	<Command ID="M001" Type="SubmitQueueEntry">
		<QueueSubmissionParams ReturnJMF="http://192.168.1.30:9090/alces/jmf" URL="cid:Alces-Approval.jdf"/>
		<QueueFilter MaxEntries="4" QueueEntryDetails="Brief"/>
	</Command>
</JMF>

------=_Part_0_2409003.1131706449797
Content-Type: application/vnd.cip4-jdf+xml
Content-Transfer-Encoding: 7bit
Content-ID: <Alces-Approval.jdf>

<?xml version="1.0" encoding="UTF-8" ?>
<JDF xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.CIP4.org/JDFSchema_1_1" Activation="Active" ID="elk-0001" JobID="0001" JobPartID="1" Status="Waiting" Template="false" Version="1.2" Type="Approval">
	<AuditPool>
		<Created TimeStamp="2004-09-07T13:49:00+01:00" ref="elk-0001"/>
	</AuditPool>
	<ResourcePool>
		<RunList Class="Parameter" ID="RL001" Status="Available">
			<LayoutElement>
				<FileSpec URL="cid:Alces-Figures.pdf" MimeType="application/pdf"/>
			</LayoutElement>
		</RunList>
		<ApprovalParams Class="Parameter" ID="AP001" MinApprovals="1" Status="Available">
			<ApprovalPerson ApprovalRole="Obligated">
				<ContactRef rRef="C001"/>
			</ApprovalPerson>
		</ApprovalParams>
		<Contact Class="Parameter" ID="C001" ContactTypes="Approver" Status="Available">
			<Person FamilyName="Buckwalter" FirstName="Claes">
				<ComChannel ChannelType="Email" Locator="mailto:clabu@itn.liu.se"/>
			</Person>
		</Contact>
		<ApprovalSuccess Class="Parameter" ID="AS001" Status="Unavailable"/>
	</ResourcePool>
	<ResourceLinkPool>
		<RunListLink rRef="RL001" Usage="Input"/>
		<ApprovalParamsLink rRef="AP001" Usage="Input"/>
		<ApprovalSuccessLink rRef="AS001" Usage="Output"/> 
	</ResourceLinkPool>
</JDF>

------=_Part_0_2409003.1131706449797
Content-Type: application/pdf; name=Alces-Figures.pdf
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=Alces-Figures.pdf
Content-ID: <Alces-Figures.pdf>

JVBERi0xLjYNJeLjz9MNCjkgMCBvYmogPDwvTGluZWFyaXplZCAxL0wgMTg4NDcvTyAxMS9FIDY4
ODkvTiAyL1QgMTg2MjYvSCBbIDQ1NiAxNTldPj4NZW5kb2JqDSAgICAgICAgICAgICAgICAgICAg
IA14cmVmDTkgOA0wMDAwMDAwMDE2IDAwMDAwIG4NCjAwMDAwMDA2MTUgMDAwMDAgbg0KMDAwMDAw
MDY3NSAwMDAwMCBuDQowMDAwMDAwODkzIDAwMDAwIG4NCjAwMD...

------=_Part_0_2409003.1131706449797--
```

---

# <span id = "Appendix-W"> Appendix-W : Gray Box </span>

Process Group Nodes MAY contain an OPTIONAL *JDF/@Types* Attribute that allows a Controller (e.g., an MIS system) to specify a minimum set of Processes to be executed without specifying the complete list of Processes or the exact structure or grouping of these Processes into individual JDF Nodes when the Controller can not find the resources of the processes. Process Group Nodes that contain a *JDF/@Types* Attribute are commonly referred to as Gray Boxes.

Gray Boxes **CAN NOT BE EXECUTED BY DEVICE** and SHALL BE found and fixed by other level Controllers until *JDF/@Types* is empty and a normal JDF Node Structure is built.

---

# <span id = "Appendix-X"> Appendix-X : JDF future - XJDF </span>

XJDF是JDF的全新升级协议，同样由CIP4维护，字母“X”表“Exchange”，仅用于区分JDF。XJDF可称之为“JDF2.0”，是更精简、高效的作业传票协议，同时JDF本身也在保持着自己的发展路线，目前最新版本为JDF1.6（2017.09.01日推出）。仍然保留JDF并保持JDF更新的原因有三点：一是XJDF是全新协议，不能做到向下兼容。二是许多厂商已经在JDF协议上花费太多时间和成本，虽然很复杂，但已开发出成熟的接口，在短时间内并不能兼容XJDF。三是XJDF并未经过实际测试，在一些方面尚不成熟。

---

# <span id = "Appendix-Y"> Appendix-Y : JDF Market </span>

## Y.1 JDF Job Ticket

- Job ticket standalone 
	- JDF编辑器。单纯地具有对JDF作业传票进行查看、检测和编写功能
	- 电子商务&Web接口工具。具有兼容JDF的电子商务功能
	- 资产转移工具。可实现PDF文件后额JDF作业传票的管理工作，如文件的输入和输出管理。

- Job ticket embedded
	- 文档创建&版面设计软件。可实现作业文档的制作（或文档的创意和编辑等），并存在创建文档或输出文档的同时创建相关的JDF作业传票
	- 预飞工具。能够对PDF文件做到预飞检查，同时能够创建相关的JDF作业传票。
	- 资产转移服务。可实现PDF文件和JDF作业传票的管理工作，如文件的输入和输出。
	- 其它的一些内嵌的作业传票软件。将属于JDF作业传票软件的范围又不具备以前功能的软件都归属到这一类型。

## Y.2 MIS-JDF system

### Y.2.1 MIS

Management Information System，管理信息系统，由决策支持系统、工业控制系统、办公自动化系统以及库与外界信息交换接口组成，主要作用是最大限度利用计算机和网络来**加强企业的信息管理**，提高整体效益和效率。

### Y.2.2 MIS With JDF 

集成JDF的MIS系统能够提供作业流程控制、生产控制等功能，可以实现从作业接收、估价、报价、作业安排、作业分派和打样，最后到印刷生产的全过程的信息管理。[Case : HP HIFLEX](http://www.hp.com/hpinfo/newsroom/press_kits/2012/HPdrupa12/HP_Hiflex_MIS.pdf).

## Y.3 JDF compatible devices

- 印前设备：控制、打样、大幅面打印机、胶片输出、CTP、印前工作中心或软件、拼大版、版面设计、预飞、RIP、数字印刷等设备。
- 印刷设备：油墨系统、颜色控制、数字印刷、卷筒胶印、单张纸胶印等设备。
- 印后设备：裁切、配帖、折页、压痕、装订、覆膜等设备。

## Y.4 JDF tools

- Development tools
	- IDE/SDK, Provide programming env for JDF development
	- SOAP/HTTP, Provide JMF env for JDF production, such as JMF creation, JMF send and recive etc.

- Test tools
	- Validity test, Provide validity test for JDF file under JDF scheme that provide by CIP4.
	- ICS test, Provide ICS test for JDF file under CIP4 ICS

## Y.5 JDF Serve

JDF consulting and training serve etc.

---

# <span id = "Appendix-Z"> Appendix-Z : CIP4 Software License </span>

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

