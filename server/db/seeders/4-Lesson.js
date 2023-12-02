'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Lessons',
      [
        {
          moduleid: 1,
          title: 'Теги Headers',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 1,
          title: 'Теги Link',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 2,
          title: 'Теги Table',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 2,
          title: 'Теги Img',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lessons', null, {});
  },
};
