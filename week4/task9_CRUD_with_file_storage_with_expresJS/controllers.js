const fs=require('fs')

function writeUserDataToFile(data){
    fs.writeFile(__dirname+'/users.json',JSON.stringify(data),(err)=>{
        if(err)
            throw err;

    })
}


const getAllUsers=(req,res)=>{
    res.json(req.users);
}

const getAUser=(req,res)=>{
    let usersFound=req.users.filter((user)=>user.id==req.params.id);

    if(usersFound.length===0){
        throw new Error("User not found.")
    }

    res.status(200).json(usersFound);
}

const addUsers=(req,res)=>{
    console.log(req.setUsers)
    const id=Date.now().toString();

    let {name,age}=req.body;
    if(!name || !age){
        throw new Error("Missing some attributes for user data.")
    }
    
    req.users.push({id,name,age});
    req.setUsers(req.users);

    writeUserDataToFile(req.users);

    res.status(200).json({message:"User added."});


}

const updateUsers=(req,res)=>{
    const id=req.params.id;
    let {name:newName,age:newAge}=req.body;

    let updatedUser=req.users.filter((user)=>user.id===id);
    if(updatedUser.length===0){
        throw new Error("User not found.");
    }

    if(newName){
        updatedUser[0].name=newName;
    }
    if(newAge){
        updatedUser[0].age=newAge;
    }

    req.setUsers(req.users);
    writeUserDataToFile(req.users)

    res.status(200).json({message:"User updated."})
}

const deleteUsers=(req,res)=>{
    const id=req.params.id;

    let updatedUsers=req.users.filter((user)=>user.id!==id);
    if(updatedUsers.length===req.users.length){
        throw new Error("User not found.");
    }

    req.users=updatedUsers;
    req.setUsers(req.users);

    writeUserDataToFile(req.users)
    
    res.status(200).json({message:"User deleted."});
}


module.exports={getAllUsers,getAUser,addUsers,updateUsers,deleteUsers};