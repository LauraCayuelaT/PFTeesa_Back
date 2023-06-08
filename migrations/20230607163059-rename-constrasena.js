'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.renameColumn('Users', 'nombre', 'name');
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'constrasena', 'contraseña')
  }
};
