'use strict'

var mysql = require('mysql');
var config = require('./config');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'vocabulary'
});

connection.connect();

connection.query("select * from vocabulary",function(err,rows,fields){
	if(err){
		throw err;
	}
	if(rows){
		rows.forEach(function(row){
			console.log(row.chinese);
		});
	}
});

connection.end();