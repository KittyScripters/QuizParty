const express = require('express');
const path = require('path');
const { db, User, Question } = require('./db/index');

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
  //use the User model to findAll users in the database
  User.findAll({
    //order them by highscore in descending order
    order: [['highscore', 'DESC']],
    //limit the results to 10
    limit: 10,
  })
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
