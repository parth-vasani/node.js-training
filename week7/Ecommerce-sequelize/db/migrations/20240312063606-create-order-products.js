'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderProducts', {
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
  
        references: {
          model: "Orders",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
  
        references: {
          model: "Products",
          key: "id",
        },
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    },
    { timestamps: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderProducts');
  }
};