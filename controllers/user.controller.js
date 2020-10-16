const express = require('express')
const router = express.Router()
const {User} = require('../models/index')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
 const extractJWT = passportJWT.ExtractJwt
// let JwtStrategy = passportJWT.Strategy;
let jwtOptions={}
jwtOptions.jwtFromRequest =extractJWT.fromAuthHeaderAsBearerToken
jwtOptions.secretOrKey = 'wowwow';
// const getUser=async (data)=>{
//     return await User.findAll({
//         where:data
//     })
// }


router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    if(email && password){
        let user = await User.findOne({
            where:{
                email:email
            }
        })
        console.log(user)
        if(!user){
            res.status(401).json({message:'No user found', user})
        }
        else{
            if(user.password == password){
                let payload = {id:user.id}
                let token = jwt.sign(payload,jwtOptions.secretOrKey)
                res.json({message:'OK',token:token})
            }
            else{
                res.status(401).json({message:'Password is incorrect'})
            }
        }
    }
    else{
        res.json({message:'Fields cannot be empty'})
    }
})



module.exports = router