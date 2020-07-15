'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Surveys', [
{id: 1,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{id: 2,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{id: 3,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{id: 4,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{id: 5,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{id: 6,createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Surveys', null, {});
  }
};
