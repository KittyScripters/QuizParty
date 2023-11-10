const { Sequelize } = require('sequelize');
//Sql 

const HOST = 'localhost';

const db = new Sequelize({
  host: HOST,
  dialect: 'mysql',
  username: 'root',
  database: 'trivia',
  password: '',
});

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  image_url: Sequelize.STRING,
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  bio: {
    type: Sequelize.STRING,
    defaultValue: 'Update your bio!',
  },
  highscore: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  art_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  celebrities_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  animals_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  music_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  sports_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  books_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  mythology_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  history_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  nature_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  politics_score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
}, { timesstamps: true });

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
  correct_answer: Sequelize.STRING,
  incorrect_answer_1: Sequelize.STRING,
  incorrect_answer_2: Sequelize.STRING,
  incorrect_answer_3: Sequelize.STRING,
  question_set: Sequelize.STRING,
}, { timesstamps: true });

const joinFollower = db.define('join_follower', {
  following_user_id: {
    type: Sequelize.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
  followed_user_id: {
    type: Sequelize.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
}, { timesstamps: true });

const Achievement = db.define('achievement', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
}, { timesstamps: true });

const joinFavoriteQuestion = db.define('join_favorite_question', {
  user_id: {
    type: Sequelize.INTEGER,
    references: { model: User, key: 'id' },
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: { model: Question, key: 'id' },
  },
}, { timesstamps: true });

const joinAchievement = db.define('join_achievement', {
  user_id: {
    type: Sequelize.INTEGER,
    references: { model: User, key: 'id' },
  },
  achievement_id: {
    type: Sequelize.INTEGER,
    references: { model: Achievement, key: 'id' },
  },
}, { timesstamps: true });

const FavoriteQuestion = db.define('favorite_question', {
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
}, { timesstamps: true });

module.exports = {
  db,
  User,
  joinFollower,
  Question,
  Achievement,
  joinFavoriteQuestion,
  joinAchievement,
  FavoriteQuestion,
};