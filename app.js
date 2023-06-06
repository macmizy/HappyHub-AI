const express = require("express")
const passport = require('passport')
const session = require('express-session')
const userRoute = require('./routes/user.route')
require('./db.js').connectToMongoDB()
require("./authentication/auth")
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



app.get("/",(req,res)=>{
    
    res.send({message: "Welcome "})
})

app.use('/user', userRoute)


PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})