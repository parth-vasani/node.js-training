
const sendResponse=(res,statusCode,status,operation,data)=>{
    return res.status(statusCode).json({status,operation,data:data});
}

module.exports={sendResponse}