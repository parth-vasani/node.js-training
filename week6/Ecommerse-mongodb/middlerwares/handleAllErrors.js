function handleAllErrors(err,req,res,next){
    res.status(err.status||500).json({status:err.status||500,msg:err.message||'Internal server error'})
}

module.exports={handleAllErrors}