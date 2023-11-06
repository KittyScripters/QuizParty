const { User } = require('../db/index');
//GET HELPERS

//get leaderboard helper
const getLeaderBoard = (topNum, searchedUser) => {
  //query to get the top 10 users by highscore
  const query = {
    order: [['highscore', 'DESC']],
    limit: topNum,
  };
  //if there is a searched user
  if (searchedUser) {
    //add a where clause to the query
    query.where = {
      //where the username is the searched user
      username: searchedUser,
    };
  }
  //return the query
  return User.findAll(query)
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.error('Unable to get leaderboard:', err);
    });
};
//POST HELPERS

//PUT HELPERS

//DELETE HELPERS

module.exports = {
  getLeaderBoard,
};
