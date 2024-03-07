const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");
const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");

async function registerUser(req,res,next){
    let { username, email, password, role } = req.body;

  if (!username || !email || !password || !role)
    next({message:"Missing some information."})

    try{
        let userExist=(await User.find({email})).length>0;
        if(userExist)
            throw new Error("Email already used.")

        let result=await User.create({username,email,password,role});

        const payload={userId:result.id,email:result.email};
        sendResponse(res,200,200,'User registerd',{access_token:jwt.sign(payload,jwtSecret,{expiresIn:'1h'})})
    }
    catch(err){
        next(err);
    }
}

async function loginUser(req,res,next){
    let {email,password} = req.body;
    if(!email || !password){
        next({message:"Missing some information."});
    }

    try{
        let user=await User.findOne({email});
        if(!user){
            throw new Error("User not found.");
        }

        console.log("UU",user,user['email'])
        if((user.password)!==password){
            throw new Error("Password does not match.");
        }

        const payload={userId:user.id,email:email};

        sendResponse(res,200,200,'User login',{access_token:jwt.sign(payload,jwtSecret,{expiresIn:'1h'})})


    }
    catch(err){
        next(err);
    }
}

module.exports={registerUser,loginUser};