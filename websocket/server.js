/*var http = require("http"),
	server = http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<h1>hello world</h1>');
		res.end();
	});
	
server.listen(80);
console.log('server started');*/

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	users = [];
app.use('/',express.static(__dirname + '/www'));
server.listen(80);

io.on('connection',function(socket){
	//昵称设置
	socket.on('login',function(nickname){
		if(users.indexOf(nickname) > -1){
			socket.emit('nickExisted');
		} else {
			socket.userIndex = users.length;
			socket.nickname = nickname;
			users.push(nickname);
			socket.emit('loginSuccess');
			io.sockets.emit('system',nickname,users.length,'login');
		};
	});
	socket.on('disconnect',function(){
		users.splice(socket.userIndex,1);
		io.sockets.emit('system',socket.nickname,users.length,'logout');
	});
	socket.on('postMsg',function(msg,color){
		socket.broadcast.emit('newMsg',socket.nickname,msg,color);
	});
	socket.on('img',function(imgData){
		socket.broadcast.emit('newImg',socket.nickname,imgData);
	});
});