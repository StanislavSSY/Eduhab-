'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    static associate({ Lesson, Comment }) {
      this.belongsTo(Lesson, { foreignKey: 'lessonid' });
      this.hasMany(Comment, { foreignKey: 'stepid' });
    }
  }
  Step.init(
    {
      lessonid: DataTypes.INTEGER,
      type: DataTypes.STRING,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Step',
    }
  );
  return Step;
};
