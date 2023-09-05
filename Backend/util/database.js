const Sequelize = require('sequelize');

const sequelize =  new Sequelize('ExpenseApp','root','maazdanish',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;