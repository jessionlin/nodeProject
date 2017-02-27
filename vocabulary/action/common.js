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

exports.addVoc = function *(next){
	this.response.status = 200;
	var body = this.request.body;
	var chinese = body.chinese;
	var english = body.english;
	var cixing = body.cixing;
	var Voc = sequelize.import('./module/vocabulary');
	yield Voc.create({
		chinese:chinese,
		english:english,
		cixing:cixing
	}).then(function(result){
        console.log('inserted  ok');
	}).catch(function(err){
        throw err;
	});
	
	this.body = {'success':'true','msg':'添加成功'};
}

exports.getSession = function *(next){
	this.response.status = 200;
	if(this.session.username)
		this.body = {'success':'true','session':this.session.username};
}
