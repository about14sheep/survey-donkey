'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.TIME
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};