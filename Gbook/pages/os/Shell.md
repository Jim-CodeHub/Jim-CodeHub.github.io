

----
散装知识点

## Patching with command *diff* and *patch*

### diff -ruN OldFile NewFile > x.patch

- -r : recursively compare any subdirectories found
- -u/-U NUM : output NUM (default 3) lines of unified context 
- -N : treat absent files as empty

### patch -pN -RE oldFile x.patch

- -pN : Strip NUM leading components from file names
eg : a/b/c/d/file
,patch -p0 
,cd a
,patch -p1
,cd b
,patch -p2
,...

- -R : Assume patches were created with old and new files swapped
- -E : Remove output files that are empty after patching

Tips : Order is important for OldFile and NewFile in command 'diff', and the same with the option -R for command 'patch'

Note : Patching means operations based on original files

