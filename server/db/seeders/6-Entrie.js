'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Entries',
      [
        {
          userid: 1,
          courseid: 1,
          progress: JSON.stringify([1, 2]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 1,
          courseid: 2,
          progress: JSON.stringify([5, 6, 7, 8]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 1,
          courseid: 3,
          progress: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 1,
          courseid: 4,
          progress: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 2,
          courseid: 1,
          progress: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 2,
          courseid: 2,
          progress: JSON.stringify([]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entries', null, {});
  },
};
