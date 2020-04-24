
# 1 Introduction

Regular expression (regexp or regex) is a sequence of characters that define a *search pattern*, comes from *formal language theory*. and supported by IEEE Posix with sets **BRE**(Basic Regular Expression) and **ERE**(Extended Regular Expression). 

# 2 Posix metacharacters

## 2.1 Basic regular expression

MetaCh_BRE		| Description 
:-:				| :-:
^S				| matches the string start with *S* (of any line) 
S$				| matches the string end with *S* (of any line) 
[S]				| bracket expression. Matches a single character in the scope of *S* (*[S1-S2]*, *[S1-]*, *[-S2]*, ...) 
\[^S]			| complement of *[S]*
.				| matches **any** single character, except '\n' line-break
S\*				| matches *S* zero to gigantic times 
S{m, n}			| matches *S* at least *m* and not more than *n* times
(exp)			| sub-expression
\n				| *n* $\subseteq$ [1, 9], refer to which sub-expression 

<br> <center> <font color=gray> 'S', 'S1', 'S2' refer string or single character </font> </center> <br>

## 2.2 Extended regular expression

MetaCh_ERE		| Description 
:-:				| :-:
\(exp\)			| same as *(exp)*
S\{m, n\}		| same as *S{m, n}* 
S?				| matches *S* zero or one time
\+				| matches *S* one to gigantic times
S1&#124;S2		| optional *S1* or *S2* 

<br> <center> <font color=gray> 'S', 'S1', 'S2' refer string or single character </font> </center> <br>

Tips : Because of its expressive power and (relative) ease of reading, many other utilities and programming languages have adopted syntax similar to Perl's — for example, Java, JavaScript, Julia, Python, Ruby, Qt, Microsoft's .NET Framework, and XML Schema, PHP, awk, sed, etc.

## 3 Character classes

The character class is a quick way to express the expressions set. 

POSIX		| Perl | Vim | ASCII					| Description 
:-:			| :-:  | :-: | :-:						| :-:
[:alnum:]	| -	   | -	 | [A-Za-z0-9]				| Alphanumeric characters 
[:alpha:]	| -	   | \a  | [A-Za-z]					| Alphabetic characters
[:blank:]	| -	   | \s	 | [ \t]					| Space and tab
[:cntrl:]	| -	   | -   | [\x00-\x1F\x7F]			| Control characters
[:digit:]	| \d   | \d	 | [0-9]					| Digits 
[:lower:]	| -	   | \l	 | [a-z]					| Lowercase letters
[:upper:]	| -	   | \u	 | [A-Z]					| Uppercase letters
[:print:]	| -	   | \p  | [\x20-\x7E]				| Visible characters and the space character 
[:space:]	| \s   | \_s | [ \t\r\n\v\f]			| Whitespace characters
[:xdigit:]  | -    | \x  | [A-Fa-f0-9]				| Hexadecimal digits 

<br> <center> <font color=gray> comparison of different standards about character class </font> </center> <br>

# 3 Lazy and possessive matching

# 4 Unicode

# 5 Wildcard Vs RegExp 

Wildcards are placeholders while regular expressions are searching pattern, and only '.' in regexp is a wildcard.

MetaCh	| Description 
:-:		| :-: 
\*		| placeholder for any characters, zero - gigantic
?		| placeholder for any single character

<br> <center> <font color=gray> wildcards meta-ch list </font> </center> <br>

Tips : some implementations also contain meta-ch similar to regexp, such as *[S]*, *[!S]* (which equal to *\[^S]*).

