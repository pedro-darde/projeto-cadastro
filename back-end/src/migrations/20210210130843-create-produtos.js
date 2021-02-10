"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Produtos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      preco: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dataCadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Produtos");
  },
};
