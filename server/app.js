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

app.post('/createQuestion', (req, res) => {
  Question.create(req.body)
    .then((newQuestion) => {
      res.status(201).json(newQuestion);
    })
    .catch((err) => {
      console.error('error submitting question: ', err);
      res.sendStatus(500).json({ error: 'server side error saving question' });
    });
});

module.exports = app;
