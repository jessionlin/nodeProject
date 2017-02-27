
/*
主页面
*/
$(document).ready(function(){
	var ul = document.getElementById("nav"),
		test = document.getElementById("test"),
		user = document.getElementById("complete_user_information"),
		record = document.getElementById("test_record"),
		main = document.getElementById("main");
	main.style.left = ul.offsetWidth + ul.offsetLeft * 3 + "px" ;
	main.style.top = ul.offsetTop  + "px";
	test.style.left = ul.offsetLeft * 2.5 + user.offsetWidth + "px";
	test.style.top = -1 * main.offsetHeight + "px";
	record.style.left = ul.offsetWidth + ul.offsetLeft * 3 + "px" ;
	record.style.top = ul.offsetTop + main.offsetHeight + 5  + "px";
	var name;
	$.ajax({
				type:"POST",
				url:"/getSession",
				dataType:"json",
				data:{
					action:"session",
				},
				success:function(data){
				if(data.success){
					initTestRecord(data.name);
				}
				else{
					if(!data.name) window.location.href = "/";
					alert(data.msg);
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
	});
	initComUseInfo(true,0,1,document.getElementById("complete_user_information"),"getuserinfo",0.05,0.22,null,true);
	initAddVocabulary(0.05);
	initVocTest();
	
});
/*
改变导航栏活跃状态
*/
function changeActive(obj){
	var li = document.getElementById("nav").getElementsByTagName("li"),
		user = document.getElementById("complete_user_information"),
		test = document.getElementById("test"),
		record = document.getElementById("test_record"),
		add = document.getElementById("add_vocabulary");
	for(i=0;i<li.length;i++){
		li[i].className = "";
	}
	user.style.backgroundColor = "#e0e0e0";
	add.style.backgroundColor = "#e0e0e0";
	test.style.backgroundColor = "#e0e0e0";
	record.style.backgroundColor = "#e0e0e0";
	obj.parentNode.className = "active";
	if(obj.id == "完善个人信息"){
		user.style.backgroundColor = "#004B97";
	}
	else if(obj.id == "添加词汇"){
		add.style.backgroundColor = "#004B97";
	}
	else if(obj.id == "开始测试"){
		test.style.backgroundColor = "#004B97";
	}
	else if(obj.id == "查看测试记录"){
		record.style.backgroundColor = "#004B97";
		show(record);
		deleteTestRecordTable();
		deleteSpan(record);
		initTestRecord();
	}
}
/*
初始化单词测试部分
*/
function initVocTest(){
	$.ajax({
				type:"POST",
				url:"/user/getVocNum",
				dataType:"json",
				data:{
					action:"getVocNum",
				},
				success:function(data){
				if(data.success){
					console.log("num:" + data.num);
					showTestTop(16,data.num);
					showTestTable();
				}
				else{
					alert(data.msg);
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
			});
	
}
/*
初始化单词测试模块头部
*/
function showTestTop(max,whole){
	if(!max) max = 10;
	var choose = document.getElementById("choose_num"),
		choose_2 = document.getElementById("choose_from"),
		testTop = document.getElementById("test_top");
	var option;
	for(i=1;i<=max;i++){
		option = document.createElement("option");
		option.value = i;
		option.innerHTML = i;
		choose.appendChild(option);
	}
	for(i=1;i<=whole;i++){
		option = document.createElement("option");
		option.value = i;
		option.innerHTML = i;
		choose_2.appendChild(option);
	}
	choose.style.left = testTop.offsetWidth*5/7 + "px";
	choose.style.top = (testTop.offsetHeight - choose.offsetHeight)/2 + "px";
	choose_2.style.left = testTop.offsetWidth*5/7 - choose.offsetWidth*6/5 + "px";
	choose_2.style.top = (testTop.offsetHeight - choose.offsetHeight)/2 + "px";
	var span = document.createElement("span");
	span.innerHTML = "开始测试";
	span.style.fontSize = "40px";
	span.style.fontFamily = "隶书";
	span.style.color = "red";
	span.style.display = "inline";
	span.style.marginLeft = testTop.offsetWidth/3 + "px";
	testTop.insertBefore(span,choose);
	var button = document.createElement("button");
	button.style.position = "absolute";
	button.style.width = "11%";
	button.style.backgroundColor = "red";
	button.style.height = "40px";
	button.style.fontSize = "25px";
	button.style.fontFamily = "隶书";
	button.style.textAlign = "center";
	button.id = "开始测试";
	button.style.color = "white";
	button.onclick=function(){
		deleteTest();
		startTest();
	}
	button.innerHTML = "开始测试";
	testTop.appendChild(button);
	button.style.left = testTop.offsetWidth*5/7 + choose.offsetWidth*6/5 + "px";
	button.style.top = (testTop.offsetHeight - button.offsetHeight)/2 + "px";
}
/*
删除上次测试显示表格
*/
function deleteTest(){
	var main = document.getElementById("main"),
		table = main.getElementsByTagName("table"),
		area1 = document.getElementById("test_area_1"),
		area2 = document.getElementById("test_area_2");
	if(table){
		for(i=0;i<table.length;i++){
			if(table[0].id=="test1"||table[0].id=="null1") deleteTable(area1);
			if(table[0]&&(table[0].id=="test2"||table[0].id=="null2")) deleteTable(area2);
		}
	}
}
/*
删除测试记录表格
*/
function deleteTestRecordTable(){
	var record = document.getElementById("test_record");
	deleteTable(record);
	deleteSpan(record);
	if(document.getElementById("next_pre"))
	deleteButton(record,document.getElementById("next_pre"));
}
/*
显示测试表格
*/
function showTestTable(num,text,thread_item,thread_width){
	var area1 = document.getElementById("test_area_1"),
		area2 = document.getElementById("test_area_2"),
		testTop = document.getElementById("test_top"),
		test = document.getElementById("test");
	area2.style.left = test.offsetWidth - area2.offsetWidth + "px";
	area2.style.top = testTop.offsetHeight + "px";
	area1.style.backgroundColor = test.style.backgroundColor;
	area2.style.backgroundColor = test.style.backgroundColor;
	if(num>=0&&num<=8){
		createTableThread(area1,1,text,thread_item,thread_width,true,"test",2);
	}
	else if((num>8)&&(num<=16)){
		var voc = text.split(';');
		var text_1='',text_2='';
		for(i=0;i<8;i++) text_1 = text_1 + voc[i] +";";
		for(i=8;i<voc.length;i++){
			if(voc[i]) text_2 = text_2  + voc[i] +";";
		}
		createTableThread(area1,1,text_1,thread_item,thread_width,true,"test",2);
		createTableThread(area2,2,text_2,thread_item,thread_width,true,"test",2);
	}
	else;
}
/*
记录答题正误数
*/
function count(flag){
	var right = document.getElementById("result"),
		wrong = document.getElementById("wrong"),
		whole = document.getElementById("whole");
	if(flag==1){
		var num = parseInt(right.innerHTML)+1;
		right.innerHTML =(num).toString();
	}
	else if(flag == 2){
		var num = parseInt(wrong.innerHTML)+1;
		wrong.innerHTML =(num).toString();
	}
	deleteResult();
	createTestResult(parseInt(whole.innerHTML),parseInt(right.innerHTML),parseInt(wrong.innerHTML));
}
/*
创建测试结果显示界面
*/
function createTestResult(num,right,wrong){
	var ul = document.getElementById("test_result_show"),
		rate = document.getElementById("rate");
	deleteResult();
	for(i=1;i<=num;i++){
		if(i<=right)
		createWindmill(ul,30,30,i,true);
		else
	    createWindmill(ul,30,30,i);
	}
	var result ="总数:" + num.toString() + "正确数:" + right.toString() + " 错误数:" + wrong.toString();
	label = createLabels(rate,result + " 正确率:" + (right.toString() + "/" + num),1,0.1);
	label.id = "rate_result";
	
	var button = createUniqueButton(rate,"store","储存","15%","90%",null,null,null,null,"0px","0px");
	button.style.float = "right";
	button.style.marginTop = "-"+rate.offsetHeight*2/3+"px";
	button.onclick = function(){
		addRecord(num,right);
	}
}

function deleteResult(){
		deleteTestResult();
		deleteLabel();
		deleteStoreButton();
}
/*
删除显示测试成绩部分的按钮
*/
function deleteStoreButton(){
	var rate = document.getElementById("rate"),
		button = document.getElementById("store");
	if(button)
	rate.removeChild(button);	
}
/*
删除显示页面中的正确率
*/
function deleteLabel(){
	var label = document.getElementById("rate_result"),
		rate = document.getElementById("rate");
	if(label) rate.removeChild(label);
}
/*
删除之前产生的canvas标签
*/
function deleteTestResult(){
	var ul = document.getElementById("test_result_show"),
		li = ul.getElementsByTagName("li");
	if(li.length){
		for(i=li.length-1;i>=0;i--){			
			li[i].removeChild(li[i].getElementsByTagName("canvas")[0]);
			ul.removeChild(li[i]);
		}
	}	
}
/*
开始测试
*/
function startTest(){
	var select_1 = document.getElementById("choose_num"),
		num_1 = select_1.selectedIndex,
		number = document.getElementById("result"),
		whole = document.getElementById("whole"),
		num =parseInt(number.innerHTML),
		select_2 = document.getElementById("choose_from"),
		num_2 = select_2.selectedIndex;
		whole.innerHTML = num_1.toString();
		var speed=50;
	deleteResult();
	num_1.checked = "checked";
	num_2.checked = "checked";
	whole.innerHTML = num_1.toString();
	number.innerHTML = "0";
	$.ajax({
				type:"POST",
				url:"/user/startTest",
				dataType:"json",
				data:{
					from:num_2,
					num:num_1,
					action:"test"
				},
				success:function(data){
				if(data.success){
					text = data.text;
						thread_item=["序号","汉语","词性","英文","是否正确","确认"];
						thread_width=["10%","12%","15%","20%","20%","23%"];
						showTestTable(num_1,text,thread_item,thread_width);
				}
				else{
					alert(data.msg);
					
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
		});
		//createTestResult(num_1,num);
}
/*
添加测试记录
*/
function addRecord(num,right){
	$.ajax({
				type:"POST",
				url:"/user/addRecord",
				dataType:"json",
				data:{
					number:num,
					right:right,
					action:"addrecord"
				},
				success:function(data){
				if(data.success){
					alert(data.msg);
				}
				else{
					alert(data.msg);
					
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
	});
}
/*
初始化测试记录页面
*/
function initTestRecord(name,from){
	if(!from) from = 0;
	var record = document.getElementById("test_record");
	createSpan(record,null,"显示测试记录");
	$.ajax({
				type:"POST",
				url:"/user/getRecord",
				dataType:"json",
				data:{
					from:from,
					action:"record"
				},
				success:function(data){
				if(data.success){
					text = data.text;
						thread_item=["序号","正确率","测试单词数","测试时间"];
						thread_width=["10%","20%","20","50%"];
						createTableThread(record,1,text,thread_item,thread_width,false,"record",1,from);
						ul = document.createElement("ul");
						record.appendChild(ul);
						ul.id = "next_pre";
						var pre = createButton(ul),
							next = createButton(ul);
						next.id="next";
						pre.id="pre";
						window.obj = from;
						setButton(pre,"上一页");
						next.onclick = function(){
								var from = window.obj;
								from += 10;
								$.ajax({
									type:"POST",
									url:"/user/getRecordNum",
									dataType:"json",
									data:{
										action:"getRecordNum"
										},
									success:function(data){
								if(data.success){
									if(from < data.num){
										deleteTestRecordTable();
										initTestRecord(name,from);	
									}								
								}
							else{
									alert(data.msg);
					
								}
						},
								error:function(jqXHR,error){
								alert(error);
							}
						});
						};
						setButton(next,"下一页");
						pre.onclick = function(){
							from -= 10;
							if(from>=0){
								deleteTestRecordTable();
								initTestRecord(name,from);
							}
						};
				}
				else{
					alert(data.msg);
					
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
		});
}
/*
显示某一个元素
*/
function show(obj){
	obj.style.display = "block";
}