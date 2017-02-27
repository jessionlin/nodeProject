'use strict'

module.exports = function(sequelize,Sequelize){
	return sequelize.define('vocabulary',{
		id:{
			type: Sequelize.FLOAT,
			primaryKey: true
		},
		chinese:{
			type: Sequelize.STRING
		},
		english:{
			type: Sequelize.STRING
		},
		cixing:{
			type: Sequelize.STRING
		}
	});
}
