'use strict';

const qrcode = require('qrcode');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const appointments = [{
      start: new Date('January 16, 2023, 10:00:00'),
      end: new Date('January 16, 2023, 11:00:00'),
      status: "canceled",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 16, 2023, 11:00:00'),
      end: new Date('January 16, 2023, 12:00:00'),
      status: "failed",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 17, 2023, 08:00:00'),
      end: new Date('January 17, 2023, 09:00:00'),
      status: "predefined",
      center_id: 1,
      employee_id: 2,
      client_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 17, 2023, 12:00:00'),
      end: new Date('January 17, 2023, 13:00:00'),
      status: "predefined",
      center_id: 1,
      employee_id: 2,
      client_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 18, 2023, 10:00:00'),
      end: new Date('January 18, 2023, 11:00:00'),
      status: "reserved",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 18, 2023, 11:00:00'),
      end: new Date('January 18, 2023, 12:00:00'),
      status: "reserved",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 19, 2023, 08:00:00'),
      end: new Date('January 19, 2023, 09:00:00'),
      status: "completed",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 20, 2023, 08:00:00'),
      end: new Date('January 20, 2023, 09:00:00'),
      status: "completed",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 20, 2023, 10:00:00'),
      end: new Date('January 20, 2023, 11:00:00'),
      status: "accepted",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 20, 2023, 11:00:00'),
      end: new Date('January 20, 2023, 12:00:00'),
      status: "accepted",
      center_id: 1,
      employee_id: 2,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 18, 2023, 11:00:00'),
      end: new Date('January 18, 2023, 12:00:00'),
      status: "completed",
      center_id: 2,
      employee_id: 3,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 19, 2023, 08:45:00'),
      end: new Date('January 19, 2023, 09:00:00'),
      status: "completed",
      center_id: 2,
      employee_id: 3,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      start: new Date('January 19, 2023, 13:00:00'),
      end: new Date('January 19, 2023, 13:30:00'),
      status: "completed",
      center_id: 2,
      employee_id: 3,
      client_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    appointments.map((appointment, index) => {
      appointment.id = index + 1
      const filename = `appointment-${appointment.id}.png`
      const qrCodePath = path.join(__dirname, '..', 'qrcodes', filename);
      qrcode.toFile(qrCodePath, JSON.stringify(appointment), { type: 'png' }, (err) => {
        if (err) throw err;
        console.log("QR code generated successfully");
      });
    })

    return queryInterface.bulkInsert('Appointments', appointments)
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Appointments', null, {});
  }
};
