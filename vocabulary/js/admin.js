$(document).ready(function(){
	initUserInfo();
	initAddVocabulary(0.05);
	initUser(0);
	initAdminInfo();
	$.ajax({
				type:"POST",
				url:"/getSession",
				dataType:"json",
				data:{
					action:"session",
				},
				success:function(data){
				if(data.success){
				}
				else{
					alert(data.msg);
					if(!data.name) window.location.href = "/";
				}
			},
				error:function(jqXHR,error){
				alert(error);
			}
	});
});
/*
初始化用户信息表界面
*/
function initUser(from){
	if(!from) from = 0;
	var users = document.getElementById("show_user"),
		user = document.getElementById("userInfo"),
		voc = document.getElementById("add_vocabulary");
	users.style.marginLeft = user.offsetWidth + user.offsetLeft * 4 + "px";
	users.style.marginTop = user.offsetTop - user.offsetHeight * 2 - voc.offsetHeight * 1.59 + "px";
	thread_item=["序号","用户名","手机","QQ","邮箱","操作"];
	thread_width=["10%","12%","15%","20%","20%","23%"];
	$.ajax({
				type:"POST",
				url:"/admin/getUserList",
				dataType:"json",
				data:{
					from:from,
					action:"userList",
				},
				success:function(data){
				if(data.success){
					createTableThread(users,null,data.text,thread_item,thread_width,null,null,3,from);
					ul = document.createElement("ul");
						users.appendChild(ul);
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
									url:"/admin/getUserNum",
									dataType:"json",
									data:{
										action:"getUserNum"
										},
									success:function(data){
								if(data.success){
									if(from < data.num){
										deleteButton(users,ul);
										deleteUserTable();
										initUser(from);
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
								deleteButton(users,ul);
								deleteUserTable();
								initUser(from);
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
function deleteUserTable(){
	var users = document.getElementById("show_user"),
		table = document.getElementById("null1"),
		tbody = table.getElementsByTagName("tbody")[0];
		tr = table.getElementsByTagName("tr");
	var th,button;
	for(i=tr.length-1;i>=0;i--){
		th = tr[i].getElementsByTagName("th");
		for(j=th.length-1;j>=0;j--){
			if(j==th.length-1){
				button = th[j].getElementsByTagName("button")[0];
				if(button)
				th[j].removeChild(button);
			}
			tr[i].removeChild(th[j]);
		}
		//console.log(table);
		if(i==0) table.removeChild(tr[i]);
		else tbody.removeChild(tr[i]);
	}
	users.removeChild(table);
}
/*
初始化管理员信息界面
*/
function initAdminInfo(){
	var admin = document.getElementById("adminInfo");
	createSpan(admin,null,"管理员信息");
	initComUseInfo(false,0,0,admin,"getadmininfo",0.55,null,"admin",true);
	var ul = document.createElement("ul");
	admin.appendChild(ul);
	ul.id = "admins";
	var edit = createButton(ul);
	edit.onclick = (function(){
		editUser("admininfo","/user/editUserinfo","修改","admin");
	});
	setButton(edit,"修改");
	var add = createButton(ul);
	add.onclick = (function(){
		editUser("addAdmin","/user/register","创建","admin");
	});
	setButton(add,"创建");
	edit.style.marginLeft = (ul.offsetWidth - 2.45 * edit.offsetWidth) / 2 + "px";
	newline(admin);
	newline(admin);
}
/*
初始化用户信息查询、修改、添加页面
*/
function initUserInfo(){
	var user = document.getElementById("userInfo");
	var label = createFormItem(user,null,"查询用户","请输入用户名",null,null,0.2,null);
	label.style.width = "20%";
	var button = createUniqueButton(user,"search","查询","15%","30px","20px",null,null,null,null,null);
	document.getElementById("查询用户").id = "searchUser";
	button.style.position = "absolute";
	button.style.top = "-5px";
	button.style.left =user.offsetWidth -  button.offsetWidth * 4.2 + "px";
	var input = user.getElementsByTagName("input");
	newline(user);
	button.onclick = function(){
		$.ajax({
				type:"POST",
				url:"/admin/searchUser",
				dataType:"json",
				data:{
					name:$("#searchUser").val(),
					action:"searchUser",
				},
				success:function(data){
				if(data.success){
					input[1].value = data.name;
					input[2].value = data.password;
					input[3].value = data.email;
					input[4].value = data.QQ;
					input[5].value = data.phone;
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

	initComUseInfo(false,1,0,document.getElementById("userInfo"),"userinfo",0.55,null,"user",false);
	var ul = document.createElement("ul");
	user.appendChild(ul);
	ul.id = "actions";
	var edit = createButton(ul);
	edit.onclick = (function(){
		editUser("userinfo","/user/editUserinfo","修改","user");
	});
	setButton(edit,"修改");
	var add = createButton(document.getElementById("actions"));
	add.onclick = (function(){
		editUser("addUser","/user/register","创建","user");
	});
	setButton(add,"创建");
	//console.log(add.offsetLeft);
	edit.style.marginLeft = (ul.offsetWidth - 2.45 * edit.offsetWidth) / 2 + "px";
	newline(user);
	newline(user);
}