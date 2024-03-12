const { promiseImpl } = require("ejs");
const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");
const { Cart } = require("../db/models/carts.model");
const { Op } = require("sequelize");
const { Product } = require("../db/models/products.model");

async function getCartDetails(req, res, next) {
  try {

    let user=await User.findOne({where:{id:req.user.id},attributes:['id']})
    let data=await user.getCartItems({attributes:['id','product_name','product_price','product_desc']});

    sendResponse(res,200,200,'Cart details',data);

  } catch (err) {
    next(err);
  }
}

async function addToCart(req, res, next) {
  const product_id = req.params.id;
  try {

    let [[,incremented]] = await Cart.increment({count:1},{where:{userId:req.user.id,productId:product_id}});
    
    if(!incremented)
      result = await Cart.create({userId:req.user.id,productId:product_id,count:1})


    sendResponse(res,200,200,'Product added to the cart',{});

  } catch (err) {
    next(err);
  }
}

async function removeFromCart(req, res, next) {
  const product_id = req.params.id;
  try {

    let [[,decremented]] = await Cart.increment({count:-1},{where:{userId:req.user.id,productId:product_id,count:{
      [Op.gt]:1
    }}});
    
    if(!decremented)
      result = await Cart.destroy({where:{userId:req.user.id,productId:product_id}})


    sendResponse(res,200,200,'Product removed from the cart.',{});

  } catch (err) {
    next(err);
  }
}

module.exports = { getCartDetails, addToCart, removeFromCart };
