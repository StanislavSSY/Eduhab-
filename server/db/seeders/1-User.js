'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Roman',
          lastName: 'Rizo',
          email: 'email@email.com',
          password: await bcrypt.hash('1', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Artem',
          lastName: 'Frolkov',
          email: 'email@email.ru',
          password: await bcrypt.hash('2', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Evgeniy',
          lastName: 'Burov',
          email: 'email@email.org',
          password: await bcrypt.hash('3', 10),
          img_url: 'stock_avatar.jpg',
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Stanislav',
          lastName: '557',
          email: 'email@email.am',
          password: await bcrypt.hash('4', 10),
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
