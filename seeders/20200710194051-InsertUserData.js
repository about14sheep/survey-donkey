'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      { id: 1, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "da", role: "s", hashedPassword: "a", firstName: "ds" },
      { id: 2, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "dr", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { id: 3, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "t", role: "s", hashedPassword: "a", firstName: "dsaf" },
      { id: 4, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "y", role: "s", hashedPassword: "a", firstName: "dsf" },
      { id: 5, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "u", role: "s", hashedPassword: "a", firstName: "dfadsf" },
      { id: 6, createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(), email: "d", role: "s", hashedPassword: "a", firstName: "dasf" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
