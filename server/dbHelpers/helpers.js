/* eslint-disable max-len */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unneeded-ternary */
const axios = require('axios');
require('dotenv').config();

const { API_TOKEN } = process.env;
const { User, joinAchievement, Achievement } = require('../db/index');
//GET HELPERS

//get leaderboard helper
const getLeaderBoard = (topNum, search) => {
  //query to get the top 10 users by highscore
  // console.log('topNum', topNum);
  //create a variable to store the topNum as an int
  const limit = parseInt(topNum, 10);
  const query = {
    order: [['highscore', 'DESC']],
    limit,
  };
  // console.log('query', query);
  //if there is a searched user
  if (search) {
    //add a where clause to the query
    query.where = {
      //where the username is the searched user
      username: search,
    };
  }
  //return the query
  return User.findAll(query)
    .then((users) => {
      console.log('Successfully fetched leaderboard');
      return users;
    })
    .catch((err) => {
      console.error('Unable to get leaderboard:', err);
    });
};

//get for trivia questions
const getTriviaQuestions = (req) => { 
  // RESET THE TOKEN TO RETRIEVE THE QUESTIONS AGAIN USING THIS: https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE
  // https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple
  
  const triviaCategories = [
    { id: 10, name: 'Books' },
    { id: 12, name: 'Music' },
    { id: 17, name: 'Nature' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
  ];

  const { category } = req.options;
  const { difficulty } = req.options;

  const lowerCaseDiff = difficulty.toLowerCase();
  let categoryNum = 0;

  for (let i = 0; i < triviaCategories.length; i++) {
    if (triviaCategories[i].name === category) {
      categoryNum = triviaCategories[i].id;
    }
  }

  return axios.get(
    `https://opentdb.com/api.php?amount=5&category=${categoryNum}&difficulty=${lowerCaseDiff}&type=multiple&`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

//POST HELPERS

//PUT HELPERS

const checkHighScores = (userObjects, joinAch) => {
  let check = false;
  userObjects.forEach((user) => {
    if (user.highscore >= 50) {
      Achievement.findOne({ where: { name: 'Top score of 50' } })
        .then((achievement) => {
          for (let i = 0; i < joinAch.length; i++) {
            if (joinAch[i].user_id === user.id && joinAch[i].achievement_id === achievement.id) {
              check = true;
            }
          }
          if (check === false) {
            joinAchievement.create({ user_id: user.id, achievement_id: achievement.id })
              .then((newJoin) => {
                return newJoin;
              })
              .catch((err) => {
                console.error('Could not GET achievement', err);
              });
          }
        })

        .catch((err) => {
          console.error('Could not GET achievement', err);
        });
    }
    if (user.highscore >= 100) {
      Achievement.findOne({ where: { name: 'Top score of 100' } })
        .then((achievement) => {
          for (let i = 0; i < joinAch.length; i++) {
            if (joinAch[i].user_id === user.id && joinAch[i].achievement_id === achievement.id) {
              check = true;
            }
          }
          if (check === false) {
            joinAchievement.create({ user_id: user.id, achievement_id: achievement.id })
              .then((newJoin) => {
                return newJoin;
              })
              .catch((err) => {
                console.error('Could not GET achievement', err);
              });
          }
        })
        .catch((err) => {
          console.error('Could not GET achievement', err);
        });
    }
  });
};

// used to check the highest category score and confirm there is no tie
const checkTopCatScore = (users, category, attribute) => {
  const scores = users.sort((a, b) => b[attribute] - a[attribute]);
  Achievement.findOne({ where: { name: category } })
    // title === achievement
    .then((title) => {
      joinAchievement.findAll({ attributes: ['user_id', 'achievement_id'] })
        .then((joinAch) => {
          joinAch.forEach((ach) => {
            if (ach.achievement_id === title.id && ach.user_id !== scores[0].id && scores[0][attribute] > scores[1][attribute]) {
              joinAchievement.update(
                { user_id: scores[0].id },
                { where: { achievement_id: title.id } },
              );
            }
          });
        })
        .then(() => {
          joinAchievement.findOne({ where: { user_id: scores[0].id, achievement_id: title.id } })
            .then((achievement) => {
              if (achievement === null && scores[0][attribute] > scores[1][attribute]) {
                joinAchievement.create({ user_id: scores[0].id, achievement_id: title.id });
              }
            })
            .catch((err) => console.error(err));
        });
    });
};

//DELETE HELPERS

module.exports = {
  getLeaderBoard,
  getTriviaQuestions,
  checkHighScores,
  checkTopCatScore,
};
