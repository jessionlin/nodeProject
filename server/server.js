var net = require("net");
var server = net.createServer(function(connection){
	console.log('client connected');
	connection.on('end',function(){
		console.log("client disconnected");
	});
	connection.write('Welcome to Yiibai Yiibai!\r\n');
	connection.pipe(connection);
});
server.listen(8080,function(){
	console.log("server is listening");
});