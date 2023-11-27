/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Results',
      [
        {
          userId: 1,
          score: 1000,
          answers: 10,
          correctAnswers: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Results', null, {});
  },
};
