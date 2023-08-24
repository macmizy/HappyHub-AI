const userModel = require('../models/user.model');



const signup = (req,res)=>{
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
}

const login = (req, res) => {
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

const getAllUsers = async(req,res)=>{
    try{
        const allusers = await userModel.find({}).select("-password")
        return res.status(200).send(allusers)
    }catch(err){
        console.log(err)
        return res.status(400).send({
            status: "false",
            message: "Users not found"
        })
    }
}

module.exports = {
    signup,login,getAllUsers

}
