var path = require("path");
console.log("normalization : " + path.normalize('/test/test1/2slashes/lslash/tab/..'));
console.log("joint path : " + path.join('/test','2slashes/lslash','tab','..'));
console.log("resolve : " + path.resolve('test.js'));
console.log("isAbsolute : " + path.isAbsolute("E:/nodeProject"));
console.log("relative : " + path.relative("/test/test1/2slashes/lslash/tab/.."));
//console.log("basename : " + path.basename("/test/test1/2slashes/lslash/tab/.."));
//console.log("ext name : " + path.extname('test.js'));
var parse = path.parse('/test/test1/2slashes/lslash/tab/..');
console.log("parse : " + parse);
console.log("format : " + path.format(parse));
/*console.log("dirname : " + path.dirname("/test/test1/2slashes/lslash/tab/"));*/