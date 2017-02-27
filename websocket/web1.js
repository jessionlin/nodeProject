var http = require("http");
var socket = require("socket.io");
var crypto = require("crypto");
var webSocket = function(url){
	this.options = parseUrl(url);
	this.connect();
};

webSocket.prototype.onopen = function(){
	console.log("hello world");
};



webSocket.prototype.setSocket = function(socket){
	this.socket = socket;
};

webSocket.prototype.connect = function(){
	var that = this;
	var key = new Buffer(this.options.protocolVersion + '-' + Data.now()).toString('base64');
	var shasum = crypto.createHash('sha1');
	var expected = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
	var options = {
		port:this.options.port,
		host:this.options.hostname,
		headers:{
			'Connection':'Upgrade',
			'Upgrade':'websocket',
			'Sec-WebSocket-Version':this.options.protocolVersion,
			'Sec-WebSocket-Key':key
		}
	};
	var req = http.request(options);
	req.end();
	
	req.on('upgrade',function(res,socket,upgradeHead){
		that.setSocket(socket);
		that.onopen();
	});
};

webSocket.prototype.onmessage = ('data',function(data){
	console.log(data);
});