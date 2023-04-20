'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ratings', [{
      rating: 3,
      user_id: 1,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      rating: 1,
      user_id: 2,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      rating: 4,
      user_id: 3,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      rating: 1,
      user_id: 4,
      center_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
