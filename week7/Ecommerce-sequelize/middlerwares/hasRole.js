const { Product } = require("../db/models/products.model");

function hasRole(role){
    return (req,res,next)=>{

        console.log("INN")
        if(req.user.role!==role){
            next({message:"You don't have access to this route."});
        }

        next();
    }

}

async function isOwner(req,res,next){
    const {id:product_id} = req.params;
    
    try{
        let result=await Product.findByPk(product_id);
        if(!result || result.length===0 || result.sellerId!==req.user.id){
            next({message:"You aren't seller of this product."})
        }

        next();
    }
    catch(err){
        next(err);
    }
}

module.exports={hasRole,isOwner};