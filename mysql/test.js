'use strict'

var orm = require("orm");
var dbUrl = "mysql://root:root@localhost/vocabulary";
var result;
orm.connect(dbUrl,function(err,db){
	if(err) throw err;
	var Userinfo = db.define("userinfo",{
		id:Number,
		name :String ,
		password :String ,
		email :String ,
		phone :String,
		qq :String
	});
	
	db.sync(function(err){
		if(err) throw err;
		var result;
		Userinfo.find({name:'jession'},function(err,user){
				if(err) throw err;
				console.log(user.length);
				console.log("First user:%s,password:%s",user[0].name,user[0].password);
				result = user[0].password;
		});
	});
});

console.log(result);

