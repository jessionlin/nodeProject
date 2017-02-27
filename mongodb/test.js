'use strict'

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/node');
if(!db){
	console.log('连接错误');
}

var mongooseSchema = new mongoose.Schema({
	username:{type:String,default:'匿名用户'},
	title:{type:String},
	content:{type:String},
	time:{type:Date,default: Date.now},
	age:{type:Number}
});

mongooseSchema.methods.findbyusername = function(username,callback){
	return this.model('mongoose').find({username:username},callback);
}

mongooseSchema.statics.findbytitle = function(title,callback){
	return this.model('mongoose').find({title:title},callback);
}

var mongooseModel = db.model('mongoose',mongooseSchema);

var doc = {username:'jack',title:'json',content:'jack is write json'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('save ok!');
	}
	db.close();
});

/*doc = {username:'jession',title:'session',content:'jession is playing with session'};
mongooseModel.create(doc,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('update ok!');
	}
	db.close();
});*/

//mongooseModel.update(conditions,update,options,callback){
/*var conditions = {username:'jession'};
var update = {$set : {age:27,title:'hold'}};
var options = {upsert:true};
mongooseModel.update(conditions,update,options,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('update ok!');
	}
	db.close();
});
*/
var mongooseEntity = new mongooseModel({});
mongooseEntity.findbyusername('jack',function(err,result){
	if(err){
		console.log(err);
	}else{
		console.log(result);
	}
	db.close();
});

/*mongooseModel.findbytitle('json',function(err,result){
	if(err){
		console.log(err);
	}else{
		console.log(result);
	}
	db.close();
});
*/
/*var criteria = {title:'session'};
var fields = {title:1,content:1,time:1};
var options = {};
mongooseModel.find(criteria,fields,options,function(err,result ){
	if(err){
		console.log(err);
	}else{
		console.log(result);
	}
	db.close();
});
*/
/*var conditions = {username:'json'};
mongooseModel.remove(conditions,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('delete ok!');
	}
	db.close();
});*/
