'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    lastLogin: DataTypes.TIME,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Survey, { foreignKey: 'userId' })
    User.hasMany(models.QuestionResponse, { foreignKey: 'userId' })
  };
  return User;
};