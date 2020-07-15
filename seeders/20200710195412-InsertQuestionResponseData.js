'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionResponses', [
      { id: 1, surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, surveyId: 1, userId: 2, questionId: 2, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, surveyId: 1, userId: 1, questionId: 2, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QuestionResponses', null, {});
  }
};
