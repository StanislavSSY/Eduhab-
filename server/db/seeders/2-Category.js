/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Философы',
        },
        {
          name: 'Шахматы',
        },
        {
          name: 'Страны и народы',
        },
        {
          name: 'Януть',
        },
        {
          name: 'Гарри Поттер',
        },
        {
          name: 'Мемы',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
