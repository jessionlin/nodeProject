var fs = require("fs");
var buffer = new Buffer(1024);

//Example: Opening File
function openFile(){
	console.log("\nOpen file");
	fs.open('test.txt','r+',function(err,fd) {
		if(err) console.log(err.stack);
		console.log("File opened");
	});
}

//Example:Getting File Info
function getStats(){
	console.log("\nGetting File Info");
	fs.stat('test.txt',function(err,stats){
		if(err) console.log(err.stack);
		console.log(stats);
		console.log("isFile ? " + stats.isFile());
		console.log("isDirectory ? " + stats.isDirectory());	
	});
}
//Example:Writing File
function writeFile(){
	console.log("\nWrite file");
	fs.open('test.txt','w+',function(err,fd){
		var data = "Yiibai.com";
			buffer.write(data);
			
			fs.write(fd,buffer,0,data.length,0,function(err,bytes){
				if(err) console.log(err.stack);
				console.log(bytes + " written!");
			});
	});
}

//Example:Read File
function readFile(){
	console.log("\nRead File");
	fs.open('test1.txt','r+',function(err,fd){
		if(err) console.log(err.stack);
		fs.read(fd,buffer,0,buffer.length,0,function(err,bytes){
			if(err) console.log(err.stack);
			console.log(bytes + " read!");
			if(bytes>0){
				console.log(buffer.slice(0,bytes).toString());
			}
		});
	});
}

function closeFile(){
	console.log("\nClose file");
	fs.open('test.txt','r+',function(err,fd){
		if(err) console.log(err.stack);
		fs.close(fd,function(){
			if(err) console.log(err.stack);
			console.log("File closed!");
		});
	});
}

function deleteFile(){
	console.log("\nDelete file");
	fs.open('test1.txt','r+',function(err,fd){
		fs.unlink('test.txt',function(err){
			if(err) console.log(err.stack);
			console.log("File deleted!");
		});
	});
}

function truncateFile(){
	console.log("\nTruncate file");
	fs.open('test.txt','r+',function(err,fd){
		fs.ftruncate(fd,function(err){
			if(err) console.log(err.stack);
			console.log("File truncated!");
		});
	});
}

function createDirectory(){
	console.log("\nCreate Directory");
	fs.mkdir('test',function(err){
		if(!err){
			console.log("Directory created!");
		}
		if(err && err.code == "EEXIST"){
			console.log("Directory exists!");
		}
		else if(err){
			console.log(err.stack);
		}
	});
}

function removeDirectory(){
	console.log("\nRemove Directory!");
	fs.rmdir('test',function(err){
		if(!err) console.log("Directory removed!");
		else console.log("Directory do not exist!");
	});
}

function watchFile(){
	fs.watch('test.txt',function(event,filename){
		console.log("event is " + event);
	});
}

//Opening file
openFile();

//Writing file
writeFile();

//Reading File
readFile();

//Closing Files
closeFile();

//Getting file information
getStats();
   
//Deleting Files
deleteFile();
   
//Truncating Files
truncateFile();
   
//Creating Directories
createDirectory();

//Removing Directories
removeDirectory();
   
//Watching File Changes
watchFile();