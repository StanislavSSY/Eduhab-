'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate({ Module, Step }) {
      this.belongsTo(Module, { foreignKey: 'moduleid' });
      this.hasMany(Step, { foreignKey: 'lessonid' });
    }
  }
  Lesson.init(
    {
      moduleid: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Lesson',
    }
  );
  return Lesson;
};
