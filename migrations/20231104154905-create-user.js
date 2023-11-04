'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      highscore: {
        type: Sequelize.INTEGER
      },
      art_score: {
        type: Sequelize.INTEGER
      },
      celebrities_score: {
        type: Sequelize.INTEGER
      },
      animals_score: {
        type: Sequelize.INTEGER
      },
      music_score: {
        type: Sequelize.INTEGER
      },
      sports_score: {
        type: Sequelize.INTEGER
      },
      books_score: {
        type: Sequelize.INTEGER
      },
      myth_score: {
        type: Sequelize.INTEGER
      },
      history_score: {
        type: Sequelize.INTEGER
      },
      nature_score: {
        type: Sequelize.INTEGER
      },
      politics_score: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};