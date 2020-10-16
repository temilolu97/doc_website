const express = require('express')
const router = express.Router()
const {Article} = require('../models/index')
const upload = require('../middleware/upload')

router.get('/',async(req,res)=>{
    const articles = await Article.findAll();
    if(articles.length===0){
        res.json({message:"No articles"})
    }
    return res.json({articles})
})
router.post('/',upload.single('image'),async(req,res)=>{
    const {title,articleLink} = req.body
    const imageUrl = `${req.file.destination}/${req.file.filename}`
    await Article.create({title,articleLink,imageUrl}).then(response=>{
        res.json({message:"New article added"})
    })
})
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    const article = await Article.findByPk(id)
    if(article){
        return res.status(200).json({data:article})
    }
    else{
        res.status(404).json({message:"Not found"})
    }
})
module.exports= router