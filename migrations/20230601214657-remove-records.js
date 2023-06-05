'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Elimina los registros existentes en la tabla "Users"
    await queryInterface.bulkDelete('Products', null, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Agrega la lógica para restaurar los registros eliminados en caso de rollback
    // No es necesario en este caso si solo quieres eliminar los registros
  }
}
