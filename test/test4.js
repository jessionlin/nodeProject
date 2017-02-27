//create a buffer
var buffer = new Buffer(26);
console.log("buffer length: " + buffer.length);

//write to buffer
var data = "YiiBai.com";
buffer.write(data);
console.log(data + ":" + data.length + " characters, " + Buffer.byteLength(data, 'utf8') + " bytes");

//slicing a buffer
var buffer1 = buffer.slice(0,14);
console.log("buffer1 length: " + buffer1.length);
console.log("buffer1 content: " + buffer1.toString());

//modify buffer by indexes
for(var i = 0; i < 26 ; i++){
	buffer[i] = i + 97;//97 is ASCII a
}
console.log("buffer content: " + buffer.toString('ascii'));

var buffer2 = new Buffer(4);

buffer2[0] = 0x3;
buffer2[1] = 0x4;
buffer2[2] = 0x23;
buffer2[3] = 0x42;

//rending from buffer
console.log(buffer2.readUInt16BE(0));
console.log(buffer2.readUInt16LE(0));
console.log(buffer2.readUInt16BE(1));
console.log(buffer2.readUInt16LE(1));
console.log(buffer2.readUInt16BE(2));
console.log(buffer2.readUInt16LE(2));

var buffer3  = new Buffer(4);
buffer3.writeUInt16LE(0xdead,0);
buffer3.writeUInt16LE(0xbeef,2);

console.log(buffer3);
//convert to a JSON object
var json = buffer3.toJSON();
console.log("JSON Representation : ");
console.log(json);

//Get a buffer from JSON Object
var buffer6 = new Buffer(json);
console.log(buffer6);

//copy a buffer
var buffer4 = new Buffer(26);
buffer.copy(buffer4);
console.log("buffer4 content: " + buffer4.toString());

//concatenate a buffer
var buffer5 = Buffer.concat([buffer,buffer4]);
console.log("buffer5 content: " + buffer5.toString());