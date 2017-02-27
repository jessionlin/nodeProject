'use strict'
/*
date:测试时间，表示为如：2017-02-22 19:32:22
total:测试单词总数
right:测试单词正确数目
*/

module.exports = function(sequelize,Sequelize){
	return sequelize.define('testlist',{
		id:{
			type: Sequelize.FLOAT,
			primaryKey: true
		},
		username:{
			type: Sequelize.STRING
		},
		date:{
			type: Sequelize.STRING
		},
		total:{
			type:Sequelize.FLOAT
		},
		rightrate:{
			type:Sequelize.STRING
		}
	});
}
