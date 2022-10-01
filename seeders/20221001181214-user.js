'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("User", [{
            id: 1,
            name: "Onbekend"
          ]);
        },

        async down(queryInterface, Sequelize) {
          /**
           * Add commands to revert seed here.
           *
           * Example:
           * await queryInterface.bulkDelete('People', null, {});
           */
          await queryInterface.bulkDelete('User', null, {});
        }
    };