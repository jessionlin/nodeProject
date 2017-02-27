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
exports.getUserinfo = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	if(this.session.username)
	var name = this.session.username;
	else{
		this.body = {'success':'true','url':'/','msg':'用户未登录'};
	}
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findOne({
		where:{
			name:name
		}
	});
	result = result.dataValues;
	this.body = {'success':'true','name':result.name,'password':result.password,'email':result.email,'QQ':result.qq,'phone':result.phone};
}

exports.editUserinfo = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var name = body.name;
	var password = body.password;
	var email = body.email;
	var QQ = body.QQ;
	var phone = body.phone;
	var User = sequelize.import('./module/userinfo');
	yield User.update({
			password:password,
			email:email,
			qq:QQ,
			phone:phone
		},{
		where:{
			name:name
		}
	});
	
	this.body = {'success':'true','msg':'修改成功'}
}

exports.checkVoc = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var chinese = body.chinese;
	var Voc = sequelize.import('./module/vocabulary');
	var result = yield Voc.findOne({
		where:{
			chinese:chinese
		}
	})
	result = result.dataValues;
	this.body = {'success':'true','english':result.english}
}

exports.getVocNum = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var Voc = sequelize.import('./module/vocabulary');
	var result = yield Voc.findAndCountAll({
		where:{}
	});
	this.body = {'success':'true','num':result.count}
}
exports.getRecordNum = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var list = sequelize.import('./module/testlist');
	var result = yield list.findAndCountAll({
		where:{}
	});
	this.body = {'success':'true','num':result.count}
}

exports.startTest = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var from = parseInt(body.from);
	var num = parseInt(body.num);
	var Voc = sequelize.import('./module/vocabulary');
	var result = yield Voc.findAll({
		where:{},
		offset:from,
		limit:num
	})
	var rows = new Array();
	var text = '';
	for(let item of result)
		rows.push(item.dataValues.chinese +',' + item.dataValues.cixing);
	
	if(rows.length < num){
		result = yield Voc.findAll({
			offset:0,
			limit:num - rows.length
		});
		for(let item of result)
			rows.push(item.dataValues.chinese +',' + item.dataValues.cixing);
	}
	for(let item of rows)
		text += item + ';';
	this.body = {'success':'true','text':text};
}

exports.addRecord = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var num = body.number;
	var right = body.right;
	var rightrate = ((right/num) * 100).toFixed(0) + "%";
	var username = this.session.username;
	var list = sequelize.import('./module/testlist');
	yield list.create({
		total:num,
		rightrate:rightrate,
		username:username,
		date:(new Date()).toLocaleString()
	});
	this.body = {'success':'true','msg':'添加成功'};
}

exports.getRecord = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var from = parseInt(body.from);
	var list = sequelize.import('./module/testlist');
	var result = yield list.findAll({
		where:{
			username:this.session.username
		},
		offset:from,
		order: [
			['id','desc']
		]
	});
	var rows = new Array();
	var text = '';
	for(let item of result)
		rows.push(item.dataValues.rightrate +',' + item.dataValues.total + ',' + item.dataValues.date);
	for(let item of rows)
		text += item + ';';
	this.body = {'success':'true','text':text};
}