/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [showQuestion, setShowQuestions] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswerSelection, setcorrectAnswerSelection] = useState(false);
  // const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  const onSubmitButton = () => {
    if (count === resDataQuestions.length - 2) {
      setNextButton(false);
      setSubmitButton(true);
    } 
  };

  const displayQuestion = (questions) => {
    console.log('score', score);
    const { question } = questions[count]; // need to decode this!
    const correctAnswer = [];
    correctAnswer.push(questions[count].correct_answer);
    console.log('correct A', correctAnswer);
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

    const setTrueFalse = (e) => {
      const selection = e.currentTarget.value;
      if (selection === questions[count].correct_answer) {
        console.log('correct');
        setcorrectAnswerSelection(true);
      } else {
        console.log('WRONG');
        setcorrectAnswerSelection(false);
      }
    };
    console.log(correctAnswerSelection);

    const setQuestionScore = () => {
      if (correctAnswerSelection === true) {
        setScore(score + 1);
      }
      setcorrectAnswerSelection(false);
    };

    return (
      <div className="Questions">
        <div className="Question">{question}</div>
        <input type="radio" id="Choice1" name="Choice" value={randomizedAnswers[0]} onClick={(e) => { setTrueFalse(e); }} /> 
        {randomizedAnswers[0]} 
        <br /> 
        <input type="radio" id="Choice2" name="Choice" value={randomizedAnswers[1]} onClick={(e) => { setTrueFalse(e); }} />  
        {randomizedAnswers[1]}
        <br /> 
        <input type="radio" id="Choice3" name="Choice" value={randomizedAnswers[2]} onClick={(e) => { setTrueFalse(e); }} />  
        {randomizedAnswers[2]} 
        <br /> 
        <input type="radio" id="Choice4" name="Choice" value={randomizedAnswers[3]} onClick={(e) => { setTrueFalse(e); }} />  
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
                    setQuestionScore();
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
        setShowQuestions(true);
        setShowScore(false);
        setScore(0);
        setResDataQuestions(response.data.results);
        console.log('GET trivia questions successful');
      })
      .catch((err) => console.error('GET trivia questions NOT successful', err));
  };

  const resetPlayStates = () => {
    setShowQuestions(false); 
    setShowScore(true); 
    setCount(0); 
    setSubmitButton(false); 
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
              <button type="button" onClick={() => { resetPlayStates(); }}>
                Submit Results
              </button>
            </div>
          )
          : null}
      </div>
      <div className="ShowScore">
        {showScore ? <div> You scored {score + 1} out of {resDataQuestions.length}; </div> : null}
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