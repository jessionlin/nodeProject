/*
登录注册页面
*/
$(document).ready(function(){
	var image = document.getElementById("login_img"),
		img = document.getElementById("main_img"),
		win = document.getElementById("login_win"),
		main = document.getElementById("main"),
		width = img.offsetWidth,
		height = image.offsetHeight,
		left = image.offsetLeft;
	img.style.width = image.offsetWidth;
	img.style.height = image.offsetHeight;
	win.style.left = width + left * 4 + "px";
	createAllButton();
	userLogin(win);
});
/*登录注册页面模板调用*/
function loginAndRegister(win,name,text,input_name,input_text,scale,type){
	if(!scale) scale=0.20;
	var win = document.getElementById("login_win");
	var label = createFormItem(win,null,name,text,true,scale);
	newline(win);
	createFormItem(win,label,input_name,input_text,false,scale,null,type);
}	
/*用户登录页面*/
function userLogin(win){
	loginAndRegister(win,"用户名","请输入用户名","密码","请输入密码",0.2,"password");
	var button = document.getElementById("userLogin"),
		user = document.getElementById("用户名"),
		password = document.getElementById("密码");
		user.id = "user";
		password.id = "password";
	button.style.backgroundColor = "red";
}
/*用户注册页面*/
function register(win){
	loginAndRegister(win,"用户名","请输入合法用户名","密码","请输入密码",0.2,"password");
	var button = document.getElementById("register"),
		user = document.getElementById("用户名"),
		password = document.getElementById("密码");
	user.id = "user";
	password.id = "password";
	button.style.backgroundColor = "red";
}
/*管理员登录页面*/
function adminLogins(win){
	loginAndRegister(win,"管理员名","请输入管理员名","密码","请输入密码",0.20,"password");
	var button = document.getElementById("adminLogin")
		user = document.getElementById("管理员名"),
		password = document.getElementById("密码");
	user.id = "user";
	password.id = "password";
	button.style.backgroundColor = "red";
}
/*页面按钮生成页面*/
function createAllButton(){
	var userLogin = createButton(document.getElementById("button")),
		register = createButton(document.getElementById("button"));
		adminLogin = createButton(document.getElementById("button"));
	register.innerHTML = "用户注册";
	register.id = "register";
	register.onclick = function(){
		change(register.style.backgroundColor,register,"index.html");
	}
	userLogin.innerHTML = "用户登录";
	userLogin.id = "userLogin";
	userLogin.onclick = function(){
		change(userLogin.style.backgroundColor,userLogin,"index.html");
	}
	adminLogin.innerHTML = "管理员登录";
	adminLogin.id = "adminLogin";
	adminLogin.onclick = function(){
		change(adminLogin.style.backgroundColor,adminLogin,"admin.html");
	}
}
/*按钮点击事件*/
function change(color,obj,location){
	// if(!location) location = "index.html";
	var button = document.getElementsByTagName("button"),
		win = document.getElementById("login_win"),
		ifcheck = (color == "red")?1:0;
	for(i=0;i<button.length;i++){
		button[i].style.backgroundColor = "gray";
	}
	obj.style.backgroundColor = "red";
	var url,action = {id:'',type:''};
	if(obj.id === 'userLogin' || obj.id === 'adminLogin') url = "/user/login";
	else if(obj.id === 'register'){
		url = "/user/register";
	}
	action.id = obj.id;	
	action.type = 'user';
	if(ifcheck){
		$.ajax({
				type:"POST",
				url:url,
				dataType:"json",
				data:{
					name:$('#user').val(),
					password:$('#password').val(),
					action:action
				},
				success:function(data){
				if(data.success){
					console.log(data.url);
					window.location.href = data.url;
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
	else{
		var flag = remoteFormItem();
		if(flag){
			if(obj.id == "register") register(win);
			else if(obj.id == "userLogin") userLogin(win);
			else if(obj.id == "adminLogin") adminLogins(win);
		}
	}
}