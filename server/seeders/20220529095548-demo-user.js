'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'kimcoding',
      email: 'kimcoding@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'parkhacker',
      email: 'parkhacker@gmail.com',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
