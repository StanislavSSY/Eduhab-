'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Users' }, key: 'id' },
        onDelete: 'cascade',
      },
      title: {
        type: Sequelize.STRING,
      },
      old_price: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      new_price: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      time_passage: {
        type: Sequelize.STRING,
      },
      quantity_people: {
        type: Sequelize.INTEGER,
      },
      short_description: {
        type: Sequelize.STRING,
      },
      long_description: {
        type: Sequelize.TEXT,
      },
      intro_video: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  },
};
