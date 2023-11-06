const express = require('express');
const path = require('path');
const { db, User, Question } = require('./db/index');
const getTrivaQuestions = require('./api/triviaApi');

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

app.get('/api/play', (req, res) => {
  return getTrivaQuestions(req.body)
    .then((data) => {
      console.log('get result', data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = app;
