'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      { id: 1, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "a", role: "s", hashedPassword: "a", firstName: "ds" },
      { id: 2, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "b", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { id: 3, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "e", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { id: 4, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "h", role: "s", hashedPassword: "a", firstName: "dsf" },
      { id: 5, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "jk", role: "s", hashedPassword: "a", firstName: "dfadsf" },
      { id: 6, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "m", role: "s", hashedPassword: "a", firstName: "dasf" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
