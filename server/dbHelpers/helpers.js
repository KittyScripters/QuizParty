const { User } = require('../db/index');
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
//POST HELPERS

//PUT HELPERS

//DELETE HELPERS

module.exports = {
  getLeaderBoard,
};
