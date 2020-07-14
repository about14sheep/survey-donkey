'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
{id:1 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"d",role:"s",hashedPassword:"a",firstName:"ds"},
 ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
