import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questions, setQuestions] = useState(false);
  // count + 1 

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  const displayQuestion = (question) => {
    console.log(question);
    /*
    create randomize function
    map array/ zip???? shuffle the array https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    compare correct answer to correct answer and figure color/hooray
  */
    return (
      <div className="Questions">
        <div className="Question">{question.question}</div>
        <div className="Choice1">{question.correct_answer}</div> 
        <div className="Choice2">{question.incorrect_answers[0]}</div> 
        <div className="Choice3">{question.incorrect_answers[1]}</div> 
        <div className="Choice4">{question.incorrect_answers[2]}</div> 
        <button type="button">Next</button>
      </div>
    );
  };

  const handlePlayClick = () => { // NOTE 1
    axios.post('/api/play', { options: { category, difficulty } })
      .then((response) => {
        setQuestions(true);
        setResDataQuestions(response.data.results);
        setCurrentQuestion(response.data.results[0]);
        console.log('GET trivia questions successful');
      })
      .catch((err) => console.error('GET trivia questions NOT successful', err));
  };

  // const nextQuestion = () => {

  // };

  return (
    <div>
      <h3>Choose your Category and Difficulty Level</h3>
      <select name="Category" id="Cat" onChange={(event) => onCategorySelection(event)}>
        <option>Category</option>
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
        <option>Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button type="button" onClick={() => handlePlayClick()}>Play!</button>
      <div className="Questions">
        {questions
          ? displayQuestion(currentQuestion)
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