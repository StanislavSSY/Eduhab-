'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate({ Course, Lesson }) {
      this.belongsTo(Course, { foreignKey: 'courseid' });
      this.hasMany(Lesson, { foreignKey: 'moduleid' });
    }
  }
  Module.init(
    {
      courseid: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Module',
    }
  );
  return Module;
};
