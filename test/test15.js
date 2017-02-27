var dns = require('dns');
dns.lookup('www.yiibai.com',function onLookup(err,address,family){
	console.log('address:', address);
	dns.reverse(address,function(err,hostnames){
		if(err){
			console.log(err.stack);
		}
		console.log('reverse for ' + address + ':' + JSON.stringify(hostnames));
	});
});