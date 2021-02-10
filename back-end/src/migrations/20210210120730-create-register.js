'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome:{
        allowNull: false,
        type: Sequelize.STRING
      },
      sobrenome:{
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf:{
        allowNull: false,
        type: Sequelize.STRING
      },
      promocao:{
        type: Sequelize.BOOLEAN
      },
      promocao:{
        type: Sequelize.BOOLEAN
      },
      dataCadastro:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      dataNascimento:{
        allowNull: false,
        type: Sequelize.DATE
      },
      usuario:{
        allowNull: false,
        type: Sequelize.STRING
      },
      senha:{
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Registers');
  }
};