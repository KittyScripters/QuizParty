import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  // const [currentQuestion, setCurrentQuestion] = useState({});
  const [count, setCount] = useState(0);
  const [showQuestion, setQuestions] = useState(false);
  const [showSubmit, setSubmit] = useState(false);

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  const displayQuestion = (questions) => {
    console.log(count);

    const { question } = questions[count]; // need to decode this!
    const correctAnswer = [];
    correctAnswer.push(questions[count].correct_answer);
    const wrongAnswers = questions[count].incorrect_answers;
    const combinedAnswers = correctAnswer.concat(wrongAnswers);
   
    const randomizedAnswers = combinedAnswers.sort(() => Math.random() - 0.5);

    const updateCount = () => {
      setCount(count + 1);
    };

    const resetRadioButton = () => {
      ['Choice1', 'Choice2', 'Choice3', 'Choice4'].forEach((id) => {
        document.getElementById(id).checked = false;
      });
      return false;
    };

    const handleQuizSubmit = () => {
      if (count === questions.length - 2) {
        setSubmit(true);
        // alert('congrats ur done'); 
      }
    };

    return (
      <div className="Questions">
        <div className="Question">{question}</div>
        <input type="radio" id="Choice1" name="Choice" /> 
        {randomizedAnswers[0]} 
        <br /> 
        <input type="radio" id="Choice2" name="Choice" /> 
        {randomizedAnswers[1]}
        <br /> 
        <input type="radio" id="Choice3" name="Choice" /> 
        {randomizedAnswers[2]} 
        <br /> 
        <input type="radio" id="Choice4" name="Choice" /> 
        {randomizedAnswers[3]}
        <br /> 
        <button
          type="button"
          onClick={() => { 
            updateCount(); 
            displayQuestion(questions); 
            resetRadioButton(); 
            handleQuizSubmit();
          }}
        >
          Next
        </button>
        <div className="HandleSubmit">
          {showSubmit
            ? <button type="button"> Submit Results </button>
            : null}
        </div>
      </div>
    );
  };

  const handlePlayClick = () => { // NOTE 1
    axios.post('/api/play', { options: { category, difficulty } })
      .then((response) => {
        setQuestions(true);
        setResDataQuestions(response.data.results);
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