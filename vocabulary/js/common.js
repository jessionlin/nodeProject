/*创建信息项label标签属性*/
function createLabel(obj,name,pobj,bobj,ifchose,scale,index){
	if(!ifchose) ifchose=false;
	if(!bobj) bobj=null;
	if(!scale) {
		scale=0.5;
	}
	if(!index){
		index=0.5;
	} 
	obj.style.width=pobj.offsetWidth * scale+ "px";
	if(ifchose)
	obj.style.marginTop=pobj.offsetHeight * index + "px";
	else{
		if(bobj)
		obj.style.marginTop=bobj.offsetHeight * index + "px";
	} 
	obj.style.height=pobj.offsetHeight * 0.06 + "px";
	obj.innerHTML = name;
	obj.style.color = "red";
	obj.style.fontSize = "25px";
	obj.style.marginLeft = "5px";
	return obj;
}
/*
创建信息项label标签
*/
function createLabels(obj,name,scale,index){
	if(!scale) {
		scale=0.5;
	}
	if(!index){
		index=0.5;
	} 
	var label = document.createElement("label");
	createLabel(label,name,obj,null,true,scale,index);
	obj.appendChild(label);
	return label;
}
/*
创建单个input标签
*/
function createInputs(obj,text,scale,index){
	if(!scale) scale=0.5;
	if(!index) index=0.5;
	var input = document.createElement("input");
	createInput(input,name,obj,null,true,null,scale);
	obj.appendChild(input);
	return input;
}
/*创建信息项文本框属性*/
function createInput(obj,text,pobj,bobj,ifchose,type,scale){
	if(!ifchose) ifchose=false;
	if(!type) type="text";
	if(!scale){
		scale=0.5;
	} 
	obj.style.width=pobj.offsetWidth * scale + "px";
	if(bobj){
		if(ifchose)
			obj.style.marginTop=bobj.offsetHeight * 0.5 + "px";
		else {
			obj.style.marginTop=bobj.offsetHeight * 0.5 + "px";
		}
		if(bobj.offsetHeight>25)
			obj.style.height=bobj.offsetHeight * 1.25 + "px";
		else obj.style.height="30px";
		obj.name = bobj.innerHTML;
		obj.id = bobj.innerHTML;
		// obj.style.marginLeft = "10px";
	}
	obj.placeholder = text;
	obj.type = type;
	obj.style.fontSize = "20px";
}
/*换行*/
function newline(obj){
	obj.appendChild(document.createElement("br"));
}
/*创建表单项*/
function createFormItem(obj,bobj,label_name,input_text,ifchose,scale,index,type){
	if(!bobj) bobj=null;
	if(!ifchose) ifchose=false;
	if(!type) type="text";
	if(!scale) scale=0.5;
	if(!index){
		index=0.5;
	} 
	var label = document.createElement("label"),
		input = document.createElement("input");
		if(ifchose)
		createLabel(label,label_name,obj,null,ifchose,scale,index);
		else createLabel(label,label_name,obj,bobj,ifchose,scale,index);
		obj.appendChild(label);
		createInput(input,input_text,obj,label,ifchose,type);
		obj.appendChild(input);
	return label;
}
/*删除表单*/
function remoteFormItem(){
	var label = document.getElementsByTagName("label"),
		input = document.getElementsByTagName("input"),
		br = document.getElementsByTagName("br"),
		num = label.length,
		numBr = br.length,
		win = document.getElementById("login_win");
	for(i=0;i<num;i++){
		win.removeChild(label[0]);
		win.removeChild(input[0]);
	}
	for(i=0;i<numBr;i++){
		win.removeChild(br[0]);
	}
	return 1;
}
/*在li中创建按钮并水平显示*/
function createButton(obj){
	var button = document.createElement("button"),
		li = document.createElement("li");
	li.style.width = "auto";
	button.style.backgroundColor = "gray";
	button.style.color = "white";
	button.style.width = "150px";
	button.style.fontFamily = "隶书";
	button.style.fontSize = "25px";
	button.style.marginLeft = "5px";
	button.style.height = "40px";
	obj.appendChild(li);
	li.appendChild(button);
	return button;
}
/*
删除按钮
*/
function deleteButton(pobj,obj){	
	var li = obj.getElementsByTagName("li");
	var button;
	for(i=li.length-1;i>=0;i--){
		button = li[i].getElementsByTagName("button");
		for(j=0;j<button.length;j++){
			li[i].removeChild(button[j]);
		}
		obj.removeChild(li[i]);
	}
	pobj.removeChild(obj);
}
/*
为按钮增添特定属性
*/
function setButton(obj,text){
	obj.style.position = "relative";
	obj.style.float = "left";
	obj.style.width = "30%";
	obj.style.backgroundColor = "red";
	obj.style.marginTop = "5px";
	obj.style.height = "40px";
	obj.style.fontSize = "25px";
	obj.innerHTML = text;
}
/*
创建单个按钮
*/
function createUniqueButton(pobj,id,text,width,height,fontSize,fontFamily,bgcolor,color,mt,ml){
	if(!text) text="提交";
	if(!width) width="40%";
	if(!height) height="40px";
	if(!fontSize) fontSize="25px";
	if(!fontFamily) fontFamily="隶书";
	if(!bgcolor) bgcolor="red";
	if(!color) color="white";
	if(!mt) mt="10px";
	var button = document.createElement("button");
	pobj.appendChild(button);
	button.style.width = width;
	button.style.backgroundColor = bgcolor;
	button.style.marginTop = mt;
	button.style.height = height;
	button.style.fontSize = fontSize;
	button.style.fontFamily = fontFamily;
	button.style.textAlign = "center";
	button.id = id;
	button.style.color = color;
	if(ml) button.style.marginLeft = ml;
	else
	button.style.marginLeft = (pobj.offsetWidth-button.offsetWidth)/2 + "px";
	button.innerHTML = text;
	return button;
}
/*
创建风车，用于显示正误数
*/
function createWindmill(obj,width,height,id,ifchoose,color_1,color_2,lineWidth){//obj最好为ul
	if(!ifchoose) ifchoose=false;
	if(!color_1) color_1="red";
	if(!color_2) color_2="gray";
	if(!lineWidth) lineWidth=3;
	var canvas = document.createElement("canvas"),
		context = canvas.getContext("2d"),
		li = document.createElement("li");
	obj.style.display = "inline-table";
	li.style.width = "auto";
	li.style.height = "auto";
	li.style.position = "relative";
	li.style.marginTop = (obj.offsetHeight - height)/2 + "px";
	li.style.marginLeft = "2px";
	canvas.id = "canvas_" + id.toString();
	obj.appendChild(li);
	li.appendChild(canvas);
	if(ifchoose) color_2 = color_1;
	canvas.width = width;
	canvas.height = height;
	context.beginPath();
	context.fillStyle = color_2;
	context.lineWidth = lineWidth;
	context.moveTo(1,1);
	context.bezierCurveTo(1,height-1,width-1,1,width-1,height-1);
	context.fill();
	context.closePath();

	context.beginPath();
	context.fillStyle = color_2;
	context.moveTo(1,height-1);
	context.bezierCurveTo(width-1,height-1,1,1,width-1,1);
	context.fill();
	context.closePath();
}
/*
添加特定样式span元素
*/
function createSpan(pobj,bobj,text){
	var span = document.createElement("span");
	span.innerHTML = text;
	span.style.fontSize = "30px";
	span.style.fontFamily = "隶书";
	span.style.color = "red";
	span.style.marginLeft = pobj.offsetWidth/3 + "px";
	span.style.textAlign = "center";
	if(bobj)
	pobj.insertBefore(span,bobj);
	else{
		pobj.appendChild(span);
	}
	newline(span);
}
/*
初始化个人信息部分
*/
function initComUseInfo(ifButton,from,flag,user,action,index,scale,id,ifshow){
	if(!index) index = 0.20;
	if(!scale) scale = 0.27;
	if(!id) id = '';
	if(!ifshow) ifshow = false;
	var	label = createFormItem(user,null,"用户名","请输入用户名",true,scale,index);
	newline(user);
	label.style.marginTop = user.offsetHeight * index + "px";
	createFormItem(user,label,"密码 ","请输入密码",false,scale,0.20,"password");
	newline(user);
	createFormItem(user,label,"邮箱","请输入正确的邮箱",false,scale);
	newline(user);
	createFormItem(user,label,"QQ","请输入QQ",false,scale);
	newline(user);
	createFormItem(user,label,"手机","请输入手机号",false,scale);
	newline(user);
	var input = user.getElementsByTagName("input");
	input[from].id = id + "name";
	input[from+1].id = id + "password";
	input[from+2].id = id + "email";
	input[from+3].id = id + "QQ";
	input[from+4].id = id + "phone";
	if(flag)
	createSpan(user,label,"个人信息");
	if(ifshow){
		$.ajax({
				type:"POST",
				url:"/user/getUserinfo",
				dataType:"json",
				data:{
					action:action
				},
				success:function(data){
				if(data.success){
					input[from].value = data.name;
					input[from+1].value = data.password;
					input[from+2].value = data.email;
					input[from+3].value = data.QQ;
					input[from+4].value = data.phone;
				}
				else{
					if(!from)
					alert(data.msg);
					window.location.href = data.url;
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
		});
	}
	
	if(ifButton){
		var button = createUniqueButton(user,"editUserInfo");
	button.onclick = function(){
		editUser("userinfo","/user/editUserinfo");
	}
	
}
}
/*
修改用户信息
*/
function editUser(action,url,text,id){
	if(!text) text = "修改";
	if(!id) id='';
	var action = {type:''};
	action.type = id;
	$.ajax({
		type:"POST",
		url:url,
		dataType:"json",
		data:{
			name:$('#'+id+'name').val(),
			password:$('#'+id+'password').val(),
			email:$('#'+id+'email').val(),
			QQ:$('#'+id+'QQ').val(),
			phone:$('#'+id+'phone').val(),
			action:action
		},
		success:function(data){
			if(!data.msg){
				alert(text + "成功");
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
初始化添加词汇部分
*/
function initAddVocabulary(index,scale){
	if(!index) index = 0.20;
	if(!scale) scale = 0.20;
	var add = document.getElementById("add_vocabulary"),
		label = createFormItem(add,null,"英文","请输入英文",true,scale,index);
	newline(add);
	label_1 = createFormItem(add,label,"中文","请输入中文释义",false,scale,index);
	newline(add);
	label_2 = createFormItem(add,label,"词性","请输入词性",false,scale,index);
	newline(add);
	var input = add.getElementsByTagName("input");
	input[0].id="add_english";
	input[1].id="add_chinese";
	input[2].id="add_cixing";
	var button = createUniqueButton(add,"addVoc");
	createSpan(add,label,"添加词汇");
	button.onclick = function(){
		$.ajax({
				type:"POST",
				url:"/addVoc",
				dataType:"json",
				data:{
					chinese:$('#add_chinese').val(),
					english:$('#add_english').val(),
					cixing:$('#add_cixing').val(),
					action:"add",
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
}
/*删除特定span元素*/
function deleteSpan(obj){
	var span = obj.getElementsByTagName("span");
	for(i=span.length-1;i>=0;i--){
		obj.removeChild(span[i]);
	}
}
/*
创建表头
*/
function createTableThread(obj,index,text,thread_item,thread_width,ifInput,type,indexs,from){
	if(!index) index = 1;
	if(!ifInput) ifInput = false;
	if(!type) type = null;
	var table = document.createElement("table"),
		tr = document.createElement("tr"),
		tbody = document.createElement("tbody");
	obj.style.backgroundColor = "#fcfcfc";
	table.style.width = "100%";
	table.style.textAlign = "center";
	table.border= "1px";
	table.id = type + index.toString();
	tr.style.width = "100%";
	tr.style.fontSize = "25px";
	tr.style.textAlign = "center";
	tr.style.height = obj.offsetHeight/30 + "px";
	obj.appendChild(table);
	table.appendChild(tr);
	var th;
	for(i=0;i<thread_item.length;i++){
		th = document.createElement("th");
		th.innerHTML=thread_item[i];
		th.style.textAlign = "center";
		th.style.width = thread_width[i];
		tr.appendChild(th);
	}
	table.appendChild(tbody);
	createTableTbody(obj,thread_item,tbody,index,text,ifInput,indexs,from);
}
/*
创建表格内容
*/
function createTableTbody(area,thread_item,tbody,index,text,ifInput,indexs,from){
	if(!ifInput) ifInput = false;
	if(!from) from = 0;
	var tr,th,input;
	var record = text.split(';');
	for(i=0;i<record.length;i++)
	record[i] = record[i].split(',');
	for(i=1;i<record.length&&i<=10;i++){
		tr = document.createElement("tr");
		tr.id = (index * 10 + i).toString();
		tr.style.height = area.offsetHeight/30 + "px";
		tbody.appendChild(tr);
		for(j=1;j<=thread_width.length;j++){
			th = document.createElement("th");
			tr.appendChild(th);
			th.style.textAlign = "center";
			th.id = (index * 100 + i * 10 + j).toString();
			th.style.height = area.offsetHeight/30 + "px";
			th.style.fontSize = "20px";
			th.style.width = thread_width[j-1];
			if(indexs==1){
				if(i<record.length){
					if(j==1)
					th.innerHTML = from + i;
					else th.innerHTML = record[i-1][j-2];
				}
			}
			else if(indexs==2){
				if(ifInput){
					if(j==1)
					 th.innerHTML = from + i;
					else if(j==4){
						input = createInputs(th,"请输入答案",1);	
						input.id = (index * 100 + i) .toString();
					}
					else if(j==6){
						var button = createUniqueButton(th,(index * 1000 + i).toString(),"确认","80px","90%",null,null,null,null,"0px","0px");
						button.name="0";
						button.obj = i;
						button.onclick = (function(i){
							var i = this.obj;
							var chineseId = (index * 100 + 10 * i + 2).toString(),
							inputId = (index * 100 + i).toString(),
							checkId = (index * 100 + 10 * i + 5).toString();
							console.log((index * 1000 + i).toString());
						$.ajax({
							type:"POST",
							url:"/user/checkVoc",
							dataType:"json",
							data:{
								chinese:document.getElementById(chineseId).innerHTML,
								action:"check"
							},
							success:function(data){
							if(data.success){
								englishs = document.getElementById(inputId).value;
								if(data.english == englishs){								
									if(parseInt(document.getElementById((index * 1000 + i).toString()).name)==0){
										document.getElementById(checkId).innerHTML = "回答正确";
										document.getElementById(checkId).style.color = "green";
										count(1);
									}	
									document.getElementById((index * 1000 + i).toString()).name = "1";
									} 
									else{
										document.getElementById(checkId).innerHTML = data.english;
										document.getElementById(checkId).style.color = "red";
											count(2);
										if(parseInt(document.getElementById((index * 1000 + i).toString()).name)==0)
											document.getElementById((index * 1000 + i).toString()).name = "2";
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
						});
					}
					else if(j<=thread_width.length&&j<4){
						th.innerHTML = record[i-1][j-2];
					}
						
				}
			}
				else if(indexs == 3){
					if(j==1) th.innerHTML = from + i;
					else if(j==6){
						var button = createUniqueButton(th,"user_"+(i).toString(),"删除","80px","90%",null,null,null,null,"0px","0px");
						button.obj = i;
						button.onclick = (function(i){
							var i = this.obj;
							var chineseId = (102 + i * 10).toString();
						$.ajax({
							type:"POST",
							url:"/admin/delUser",
							dataType:"json",
							data:{
								name:document.getElementById(chineseId).innerHTML,
								action:"deleteUser"
							},
							success:function(data){
							if(data.success){
								alert(data.msg);
								deleteTable(document.getElementById("show_user"));
								initUser();
							}
							else{
								alert(data.msg);
					
							}
						},
								error:function(jqXHR,error){
								alert(error);
							}
						});
						});
					}
				else th.innerHTML = record[i-1][j-2];
				}
			}
			
		}
	}

/*
删除表格
*/
function deleteTable(obj){
	var table = obj.getElementsByTagName("table")[0];
	if(table){
		var tr = table.getElementsByTagName("tr")[0];
	var	th;
	for(i=0;i<tr.length;i++){
		th = tr[i].getElementsByTagName("th");
		for(j=0;j<th.length;j++){
			tr[i].removeChild(th[0]);
		}
		table.removeChild(tr[0]);
	}
	obj.removeChild(table);
	}		
}