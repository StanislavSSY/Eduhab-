'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Modules',
      [
        {
          courseid: 1,
          title: 'Простейшие теги',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 1,
          title: 'Сложные теги',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};
