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

exports.delUser = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var name = body.name;
	var User = sequelize.import('./module/userinfo');
	yield User.destroy({
		where:{
			name:name
		}
	}).then(function(result){
        console.log('destroy user');
        console.log(result);
	});
	
	this.body = {'success':'true','msg':'É¾³ý³É¹¦'};
}

exports.searchUser = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var name = body.name;
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findOne({
		where:{
			name:name
		}
	});
	result = result.dataValues;
	this.body = {'success':'true','name':result.name,'password':result.password,'email':result.email,'QQ':result.qq,'phone':result.phone};
}

exports.getUserList = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findAll({
		where:{
			$or: [{ifmanager: 0}, {ifmanager: null}]
		}
	});

	var rows = new Array();
	var text = '';
	for(let item of result)
		rows.push(item.dataValues.name +',' + item.dataValues.phone + ',' + item.dataValues.qq + ',' + item.dataValues.email);
	for(let item of rows)
		text += item + ';';
	this.body = {'success':'true','text':text};
}

exports.getUserNum = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var User = sequelize.import('./module/userinfo');
	var result = yield User.findAndCountAll({
		where:{
			$or: [{ifmanager: 0}, {ifmanager: null}]
		}
	});
	this.body = {'success':'true','num':result.count}
}


