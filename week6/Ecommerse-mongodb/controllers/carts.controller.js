const { promiseImpl } = require("ejs");
const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");

async function getCartDetails(req, res, next) {
  try {
    let data = await User.findOne({ _id: req.user.id })
      .select({ cart: 1 })
      .populate("cart.product");

    sendResponse(res,200,200,'Cart details',data);

  } catch (err) {
    next(err);
  }
}

async function addToCart(req, res, next) {
  const product_id = req.params.id;
  try {
    // let user=await User.findOne({_id:req.user.id});
    // user.cart.push(product_id);
    // await user.save();

    // let result=await User.updateOne({_id:req.user.id},{$push:{cart:{product:product_id}}});

    let result = await User.updateOne(
      { _id: req.user.id, "cart.product": product_id },
      { $inc: { "cart.$.count": 1 } }
      //   { upsert: true, new: true, setDefaultsOnInsert:true,}
    );


    if (!result.modifiedCount) {
      result = await User.updateOne(
        { _id: req.user.id },
        { $push: { cart: { product: product_id } } }
      );
    }

    sendResponse(res,200,200,'Product added to the cart',{});

  } catch (err) {
    next(err);
  }
}

async function removeFromCart(req, res, next) {
  const product_id = req.params.id;
  try {
    // let result = await User.updateOne(
    //   { _id: req.user.id },
    //   { $pull: { cart: product_id } }
    // );

    // let result = await User.updateOne(
    //   { _id: req.user.id, "cart.product": product_id },
    //   { $inc: { "cart.$.count": -1 } }
    //   //   { upsert: true, new: true, setDefaultsOnInsert:true,}
    // );

    let {matchedCount} = await User.updateOne(
      { _id: req.user.id, "cart.product": product_id,'cart.count':{$gt:1} },
      {
        $inc:{
          'cart.$.count':-1,
        }
      }
    );

    let result="T"
    if(matchedCount===0){
      result = await User.updateOne({_id:req.user.id,'cart.product':product_id},{
        $pull:{
          cart:{
            'product':product_id,
          },
        }
      })
    }



    console.log(result)

    sendResponse(res,200,200,'Product removed from the cart.',{});

  } catch (err) {
    next(err);
  }
}

module.exports = { getCartDetails, addToCart, removeFromCart };
