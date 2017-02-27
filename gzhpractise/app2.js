'use strict'

var Koa = require('koa');
var sha1 = require('sha1');
var config = {
	wechat:{
		appID:'wxff6eea4a7dc3ee87',
		appSecret:'04130f9e2d1cc9c4f74e2473504db1ed',
		token:''
	}
}

var app = new Koa()

app.use(function *(next){
	console.log(this.query)
})
app.listen(3000)
console.log('Listening:')