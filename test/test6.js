var fs = require("fs");
var data = '赖勇魁是………………';
//create a writable stream
var writerStream = fs.createWriteStream('test1.txt');

//write the data to stream
//set the encoding to be utf8
writerStream.write(data,'UTF8');

//mark the end of file
writerStream.end();

writerStream.on('finish',function(){
	console.log("Write completed.");
});

writerStream.on('error',function(err){
	console.log(err.stack);
});
console.log("Program Ended");