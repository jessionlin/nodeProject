'use strict'
var koa = require('koa');
var views = require('koa-views');
var app =new koa();
var convert = require('koa-convert');
var Router = require('koa-router');
var router = new Router();
var staticCache = require('koa-static-cache');
var path = require("path");
var config = require("./config")(__dirname);

app.use(views(__dirname + '/html',{
	extension:'html'
}));
app.use(convert(staticCache(path.join(config.root, ''), {
    maxAge: 365 * 24 * 60 * 60
})));

require("./config/routes")(router);

var bodyParser = require('koa-bodyparser');
app.keys = ['jession vocabulary'];
var session = require('koa-session');
app.use(convert(session(app)));
app.use(convert(bodyParser()));

app
  .use(convert(router.routes()))
  .use(convert(router.allowedMethods()));

app.listen(3000);
console.log('Listening 3000:');