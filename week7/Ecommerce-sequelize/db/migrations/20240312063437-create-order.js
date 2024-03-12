'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id:{
          type:Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey:true,
      },
      userId:{
          type:Sequelize.INTEGER,
          allowNull:false,
          // primaryKey:true,
  
          references:{
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
    await queryInterface.dropTable('Orders');
  }
};