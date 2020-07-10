'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      { id: 1,questionText: 'what is that', surveyId: 3, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 2,questionText: 'what is this', surveyId: 1, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 3,questionText: 'what are those', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 4,questionText: 'who is that', surveyId: 1, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 5,questionText: 'who is this', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 6,questionText: 'yadda yadda', surveyId: 2, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() },
      { id: 7,questionText: 'blah blah', surveyId: 3, questionType: 'multiple choice', opOne: 'Option one', opTwo: 'Option two', opThree: 'Option three', opFour: 'Option Four', opFive: 'Option Five', createdAt: new Date(), updatedAt: new Date() }
      ])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
