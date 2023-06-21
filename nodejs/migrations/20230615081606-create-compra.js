'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compras', {
      CartaoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'cartaos',
          key: 'id'
        },
        OnUpdate: 'CASCADE',
        OnDelete: 'CASCADE'
      },
      PromocaoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'promocaos',
          key: 'id'
        },
        OnUpdate: 'CASCADE',
        OnDelete: 'CASCADE'
      },
      data: {
        type: Sequelize.DATEONLY
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.FLOAT
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
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Compras');
  }
};