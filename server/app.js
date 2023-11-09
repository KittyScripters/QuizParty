/* eslint-disable func-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const session = require('express-session');
const passport = require('passport');
require('./auth');
const path = require('path');


const { db, User, Question, Achievement, joinAchievement, joinFollower } = require('./db/index');
const { getLeaderBoard, getTriviaQuestions } = require('./dbHelpers/helpers');

const clientPath = path.resolve(__dirname, '../client/dist');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// use json parser middleware
app.use(express.json());
// serve up the site using express.static and passing in the clientpath
app.use(express.static(clientPath));
// test get renders our index page

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));

  // grab user's Google profile infor from req.user
  const googleProfile = req.user;

  // get the email from the Google profile
  const { email } = googleProfile;

  // Check if a user with the same email already exists in database
  User.findOne({ where: { username: email } }) 
    .then((existingUser) => {
      if (existingUser) {
        console.log('User already exists');
      } else {
        // create a new user in the database with the username set to the email
        User.create({
          username: email,
          firstname: googleProfile.name.givenName,
          lastname: googleProfile.name.familyName,
        })
          .then((newUser) => {
            console.log(newUser, 'created successfully');
          })
          .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
          });
      }
    })
    .catch((error) => {
      console.error('Error checking existing user:', error);
      res.status(500).send('Error checking existing user');
    });
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  }), 
  (req, res) => {
    // set the current user id
    req.session.userId = req.user.id; 

    // redirect to the protected 
    res.redirect('/protected');
  },
);

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
    }
    req.session.destroy((error) => {
      if (error) {
        console.error('Error destroying session:', error);
      }
      res.send('Goodbye!');
    });
  });
});

//get the leaderboard from the database
app.get('/api/leaderboard', (req, res) => {
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

app.post('/follow/:userId', isLoggedIn, (req, res) => {
  const { userId } = req.params;
  console.log('this is user id', req.user.email);
  console.log('this is curr user id', userId);

  User.findOne({
    where: {
      username: req.user.email,
    }, 
  })
    .then((data) => {
      joinFollower.create({
        followed_user_id: userId, 
        following_user_id: data.id,    
      })
        .then(() => {
          res.status(200).send('You are now following the user');
        })
        .catch((err) => {
          console.error('Error following user:', err);
          res.status(500).send('Error following user');
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/current-user', (req, res) => {
  if (req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.json({ userId: null });
  }
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
      console.error('Error in getUserQuizNames:', err); 
      res.sendStatus(500).json({ error: 'server side error getting quiz names' });
    });
});

app.post('/retrieveUserQuiz/:userId', (req, res) => {
  const { userId } = req.params;
  const { question_set } = req.body;
  Question.findAll({
    where: {
      question_set: question_set,
      user_id: userId,
    },
  })
    .then((questions) => {
      console.log('qs in server: ', questions);
      const questionsArray = questions.map((question) => question.dataValues);
      res.send(questionsArray);
    })
    .catch((err) => { 
      console.error('Error in retrieveUserQuiz:', err); 
      res.sendStatus(500).json({ error: 'server side error getting user quiz' });
    });
});

app.patch('/updateUserQuiz/:userId', (req, res) => {
  const { userId } = req.params;
  const editedQuestions = req.body;
  Question.bulkCreate(editedQuestions, {
    updateOnDuplicate: ['question', 'correct_answer', 'incorrect_answer_1', 'incorrect_answer_2', 'incorrect_answer_3'],
  })
    .then(() => {
      console.log('data upsdate as:', editedQuestions);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Server-side error updating questions: ', err);
      res.sendStatus(500);
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
      console.log(achievements);
      Achievement.findAll({ where: { id: achievements } })
        .then((thing) => {
          const results = thing.map((result) => result.name);
          console.log(results);
          res.send(results);
        });
    })
    // .then((data) => {
    //   console.log('serverside ach:', data);
    //   res.status(200);
    //   res.send(data);
    // })
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

//MAKE SURE THIS IS LAST
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

module.exports = app;
