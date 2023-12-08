'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Роман',
          lastName: 'Ризо',
          email: 'email@email.com',
          password: await bcrypt.hash('1', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Артем',
          lastName: 'Фролков',
          email: 'email@email.ru',
          password: await bcrypt.hash('2', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Евгений',
          lastName: 'Буров',
          email: 'email@email.org',
          password: await bcrypt.hash('3', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Станислав',
          lastName: 'Свентский',
          email: 'email@email.am',
          password: await bcrypt.hash('4', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          firstName: 'Илона',
          lastName: 'Гольман',
          email: 'email@email.il',
          password: await bcrypt.hash('5', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Илья',
          lastName: 'Шуранов',
          email: 'email@email.sh',
          password: await bcrypt.hash('6', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Игорь',
          lastName: 'Шипунов',
          email: 'email@email.sh',
          password: await bcrypt.hash('6', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
