/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
const express = require('express');
const path = require('path');
const {
  db, User, Question, Achievement, FavoriteQuestion, 
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

//get achievements id with user's id => works in postman
app.get('/api/join_achievements/:user_id', (req, res) => {
  const { user_id } = req.params;
  joinAchievement.findAll({ where: { user_id: user_id } })
    .then((achievements) => {
      res.status(200);
      res.send(achievements);
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

//get followers by id
app.get('/api/join_followers/:following_user_id', (req, res) => {
  const { following_user_id } = req.params;
  joinFollower.findAll({ where: { following_user_id: following_user_id } })
    .then((followers) => {
      res.status(200).send(followers);
    })
    .catch((err) => {
      console.error('Could not GET users', err);
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

app.post('/play/favoriteQuestions/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { favQuestion } = req.body;

  FavoriteQuestion.create({ question: favQuestion, user_id: user_id })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Could not update fav questions by user_id', err);
      res.sendStatus(500);
    });
});

app.put('/play/categoryCount/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { categoryScore } = req.body;

  User.increment(categoryScore, { where: { id: user_id } })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Could not update category count by user_id', err);
      res.sendStatus(500);
    });
});

app.put('/play/highscore/easy/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { highScore } = req.body;

  User.increment(highScore, { where: { id: user_id } })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Could not update easy highscore by user_id', err);
      res.sendStatus(500);
    });
});

app.put('/play/highscore/medium/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { highScore } = req.body;

  User.increment(highScore, { by: 2, where: { id: user_id } })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Could not update med highscore by user_id', err);
      res.sendStatus(500);
    });
});

app.put('/play/highscore/hard/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { highScore } = req.body;

  User.increment(highScore, { by: 3, where: { id: user_id } })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('Could not update hard highscore by user_id', err);
      res.sendStatus(500);
    });
});
module.exports = app;
