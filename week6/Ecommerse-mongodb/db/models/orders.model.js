const { default: mongoose, mongo } = require("mongoose");
const {productSchema} = require('./products.model.js')

const orderSchema = mongoose.Schema({
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[{
        _id:false,
        product:productSchema,
        count:{
            type:Number,
            required:true,
        }
    
    }],
    total_amount:{
        type:Number,
        required:true,
    }
},{timestamps:true})

const Order=mongoose.model('Order',orderSchema);

module.exports={Order};