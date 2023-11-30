'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Steps',
      [
        {
          lessonid: 1,
          type: 'TEXT',
          data: '<h2>Тег H1</h2><p>простой тег h1</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 1,
          type: 'TEXT',
          data: '<h2>Тег H2</h2><p>простой тег h2</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 2,
          type: 'TEXT',
          data: '<h2>Тег link css</h2><p>простой тег link css</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 2,
          type: 'TEXT',
          data: '<h2>Тег link js</h2><p>простой тег link js</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 3,
          type: 'TEXT',
          data: '<h2>Тег td</h2><p>простой тег td</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 3,
          type: 'TEXT',
          data: '<h2>Тег th</h2><p>простой тег th</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 4,
          type: 'TEXT',
          data: '<h2>Тег img</h2><p>простой тег img</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          lessonid: 4,
          type: 'TEXT',
          data: '<h2>Тег svg</h2><p>простой тег svg</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Steps', null, {});
  },
};
