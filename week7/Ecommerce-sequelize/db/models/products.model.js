const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");


const productSchema= {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId:{
    type:DataTypes.INTEGER,
    allowNull:false,

    reference:{
      model:'Users',
      key:'id',
    }
  }
};

const Product=sequelize.define('Product',productSchema);

console.log("IN PROD")


module.exports = { Product };
