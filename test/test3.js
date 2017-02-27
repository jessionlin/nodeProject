var events = require('events');
var eventEmitter = new events.EventEmitter();
var lister1 = function lister1(){
	console.log('lister1 executed.');
}

var lister2 = function lister2(){
	console.log('lister2 executed.');
}

eventEmitter.addListener('connection',lister1);
eventEmitter.on('connection',lister2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listener(s) listening to connection event");

eventEmitter.emit('connection');

eventEmitter.removeListener('connection',lister1);
console.log("Lister1 will not listen now.");

eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Lister(s) listening to connection event");

console.log("Program Ended.");