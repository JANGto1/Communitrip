'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [{
      name: '산',
      post_id: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: '강',
      post_id: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: '바다',
      post_id: '3',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: '계곡',
      post_id: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
