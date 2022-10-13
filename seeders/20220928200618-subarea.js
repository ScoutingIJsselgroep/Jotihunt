'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("Subareas", [{
      id: 1,
      name: "Alpha",
      color: "f7000a"
    }, {
      id: 2,
      name: "Bravo",
      color: "ffee00"
    }, {
      id: 3,
      name: "Charlie",
      color: "009b3a"
    }, {
      id: 4,
      name: "Delta",
      color: "ff7800"
    }, {
      id: 5,
      name: "Echo",
      color: "009b3a"
    }, {
      id: 6,
      name: "Foxtrot",
      color: "bc4086"
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