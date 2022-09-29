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

    queryInterface.bulkInsert("HintTypes", [{
        id: 1,
        name: "Hint",
        color: Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        id: 2,
        name: "Hunt",
        color: Math.floor(Math.random() * 16777215).toString(16)
      },
      {
        id: 3,
        name: "Message",
        color: Math.floor(Math.random() * 16777215).toString(16)
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('HintTypes', null, {});
  }
};