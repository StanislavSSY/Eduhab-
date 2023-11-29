'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate({ User, Module, Entrie, Review }) {
      this.belongsTo(User, { foreignKey: 'userid' });
      this.hasMany(Module, { foreignKey: 'courseid' });
      this.hasMany(Entrie, { foreignKey: 'courseid' });
      this.hasMany(Review, { foreignKey: 'courseid' });
    }
  }
  Course.init(
    {
      userid: DataTypes.INTEGER,
      title: DataTypes.STRING,
      old_price: DataTypes.INTEGER,
      new_price: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      time_passage: DataTypes.STRING,
      quantity_people: DataTypes.INTEGER,
      short_description: DataTypes.STRING,
      long_description: DataTypes.TEXT,
      intro_video: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Course',
    }
  );
  return Course;
};
