'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_desc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      product_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sellerId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    
        reference:{
          model:'Users',
          key:'id',
        }
      },
      createdAt:{
        type:Sequelize.DATE,
      },
      updatedAt:{
        type:Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};