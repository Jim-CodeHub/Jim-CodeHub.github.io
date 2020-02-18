# Introduction

## Key word

Python
Guido
1989
OpenSource
OOP Object oriented programming
Glue language (C/C++/JAVA/C#/HTML/CSS/PHP....)
Script language
dynamic language
Less code
Simple easy quick
Terminal mode is supported
Database and GUI is supported
AI
Big Data
Search engine
Reptile
Automated management

There should be one - and preferably only one - obvious way to do it

Format fasten

Constraint syntax format

## Official web site
https://www.python.org

## Install
	Linux (for source file):
		./configure
		make
		make install
	
	Windows:
		Windows x86_64 MSI installer
		Windows x86 MSI installer

	MAC:
		omit

Note : to config evn

## Type
Python 2.x (2.7.x classical and the last 2.x version (at 2020.1.1))
Ptyhon 3.x (New)

## Compare with C++

key words:
	and exec not
	assert finally or
	break for pass
	class from print
	continue global raise
	def if return
	del import try
	elif in while
	else is with
	except lambda yield

	SAME WITH C/C++:
		assert break fro class continue if return try else while

	SAME:
		+ - * / % ~ >> << & | ^ < > = != == >= <=  

	DIFF WITH C/C++:
		and   vs &&
		not   vs !
		or    vs ||
		pass  vs ; //empty statements
		print vs printf/cout
		elif  vs else if

		import vs include ???

		True  vs true

		yield
		lambda
		except
		with
		is
		in
		global
		exec
		finally
		from
		raise
		def
		del

## grammer
	For linux/unix: 

	1. Explain mode

	------------- test.py --------------------------
	#!/usr/bin/env python3 (or #!/usr/bin/python3)

	print("hello python")
	------------------------------------------------

	$ chmod +x test.py
	$ ./test.py 
	$ hello python

	Note : multiple statements 

	print("hello"); print("world");

	$hello
	$world

	2. Termial mode

	$ python			//In
	>>>
	...
	>>>exit()			//Out

	More:

	$ python -d			//Display debug info while explaining
	$ python -O			//Same as GCC
	$ python -V			//Version
	$ python +file		//eg: python test.py

	....

	3. Python IDE

	Omit


	-----------------------------------
	A LITTLE DIFF (about structure):

		if True :				//Note the clone
			...
		else	:				//NOte the clone
			...

## Coding

	#!/usr/bin/evn python3
	#coding=utf-8			//Note: this is default for python3

## Identifier

	Same as C/C++ (construct with alpha number and _, and can't start with number, and Case sensitive)
	
## Indent

	Python use indent instead of '{}' to include code block

	indent value can be changed but must be same (same type : tab or space AND same number)

	Mutiple line:

		totle = a + \
				b + \
				c

		arr = ['a', 'b', \
			'c']

		OR

		arr = ['a', 'b', 
			'c']				//'\' can be omit while [] or {} or () encap
			
## Comment
	
	#!/usr/bin/env python

	#This is comment
	print("hello") # This is comment too

	'''
		This is multiple line comment
		with THREE single quotation mark
	'''

	''' This is an other style '''
	''' This is ok,
	yes really'''


	"""
		This is multiple line comment
		with THREE double quotation mark
		AND OTHER MODE same as '''
	"""

## VAR
	Python support 'weakness' data type, and all data type key word will be omit:

	#--------- error

	int a = 10
	print a

	#--------- OK!!! 

	a = 10
	print a

	=====================

	Python standard data type : Number/String/List/Tuple/Dictionary

	Number:
		int
		long (only in python 2.x)
		float
		complex

	String:
		str = "abcdefg"

		index ASC : str[POSIVE NUMBER]
		index DES : str[NIGTIVE NUMBER]

		print str[0] # out a	
		print str[1:4] # out bcd , str[4] = e, so -> [ ) semi-closure
		print str[1:-2] # out bcde, str[-2] = f, so str[-1] = g
		print str[:] # out abcdefg == print str
		print str[:3] # out abc
		print str[1:] # out bcdefg

		print str[1:5:2] # out bd, 1 for str[1], 5 for str[5], 2 for step length (default is 1)

		+ :

		str2 = str + "123"

		print str2 # out abcdefg123

		* :

		str3 = str2 * 2	

		print str3 # out abcdefg123abcdefg123

	List :

		same as "array with constructure" in C/C++:

		mylist = [1, 'a', "hello", 2.3] # List is an kind of 'mixed array'

		print mylist[0] # out 1
		print mylist[-1] # out 2.3
		print mylist[:] #  out [1, 'a', "hello", 2.3] == print mylist
		print mylist[1:3] # out ['a', "hello"] -> [ ) semi-closure
		print mylist[1:] # out ['a', "hello", 2.3]
		print mylist[:3] # out [1, 'a', "hello"]

		mylist2= ['b', 'c', 10]

		print mylist + mylist2 # out [1, 'a', "hello", 2.3, 'b', 'c', 10]

		print mylist2 * 2 # out ['b', 'c', 10, 'b', 'c', 10]

	Tuple : Tuple is Read-Only list

		Tuple is same as 'const' mixed array, can only be read

		mytuple = (1, 'a', "hello", 2.3)
			VS	
		mylist  = [1, 'a', "hello", 2.3]

		mylist[2] = "world";

		print mylist[2] # out world

		mytuple[2] = "world" # error, can not be assignment

	Dictionary :
		Dictionary construct with : "key : value" pair. and index with key instead of index-offset
		
		mydict = {1:1, 'a':2, "hello":"world", 2.3:"haha"}

		print mydict['a'] # out 2

		print mydict["hello"] # out world

		print mydict[2.3] # out haha

		Insert:

		mydict["newkey"] = "newvalue"

		print mydict # out {1:1, 'a':2, "newkey":"newvalue", "hello":"world", 2.3:"haha"}

		print mydict.keys() # internal function, out [1, 'a', "hello", 2.3, "newkey"]
		print mydict.values() # internal function, out [1, 2, "world", "haha", "newvalue"]

		Note : 

		dictionary is non-order data type

		Read from mydict.keys() and mydict.values() output result, we can see that dictionary is a kind of 'mixed list'

		del can be used to delete var (or object)

		eg:
			a = 10
			del a
			print a # error : 'a' is not defined
		
## Data type trans

	float(x) # x can be integer or digital-string

		print float(2)		#out 2.0
		print float("123")	#out 123.0
		print float('a')	# error
		print float("abc")  # error 
		print float(mydict) # error
		print float(mylist) # error
		print float(myTuple) # error

	str(x) # x can be any object

		print str(123)		#out 123
		print str(mydict)	#out {1:1, 'a':2, "hello":"world", 2.3:"haha"}
		...

	ruple(x)
	list(x)
	chr(x)
	hex(x)
	oct(x)
	...

### Operator
	basically the same as C/C++

	except : 

	logical operator
		and vs &&
		or  vs ||
		not vs !

	member operator
		in
		ont in

		eg:
		Mylist = {1, 2, 3, 4 ,5}

		if (1 in Mylist) :
			print("yes"); #out yes

		if (2.3 in mydict.keys()):
			print("yes"); #out yes

	ID operator
		is
		is not

		a = 10;
		b = 10;

		if (a is b)
			print("yes"); # out yes

		b = 20;
		if (a is b)
			print("yes"); 
		else	
			print ("no"); # out no

		------------
		is VS == 

		A is B : Juge if A and B use the same storage space
		A == B : Juge if A's value == B's value


		NOTE: python do no support ++ --

## Operator priority 


## Condition statement

		if xxx :
			...
		elif xxx:
			...
		elif xxx:
			...
		else:
			...

		Note : switch is not supported AND '()' brackets can be used or not

		xxx --> (a == b) / a == b / a > 10 and a < 20 / (a > 10 and a < 20) or (a > 1 and a < 5)

## Loop statement

		while 
		for

		break
		continue
		pass

		----------------

		a = 10
		while a < 100 : 
			if (a == 30):
				a+=20
				continue
			print a
			a+=10
			if (a == 90):
				break
			
		# out 10
			  20
			  50
			  60
			  70
			  80 

		-----------while with else

		while a < 100:
			print a
			a+=20;
		else:
			print ("over")

		#out 10 30 50 70 90 over
	
		-----------

		for x in y:
			...

		for x in y:
			...
		else
			...

		eg:

		arr = [1, 2, 3]

		for num in arr
			print num  #out 1 2 3
		else
			print "over"

## pass

	if a == b
		pass			# do nothing
	elif a > b
		...
	else 
		...
	
## Import Library (or module) 

	eg:

	import math  #import math library/module
	import cmath #import cmath library/module

	>>> import math
	>>> dir(math)	 # check math package content

	>>> math.sqrt(9) # out 3.0
	
## Internal math function

	abs()
	exp()
	log()
	...

## Internal random function

	import random

	choice : random.choice(range(10)) # chose 0 ~ 9 
	randrange
	random() : [0, 1)
	seed()
	...

## traingle function
	asin()
	acos()
	atan()
	...

## Math Const 
	pi 
	e   

## Escape character

	Same as C/C++

	Use 'r/R' to generator origin character

	eg:
		print "this is a test \n'  # out this is a test

		print r"this is a test\n" # out  this is a test\n

## Format string

	print "My name is %s and I am %d years old" % ("zj", 30) # out My name is zj and I am 30 years old

	another feature same as C

## strings function

	str1 = "124"

	print str1.isalnum() # out Ture . 

	*** NOTE : PYTHON TRIED VARIABLE AS OBJECT/CLASS, AND EACH OBJECT/CLASS HAS IT'S OWEN FUNCTION SET!!! ***

## date and time

	Always start from 1970.1.1

	import time

	time_stamp = time.time()

	time.sleep()
	time.ctime()
	time.gtime()
	time.clock()
	...

	print time_stamp

	Format time:
		time.asctime(xxx)

	Auto define format time:
		time.strftime(xxx)

		eg:
			time.strftime("%Y-%m-%d %H-%M-%S")
			time.strftime("%Y-%m-%d %H-%M-%S", time.localtime())

			---
			%y - year (xx)
			%Y - year (xxxx)
			%m - month
			%d - day
			%H - hour (24)
			%I - hour (12)
			%M - minute
			%S - second

			%a - local simple week
			%A - local complete week
			%b - local simple month
			%B - local complete month
			....

## calendar

	import calendar

	print calender.month(2016, 1)

	---# out
	
	   February 2020
Mo Tu We Th Fr Sa Su
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29

## Other data & time module

	datetime pytz deteutil

## Function

	1. Internal function
		such as print() 

	2. self-define function
		
		def function_name(parameters) :

			expression

			return [expression]

		Note : Python function do not set return type, this is really diff from C/C++

		eg :

		def my_print( strings ) :
			print strings 
			return

		my_print("hello")		# out hello

		def my_add(v1, v2)		:
			"THE FIRST LINE can be used to comment this function"
			return v1+v2

		print my_add(1, 2)		# out 3


		----------------------------------
		PARAMETERS

		1. Trans mode 

		number and string and tuple type : trans by value
		list and dictionary	type		 : trans by address

		2. Type 
		
			1) normal parameter

			2) key-word parameter

				def fun(v1, v2, v3)	
					...

				fun(v2 = 10, v1 = 20, v3 = 5) # param order can be changed by key-word type

			3) Default parameter
				
				def fun(v1, v2, v3=20)
					...
					
				
				fun(10, 30)					# Same as C++

			4) Indefinite length parameter

				def fun([normal-args,] *var)	

				eg:

				def printAny(*param) :

					for var in param
						print var

					return

				printAny(1, 2, 3) # out 1 2 3

				def printAny2(v1, *param) :

					print v1

					for var in param :
						print var

					return

	
		----------------------------------
		Anonymous function - lambda

		sum = lambda v1, v2 : v1 + v2

		print sum(1, 2) # out 3

## Module

	Python module is a file that terminated by ".py"

	eg: test.py

	import test

	test.fun()

	----
	from x import y: import part of module 

	eg: test.py  (test contain fun1() fun2())

	from test import fun2

	test.fun2()

	---
	search path 

	1. currunt dir
	2. evn : PYTHONPATH 
	3. default dir 

## namespace

## Package

	Python package is just a file folder that contain sub-folder and modules 

	eg:

	$ tree mypackage

mypackage/
├── __init__.py
├── m.py
└── subpackage
	├── __init__.py
    └── mm.py

		from mypackge.m import pprint2		#import part from package

		import mypackge.m					#import m module from package

		import mypackge.subpackage.mm		#import mm module from sub-package 

		**** NOTE : __init__.py MUST BE EXIST AT ALL LEVEL, and the content can be empty
					__init__.py to identify the folder is a PACKAGE 

## I/O

	1. standard I/O

		screen  : print
		keyboard: raw_input / input (input can recive expression)

	2. file
		open(filename [, mode]) #same as C/C++
		open(filename [, mode] [, buffering] [, encoding=None] [, errors=None] [, newline=None] xxxxx)

		check file info :

		myfile = open("test.txt", "r")

		print myfile.name # file name
		print myfile.closed # check if the file has been closed
		print myfile.mode	# access mode
		...

		close() #file will be closed after fresh the file buffer

		write()
		read()

		seek(offset [, from]) # Byte base

		import os

		os.rename(curname, newname)

		os.remove(file) # delte file

		os.mkdir()
		os.chdir()
		....

## Exception 
		1. Standard exception 
		...

		2. try/except/finally

		try:
			# some expression

		except exp1 [, exp2] [, exp3]...:	# same as C++ catch
			# expression catched

		else:	
			# if exception do not appair

		finally: # ignore anything, always excute 
			# the code will be excute whatever exception accure or not 

		3. raise #same as C++ throw

# OOP
	
## class

	class name :
		"comment string"
		content # construct with function and data (same as c++)

	__init__() -> constructure function
	__del__() -> destructure function

	_xxx	-> protected member
	__xxx	-> private member
	__xxx__	-> system internal

