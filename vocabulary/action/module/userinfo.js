'use strict'
/*
ifmanager��ʾ�ж��û��Ƿ�Ϊ����Ա����������
*/

module.exports = function(sequelize,Sequelize){
	var User = sequelize.define('userinfo',{
				id:{
					type: Sequelize.FLOAT,
					primaryKey: true
				},
				name:{
					type:Sequelize.STRING
				} ,
				password :{
					type: Sequelize.STRING
				},
				email :{
					type: Sequelize.STRING
				} ,
				phone :{
					type: Sequelize.STRING
				},
				qq :{
					type: Sequelize.STRING
				},
				ifmanager:{
					type: Sequelize.BOOLEAN
				}
			});
	return User;
}
