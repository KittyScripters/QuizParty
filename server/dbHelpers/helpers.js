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
    `https://opentdb.com/api.php?amount=5&category=${categoryNum}&difficulty=${lowerCaseDiff}&type=multiple`, 
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
  userObjects.forEach((user) => {
    let check = false;
    if (user.highscore >= 5) {
      Achievement.findOne({ where: { name: 'Top score of 5' } })
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
    if (user.highscore >= 10) {
      Achievement.findOne({ where: { name: 'Top score of 10' } })
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
  // sorting the array of user objects by the current attribute (high to low)
  const scores = users.sort((a, b) => b[attribute] - a[attribute]);
  // top two scores
  const topScore = scores[0];
  const secondPlace = scores[1];
  // find the achievement by the category
  Achievement.findOne({ where: { name: category } })
    // title === achievement
    .then((title) => {
      // get all joined achievements
      joinAchievement.findAll({ attributes: ['user_id', 'achievement_id'] })
        .then((joinAch) => {
          // iterate through the joined achievemnts
          joinAch.forEach((ach) => {
            // if the achievement's user_id property does not equal topScore.id and there is no tie
            if (ach.achievement_id === title.id && ach.user_id !== topScore.id && topScore[attribute] > secondPlace[attribute]) {
              // update the joined achievement's user_id property
              joinAchievement.update(
                { user_id: topScore.id },
                { where: { achievement_id: title.id } },
              )
                .then((update) => {
                  // feel free to update this
                  // console.log('UPDATE', update);
                })
                .catch((err) => console.error(err));
            }
          });
        })
        .then(() => {
          // then find the one joined achievement by topScore.id and title.id
          joinAchievement.findOne({ where: { user_id: topScore.id, achievement_id: title.id } })
            .then((achievement) => {
              // if achievement is null and there is no tie between the top two scores => create the joined achievement
              if (achievement === null && topScore[attribute] > secondPlace[attribute]) {
                joinAchievement.create({ user_id: topScore.id, achievement_id: title.id });
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
