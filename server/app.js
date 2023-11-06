/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
const express = require('express');
const path = require('path');
const {
  db, User, Question, Achievement, 
} = require('./db/index');
const { joinAchievement, joinFollower } = require('./db/index');

const { getLeaderBoard, getTriviaQuestions } = require('./dbHelpers/helpers');

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
  //get the top number, and the searchedUser from the query from
  //  the client request
  const { topNum, search } = req.query;
  // console.log('req.query', req.query);
  //invoke the imported getLeaderBoard function with the topNum and searchedUser as the arguments
  getLeaderBoard(topNum, search)
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

app.get('/getUserQuizNames/:userId', (req, res) => {
  const { userId } = req.params;
  Question.findAll({
    where: {
      user_id: userId,
    },
    attributes: ['question_set'],
    group: ['question_set'],
  })
    .then((questionSets) => {
      console.log('qs in server: ', questionSets);
      const quizNames = questionSets.map((questionSet) => questionSet.question_set);
      res.send(quizNames);
    })
    .catch((err) => { 
      console.error('Error in QuiznameGet:', err); 
      res.sendStatus(500).json({ error: 'server side error getting quiz names' });
    });
});
//get all users => working in postman
app.get('/api/users', (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      console.error('Could not GET users', err);
    });
});

//get user by id => working in postman
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ where: { id: id } })
    .then((user) => {
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      console.error('Could not GET user by id', err);
    });
});

//get all Questions => working in postman
app.get('/api/questions', (req, res) => {
  Question.findAll()
    .then((questions) => {
      res.status(200);
      res.send(questions);
    })
    .catch((err) => {
      console.error('Could not GET questions', err);
      res.sendStatus(500);
    });
});

//get questions by user_id => working in postman
app.get('/api/questions/:user_id', (req, res) => {
  const { user_id } = req.params;
  Question.findAll({ where: { user_id: user_id } })
    .then((questions) => {
      res.status(200);
      res.send(questions);
    })
    .catch((err) => {
      console.error('Could not GET questions by user_id', err);
    });
});

//patch a user's bio column => working in postman
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;
  User.update({ bio: bio }, { where: { id: id } })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
// const quizNames = questionSets.map((questionSet) => questionSet.question_set);
app.get('/api/join_achievements/:user_id', (req, res) => {
  const { user_id } = req.params;
  joinAchievement.findAll({ where: { user_id: user_id }, attributes: ['achievement_id'], group: ['achievement_id'] })
    .then((data) => {
      const achievements = data.map((achievement) => achievement.achievement_id);
      Achievement.findAll({ where: { id: achievements } })
        .then((thing) => {
          const results = thing.map((result) => result.name);
          res.send(results);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//get achievement by id => working in postman
app.get('/api/achievements/:id', (req, res) => {
  const { id } = req.params;
  Achievement.findOne({ where: { id: id } })
    .then((achievement) => {
      res.status(200);
      res.send(achievement);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//find all followers in join_followers
app.get('/api/join_followers/:following_user_id', (req, res) => {
  //following_user_id parameter
  const { following_user_id } = req.params;
  // use joinFollower model to find all followers of user
  joinFollower.findAll({ where: { following_user_id: following_user_id }, attributes: ['followed_user_id'], group: ['followed_user_id'] })
    .then((data) => {
      //map through the data array and return only the follower_user_id values
      const followers = data.map((follower) => follower.followed_user_id);
      //pass in the mapped values in the User model and find all where the id's match
      User.findAll({ where: { id: followers } })
        .then((followData) => {
          //map the refined followers array and return only the username
          const results = followData.map((follower) => follower.username);
          //send back the results
          res.status(200).send(results);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/api/play', (req, res) => { 
  return getTriviaQuestions(req.body)
    .then((questionsArr) => {
      res.status(200).send(questionsArr);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/play/highscore/:user_id', (req, res) => {
  const { id } = req.params;
  const { categoryScore } = req.body;
  console.log(categoryScore);
  User.increment(categoryScore, { where: { id: id } })
    .then((HS) => {
      console.log(HS);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Could not GET questions by user_id', err);
      res.sendStatus(500);
    });
});

module.exports = app;
