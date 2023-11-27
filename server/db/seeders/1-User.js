/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: '123',
          email: '123@gmail.com',
          password: 'qwerty',
        },
        {
          name: '234',
          email: '234@gmail.com',
          password: 'wertyu',
        },
        {
          name: '345',
          email: '345@gmail.com',
          password: 'ertyui',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
