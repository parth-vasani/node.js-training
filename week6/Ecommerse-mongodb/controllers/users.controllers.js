const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");

async function getAllUsers(req, res,next) {
  try {
    let data = await User.find();

    sendResponse(res,200,200,'User details',data);

  } catch (err) {
    next(err)
  }
}

async function getAUser(req, res,next) {
  const { email } = req.params;
  try {
    let data = await User.find({ email: email });

    if (data.length === 0) {
        throw new Error("User not found.");
    }

    sendResponse(res,200,200,'User details',data);

  } catch (err) {
    next(err);
  }
}

async function addUsers(req, res,next) {
  let { username, email, password, role } = req.body;

  if (!username || !email || !password || !role)
    throw new Error("Missing some data.");

  try {
    let result = await User.create({ username, email, password, role });
    // console.log(result);

    sendResponse(res,201,201,'User created.',{});

  } 
  catch (err) {
    next(err);
  }
}

async function updateUsers(req, res,next) {
  const { email } = req.params;

  let dataToUpdate = {};
  for (key of ["username", "email", "roles"]) {
    if (req.body[key]) dataToUpdate[key] = req.body[key];
  }

  try {
    let {matchedCount,updatedCount} = await User.updateOne({email},{...dataToUpdate});
    // console.log(result);

    if(matchedCount===0){
        throw new Error("User does not exist.")
    }

    sendResponse(res,200,200,'User details updated.',{});

  } catch (err) {
    next(err);
  }

}

async function deleteUsers(req,res,next){
    const {email} = req.params;

    try{
        const {deletedCount} = await User.deleteOne({email});
        // console.log(result)

        if(deletedCount===0){
            throw new Error("User does not exist.")
        }

        sendResponse(res,200,200,'User deleted.',{});

    }
    catch(err){
        next(err)
    }
}

module.exports={getAllUsers,getAUser,addUsers,updateUsers,deleteUsers};
