
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('products', 'undefined');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'undefined', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
