'use strict'
/*
date:����ʱ�䣬��ʾΪ�磺2017-02-22 19:32:22
total:���Ե�������
right:���Ե�����ȷ��Ŀ
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
