const { default: mongoose } = require("mongoose");
const { User } = require("../db/models/users.model");
const { sendResponse } = require("../utils/sendResponse");
const { Cart } = require("../db/models/carts.model");
const { Order } = require("../db/models/Order.model");
const { OrderProducts } = require("../db/models/OrderProducts.model");
const { sequelize } = require("../db/db");

async function getAllOrders(req, res, next) {
  try {
    let result = await Order.findAll({ where: { userId: req.user.id } });

    sendResponse(res, 200, 200, "Order details.", result);
  } catch (err) {
    next(err);
  }
}

async function getAOrder(req, res, next) {
  const orderId = req.params.id;
  try {
    let result = await Order.findOne({ where: { id: orderId } });
    if (!result) {
      throw new Error("Order not found.");
    }

    result = await result.getProducts();

    let total = 0;
    for (r of result) {
      const x = await r.getSeller({ attributes: ["id", "username", "email"] });

      r.dataValues.seller = x;
      r.dataValues.count = r.dataValues.OrderProducts.count;
      delete r.dataValues.OrderProducts;

      total += r.dataValues.product_price * r.dataValues.count;
    }

    let data = { products: result, total_amount: total };

    sendResponse(res, 200, 200, "Order details", data);
  } catch (err) {
    next(err);
  }
}

async function placeOrders(req, res, next) {
  try {
    let result = await Cart.findAll({
      where: { userId: req.user.id },
      attributes: ["productId", "count"],
    });

    if (result.length === 0) throw new Error("Your cart is empty.");

    // console.log("RRRRR",result);

    let {
      dataValues: { id: orderId },
    } = await Order.create({ userId: req.user.id });
    // console.log("OOOOOO",orderId)

    let orderProducts = result.map((p) => {
      p.dataValues.orderId = orderId;
      return p.dataValues;
    });
    console.log("OPOP", orderProducts);

    result = await sequelize.transaction(async (t) => {
      let result = await OrderProducts.bulkCreate(orderProducts);  
      result = await Cart.destroy({ where: { userId: req.user.id } });

      return result;

    });

    sendResponse(res, 200, 200, "Order placed.", {});
  } catch (err) {
    next(err);
  }
}

async function cancleOrders(req, res, next) {
  const orderId = req.params.id;
  try {

    let result = await sequelize.transaction(async (t)=>{
      let result = await OrderProducts.destroy({ where: { orderId } });
      result = await Order.destroy({ where: { id: orderId } });

      return result;
    })

    if (!result) {
      throw new Error("Order not found.");
    }

    console.log(result);

    sendResponse(res, 200, 200, "Order canceled.", {});
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllOrders, getAOrder, placeOrders, cancleOrders };
