'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log(process.env.API_URI + "areas")

    queryInterface.bulkInsert("Subareas", [{
      id: 1,
      name: "Alpha",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 2,
      name: "Bravo",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 3,
      name: "Charlie",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 4,
      name: "Delta",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 5,
      name: "Echo",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 6,
      name: "Foxtrot",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }, {
      id: 7,
      name: "Onbekend",
      color: Math.floor(Math.random() * 16777215).toString(16)
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Subareas', null, {});
  }
};