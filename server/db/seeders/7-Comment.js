'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userid: 1,
          stepid: 1,
          text: 'Очень интересное задание',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 1,
          stepid: 2,
          text: 'Отстойное задание',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userid: 2,
          stepid: 1,
          text: 'Слишком просто',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
