const { response } = require('express')

const SignUp = require('../models/signUp')

exports.addUser = async (req, res) =>{
    let userData= new SignUp(req.body)
    let result=await userData.save();
    result=result.toObject();
    delete result.password;
    res.send(result);
}

exports.loginUser=  async (req,res)=>{

    if(req.body.email && req.body.password){
        let User=await SignUp.findOne(req.body).select("-password")

        if(User)
            res.send(User)
        else 
            res.send({result:"no user found"})
    }
    else  
        res.send({result:"no user found"})
   
}