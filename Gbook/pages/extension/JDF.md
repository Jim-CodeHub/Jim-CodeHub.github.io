Chapter 三. XML JDF篇

一．简介
JDF是在CIP4项目中用于印前、印刷和印后设备间数据流通的一种格式文档，描述的是产品的生产意图（Intent）和生产过程（Process），最终目的是成品。
JDF文档的本质就是XML文档，后缀名为（xxx.jdf vs xxx.xml），其丰富性是取决于不同的元素名、属性、属性名的意义。
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

