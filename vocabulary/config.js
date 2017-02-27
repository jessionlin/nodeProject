'use strict';

var path = require('path');

module.exports = function(root) {
    return {
		css:path.join(root,'css'),
		js:path.join(root,'js'),
		html:path.join(root,'html'),
		image:path.join(root,'image'),
		php:path.join(root,''),
        root: root,
		mysql_config:{
			host:'localhost',
			user:'root',
			password:'root',
			database:'vocabulary',
			dialect:'mysql'
		}
    }
}
