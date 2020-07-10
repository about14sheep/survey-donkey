'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionResponses', [
      { id:1 ,surveyId: 5, userId: 3, questionId: 2, questionResponseValue: "random response1", createdAt: new Date(), updatedAt: new Date() },
      { id:2 ,surveyId: 2, userId: 4, questionId: 1, questionResponseValue: "random response2", createdAt: new Date(), updatedAt: new Date() },
      { id:3 ,surveyId: 4, userId: 2, questionId: 3, questionResponseValue: "random response3", createdAt: new Date(), updatedAt: new Date() },
      { id:4 ,surveyId: 3, userId: 1, questionId: 2, questionResponseValue: "random response4", createdAt: new Date(), updatedAt: new Date() },
      { id:5 ,surveyId: 1, userId: 4, questionId: 1, questionResponseValue: "random response5", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QuestionResponses', null, {});
  }
};
