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

const {
  db, User, Question, Achievement, joinAchievement, joinFollower, FavoriteQuestion, 
} = require('./db/index');
const {
  getLeaderBoard, getTriviaQuestions, checkHighScores, checkTopCatScore, 
} = require('./dbHelpers/helpers');

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

// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

app.get('/protected', isLoggedIn, (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));

  // grab user's Google profile infor from req.user
  const googleProfile = req.user;

  // get the email from the Google profile
  const { email } = googleProfile;
  console.log('google profile', googleProfile);

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
  Question.findAll({ where: { user_id: user_id }, attributes: ['question', 'id'] })
    .then((questions) => {
      res.status(200);
      res.send(questions);
    })
    .catch((err) => {
      console.error('Could not GET questions by user_id', err);
    });
});

//patch a user's achievements by getting all the scores
app.patch('/api/join_achievements', (req, res) => {
  const categories = [
    ['Top Score', 'highscore'],
    ['Top Art Score', 'art_score'],
    ['Top Music Score', 'music_score'],
    ['Top Book Score', 'book_score'],
    ['Top Animals Score', 'animals_score'],
    ['Top Celebrities Score', 'celebrities_score'],
    ['Top Sports Score', 'sports_score'],
    ['Top Mythology Score', 'mythology_score'],
    ['Top History Score', 'history_score'],
    ['Top Nature Score', 'nature_score'],
    ['Top Politics Score', 'politics_score'],
  ];
  //get all users
  User.findAll()
    .then((users) => {
      // get all joined achievements
      joinAchievement.findAll({ attributes: ['user_id', 'achievement_id'] })
        .then((joinAchievements) => {
          checkHighScores(users, joinAchievements);
          categories.map((category) => checkTopCatScore(users, category[0], category[1]));
          res.status(200).send(joinAchievements);
        })
        .catch((err) => {
          console.error('Could not GET all joined achievements', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error('Could not GET all users', err);
      res.sendStatus(500);
    });
});

//get joined achievements
app.get('/api/join_achievements', (req, res) => {
  joinAchievement.findAll()
    .then((joined) => {
      res.status(200).send(joined);
    })
    .catch((err) => {
      console.error('Could not GET joined achievements', err);
      res.sendStatus(500);
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
      Achievement.findAll({ where: { id: achievements }, attributes: ['id', 'name'] })
        .then((userAchievements) => {
          res.status(200).send(userAchievements);
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

// get all the achievements => working in postman
app.get('/api/achievements', (req, res) => {
  Achievement.findAll()
    .then((achievements) => {
      res.status(200);
      res.send(achievements);
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
          const results = followData.map((follower) => [follower.id, follower.username]);
          //send back the results
          res.status(200).send(results);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//get favorite questions by user_id
app.get('/api/favorite_questions/:user_id', (req, res) => {
  // access the user_id field
  const { user_id } = req.params;
  // FavoriteQuestion model to find all of the user's favorite questions
  FavoriteQuestion.findAll({ where: { user_id: user_id }, attributes: ['question', 'id'] })
    .then((questions) => {
      // mapping through the question objects and returning the question string
      res.status(200);
      res.send(questions);
    })
    .catch((err) => {
      console.error('Could not GET questions by user_id', err);
      res.sendStatus(500);
    });
});

//delete request for user's favorite questions => working in postman
app.delete('/api/favorite_questions/:id', (req, res) => {
  const { id } = req.params;
  FavoriteQuestion.destroy({ where: { id: id } })
    .then((favQuestion) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Could not DELETE favorite question', err);
      res.sendStatus(500);
    });
});

//delete request for user's created questions => working in postman
app.delete('/api/questions/:id', (req, res) => {
  const { id } = req.params;
  Question.destroy({ where: { id: id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Could not DELETE user question', err);
      res.sendStatus(500);
    });
});

//delete request for followers => working in postman
app.delete('/api/join_followers/:following_user_id/:followed_user_id', (req, res) => {
  const { followed_user_id } = req.params;
  const { following_user_id } = req.params;
  joinFollower.destroy({ where: { following_user_id: following_user_id, followed_user_id: followed_user_id } })
    .then((follower) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Could not DELETE follower', err);
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
