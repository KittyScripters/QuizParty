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

app.get('/api/users', (req, res) => {
  User.findAll()
    .then((users) => res.status(200).res.send(users))
    .catch((err) => console.error('Could not GET users', err));
});

module.exports = app;
