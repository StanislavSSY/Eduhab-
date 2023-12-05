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

        {
          moduleid: 3,
          title: 'Типы данных',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 3,
          title: 'Циклы',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 4,
          title: 'Функции',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 4,
          title: 'Структуры',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          moduleid: 5,
          title: 'Narzędzie Formik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 5,
          title: 'Język JavaScript',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 6,
          title: 'Wprowadzenie do Redux',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 6,
          title: 'Testowanie w React',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          moduleid: 7,
          title: 'Пошаговая схема Dota 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 7,
          title: 'Торговая площадка',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 8,
          title: 'Как устроен заработок в Steam',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          moduleid: 8,
          title: 'Базовые знания',
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
