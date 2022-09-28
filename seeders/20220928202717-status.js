'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert("Statuses", [{
      status: "Groen",
      statuscolor: "green",
      description: "Vos is beschikbaar"
    }, {
      status: "Oranje",
      statuscolor: "warning",
      description: "Vos gaat offline"
    }, {
      status: "Rood",
      statuscolor: "danger",
      description: "Vos is offline"
    }, ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Statuses', null, {});
  }
};