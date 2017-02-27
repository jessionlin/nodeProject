'use strict'
/*
ifmanager表示判断用户是否为管理员，布尔类型
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
