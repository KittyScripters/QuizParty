const axios = require('axios');

const triviaCategories = [
  { id: 10, name: 'Books' },
  { id: 12, name: 'Music' },
  { id: 17, name: 'Nature' },
  { id: 20, name: 'Mythology' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 25, name: 'Art' },
  { id: 26, name: 'Celebrities' },
  { id: 27, name: 'Animals' },
];

const getTrivaQuestions = (req) => {
  // add in logic to change string value to number value for category and difficulty
  // https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple

  const { category } = req.options;
  const { difficulty } = req.options;

  const lowerCaseDiff = difficulty.toLowerCase();
  let categoryNum = 0;

  for (let i = 0; i < triviaCategories.length; i++) {
    console.log(triviaCategories[i]);
    if (triviaCategories[i].name === category) {
      categoryNum = triviaCategories[i].id;
    }
  }

  return axios.get(
    `https://opentdb.com/api.php?amount=5&category=${categoryNum}&difficulty=${lowerCaseDiff}&type=multiple`, 
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      }, 
    },
  )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};


module.exports = getTrivaQuestions;