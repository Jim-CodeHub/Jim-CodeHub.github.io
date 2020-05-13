<script src="https://github.com/Jim-CodeHub/Skills-list/raw/master/script/ImgHover.js"></script> 

# Section 1 - JDF

# 1 JDF Basic 

## 1.1 Background 

在印刷行业中，企业生产现状多为“信息孤岛”或“流程孤岛”形式，具体表现为：印前作业数据、印刷数据、印后数据独立处理而没有有效的对接，以使印前、印刷、印后产线形成三个“信息孤岛”。这些题传统或市场遗留的问题大大增加了印刷应用企业的生产成本、降低了生产效率。

为了解决印刷行业的“信息孤岛”难题，使印刷业信息集成化、全面自动化和高度智能化，以Adobe、HP、Agfa、Heidelberg、MAN Roland等为代表的的公司成立了**CIP4（International Cooperation for Integration of Processes in Prepress, Press and Postpress）**国际联盟，致力于促进印前、印刷、印后加工的垂直整合，并应用[JDF](#JDF_Introduction)作为信息载体标准。[CIP4 Official Website](https://www.cip4.org/).

> **[info] CIMS**
>
> Computer Infomation Management System 计算机集成制造系统，利用计算机技术把分散在产品设计制造过程中多种孤立的自动化子系统集成以实现高效管理和制造。

## 1.2 <span id = "JDF_Introduction"> Introduction </span>

JDF - Job Definition Format，作业定义格式，基于[XML](https://jim-codehub.github.io/pages/expansions/XML.html)技术，是印前、印中和印后工作流节点的数据载体，描述了生产意图、生产资源、生产过程和审计等信息，并提供作业分离与合并机制。JDF广义上包含了JDF（超集）、[JMF](#JMF_Introduction)和[ICS](#ICS_Introduction)标准。

## 1.3 XML Touch Upon 

涉及XML的技术有**DOM**模型、命名空间**xmlns**、路径表达式**XPath**和文档验证**Schema**。

> **[info] Note**
>
> JDF只应用元素节点和属性节点，而不使用文本节点。另外JDF提供以元素节点&#60;Comment&#62;标记的文档注释方式。[More](https://jim-codehub.github.io/pages/expansions/XML.html)

## 1.4 JDF Node Constructure

JDF文档的根元素节点为&#60;JDF&#62;&#60;/JDF&#62;，可以递归嵌套。其它所有元素都是JDF根元素节点的子元素。

![JDF Node](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JDFNode.png) <br><center> <font color=gray> JDF Node Diagram </font> </center><br>

### 1.4.1 Job hierarchy 

JDF元素节点的**递归嵌套**构建了一个包含完成预期项目所需的所有信息的树，形成了**抽象**的**作业层次结构**，树的根描述作业的产品意图（**Product Indent**），中间节点描述作业的组成过程（**ProcessGroup**），叶节点是过程组节点的详细拆分（**Process**）。

![Job Hierarchy](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JobHierarchy.png) <br><center> <font color=gray> Job Hierarchy </font> </center><br>

> **[info] Note**
>
> 层次结构是作业生产的流程示意，描述了输入输出资源的关系，不表示实际JDF文档中元素节点的嵌套。此外，JDF不定义作业的组织方式，因此一个作业可以有多种路由方案。

### 1.4.2 JDF Instance Template

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
		<xxxRef rRef="">
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
		<xxxLink ActualAmount="" Amount="" MaxAmount="" MinAmount="" MinStatus="" ProcessUsage="" rRef="" Usage="">
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

<br><center> <font color=gray> JDF Document Template </font> </center><br>

> **[info] Note**
>
> JDF元素节点的嵌套迭代描述了Job的组成结构，通过对JDF元素节点的属性判断和资源的利用以确定解决方案。

### 1.4.3 JDF Element Node Attributes 

Attributes			| values																			| Description 
:-:					| :-:																				| :-:
Status				| -																					| - 
ICSVersions			| &#60;Name&#62;\_L&#60;Level&#62;>-&#60;Version&#62;								| ICS version and level association with ICS Spec 
Type				| *Product*/*ProcessGroup*/*Combined*/[Predefined Processes](#Appendix-A)			| processes type 
Types				| [Predefined Processes](#Appendix-A)												| processes type set，used when *@Type=ProcessGroup* or *@Type=Combined*
ID					| -																					| -
JobID				| -																					| - 
JobPartID			| -																					| - 
xmlns				| *http://www.CIP4.org/JDFSchema_1_1*												| namespace 
xmlns:xsi			| *http://www.w3.org/2001/XMLSchema-instance* 										| extension namespace
xsi:type			| -																					| extension namespace attribute 
Activation			| *Active*																			| - 
MaxVersion			| *1.5*																				| max version limited for all elements and attributes 
Version				| *1.5*																				| -
CommentURL			| *file:*/*https:*/*http:*/*cid:*/...												| human-readable comment 
DescriptiveName 	| -																					| human-readable description 
Category			| *Binding* (based on *Binding_L1-1.0*)												| same as *@Types* 

<br><center> <font color=gray> JDF Node Attributes based on Base-ICS-1.5 </font> </center><br>

> **[info] Note**
>
> There SHALL NOT any JDF elements nested when specify attribute *@Types*.

- *@Status*

*Spawned*/*Setup*/*Wating*/*TestRunInProgress*/*FailedTestRun*/*Ready*/*InProgress*/*Aborted*/*Stopped*/*Suspended*/*Completed*/*Cleanup*/*Pool*/*Part*.

> **[info] Note**
>
> A Worker SHALL NOT execute Nodes whose *@Status* is "Completed" or "Aborted".

### 1.4.4 AncestorPool 

**分布式处理机制**将子元素节点从原始JDF文档中分离（**Spawn**）以创建新的JDF文档来执行作业，*AncestorPool*中存储了关于祖先节点的上下文信息，当作业完成后通过该元素节点将JDF合并（**Merge**）到原始JDF文档。分离与合并机制允许递归运行。该节点不能被嵌套。More refer to *JDF Spec 1.5 - 3.5*.

### 1.4.5 AuditPool

审计元素节点存储了JDF过程处理的日志，事件包括JDF节点的创建与删除、JDF节点的修改、分离与合并、错误、设备事件、任务调度等。该节点不能被嵌套。More refer to *JDF Spec 1.5 - 3.12*.

### 1.4.6 ResourcePool and ResourceLinkPool

资源是JDF文档的核心内容，*ResourcePool*元素节点包含的子元素全部都是[预定义的资源](#Appendix-B)，*ResourceLinkPool*元素节点包含的子元素是对应*ResourcePool*子元素节点同名且以*Link*为后缀的元素节点，其属性"@Usage"表达所链接资源的利用方式。

*ResourcePool*和*ResourceLinkPool*一般成对但并不限于成对存在，并且*ResourcePool*的资源可能被不同的*ResourceLinkPool*链接。*ResourcePool*和*ResourceLinkPool*元素节点可能存在多个，但作为JDF元素节点的直接子元素，仅能在当前JDF元素节点下存在一个。

> **[info] Note**
>
> *ResourceRef*是对应*ResourcePool*子元素节点同名且以*Ref*为后缀的元素节点，用于引用资源，类型编程语言中的"#include"。

## 1.5 JDF Workflow

### 1.5.1 Workflow Component Roles

Roles		| Description 
:-:			| :-:
Machines	| 裸机，泛指欲集成JDF功能的物理设备
Devices		| 软件，集成到Machines中，启动Machines并执行JDF指令 
Agents		| 软件，创建、修改、读写和解析JDF，Devices和Controllers也是一种Agents
Controllers | 软件，将Agents完成的JDF路由到Devices，工作流中通常有多级Controllers，路由到最低级的Controllers具有Devices功能
MIS			| 软件，工作流中所有组件的监督者，宏观Controllers  

![Interactions](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/Interactions.png) <br><center> <font color=gray> Roles interactions </font> </center><br>

### 1.5.2 Processes Routing 

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

---

# Section 2 - JMF

# 1 <span id = "JMF_Introduction"> Introduction </span>

Job Messaging Format, based on XML, take HTTP (s) as the communication carrier, used for communication between JDF workflow components.

# 2 JMF Node Constructure

JMF文档的根元素节点为&#60;JMF&#62;&#60;/JMF&#62;，不能递归嵌套。其它所有元素都是JMF根元素节点的子元素。

![JMF Node](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/JMFNode.png) <br><center> <font color=gray> JMF Node Diagram </font> </center><br>

## 2.1 JMF Instance Template

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
> 该模板是JMF实例可能存在的最大集合，Query/Response/Signal/Command/Acknowledge元素仅能存在一个，其属性和子元素节点也在不同的条件下存在。

## 2.2 Query

Query用于客户端向服务器查询消息，并从服务器返回Response响应。如果Query消息包含*Subscription*订阅（称为**可持续通道**），则服务器在所订阅的事件发生时将向所订阅的URL发送Signal消息，直到服务器收到客户端的Command消息（包含*StopPersistentChannel*元素节点）为止（可持续通道关闭）。

## 2.3 Command

Command用于客户端向服务器发送指令以改变其状态，并从服务器返回Response响应。如果Command消息包含*@AcknowledgeURL*属性，则Response消息需包含*@Acknowledge=[BOOL]"*属性，BOOL值为"true"，则服务器在指令执行完毕后将向客户端*@AcknowledgeURL*指定的地址发送Acknowledge消息以汇报执行结果。

### 2.3.1 Command with Queue

Command消息中的**队列**操作是JMF作业调度的核心，在JMF中队列成员（作业）被称为**QueueEntry**，使用属性*QueueEntryID*标识，并支持优先级（0[Low]~100[High]）调整。

![Queue Entry](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntry.png) <br><center> <font color=gray> Queue and QueueEntry </font> </center><br>

![Queue Life](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/QueueEntryLifeCycle.png) <br><center> <font color=gray> QueueEntry Lifecycle </font> </center><br>

> **[info] Note**
>
> 队列编程：程序可以提供一份与队列状态相同的内存映射，以同步队列的变化。

## 2.4 Signal

Signal是单向消息，用于服务器自动广播状态变化。服务器产生Signal消息的条件有三种：

1. 客户端通过JMF申请建立可持续通道，即发送Query消息并包含*Subscription*元素节点。 
2. 客户端通过JDF申请建立可持续通道，即在JDF实例中包含含有*Subscription*元素节点的*NodeInfo*元素节点。 
3. Hard-Wired：入网广播，即当设备开机或首次连接到网络时主动（向预设的URLs）发送信号，以告知设备信息和所能提供的服务等。

> **[info] Note**
>
> Signal基于属于HTTP-C/S模型，本质上也是双向消息，服务器发送时可设置*@ChannelMode="Reliable"*（即**可靠信号**），此时客户端必须返回Response，但无论如何服务器都可以选择忽略响应。

## 2.4 Response 

Response用于服务器同步响应客户端的Query和Command消息，或用于客户端响应服务器的Signal消息，以表明消息已被接收并翻译。当*Response/@ReturnCode*大于0时，Response应该包含*Notification*元素节点以描述返回状态。

> **[info] Standard Error Response**
>
> 当来自客户端的消息不能被正确处理时，Response应包含*@ReturnCode*，属性值是大于零的错误码。

## 2.5 Acknowledge

Acknowledge是服务器对客户端的Command或Query消息的异步单向应答。当服务器执行一个Command需要较长时间时先返回Response响应，等待Command执行完成再返回Acknowledge。

---

# Section 3 - ICS 

# 1 <span id = "ICS_Introduction"> Introduction </span>

Interoperability Conformance Specification，协作互通性规范，定义了不同类型设备应该支持的最小的JDF指令和参数集合，是泛型JDF文档的具体实现。如果把JDF文档比作抽象类，则ICS是该抽象类的派生子类。ICS对不同部分定义了互通性规范，其中Base ICS定义了任何JDF产品都应该兼容的JDF子集，即JDF产品所应该实现的最基本功能。在此基础上分别定义了若干不同部分的ICS规范，在上层ICS中不再出现下层已经出现的内容，完全的ICS文档等于所有层内容的相加。

![ICS Classes](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/ICS_Classes.png) <br><center> <font color=gray> ICS Classes </font> </center><br>

---

# <span id = "Appendix-A"> Appendix-A : Predefined Processes </span>

> **[info] Note**
>
> Prepress and Press processes are omitted.

## A.1 Postpress Processes

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
RingBinding				| 圆环装订		| <span onmouseover="showImg('https://github.com/Jim-CodeHub/Skills-list/raw/master/image/JDF/RingBinding.png');" onmouseout="hideImg();">-</span> 
SaddleStitching			| 骑马订		| 
ShapeCutting			|				|
ShapeDefProduction		|				|
Shrinking				| 收缩			|
SpinePreparation		| -				| 书芯脊柱的生产的准备过程
SpineTaping				| -				| 书芯脊柱贴胶带（和牛皮纸等）的过程
Stacking				| 堆叠			| -
StaticBlocking			|				|
Stitching				| 拼接			| -
Strapping				|				|
StripBinding			|				|
ThreadSealing			|				| 
ThreadSewing			|				|
Trimming				| 修剪			| 尺寸修整过程
WebInlineFinishing		|				|
Winding					|				|
WireCombBinding			| 线梳齿装订	| -
Wrapping				| 包裹			| 将捆扎物、托盘等物体打包的过程

## A.2 General Processes

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

# <span id = "Appendix-B"> Appendix-B : Resources </span>

## B.1 Intent Resources

<br><center> <font color=gray> Resources/@Class="Intent" </font> </center><br>

## B.2 Parameter Resources

<br><center> <font color=gray> Resources/@Class="Parameter" </font> </center><br>

## B.3 Consumable Resources

<br><center> <font color=gray> Resources/@Class="Consumable" </font> </center><br>

## B.4 Handling Resources

<br><center> <font color=gray> Resources/@Class="Handling" </font> </center><br>

## B.5 Implementation Resources

<br><center> <font color=gray> Resources/@Class="Implementation" </font> </center><br>

## B.6 Quantity Resources

<br><center> <font color=gray> Resources/@Class="Quantity" </font> </center><br>

---

# <span id = "Appendix-X"> Appendix-X：JDF future - XJDF </span>

XJDF是JDF的全新升级协议，同样由CIP4维护，字母“X”表“Exchange”，仅用于区分JDF。XJDF可称之为“JDF2.0”，是更精简、高效的作业传票协议，同时JDF本身也在保持着自己的发展路线，目前最新版本为JDF1.6（2017.09.01日推出）。仍然保留JDF并保持JDF更新的原因有三点：一是XJDF是全新协议，不能做到向下兼容。二是许多厂商已经在JDF协议上花费太多时间和成本，虽然很复杂，但已开发出成熟的接口，在短时间内并不能兼容XJDF。三是XJDF并未经过实际测试，在一些方面尚不成熟。

---

# <span id = "Appendix-Y"> Appendix-Y：JDF market </span>

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

# <span id = "Appendix-Z"> Appendix-Z：CIP4 software license </span>

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

