/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [resDataQuestions, setResDataQuestions] = useState([]);
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [showQuestion, setShowQuestions] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(false);
  const [correctAnswerSelection, setcorrectAnswerSelection] = useState(false);
  const [favoritesButton, setFavoritesButton] = useState(false);
  // const [playAgainButton, setPlayAgainButton] = useState(false)
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

  const randomizeAnswers = (resDataQ) => {
    const correctAnswer = [];
    correctAnswer.push(resDataQ.correct_answer);
    console.log('correct A', correctAnswer);
    const wrongAnswers = resDataQ.incorrect_answers;
    const combinedAnswers = correctAnswer.concat(wrongAnswers);
   
    const randomizedAnswers = combinedAnswers.sort(() => Math.random() - 0.5);
    setRandomAnswers(randomizedAnswers); // this is not updating! 
  };

  const displayQuestion = (questions, answers) => {
    const { question } = questions[count]; // need to decode this!
    
    const updateCount = () => {
      setCount(count + 1);
    };

    const setTrueFalse = (e) => {
      const selection = e.currentTarget.value;
      if (selection === questions[count].correct_answer) {
        setcorrectAnswerSelection(true);
      } else {
        setcorrectAnswerSelection(false);
      }
    };
  
    const setQuestionScore = () => {
      if (correctAnswerSelection === true) {
        setScore(score + 1);
      }
      setcorrectAnswerSelection(false);
    };

    const addToFavorites = () => {
      axios.post(`/play/favoriteQuestions/${2}`, {
        favQuestion: question,
      })
        .then(() => console.log('Updated db with fav question'))
        .catch((err) => console.error('Failed to update db with fav question', err));
    };

    const resetRadioButton = () => {
      ['Choice1', 'Choice2', 'Choice3', 'Choice4'].forEach((id) => {
        document.getElementById(id).checked = false;
      });
      return false;
    };

    return ( // map this out instead
      <div className="Questions">
        <div className="Question">{question}</div> 
        <input type="radio" id="Choice1" name="Choice" value={answers[0]} onClick={(e) => { setTrueFalse(e); }} /> 
        {answers[0]} 
        <br /> 
        <input type="radio" id="Choice2" name="Choice" value={answers[1]} onClick={(e) => { setTrueFalse(e); }} />  
        {answers[1]}
        <br /> 
        <input type="radio" id="Choice3" name="Choice" value={answers[2]} onClick={(e) => { setTrueFalse(e); }} />  
        {answers[2]} 
        <br /> 
        <input type="radio" id="Choice4" name="Choice" value={answers[3]} onClick={(e) => { setTrueFalse(e); }} />  
        {answers[3]}
        <br /> 
        <div className="Favorites">
          {favoritesButton
            ? (
              <div> 
                <button type="button" onClick={() => addToFavorites()}>
                  Add Question To Favorites
                </button>
              </div>
            )
            : null}
        </div>
        <div className="NextButton">
          {nextButton
            ? (
              <div> 
                <button
                  type="button"
                  onClick={() => { 
                    updateCount(); 
                    randomizeAnswers(questions[count + 1]);
                    displayQuestion(questions, answers); 
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
        setHighScore(false);
        setScore(0);
        setFavoritesButton(true);
        setResDataQuestions(response.data.results);
        randomizeAnswers(response.data.results[count]);
      })
      .catch((err) => console.error('GET trivia questions NOT successful', err));
  };

  const resetPlayStates = () => {
    setShowQuestions(false); 
    setShowScore(true); 
    setCount(0); 
    setSubmitButton(false); 
    setNextButton(true);
    setFavoritesButton(false);
  };
 
  // increasing highscore based on difficulty!! 
  //(can also increase category score based on completion)
  const updateHighScore = () => {
    if (difficulty === 'Easy' && (score + 1) === 5) {
      axios.put(`/play/highscore/easy/${1}`, {
        highScore: 'highscore',
      })
        .then(() => {
          console.log('highscore increased by 1');
          setHighScore(true);
        })
        .catch((err) => console.error('update easy highscore failed', err));
    }

    if (difficulty === 'Medium' && (score + 1) === 5) {
      axios.put(`/play/highscore/medium/${1}`, { highScore: 'highscore' })
        .then(() => {
          console.log('highscore increased by 2');
          setHighScore(true);
        })
        .catch((err) => console.error('update med highscore failed', err));
    }

    if (difficulty === 'Hard' && (score + 1) === 5) {
      axios.put(`/play/highscore/hard/${1}`, { highScore: 'highscore' })
        .then(() => {
          console.log('highscore increased by 3');
          setHighScore(true);
        })
        .catch((err) => console.error('update hard highscore failed', err));
    }
  };
  
  //this is increasing the count if the game set has been completed!!! not if all correct
  const updateCategoryHighScore = () => {
    const categoryLC = category.toLowerCase();
    if ((score + 1) === 5) {
      axios.put(`/play/categoryCount/${1}`, { categoryScore: `${categoryLC}_score` })
        .then(() => console.log('category highscore by 1'))
        .catch((err) => console.error('GET trivia questions NOT successful', err));
    }
  };

  return (
    <div id="MainPlay" className="container-fluid">
      <h2>Ready to Play?</h2>
      <p>Each game set will have 5 questions.</p> 
      <p>Answer all 5 correctly from any category to add to your highscore.</p>
      <p>When you are finished, reselect categories and difficulty and try again!</p> 
      <p>Hint: The harder the questions, the higher your highscore increases. </p>
      <h4>Select your Category and Difficulty Level Below:</h4>
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
      <button type="button" onClick={() => handlePlayClick()}>Start!</button>
      <div className="Questions">
        {showQuestion
          ? (
            <div>
              <b>Question {count + 1} of {resDataQuestions.length}</b><br />
              { displayQuestion(resDataQuestions, randomAnswers) }
            </div>
          )
          : null}  
      </div>      
      <div className="HandleSubmit">
        {submitButton
          ? (
            <div> 
              <button type="button" onClick={() => { updateHighScore(); updateCategoryHighScore(); resetPlayStates(); }}>
                Submit Results
              </button>
            </div>
          )
          : null}
      </div>
      <div className="ShowScore">
        {showScore ? <div>You scored {score + 1} out of {resDataQuestions.length}</div> : null}
        {highScore ? <div> Congrats! New high score! </div> : null}
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