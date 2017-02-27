var fs = require("fs");
fs.readFile('test.txt',function (err,data){
	if(err) return console.log(err);
	console.log("Asynchronous read: " + data.toString());
});

var data = fs.readFileSync('test.txt');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");