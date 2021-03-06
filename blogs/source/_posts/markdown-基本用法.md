---
title: markdown 基本用法
date: 2017-02-27 16:45:41
tags:
---
# Markdown基本语法
# 一、标题文字图片
### 1.标题
有三种方式表示标题：
* 1：'#'在文字前表示一级标题、
* 2：'##'在文字前表示二级标题、
* 3：'###'在文字前表示三级标题
注：根据‘#’的数目可以判断文字以‘H1’到‘H2’哪一个输出
### 2.文字
* 1：'* [num]'表示无序列表的列（也可使用加号或者减号），其中"* "后面必须要带有一个空格，后可接序号或者什么都不添加，如果在列表内添加引用，就要使用'>'并需要缩进
* 2：文字前后均添加'*'表示斜体
* 3：文字前后添加'*'或'_'表示加粗
* 4：'1.'表示有序列表的列，之后添加用来编号的方式
* 5:markdown中的链接有两种方式，分别为内联方式和引用方式
	1.a:内联方式：This is an [example link](http://example.com/).
	2.b:引用方式：This is another [link][1].
[1]:http://google.com/ "Google"
* 6:引用在其前添加'>'，例如：
> 这是个引用
* 7：底线用的是一行'-'或'='
----------------------
======================

### 3.图片
1.a:内联方式：!["title"]( ./image/1.jpg "Title")
   ##### _*![alt text] (photopath photoname)*_
###### 注：photopath不要添加引号
2.b:引用方式：![alt text][id]
[id]: ./image/2.jpg "Title"
   ##### _*![alt text] [photoid] *_
   ##### _*[photoid]: (photopath photoname)*_

# 二、表格
表格的每一列需要用‘|’分隔开，表头与表格以‘|-----:|’分隔，例如:
"| *Year* | *Temperature (low)* | *Temperature (high)* |
|--------|:--------------------:|---------------------|
| 1900 | -10 | 25 |
| 1910 | -15 | 30 |
| 1920 | -10 | 32 |"

| *Year* | *Temperature (low)* | *Temperature (high)* |
|--------|:--------------------:|--------------------|
| 1900 | -10 | 25 |
| 1910 | -15 | 30 |
| 1920 | -10 | 32 |

# 三、代码
1.a：代码块
这里用''' '''来包含多行代码：
‘’‘
<p>code here</p>
<h2>Javascript</h2>
’‘’

2.b:代码高亮
在上面的代码块语法基础上，在第一组’‘’后添加代码的语言，如‘JavaScript’或‘js’即可将代码标记为JavaScript：
‘’‘
window.addEventListener('load',function(){
	console.log('window loaded);
});
'''
3.c:标记代码
如果要标记一小段行内程序代码，可以用反引号把它包起来（‘’）
this is a `paragraph` of code.


