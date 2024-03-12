// const { default: mongoose, mongo } = require("mongoose");
// const {productSchema} = require('./products.model.js')

const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");


const OrderProducts = sequelize.define(
  "OrderProducts",
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

      references: {
        model: "Orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,

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
  { timestamps: false }
);

module.exports = { OrderProducts };
