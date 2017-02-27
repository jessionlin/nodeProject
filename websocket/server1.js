var http = require("http");
var socket = require("socket.io");
var crypto = require("crypto");
var wb = require("./web1.js");
var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end("Hello World\n");
});
server.listen(12010);
console.log(wb);
server.on('upgrade',function(req,socket,upgradeHead){
	var head = new Buffer(upgradeHead.length);
	upgradeHead.copy(head);
	var key = req.headers['sec-websocket-key'];
	var shasum = crypto.createHash('sha1');
	key = shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest('base64');
	var headers = [
		'HTTP/1.1 101 Switching Protocols',
		'Upgrade: websocket',
		'Connection:Upgrade',
		'Sec-WebSocket-Accept:' + key,
		'Sec-WebSocket-Protocol:' + protocol
	];
	socket.setNoDelay(true);
	socket.write(headers.concat('','').join('\r\n'));
	console.log(2);
	var websocket = new wb.WebSocket();
	websocket.setSocket(socket);
	websocket.send("hello world");
	
	websocket.prototype.setSocket = function(socket){
		this.socket = socket;
		this.socket.on('data',this.receiver);
		console.log(data);
	};

	websocket.prototype.send = function(data){
		this._send(data);
	};
});
