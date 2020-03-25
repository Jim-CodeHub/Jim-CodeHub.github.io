
# 1 PCB Foundation 

## 1.1 Concept 
PCB (Printed Circuit Board) 印制电路板，简称电路板。PCB是电子元器件的电气连接载体和支撑体，在20世纪50年代开始推广，是现代广泛采用的集成电路构建技术。
[Tips : Appendix-A Ancient circuit construction mode](#Appendix-A)

## 1.2. Structure 
PCB consists of Solder mask, Medium, Copper and Silk layer. 阻焊剂常呈绿色，覆盖于PCB上下表面以阻止被保护电路被焊接，丝印层于阻焊层之上用于描述元件、备注等信息，铜层是PCB的核心，表铜层覆盖于阻焊层之下，内铜层以介质层分隔，各层之间通过过孔通信。

![structure](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/structure.png)

Tips : PCB铜层厚度以盎司Oz为单位，1Oz = 35um，常规规格为1Oz，另有2Oz、3Oz等。介质层由FR-4等级的环氧树脂、玻璃纤维和填充剂复合而成。

## 1.3 PCB Design 
<u>Schematic layout</u> and <u> PCB layout</u> are the core of PCB design，schematic uses nets to describe connection of circuit component pins and PCB uses the nets to generate pin-index to guide wiring.

Tips : PCB设计的重点是电路和电磁兼容性的设计，本质是对模电、数电和电磁理论的运用。~~设计软件本身并不重要~~。

### 1.3.1 Schematic & symbol
Schematic layout is the first step of PCB design and which is consists of symbols and net. symbols are abstractions of components with the same number of pins and nets indicates electrical connection between symbol pins. 

Symbols are stored in symbol library and can be created in software. 

Simple design steps in schematic layout : *1*-circuit design, *2*-select/create symbols, *3*-nets connection.

Tips : It is feasible to design PCB directly without schematic, but it will make PCB design difficult. In addition, schematic diagram is very important for software engineers 

### 1.3.2 PCB & footprint 
PCB layout is the second step of PCB design and which is consists of footprint and wiring. footprints are graphical components with accuracy data info (package mode and size, pin spacing and LxWxHxD, etc) and wiring is the realization of (schematic) nets, it's a visible connection on the surface of PCB.

Footprints are stored in footprint library and can be created in software.

Simple design steps in PCB layout : *1*-data set (wire width and spacing, drill diameter and spacing), *2*-size and shape design and component palcement, *3*-Wiring, *4*-copper filled, *5*-set origin and auxiliary flags  

Tips : The placement of components directly affects the difficulty of wiring that use layers and drills (<u>note : both sides can be used</u>).

#### 1.3.2.1 Layer
The concept of 'layers' in software is not exactly the same as that actual PCB and there are different names and types in different software and some layers are not real layers, such as 'mechanical layer' in Altium Designer and 'graphic x' in KICAD, all of these layers are auxiliary.

Only **silk**, **solder mask** and **copper** layers are unified and correspond to reality one by one. 

Copper layers can be used as *signal*, *GND* or *PWR*, common design scheme as below : 

<table width="100%" align="center" text-align="center">
<tr>
<th>layer Nu</th> 
<th> copper </th> 
<th>scheme 1</th> 
<th>scheme 2</th> 
<th>scheme 3</th> 
</tr>

<tr>
<td align="center", valign="center"> 1 </td>

<td align="center", valign="center"> F.Cu </td>
<td align="center", valign="center"> MIX </td>
<td align="center", valign="center"> - </td>
<td align="center", valign="center"> - </td>
</tr>

<tr>
<td align="center", valign="center", rowspan="2"> 2 </td>

<td align="center", valign="center"> F.Cu </td>
<td align="center", valign="center"> MIX </td>
<td align="center", valign="center"> SIG+PWR </td>
<td align="center", valign="center"> GND </td>
</tr>

<tr>
<td align="center", valign="center"> B.Cu </td>
<td align="center", valign="center"> MIX </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> SIG+PWR </td>
</tr>

<tr>
<td align="center", valign="center", rowspan="4"> 4 </td>

<td align="center", valign="center"> F.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> PWR </td>
</tr>

<tr>
<td align="center", valign="center"> In1.Cu </td>
<td align="center", valign="center"> PWR </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> SIG </td>
</tr>

<tr>
<td align="center", valign="center"> In2.Cu </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> PWR </td>
<td align="center", valign="center"> SIG </td>
</tr>

<tr>
<td align="center", valign="center"> B.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> GND </td>
</tr>

<tr>
<td align="center", valign="center", rowspan="8"> 8 </td>

<td align="center", valign="center"> F.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
</tr>

<tr>
<td align="center", valign="center"> In1.Cu </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> GND </td>
</tr>

<tr>
<td align="center", valign="center"> In2.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> PWR </td>
</tr>

<tr>
<td align="center", valign="center"> In3.Cu </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
</tr>

<tr>
<td align="center", valign="center"> In4.Cu </td>
<td align="center", valign="center"> PWR </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
</tr>

<tr>
<td align="center", valign="center"> In5.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> PWR </td>
<td align="center", valign="center"> GND </td>
</tr>

<tr>
<td align="center", valign="center"> In6.Cu </td>
<td align="center", valign="center"> GND </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> PWR </td>
</tr>

<tr>
<td align="center", valign="center"> B.Cu </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
<td align="center", valign="center"> SIG </td>
</tr>

</table>

Tips : Power layer can mix signal wire if necessary, but try to keep GND layer clean.

#### 1.3.2.2 Drilling 
Drilling is the electrical hub between PCB layers, including *Through*, *Blind*, *Buried* and *Macro* type.  

![drill](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/drill.png)

#### 1.3.2.3 NetList
Netlist is a text file with the content about 'nets' generated by the schematic automatically, it's also the hub for transition from schematic to PCB layout.

#### 1.3.2.4 Copper filled
Copper filling objects are **GND**, **PWR** and other **special nets** on EACH LAYER to reduce the loop area and improve PCB performance.

![CopperFilled](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/CopperFilled.png) Copper filled comparison of 4 layers PCB
![CopperFilGND](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/CopperFilGND.png)
![CopperFilVCC](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/CopperFilVCC.png)

Tips : Island copper filling is not allowed, connect to GND if it exist, otherwise, some unpredictable problems MAY arise. 
Note : Dense drilling affect the effect of copper filling.

![BadDrill](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/BadDrill.png)

### 1.3.3 Gerber, BOM and Drill Files  
*Gerber* is an international standard format for describe PCB images, which provides data for each process of PCB maker. *Drill files* is extracted from Gerber for describe position, size and type of drillings. *BOM*-Bill of Material for describe PCB components and properties. 

Tips : \*.pcb file can be provided directly to PCB maker, but some unpredictable problems MAY arise.

------

# 2 PCB Electromagnetic compatibility

## 2.1 Concept 
EMC (Electromagnetic compatibility) 电磁兼容性，用于描述设备或系统在电磁环境中**抵抗干扰** (EMS-Electromagnetic susceptibility 电磁耐受性) 和**释放干扰** (EMI-Electromagnetic interference 电磁干扰) 的特性.

## 2.2 Source 
分布式电容、分布式电感、脉冲噪声、PCB天线、静电等*辐射发射*和*传导发射*源是电磁干扰的主要来源.

- 分布式电容 : 非电容态的形式电容，PCB上下层和同层导线可能产生的电容效应，影响高频电路。
- 分布式电感 : 非电感态的形式电感，PCB导线和元件的分布可能产生的电感效应，影响高频电路。 

## 2.3 Tactics 
Copper filling, GND separation (for signal layer), 3W wiring (for same layer) & 20H, Cross wiring (between layers), Open-loop check, Resonance rules, Short line rules (for special signal, such as clock signal), Power overlap rules, Angle rules (acute and right angle are not allowed), Same type - Same side, Same type - Same layer and Less drilling .etc. 

![3W20H](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/3W20H.png)
![Cross](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/Cross.png)
![Angle](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/Angle.png)
![OpenLoop](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/OpenLoop.png)
![Resonance](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/Resonance.png)

------

# 3 PCB design software 

## 3.1 KICAD

## 3.2 Altium designer

------

## <span id = "Appendix-A"> Appendix-A：Ancient circuit construction mode </span>

### A.1 快速构建
这是一种非常草率的方法，只对构造极其简单的电路原型有用。它通过在任意大小的空间里把元器件焊接在一起来构成非常简单的电路。
![QConstruct](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/QConstruct.png)

如图，将晶体放在处理器上方，晶体引线直接焊接到处理器引脚，其它引线也焊接到处理器引脚来引入电源和接地从而把处理器的I/O和外部连接起来。

### A.2 面包板
面包板又称电路实验板，是带有排列孔的塑料/铁/磁块儿，它被设计用来盛放DIP封装（双列直插封装）的集成电路和离散元器件。术语“面包板”可追溯到真空管时代，当时真空管无线电设备是建立在一块用于切面包的结实木板上的，因此得名。

![Bboard](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/Bboard.png)
使用面包板也不是搭建健壮可靠系统的方法，面包板限制于过多的电容、串扰及噪声敏感度，长期使用后还有机器故障。面包板上的电路连接是通过一段段小的电线来实现的，而这些电线构成了小的天线，这些小天线会吸收周围零散的电磁辐射从而影响电路。

### A.3 绕接技术
绕接曾经是常用的电路构建技术，必须是DIP封装的电路才能使用绕接，它通过约0.6英寸的引脚安装在插座上，然后用绕砸工具（绕砸器和剥线器）在引脚周围绕上电线，这样便构成了一个电路，这也被称为冷焊技术，即不带焊接的一种线与引脚间的紧密电气连接技术。

![WinTech](https://github.com/Jim-CodeHub/Skills-list/raw/master/image/PCB/WinTech.png)
绕接是一种非常快速的原型技术，且健壮和可靠。在早期，NASA（美国国家航天局）惯于使用绕接技术构建宇宙飞船电子设备，并且许多大型计算机也使用这种技术。

------

## <span id = "Appendix-B"> Appendix-B：PCB process </span>

### B.x 焊接
PCB元件焊接有*回流焊*和*波峰焊*两种方法，回流焊是贴片元件焊接的一种低成本方法：将钢网抠刻出与欲焊接的PCB元件的位置和大小相同的区域，然后将PCB与铁网固定并刷锡浆，同时人工放置元件以完成焊接；使用SMT自动贴片机可高效完成贴片元件焊接，但成本较高。波峰焊是插件元件焊接的方法：PCB插装元件后经过锡炉即焊接完成，并通过剪脚机将管脚剪短。

------

## <span id = "Appendix-C"> Appendix-C：PCBA and ICT </span>

### C.1 Concept
PCBA（Printed Circuit Board +Assembly）又写作PCB’A，是指对PCB空板的装配过程，也指通过该过程生产的成品印刷电路板。PCBA测试是对完成焊接的PCBA板进行程序烧制和有关通路、环境、电压、电流、压力等方面的测试，是PCBA加工过程中的一个重要环节，处于生产工序的末端，是严控出货品质的重要手段。

### C.2 PCBA测试方式及PCBA测试架
小批量生产的PCBA可以借助专业测试设备或手工万用表的方式对测试点检测，对于大批量生产的PCBA测试则要使用测试架（Fixture）来辅助完成。*PCBA测试架*又称PCBA测试治具，其原理是通过测试顶针与PCB板的测试点连接，从而获取电路中的电压、电流等关键数据，并在测试架的显示屏幕上显示，达到快速检测的目的。客户在设计PCB板时，就应该考虑其测试方案并预留PCB测试点，然后出具专业的测试文档或测试方案给制造商。
[制作PCBA测试架要提供的文件](http://www.nodpcba.com/news/2609-cn.html)。

### C.3 测试分类及原理
PCBA测试的方法主要包括：ICT测试、FCT测试、老化测试、疲劳测试、振动测试、高低温测试。

#### C.3.1 ICT测试 - 导通性测试
ICT (In Circuit Test) 又称在线测试仪，ICT测试主要是通过测试探针接触PCB的测试点 (ICT测试点) 来检测线路的开路、短路以及PCBA板上元器件的焊接情况（不涉及到功能按键或者输入输出方面的测试）。ICT测试具有操作简单、准确性高的特点。一些中低端的PCBA板可专门制作ICT测试治具，可有效的降低测试成本。

##### C.3.1.1 ICT测试对PCB设计的要求
PCB对角上需设计两个125MILS的非金属化的定位孔，并且每个网络都至少有一个ICT测试点，测试点可以是PCB焊接面的焊点或过孔，检测点的焊盘尺寸最小为24mils (0.6mm)，两个单独测试点的最小间距为60mils (1.5mm)。

#### C.3.2 FCT测试 - 功能性测试
FCT测试由又可称为PCBA功能测试，是指对目标内部功能的测试，可对测试目标提供模拟的运行环境（激励和负载），使其工作于各种状态之中，以测量输出端的参数是否符合要求。测试的内容主要包括电压、电流、功率、功率因素、频率、占空比、亮度与颜色、字符识别、声音识别、温度测量、压力测量、运动控制、FLASH和EEPROM烧录等。

#### C.3.3 老化测试
老化测试是指对PCBA板进行长时间的通电，进行输入输出方面的测试，模拟用户的操作，以确保其性能符合市场的要求。

#### C.3.4 疲劳测试
疲劳测试是指对PCBA进行高频、长时间的操作，观察是否出现失效，判断测试出现故障的概率，以此来检查PCBA板的工作性能。

#### C.3.5 震动测试
震动测试采用专业的震动测试仪进行长周期测试，确保焊接元件无任何脱落情况出现，抽样测试比例根据客户要求决定。

#### C.3.5 高温测试
高温测试是指将PCBA放入测试房，并针对性地提供-40℃至100℃等常见温区的测试服务，充分模拟产品的环境温度，最大化确保产品的可靠性。

### C.4 PCBA测试材料与价格

#### C.4.1 测试探针
目前测试探针分国产、台湾香港、进口三种。进口产品一般是德国、美国、日本的产品，品牌有INGUN、TCI、日电、华荣、中探、亚探等。测试探针的质量主要体现在材质、镀层、弹簧、套管的直径精度及制作工艺。目前包括国内的产品其材质很多用进口材质，所以除非是偷工减料一般探针材质问题不是很大，针及套管的直径精度方面国内与台湾香港的产品差不多，进口稍好但一般影响不大，弹簧及镀层的质量这方面进口产品比国内要好很多，台湾香港产的比国内稍好一些，原因主要是工艺水平上的差别，国产的探针镀层抗磨损较差镀层容易脱落。如果制作的测试治具使用时间及测试次数超过15万次以上选用进口产品较为合适，但进口的探针价格较贵。目前国内的制作水平和工艺逐步提高，并且在当前价格大战的情况下，不少代理商用国产针冒充进口或台湾产的探针出售。如果测试要求和测试次数不高的话建议可选用国产探针。探针的质量主要对测试治具制作中的测试次数及接触是否良好有关。

#### C.4.2 测试线
目前测试线都是国外进口或台湾香港地区生产，其产品的区别不大。价格为约125元一卷。

#### C.4.3 测试板材
测试治具中所选用的板材一般有压克力（有机玻璃）、环氧树脂板等。普通的探针孔径大于1.00毫米的治具，其板材以有机玻璃居多，有机玻璃价格便宜，同时有机玻璃相对较软钻孔时有胀缩探针套管与孔的结合紧密，由于有机玻璃是透明的治具出现问题检查十分容易。但是普通的有机玻璃在钻孔时容易发生溶化和断钻头，特别是钻孔孔径小于0.8毫米时问题很大，一般钻孔孔径小于1毫米时都采用环氧树脂板材，环氧树脂板材钻孔不容易断钻头其韧性及刚性都好但价格较贵一些，环氧树脂板没有胀缩所以如果钻孔孔径不精确会造成探针套管与孔之间很松动产生晃动。环氧树脂板不透明如果治具出现问题检查较困难一些，另外有机玻璃温差变形比环氧树脂板大一些，如果测试的密度非常高的需采用环氧树脂板。板材的选用及钻孔的精度对整个测试治具的精度起关键的作用。
治具的底座大部份是用PVC或有机玻璃制作的，大部份的厂家制作治具底座时是根据测试板材的大小临时制作的，所以底座的质量及底座的重复使用率不是很好，所以建议统一底座大小及标准，本网站提供二种标准的底座可适用大部份的专用测试机，其材料采用20毫米的有机玻璃，由有机玻璃厂家制作质量及工艺非常好，可重复使用，价格虽然稍贵但物有所值。

------

## <span id = "Appendix-D"> Appendix-D：Common component packaging </span>

------

## <span id = "Appendix-E"> Appendix-E：HUAWEI PCB design specification </span>

Standard : China GB/T 4588.3-2002

### E.1 布局规范

- 遵照“先大后小，先难后易”的布置原则，即重要的单元电路、核心元器件应当优先布局
- IC器件布局时，栅格应为50--100mil. 小型表面安装器件 (如表面贴装元件) 布局时，栅格设置应不少于25mil
- 同类型插装元器件在X或Y方向上应朝一个方向放置。同一种类型的有极性分立元件也要力争在X或Y方向上保持一致，便于生产和检验。
- 发热元件要一般应均匀分布，以利于单板和整机的散热，除温度检测元件以外的温度敏感器件应远离发热量大的元器件
- 元器件的排列要便于调试和维修，如小元件周围不能放置大元件，需调试的元器件周围要有足够的空间
- BGA封装元件与相邻元件的距离应>5mm，其它贴片元件相互间的距离>0.7mm。贴装元件焊盘的外侧与相邻插装元件的外侧距离>2mm；有压接件的PCB，压接的接插件周围5mm内不能有插装元、器件，在焊接面其周围5mm内也不能有贴装元、器件

### E,2 布线规范

#### E.2.1 布线优先次序
- 关键信号线优先：电源、摸拟小信号、高速信号、时钟信号和同步信号等信号优先布线
- 密度优先原则：从单板上连接关系最复杂的器件着手布线，从单板上连线最密集的区域开始布线

#### E.2.2 PIN密度与层的关系
PIN密度的定义为 : 板面积（平方英寸）/（板上管脚总数/14）

PIN密度 | 信号层 | 板层 
	 :-:|	  :-:| :-: 
1.0以上 | 2		 | 2
0.6-1.0 | 2		 | 4
0.4-0.6 | 4		 | 6
0.3-0.4 | 6  	 | 8
0.2-0.3 | 8  	 | 12
< 0.2	| 10	 | >14

#### E.2.3 线宽、线厚与电流的关系 

<table width="100%" align="center" text-align="center">
<tr>
<th rowspan="2"> 线宽(mm) </th> 
<th> 铜厚35um </th> 
<th> 铜厚50um </th> 
<th> 铜厚70um </th> 
</tr>

<tr>
<th colspan="3"> 电流(A) </th> 
</tr>

<tr>
<td align="center", valign="center"> 0.15 </td>
<td align="center", valign="center"> 0.20 </td>
<td align="center", valign="center"> 0.50 </td>
<td align="center", valign="center"> 0.70 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.20 </td>
<td align="center", valign="center"> 0.55 </td>
<td align="center", valign="center"> 0.70 </td>
<td align="center", valign="center"> 0.90 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.30 </td>
<td align="center", valign="center"> 0.80 </td>
<td align="center", valign="center"> 1.10 </td>
<td align="center", valign="center"> 1.30 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.40 </td>
<td align="center", valign="center"> 1.10 </td>
<td align="center", valign="center"> 1.35 </td>
<td align="center", valign="center"> 1.70 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.50 </td>
<td align="center", valign="center"> 1.35 </td>
<td align="center", valign="center"> 1.70 </td>
<td align="center", valign="center"> 2.00 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.60 </td>
<td align="center", valign="center"> 1.60 </td>
<td align="center", valign="center"> 1.90 </td>
<td align="center", valign="center"> 2.30 </td>
</tr>

<tr>
<td align="center", valign="center"> 0.80 </td>
<td align="center", valign="center"> 2.00 </td>
<td align="center", valign="center"> 2.40 </td>
<td align="center", valign="center"> 2.80 </td>
</tr>

<tr>
<td align="center", valign="center"> 1.00 </td>
<td align="center", valign="center"> 2.30 </td>
<td align="center", valign="center"> 2.60 </td>
<td align="center", valign="center"> 3.20 </td>
</tr>

<tr>
<td align="center", valign="center"> 1.20 </td>
<td align="center", valign="center"> 2.70 </td>
<td align="center", valign="center"> 3.00 </td>
<td align="center", valign="center"> 3.60 </td>
</tr>

<tr>
<td align="center", valign="center"> 1.50 </td>
<td align="center", valign="center"> 3.20 </td>
<td align="center", valign="center"> 3.50 </td>
<td align="center", valign="center"> 4.20 </td>
</tr>

<tr>
<td align="center", valign="center"> 2.00 </td>
<td align="center", valign="center"> 4.00 </td>
<td align="center", valign="center"> 4.30 </td>
<td align="center", valign="center"> 5.10 </td>
</tr>

<tr>
<td align="center", valign="center"> 2.50 </td>
<td align="center", valign="center"> 4.50 </td>
<td align="center", valign="center"> 5.10 </td>
<td align="center", valign="center"> 6.00 </td>
</tr>

</table>

#### E.2.4 PCB工艺限制
限制				   | 国内 | 国际先进水平 
					:-:|   :-:| :-:
推荐最小线宽/间距(mil) |   6/6| 4/4
极限最小线宽/间距(mil) |   4/6| 2/2

#### E.2.5 孔、焊盘与板厚的关系

板厚(mm)	   | 3.0 | 2.5 | 2.0 | 1.6 | 1.0
			:-:|  :-:|  :-:|  :-:|  :-:| :-:
最小孔径(mil)  | 24  | 20  | 16  | 12  | 8
焊盘直径(mil)  | 40  | 35  | 28  | 25  | 20
热焊盘直径(mil)| 50  | 45  | 40  | 35  | 30

