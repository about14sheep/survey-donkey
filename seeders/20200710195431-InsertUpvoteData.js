'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Upvotes', [
        { id:1, surveyId: 1, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { id:2, surveyId: 1, userId: 3, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { id:3, surveyId: 2, userId: 4, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { id:4,surveyId: 2, userId: 5, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { id:5,surveyId: 1, userId: 4, upvote: 1, createdAt: new Date(), updatedAt: new Date() },
        { id:6,surveyId: 2, userId: 1, upvote: 1, createdAt: new Date(), updatedAt: new Date() }

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Upvotes', null, {});
  }
};
