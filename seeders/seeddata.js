/* eslint-disable no-unused-vars */
const { achievements } = require('../fakeData/fakeAchievementsData.json');
const { results } = require('../fakeData/fakeUserData.json');
const { questions } = require('../fakeData/fakeQuestionData.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', results.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
    await queryInterface.bulkInsert('achievements', achievements.map((achievement) => ({
      ...achievement,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));

    await queryInterface.bulkInsert('questions', [
      {
        user_id: 1,
        question: 'Virgin Trains, Virgin Atlantic and Virgin Racing, are all companies owned by which famous entrepreneur?   ',
        correct_answer: 'Richard Branson',
        incorrect_answer_1: 'Alan Sugar',
        incorrect_answer_2: 'Donald Trump',
        incorrect_answer_3: 'Bill Gates',
        question_set: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  
    await queryInterface.bulkInsert('join_achievements', [
      {
        user_id: 1,
        achievement_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        achievement_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        achievement_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        achievement_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('join_followers', [
      {
        following_user_id: 1,
        followed_user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        following_user_id: 1,
        followed_user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        following_user_id: 1,
        followed_user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    // You can add commands to revert seed here if needed.
  },
};
