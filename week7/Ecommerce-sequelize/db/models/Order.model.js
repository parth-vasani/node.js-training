const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");


const Order=sequelize.define('Order',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        // primaryKey:true,

        references:{
            model:'Users',
            key:'id',
        }
    },

});

module.exports={Order}