'use strict'

var config = require("../config")(__dirname).mysql_config;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database,config.user,config.password,{host:config.host,dialect:config.dialect});
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });  
exports.checkUser = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var type = body.action.id;
	var name = body.name;
	var password = body.password;
	if(!type || type !=="userLogin" || type !=="adminLogin") this.body = {'success':'false','msg':'服务器出错'};
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findOne({
		attributes:['password'],
		where:{
			name:name
		}
	});
	var _password = result.dataValues.password;
	if(_password && _password === password){
		if(type == 'userLogin')
			this.body = {'success':'true','url':'/user'};
		else if(type == 'adminLogin')
			this.body = {'success':'true','url':'/admin'};
		this.session.username = name;
	}
	else if(_password && _password !== password){
		this.body = {'success':'false','msg':'账号或密码错误'};
	}
	else{
		this.body = {'success':'false','msg':'用户不存在'};			
	}
}

exports.register = function *(next){
	var that = this;
	this.response.status = 200;
	var body = this.request.body;
	var type = body.action.type;
	var name = body.name;
	var ifmanager;
	var password = body.password;
	if(type === "user") ifmanager = false;
	else if(type === 'admin') ifmanager = true;
	this.body = {'success':'false','msg':'注册失败'};
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findAndCountAll({
		where:{
			ifmanager:type
		}
	});
	if(!result.count){
		yield User.create({
			name: name,
			password: password,
			ifmanager: ifmanager
		}).then(function(result){
			console.log('inserted  ok');
		}).catch(function(err){
			throw err;
		});
		this.session.username = name;
		this.body = {'success':'true','url':'/user'};
	}
	else
	    this.body = {'success':'false','url':'/','msg':'该用户已存在'};
}

exports.signin = function *(next){
	yield this.render('login', {
       title: '登录注册',
    })
}
exports.user = function *(next) {
  yield this.render('index', {
    title: '用户界面'
  })
}
exports.admin = function *(next) {
  yield this.render('admin', {
    title: '管理员界面'
  })
}
