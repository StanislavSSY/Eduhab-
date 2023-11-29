'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Step }) {
      this.belongsTo(User, { foreignKey: 'userid' });
      this.belongsTo(Step, { foreignKey: 'stepid' });
    }
  }
  Comment.init(
    {
      userid: DataTypes.INTEGER,
      stepid: DataTypes.INTEGER,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
