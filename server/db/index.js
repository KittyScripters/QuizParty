const { Sequelize } = require('sequelize');
//Sql 

const HOST = 'localhost';

const db = new Sequelize({
  host: HOST,
  dialect: 'mysql',
  username: 'root',
  database: 'trivia',
});

db.authenticate()
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.error('db error: ', err));

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  highscore: Sequelize.INTEGER,
  art_score: Sequelize.INTEGER,
  celebrities_score: Sequelize.INTEGER,
  animals_score: Sequelize.INTEGER,
  music_score: Sequelize.INTEGER,
  sports_score: Sequelize.INTEGER,
  books_score: Sequelize.INTEGER,
  myth_score: Sequelize.INTEGER,
  history_score: Sequelize.INTEGER,
  nature_score: Sequelize.INTEGER,
  politics_score: Sequelize.INTEGER,
});

const Question = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
  question: Sequelize.STRING,
  category: Sequelize.STRING,
  correct_answer: Sequelize.STRING,
  incorrect_answer_1: Sequelize.STRING,
  incorrect_answer_2: Sequelize.STRING,
  incorrect_answer_3: Sequelize.STRING,
});

const joinFollower = db.define('follower', {
  following_user_id: {
    type: Sequelize.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
  followed_user_id: {
    type: Sequelize.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
});

const Achievement = db.define('achievement', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

const joinFavoriteQuestion = db.define('join_favorite_question', {
  user_id: {
    type: Sequelize.INTEGER,
    references: { model: User, key: 'id' },
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: { model: Question, key: 'id' },
  },
});

const joinAchievement = db.define('join_achievement', {
  user_id: {
    type: Sequelize.INTEGER,
    references: { model: User, key: 'id' },
  },
  achievement_id: {
    type: Sequelize.INTEGER,
    references: { model: Achievement, key: 'id' },
  },
});

const testBoy = User.build({
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
});
testBoy.save();

module.exports = {
  db,
  User,
  joinFollower,
  Question,
  Achievement,
  joinFavoriteQuestion,
  joinAchievement,
};