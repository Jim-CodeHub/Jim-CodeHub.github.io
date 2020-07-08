
# 1 Background 

# 2 Introduction

# 3 Open source License

# 4 Open source Vs Free

# 软件协议列表

Apache License 2.0、GNU GPLv3.0、MIT License、BSD 2-clause、BSD 3-clause、Eclipse Public License 2.0、GNU AGPLv3.0、GNU GPLv2.0、GNU LGPLv2.1、GNU LGPLv3.0、Mazilla Public License 2.0

# 相关组织

## OSI 

OSI（Open Source Initiative）开放源码促进协会是一个旨在促进和保护开源软件、项目和社区的国际性的非盈利组织。于1998年由布鲁斯·斐伦斯和埃里克·斯蒂芬·雷蒙等人创立，启发于当时网景公司与微软的IE浏览器竞争。印度、日本、南美和欧洲部分国家都是OSI董事会成员。

被OSI收录的开源协议具有一定权威性，详细参看OSI许可协议列表：https://opensource.org/licenses/category。

## SFLC和 gpl-violations.org

SFLC（Software Freedom Law Center）软件自由法律中心是一个为自由软件和开源软件提供无偿法律代理和相关法律支持的公益性组织。由哥伦比亚大学法学教授伊本·莫格林于2005年2月筹建，主要替FSF（自由软件基金会）发声。

gpl-violations.org由德国柏林著名Linux黑客、GPL合作者哈歪·德里什（Harald Welte）与2004年创建，旨在追查和起诉GPL协议的违规者。

美国SFLC和德国gpl-violations.org是用法律手段维æ¤自由/开源软件协议的两大阵营，曾向法院提起诸多诉讼，被告者包括思科、D-Llink、Skype、Monsoon等。更多细节参看附录G。
附：SFLC官网：https://www.softwarefreedom.org/

# 开源协议的共性

所有开源软件许可协议都是无责任（No Liability）和无担保（No Warranty）的，部分许可协议还对商标使用（Trademark use）有限制。这使得任何使用这些协议的软件贡献者都无需向任何使用者承担任何责任。

所有的开源软件许可协议都是可以商用和个人使用的，并且可以修改和发布，但都要基于特定的条件。

# 开源协议对别

所有开源软件协议中，GPL协议是最为严谨和苛刻的，GPL尊重并发扬自由软件精神。LGPL是后期出现的宽松GPL版本，它要求如果软件使用了带有GPL协议的软件，但仅以该软件作为库来工作，则不必以LGPL协议发布。AGPL协议是GPL的分支，它要求如果使用了带有AGPL协议的软件的软件在服务器端运行，则凡是与服务器端通信的用户都可以获得该软件源码。

Apache 2.0、BSD和MIT是对商业友好的宽松许可协议，它们允许使用带有这些协议的软件的软件不开源。

# 附录A ： GPL侵权诉讼案件

## D-Link NAS案件（全球第一例自由软件侵权诉讼案件）

德国友讯（台湾友讯D-Link子公司）的NAS产品的驱动程序中采用了GPL程序，但没有提供驱动程序源码和GPL协议注释，所涉及的GPL程序有msdosfs、mtd 与 initrd。gpl-violations.org组织创建者Welte发现后向德国友讯提出更正措施无果，遂于2006年向德国法兰克福地方法院提起诉讼。结果以Welte胜诉告终，德国友讯向Welte支付了购买NAS产品和逆向解析等费用，并肯定社群开发者对于自由/开放源码软件的贡献。

这次法兰克福地院的判决则是经过完整的诉讼程序而产生，其间对于各项证据的检视以及双方争执点的辩论均较深入而完备，所产生的判决书因此也较具有代表意义与重要性。这表明，GPL 在德国法管辖区域内的法律有效性与可执行性正式确立。
参考网址：https://www.openfoundry.org/tw/legal-column-list/504--gpl-。

## Monsoon Hava案件

2007年Busybox著作权人首次在美国境内提告，其透过SFLC向美国纽约南区联邦法院控诉美国Monsoon公司Hava产品采用Busybox但未公布源码，违反了GPL协议。结果以双方庭外和解而告终，Monsoon向原告一笔金额并未公开的赔偿金，并承诺公开该公司版本的Busybox源码并遵守GPL协议。

2007年到2009年器件，BusyBox著作权人通过SFLC代理向台湾约21家公司提起自由软件侵权控诉，此系列起诉讼案件标志着侵权利用自由软体的法律风险，已由欧洲扩散至美国，其后甚至可能演变至全球各地。

参考网址：https://www.openfoundry.org/tw/legal-column-list/2277--busybox-。https://torquemag.io/2013/03/busybox/。https://www.openfoundry.org/en/news/1287。

## 思科Linksys案件

2003年，FSF了解到思科的无线路由器Linksys WRT54G，在固件中使用了GNU/Linux系统，根据软件遵循的GPL许可证，消费者应该收到所有的源代码，但思科没有提供，FSF督促思科遵守协议，理解许可证所赋予的义务。但几年下来，思科并没有采取必要步骤去承担应尽义务，拒绝给予消费者完整的源代码以及其它在FSF看来是合理的要求。

2008年FSF决定以违反FSF所持有的版权为由起诉思科，这些程序包括GCC、binutils、和GNU C Library。同年9月FSF诉讼思科源码案以和解收场，并未走上法庭。


--------------------
