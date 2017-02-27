'use strict';
var Login = require("../action/login");
var User = require("../action/user");
var Common = require("../action/common");
var Admin = require("../action/admin");

module.exports = function(router) {
	
	//初始页
	
	router.get("/",Login.signin);
	router.get("/admin",Login.admin);
	router.get("/user",Login.user);
	
	//登录注册
	router.post("/user/login",Login.checkUser);//用户登录
	router.post("/user/register",Login.register);//用户注册
	
	//普通用户页面
	
	
	router.post("/user/getUserinfo",User.getUserinfo);//获取用户信息
	router.post("/user/editUserinfo",User.editUserinfo);//修改用户信息
	router.post("/user/checkVoc",User.checkVoc);//评判单词
	router.post("/user/getVocNum",User.getVocNum);//获取单词总数
	router.post("/user/startTest",User.startTest);//开始测试
	router.post("/user/addRecord",User.addRecord);//添加测试记录
	router.post("/user/getRecord",User.getRecord);//获取测试记录
	router.post("/user/getRecordNum",User.getRecordNum);//获取测试记录总数
	
	
	//管理员页面
	router.post("/admin/delUser",Admin.delUser);//删除用户
	router.post("/admin/getUserList",Admin.getUserList);//获取用户列表
	router.post("/admin/getUserNum",Admin.getUserNum);//获取用户总数
	router.post("/admin/searchUser",Admin.searchUser);//查询用户
	
	//共用操作
	router.post("/addVoc",Common.addVoc);//添加单词
	router.post("/getSession",Common.getSession);//获取session，以识别当前使用者
	
}