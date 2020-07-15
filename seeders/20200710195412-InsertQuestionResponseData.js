'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionResponses', [
      { id: 1, surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, surveyId: 1, userId: 3, questionId: 4, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, surveyId: 1, userId: 2, questionId: 2, questionResponseValue: "option one", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, surveyId: 1, userId: 1, questionId: 2, questionResponseValue: "option five", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option two", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option two", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option three", createdAt: new Date(), updatedAt: new Date() },
      { id: 8, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option four", createdAt: new Date(), updatedAt: new Date() },
      { id: 9, surveyId: 1, userId: 4, questionId: 4, questionResponseValue: "option five", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QuestionResponses', null, {});
  }
};
