import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [count, setCount] = useState(0);
  const [showQuestion, setQuestions] = useState(false);

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  // const nextQuestion = () => {
  //   setCurrentQuestion(resDataQuestions[1]);
  //   displayQuestion(currentQuestion);
  // }

  const displayQuestion = (questions) => {
    console.log(questions);

    const updateCount = () => {
      setCount(count + 1);
    };
    /*
    create randomize function
    map array/ zip???? shuffle the array https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    compare correct answer to correct answer and figure color/hooray
  */
    return (
      <div className="Questions">
        <div className="Question">{questions[count].question}</div>
        <input type="radio" id="Choice1" name="Choice" /> 
        {questions[count].correct_answer} 
        <br /> 
        <input type="radio" id="Choice2" name="Choice" /> 
        {questions[count].incorrect_answers[0]}
        <br /> 
        <input type="radio" id="Choice3" name="Choice" /> 
        {questions[count].incorrect_answers[1]} 
        <br /> 
        <input type="radio" id="Choice4" name="Choice" /> 
        {questions[count].incorrect_answers[2]}
        <br /> 
        <button
          type="button"
          onClick={() => { updateCount(); displayQuestion(questions); }}
        >
          Next
        </button>
      </div>
    );
  };

  const handlePlayClick = () => { // NOTE 1
    axios.post('/api/play', { options: { category, difficulty } })
      .then((response) => {
        setQuestions(true);
        setResDataQuestions(response.data.results);
        // setCurrentQuestion(response.data.results[0]);
        console.log('GET trivia questions successful');
      })
      .catch((err) => console.error('GET trivia questions NOT successful', err));
  };

  return (
    <div>
      <h3>Choose your Category and Difficulty Level</h3>
      <select name="Category" id="Cat" onChange={(event) => onCategorySelection(event)}>
        {/* <option>Category</option> */}
        <option>Animals</option>
        <option>Art</option>
        <option>Books</option>
        <option>Celebrities</option>
        <option>History</option>
        <option>Music</option>
        <option>Mythology</option>
        <option>Nature</option>
        <option>Politics</option>
        <option>Sports</option>
      </select>
      <select name="Difficulty" id="Difficulty" onChange={(event) => onDifficultySelection(event)}>
        {/* <option>Difficulty</option> */}
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button type="button" onClick={() => handlePlayClick()}>Play!</button>
      <div className="Questions">
        {showQuestion
          ? displayQuestion(resDataQuestions)
          : null}  
      </div>
          
    </div>
  );
};

export default Play;

/*  NOTES:
  1. This has to be a post request instead of get bc I need to pass an obj with the 
  parameters that the api search needs. You can't use a get request with a req.body
  You can only send params and those are for the URL... not what I needed. 

*/