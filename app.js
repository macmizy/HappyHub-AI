const express = require("express")
const passport = require('passport')
const session = require('express-session')
const userRoute = require('./routes/user.route')
const communityRoute = require('./routes/community.route')
require('./db.js').connectToMongoDB()
require("./authentication/auth")
require("./authentication/google")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });


app.get('/', (req, res)=>{
    try{
        res.status(200).send({message:"home page"})
    }catch(error){
        console.log(error)
        res.status(400).send({message:"error loading home page"})
    }
  });

app.use('/user', userRoute);
app.use('/community', communityRoute)


PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})