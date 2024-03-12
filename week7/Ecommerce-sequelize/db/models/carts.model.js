const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { Product } = require("./products.model");

const Cart = sequelize.define(
  "Cart",
  {
    userId: {
      type: DataTypes.INTEGER,
      // primaryKey:true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      // primaryKey:true,
      references: {
        model: "Products",
        key: "id",
      },
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { indexes: [{ unique: true, fields: ["userId", "productId"] }] }
);

console.log("IN CSRT");

module.exports = { Cart };
