'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Entrie extends Model {
    static associate({ User, Course }) {
      this.belongsTo(User, { foreignKey: 'userid' });
      this.belongsTo(Course, { foreignKey: 'courseid' });
    }
  }
  Entrie.init(
    {
      userid: DataTypes.INTEGER,
      courseid: DataTypes.INTEGER,
      progress: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Entrie',
    }
  );
  return Entrie;
};
