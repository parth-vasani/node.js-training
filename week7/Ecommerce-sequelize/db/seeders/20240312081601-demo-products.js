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

    await queryInterface.bulkInsert('Products',[
      {
        product_name:'p1',
        product_desc:'This is p1',
        product_price:'100',
        sellerId:1,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        product_name:'p1224',
        product_desc:'This is a product from cdx.',
        product_price:'199',
        sellerId:3,
        createdAt:new Date(),
        updatedAt:new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Products',null,{});
  }
};
