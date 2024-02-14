const fs=require('fs');

let users=undefined;

function setUsers(newUsers){
    users=newUsers;
}

function readUserData(req,res,next){
    req.setUsers=(data)=>{
        setUsers(data);
    };
    
    if(users){
        req.users=users;
        next();
    }

    fs.readFile(__dirname+'/users.json',(err,data)=>{
        if(err){
            next(err);
        }

        users=JSON.parse(data);
        req.users=users;
        next();
    })
};

function handleAllErrors(err,req,res,next){
    res.status(err.status||500).json({message:err.message||""})
}

module.exports={readUserData,handleAllErrors};