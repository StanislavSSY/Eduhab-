'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Course, Entrie, Review, Comment }) {
      this.hasMany(Course, { foreignKey: 'userid' });
      this.hasMany(Entrie, { foreignKey: 'userid' });
      this.hasMany(Review, { foreignKey: 'userid' });
      this.hasMany(Comment, { foreignKey: 'userid' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      img_url: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
