'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FeedbackResponses', [{
      response: "Response 1",
      respondedBy: 1,
      feedback_id: 3,
      createdAt: new Date('January 10, 2023, 08:12:44'),
      updatedAt: new Date('January 10, 2023, 08:12:44')
    },{
      response: "Response 2",
      respondedBy: 1,
      feedback_id: 4,
      createdAt: new Date('January 10, 2023, 08:21:13'),
      updatedAt: new Date('January 10, 2023, 08:21:13')
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FeedbackResponses', null, {});
  }
};
