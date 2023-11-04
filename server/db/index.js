const { Sequelize } = require('sequelize');
//Sql 

const HOST = 'localhost';

const db = new Sequelize('storageorwhatever', 'admin', '', {
  host: HOST,
  dialect: 'mysql',
});
db.authenticate()
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.error('db error: ', err));

const User = db.define('user', {
  id: {
    type: db.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  username: db.STRING,
  firstname: db.STRING,
  lastname: db.STRING,
  highscore: db.INTEGER,
  art_score: db.INTEGER,
  celebrities_score: db.INTEGER,
  animals_score: db.INTEGER,
  music_score: db.INTEGER,
  sports_score: db.INTEGER,
  books_score: db.INTEGER,
  myth_score: db.INTEGER,
  history_score: db.INTEGER,
  nature_score: db.INTEGER,
  politics_score: db.INTEGER,
});

const Question = db.define('question', {
  id: {
    type: db.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: db.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
  question: db.STRING,
  category: db.STRING,
  correct_answer: db.STRING,
  incorrect_answer_1: db.STRING,
  incorrect_answer_2: db.STRING,
  incorrect_answer_3: db.STRING,
});

const joinFollower = db.define('follower', {
  following_user_id: {
    type: db.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
  followed_user_id: {
    type: db.INTEGER, 
    references: { model: User, key: 'id' }, 
  },
});

const Achievement = db.define('achievement', {
  id: {
    type: db.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: db.STRING,
});

const joinFavoriteQuestion = db.define('join_favorite_question', {
  user_id: {
    type: db.INTEGER,
    references: { model: User, key: 'id' },
  },
  question_id: {
    type: db.INTEGER,
    references: { model: Question, key: 'id' },
  },
});

const joinAchievement = db.define('join_achievement', {
  user_id: {
    type: db.INTEGER,
    references: { model: User, key: 'id' },
  },
  achievement_id: {
    type: db.INTEGER,
    references: { model: Achievement, key: 'id' },
  },
});

module.exports = {
  db,
  User,
  joinFollower,
  Question,
  Achievement,
  joinFavoriteQuestion,
  joinAchievement,
};