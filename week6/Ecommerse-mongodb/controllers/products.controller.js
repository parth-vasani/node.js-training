const { Product } = require("../db/models/products.model");
const { sendResponse } = require("../utils/sendResponse");

async function getAllProduct(req,res,next){
    const {page,limit}=req.query;

    const offset=((page-1)*limit>0?(page-1)*limit:0) || 0;
    console.log(offset)
    try{
        let data=await Product.find().skip(offset).limit(limit);

        sendResponse(res,200,200,'Product details',data);

    }
    catch(err){
        next(err);
    }

}

async function getAProduct(req,res,next){
    const {id}=req.params;
    try{
        let data=await Product.find({_id:id});
        if(data.length===0){
            throw new Error("Product not found.");
        }

        sendResponse(res,200,200,'Product details',data);

    }
    catch(err){
        next(err);
    }

}

async function addProducts(req,res,next){
    let {product_name,product_price,product_desc}=req.body;
    if(!product_name || !product_price){
        next({message:"Missing some information."});
    }

    if(!product_desc){
        product_desc="";
    }

    try{
        let result=await Product.create({product_name,product_desc,product_price,seller:req.user.id})

        res.status(201).json({msg:"Product added."});
        sendResponse(res,201,201,'Product added.',{});

    }
    catch(err){
        next(err);
    }

}

async function updateProducts(req,res,next){
    const {id} = req.params;

    let dataToUpdate={};
    for(key of ['product_name','product_desc','product_price']){
        if(req.body[key])
            dataToUpdate[key]=req.body[key];

    }

    try{
        let {updatedCount}=await Product.updateOne({_id:id},{...dataToUpdate});

        if(updatedCount===0){
            throw new Error("Product not founc.");
        }

        sendResponse(res,200,200,'Product updated.',{});


    }
    catch(err){
        next(err);
    }

}

async function deleteProducts(req,res,next){
    const {id}=req.params;
    try{
        let {deletedCount} = await Product.deleteOne({_id:id});
        
        if(deletedCount===0){
            throw new Error("Product not found.");
        }

        sendResponse(res,200,200,'Product deleted.',{});

    }
    catch(err){
        next(err);
    }

}

module.exports={getAllProduct,getAProduct,addProducts,updateProducts,deleteProducts};