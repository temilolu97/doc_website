const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const passport = require('passport')
const passportJWT = require('passport-jwt')
require('dotenv').config()
const Articleroutes= require('./controllers/article.controller')
const UserRoutes= require('./controllers/user.controller')
const {User} = require('./models/index')

const extractJWT = passportJWT.ExtractJwt
let JwtStrategy = passportJWT.Strategy;
let jwtOptions={}
jwtOptions.jwtFromRequest =extractJWT.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const app =express()
app.use(compression())
app.use(helmet())
const strategy = new JwtStrategy(jwtOptions,(jwt_payload,next)=>{
    console.log('payload received', jwt_payload);
    let user = User.findOne({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
})
passport.use(strategy)
app.use(passport.initialize())
const port = 4000 || process.env.PORT
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/article',passport.authenticate('jwt',{session:false}), Articleroutes)
app.use('/user', UserRoutes)
app.get('/',(req,res)=>{
    res.json({status:'success',
        message:'Welcome here'})
})
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})