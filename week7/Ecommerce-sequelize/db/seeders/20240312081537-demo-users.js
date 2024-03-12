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

    await queryInterface.bulkInsert('Users',[
      {
        username:'abc',
        email:'abc@gmail.com',
        password:12345,
        role:'Seller',
        createdAt:new Date(),
        updatedAt:new Date(),

      },
      {
        username:'xyz',
        email:'xyz@gmail.com',
        password:12345,
        role:'Buyer',
        createdAt:new Date(),
        updatedAt:new Date(),
      },
      {
        username:'cdx',
        email:'cdx@gmail.com',
        password:12345,
        role:'Seller',
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

    await queryInterface.bulkDelete('Users',null,{});
  }
};
