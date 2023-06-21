'use strict';

const moment = require("moment")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reviews', 'fecha', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: moment().format('YYYY-MM-DD')
     });
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('Reviews','fecha');
     
  }
};
