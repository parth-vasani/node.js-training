'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      userId: {
        type: Sequelize.INTEGER,
        // primaryKey:true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        // primaryKey:true,
        references: {
          model: "Products",
          key: "id",
        },
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdAt:{
        type:Sequelize.DATE,
      },
      updatedAt:{
        type:Sequelize.DATE,
      }
    },
    { indexes: [{ unique: true, fields: ["userId", "productId"] }] });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};