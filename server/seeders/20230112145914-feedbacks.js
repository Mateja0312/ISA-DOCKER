'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Feedbacks', [{
      title: "Feedback without response 1",
      content: "This is a seeded feedback with no response",
      client_id: 4,
      employee_id: 2,
      center_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Feedback without response 2",
      content: "This is also a seeded feedback with no response",
      client_id: 4,
      employee_id: null,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Feedback with response 1",
      content: "This is a seeded feedback with response",
      client_id: 4,
      employee_id: null,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Feedback with response 2",
      content: "This is also a seeded feedback with response",
      client_id: 4,
      employee_id: null,
      center_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Feedbacks', null, {});
  }
};
