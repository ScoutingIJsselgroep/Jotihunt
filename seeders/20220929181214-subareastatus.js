'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SubareaStatuses", [{
        StatusId: 1,
        SubareaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        StatusId: 1,
        SubareaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        StatusId: 1,
        SubareaId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        StatusId: 1,
        SubareaId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        StatusId: 1,
        SubareaId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        StatusId: 1,
        SubareaId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
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