'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("Subareas", [{
      id: 1,
      name: "Alpha",
      color: "DFFF00"
    }, {
      id: 2,
      name: "Bravo",
      color: "FFBF00"
    }, {
      id: 3,
      name: "Charlie",
      color: "9FE2BF"
    }, {
      id: 4,
      name: "Delta",
      color: "FF7F50"
    }, {
      id: 5,
      name: "Echo",
      color: "40E0D0"
    }, {
      id: 6,
      name: "Foxtrot",
      color: "DE3163"
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