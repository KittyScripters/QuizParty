/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '1',
        username: 'maidenwench',
        firstname: 'Robert',
        lastname: 'Bartleby',
        highscore: 22,
        art_score: 5,
        celebrities_score: 3,
        animals_score: 0,
        music_score: 66,
        sports_score: 13,
        books_score: 0,
        myth_score: 17,
        history_score: 85,
        nature_score: 1,
        politics_score: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        username: 'copper',
        firstname: 'James',
        lastname: 'Smith',
        highscore: 22,
        art_score: 5,
        celebrities_score: 3,
        animals_score: 0,
        music_score: 66,
        sports_score: 13,
        books_score: 0,
        myth_score: 17,
        history_score: 85,
        nature_score: 1,
        politics_score: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        username: 'paltryburn',
        firstname: 'Beetlejuice',
        lastname: 'Beetlejuice',
        highscore: 22,
        art_score: 5,
        celebrities_score: 3,
        animals_score: 0,
        music_score: 66,
        sports_score: 13,
        books_score: 0,
        myth_score: 17,
        history_score: 85,
        nature_score: 1,
        politics_score: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        username: 'trampolineteam',
        firstname: 'Kitty',
        lastname: 'Scripter',
        highscore: 22,
        art_score: 5,
        celebrities_score: 3,
        animals_score: 0,
        music_score: 66,
        sports_score: 13,
        books_score: 0,
        myth_score: 17,
        history_score: 85,
        nature_score: 1,
        politics_score: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
    await queryInterface.bulkInsert('achievements', [
      {
        name: 'Top score of 50',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Top score of 100',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Top score periodt',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    // You can add commands to revert seed here if needed.
  },
};
