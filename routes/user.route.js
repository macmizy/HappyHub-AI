const express = require('express')
const passport = require('passport')
const userModel = require('../models/user.model');
const validateUser = require('../models/user.validator');

const userRoute = express.Router()


userRoute.post("/signup",validateUser,passport.authenticate('signup', { session: false }),(req,res)=>{
    try{
        res.status(200).json({
            message: 'Signup successful',
            user: req.user
        }); 
     }catch(error){
         return res.status(400).json({
             status: "false",
             message: "Signup failed"
         })
     }

})


userRoute.post(
    '/login',
     passport.authenticate('login',
     
    //   { successRedirect: '/',
    //     failureRedirect: '/login',}
    ),
    (req, res) => {
        try {
            res.status(200).json({

                message: 'login successful',
                status: 'true',
                user: req.user
                
            })
            
        } catch(error) {
            console.log(error)
            return res.status(400).json({
                status: "false",
                message: "login failed"
             })
        }
    }
);

userRoute.get('/allusers', async(req,res)=>{
    try{
        const allusers = await userModel.find({})
        return res.status(200).send(allusers)
    }catch(err){
        console.log(err)
        return res.status(400).send({
            status: "false",
            message: "Users not found"
        })
    }
})





module.exports = userRoute