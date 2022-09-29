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
      id: 1,
      status: "Groen",
      statuscolor: "green",
      description: "Vos is beschikbaar"
    }, {
      id: 2,
      status: "Oranje",
      statuscolor: "warning",
      description: "Vos gaat offline"
    }, {
      id: 3,
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