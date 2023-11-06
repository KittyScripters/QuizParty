const express = require('express');
const path = require('path');
const { db, User, Question } = require('./db/index');
const { getLeaderBoard } = require('./dbHelpers/helpers');

const clientPath = path.resolve(__dirname, '../client/dist');

const app = express();
// use json parser middleware
app.use(express.json());
// serve up the site using express.static and passing in the clientpath
app.use(express.static(clientPath));
// test get renders our index page
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

//get the leaderboard from the database
app.get('/leaderboard', (req, res) => {
  //get the top number, with a default of 15 and the searchedUser from the query from
  //  the client request
  const { topNum = 10, searchedUser } = req.query;
  
  //invoke the imported getLeaderBoard function with the topNum and searchedUser as the arguments
  getLeaderBoard(topNum, searchedUser)
  //then take the users 'leaderboard' and send them back to the client
    .then((users) => {
      // send back the users
      res.send(users);
    })
    // error handling
    .catch((err) => {
      console.error('Unable to get leaderboard:', err);
    });
});

module.exports = app;
