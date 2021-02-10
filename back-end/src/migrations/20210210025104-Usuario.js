'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primeiro_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ultimo_nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ativo: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      aceita_emails: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      cpf_cnpj: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario');
  }
};