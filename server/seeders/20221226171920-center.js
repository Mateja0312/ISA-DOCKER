'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Centers', [{
      name: 'First Center',
      address: 'Some Address 37',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Second Center',
      address: 'Another Address 45',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Third Center',
      address: 'Random Location 82',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Centers', null, {});
  }
};
