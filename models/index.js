const {host, user, password, database} = require('../config/db.config.js')
const {Sequelize} = require('sequelize') 
const ArticleModel = require('./article.model')
const UserModel = require('./user.model')

const sequelize = new Sequelize(database, user, password,{
    host:host,
    dialect:"mysql"
})
const Article = ArticleModel(sequelize,Sequelize)
const User = UserModel(sequelize,Sequelize)
sequelize.sync().then(()=>{
    console.log('Database tables created')
})
module.exports= {Article,User}