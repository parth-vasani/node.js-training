const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");


const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["Buyer", "Seller"],
    allowNull: false,
  },
},{
  defaultScope:{
    attributes:{exclude:['password']}
  }
});


console.log("IN USER")

module.exports = { User };