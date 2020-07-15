'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Surveys', [
{createdAt: new Date(), updatedAt: new Date(), name: "dafdd", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "werp", userId: 2,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "yoink", userId: 1,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "fiddle", userId: 4,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "populatiorz", userId: 2,published:true},
{createdAt: new Date(), updatedAt: new Date(), name: "itsybitsy", userId: 4,published:true},

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Surveys', null, {});
  }
};
