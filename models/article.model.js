const {Sequelize} = require('sequelize')

module.exports=(sequelize,Sequelize)=>{
    const Article = sequelize.define('Article',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    articleLink:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
    return Article;
}
