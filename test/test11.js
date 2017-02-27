var util = require("util");

process.stdout.write("Hello World!" + "\n");

process.argv.forEach(function(val,index,array){
	console.log(index + ':' + val);
});

console.log(process.execPath);

console.log('Current directory:' + process.cwd());

console.log('Current version:' + process.version);

console.log(util.inspect(process.memoryUsage()));