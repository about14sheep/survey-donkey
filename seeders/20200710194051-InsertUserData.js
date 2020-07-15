'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
{id:1 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"d@gmail.com",role:"fullUser",hashedPassword:"a",firstName:"ds"},
{id:2 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"donkey@gmail.com",role:"fullUser",hashedPassword:"a",firstName:"dsdddaf"},
{id:3 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"poasif@giweijf.com",role:"fullUser",hashedPassword:"a",firstName:"dswaefaf"},
{id:4 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"asdfeawe@ii.com",role:"fullUser",hashedPassword:"a",firstName:"dslkkf"},
{id:5 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"yoink@doink.com",role:"fullUser",hashedPassword:"a",firstName:"dfapodsf"},
{id:6 ,createdAt: new Date(), updatedAt: new Date(), lastLogin: new Date(),email:"upwaoeiru@jafoiwe.com",role:"fullUser",hashedPassword:"a",firstName:"daazsf"}
 ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
