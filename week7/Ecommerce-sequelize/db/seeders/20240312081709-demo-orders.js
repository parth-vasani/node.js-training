'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Orders',[
      {
        userId:2,
        createdAt:new Date(),
        updatedAt:new Date(),
      }
    ]);

    await queryInterface.bulkInsert('OrderProducts',[
      {
        orderId:1,
        productId:1,
        count:5,
      },
      {
        orderId:1,
        productId:2,
        count:1,
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('OrderProducts',null,{})
    await queryInterface.bulkDelete('Orders',null,{})

  }
};
