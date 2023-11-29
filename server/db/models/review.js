'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User, Course }) {
      this.belongsTo(User, { foreignKey: 'userid' });
      this.belongsTo(Course, { foreignKey: 'courseid' });
    }
  }
  Review.init(
    {
      userid: DataTypes.INTEGER,
      courseid: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      user_rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
