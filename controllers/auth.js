const { validationResult } = require("express-validator")
const { isEmpty } = require("lodash")
const User = require("../models/user")
var jwt = require('jsonwebtoken');
var expressJet = require("express-jwt")

exports.signup=(req,res)=>{

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(404).json({
                    err:"Not Able to User In DB"
                })
            }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })            
    })
}

exports.signin=(req,res)=>{
    const {email,password} = req.body
    
    const errors = validationResult(req)  

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            res.status(400).json({
                error:"User Not Found In DB"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email And Password Are Not Match"
            })
        }
        
        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET)

        //put token in cookie
        res.cookie("token",token,{expire:new Date()+ 9999})

        //sent respose to front end
        const {name,_id,role,email} = user

        return res.json({token,user:{name,_id,role,email}})
    })

}



exports.signout = ((req,res)=>{
    res.clearCookie("token")
    
    res.json({
        Message:"User Signout"
    })
})

exports.isSignedIn = expressJet({
    secret:process.env.SECRET,
    userProperty:"auth"  // userProperty Are User To Response Back User id
})

// custom middleware

exports.isAuthenticate = (req,res,next)=>{
    const checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    
    if(req.profile.role === 0)
{
    return res.status(403).json({
        error:"You Are Not Admin, Access Denied!"
    })
}
    next()
}