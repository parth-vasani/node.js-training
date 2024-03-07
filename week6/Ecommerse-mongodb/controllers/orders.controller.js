const { default: mongoose } = require("mongoose");
const { Order } = require("../db/models/orders.model");
const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");

async function getAllOrders(req, res, next) {
  try {
    let result = await Order.find({ buyerId: req.user.id });

    sendResponse(res,200,200,'Order details.',result);

  } catch (err) {
    next(err);
  }
}

async function getAOrder(req, res, next) {
  const orderId = req.params.id;
  try {
    let result = await Order.findOne({ _id: orderId });

    sendResponse(res,200,200,'Order details',result);

  } catch (err) {
    next(err);
  }
}

async function placeOrders(req, res, next) {
  try {
    // let {cart:products}=await User.findOne({_id:req.user.id}).select({'cart.product':1,'cart.count':1}).populate('cart.product');

    // let result = await User.findOne({ _id: req.user.id }).populate("cart.product")
    //   .select({
    //     cart: 1,
    //     total: {
    //       $reduce: {
    //         input: "$cart",
    //         initialValue: 0,
    //         in: {

    //             $sum:['$$value',10,'$$this.product.product_price'],
    //         //   $sum: ["$$value", {$multiply:['$$this.product.price','$$this.count']}],
    //         },
    //       },
    //     },
    //   });


    let result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.user.id) } },
      { $project: { _id: 1, cart: 1 } },
      { $unwind: "$cart" },
      {
        $lookup: {
          from: "products",
          localField: "cart.product",
          foreignField: "_id",
          as: "cart.product",
        },
      },
      { $unwind: "$cart.product" },
      {
        $group: {
          _id: "$_id",
          cart: {
            $push: "$cart",
          },
        },
      },
      {
        $project:{'cart':1,'total_amount':{
            '$reduce':{
                input:'$cart',
                initialValue:0,
                in:{
                    $sum:['$$value',{$multiply:['$$this.product.product_price','$$this.count']}]
                }
            }
        }}
      }
    ]);




    if(result.length===0)
        throw new Error("Your cart is empty.");

    const [{cart,total_amount}]=result;
    result=await Order.create({buyerId:req.user.id,products:cart,total_amount});

    result = await User.updateOne({_id:req.user.id},{$set:{cart:[]}});

    sendResponse(res,200,200,'Order placed.',{});

  } catch (err) {
    next(err);
  }
}

async function cancleOrders(req, res, next) {
  const orderId = req.params.id;
  try {
    let result = await Order.deleteOne({ _id: orderId });

    sendResponse(res,200,200,'Order canceled.',{});

  } catch (err) {
    next(err);
  }
}

module.exports = { getAllOrders, getAOrder, placeOrders, cancleOrders };
