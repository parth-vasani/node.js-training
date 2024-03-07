const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");
const { User } = require("../db/models/users.model");

async function authenticateUser(req,res,next){
    console.log(req.headers.authorization)
    // if(!req.headers || !req.headers.authorization || req.headers?.authorization?.split(' ')[0]!=="Bearer"){
    //     next({message:"Token required."});
    // }

    // if(!req.headers?.authorization?.split(' ')[0]){
    //     next({message:"TOKEN required."})
    // }

    const token=req.headers?.authorization?.split(' ')[1];
    if(!token){
        next({message:"Token required."})
    }

    try{
        const {userId}=await jwt.verify(token,jwtSecret);
        // console.log("PPP",payload)

        let user=await User.findOne({_id:userId}).select({_id:1,username:1,email:1,role:1});
        req.user=user;

        console.log("IN MID",user)

        next();
    }
    catch(err){
        next(err);
    }

}

module.exports={authenticateUser};