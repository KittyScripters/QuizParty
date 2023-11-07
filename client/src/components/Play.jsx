/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [showQuestion, setQuestions] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  // const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  const onAnswerSelection = (e) => {
    const selection = e.currentTarget.value;
    if (selection === resDataQuestions[count].correct_answer) {
      console.log('correct');
      // setScore(score + 1);
    } else {
      console.log('WRONG');
    }
  };

  const onSubmitButton = () => {
    if (count === resDataQuestions.length - 2) {
      setNextButton(false);
      setSubmitButton(true);
    } 
  };

  const displayQuestion = (questions) => {
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

    return (
      <div className="Questions">
        <div className="Question">{question}</div>
        <input type="radio" id="Choice1" name="Choice" value={randomizedAnswers[0]} onChange={(e) => { onAnswerSelection(e); }} /> 
        {randomizedAnswers[0]} 
        <br /> 
        <input type="radio" id="Choice2" name="Choice" value={randomizedAnswers[1]} onChange={(e) => { onAnswerSelection(e); }} />  
        {randomizedAnswers[1]}
        <br /> 
        <input type="radio" id="Choice3" name="Choice" value={randomizedAnswers[2]} onChange={(e) => { onAnswerSelection(e); }} />  
        {randomizedAnswers[2]} 
        <br /> 
        <input type="radio" id="Choice4" name="Choice" value={randomizedAnswers[3]} onChange={(e) => { onAnswerSelection(e); }} />  
        {randomizedAnswers[3]}
        <br /> 
        <div className="NextButton">
          {nextButton
            ? (
              <div> 
                <button
                  type="button"
                  onClick={(e) => { 
                    updateCount(); 
                    displayQuestion(questions); 
                    resetRadioButton(); 
                    onSubmitButton();
                    onAnswerSelection(e);
                  }}
                > Next 
                </button>  
              </div>
            )
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
    <div className="MainPlay">
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
          ? (
            <div>
              <b>Question {count + 1} of {resDataQuestions.length}</b><br />
              {displayQuestion(resDataQuestions)}
            </div>
          )
          : null}  
      </div>
      <div className="HandleSubmit">
        {submitButton
          ? (
            <div> 
              <button type="button" onClick={() => { setQuestions(false); setShowScore(true); setSubmitButton(false); console.log('how do I exit this view and render the play page'); }}>
                Submit Results
              </button>
            </div>
          )
          : null}
      </div>
      <div className="ShowScore">
        {showScore ? <div> You scored {score} out of {resDataQuestions.length}; </div> : null}
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