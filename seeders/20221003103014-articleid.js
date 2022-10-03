'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ApiTypes", [{
        id: 1,
        name: "Opdracht"
      },
      {
        id: 2,
        name: "Hint"
      },
      {
        id: 3,
        name: "Nieuws"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ApiTypes', null, {});
  }
};