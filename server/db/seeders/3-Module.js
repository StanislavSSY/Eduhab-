"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Modules",
      [
        {
          courseid: 1,
          title: "Простейшие теги",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 1,
          title: "Сложные теги",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 2,
          title: "Введение в основы",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 2,
          title: "Функции, структуры, указатели и другое",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 3,
          title: "Wprowadzenie do React.js",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 3,
          title: "JSX oraz Next.js jako rdzeń projektu w React",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 4,
          title: "Вводный курс",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 4,
          title: "Основной курс",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 7,
          title: "Основы JavaScript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 7,
          title: "Функции и Объекты",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseid: 7,
          title: "Взаимодействие с Веб-страницей",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Modules", null, {});
  },
};
