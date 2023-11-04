const { db } = require('./index');

db.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Database synchronization error: ', err);
  });