/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Outlet, useLoaderData } from 'react-router-dom';
import Confetti from 'react-confetti';
import NavBar from './NavBar';

const he = require('he');

const Play = () => {
  const location = useLocation();
  const quizData = location.state?.quizData; 
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
  const [celebrate, setCelebrate] = useState(false);

  const userData = useLoaderData();
  const userId = userData.id;

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
    correctAnswer.push(he.decode(resDataQ.correct_answer));
    console.log('correct A', correctAnswer);

    const wrongAnswers = resDataQ.incorrect_answers.map((answer) => he.decode(answer));
    const combinedAnswers = correctAnswer.concat(wrongAnswers);
    
    const randomizedAnswers = combinedAnswers.sort(() => Math.random() - 0.5);
    setRandomAnswers(randomizedAnswers); 
  };
  
  useEffect(() => {
    if (quizData) {
      const transformedData = quizData.map((question) => ({
        category: 'user created',
        difficulty: 'not applicable',
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: [
          question.incorrect_answer_1, 
          question.incorrect_answer_2, 
          question.incorrect_answer_3,
        ],
        type: 'multiple',
      }));
      onSubmitButton();
      setShowQuestions(true);
      setShowScore(false);
      setHighScore(false);
      setScore(0);
      setFavoritesButton(true);
      setResDataQuestions(transformedData);
      randomizeAnswers(transformedData[count]);
    }
  }, []);

  const updateQuestionScore = () => {
    if (correctAnswerSelection === true) {
      setScore(score + 1);
    }
    setcorrectAnswerSelection(false);
  };
  
  const resetPlayStates = () => {
    if (quizData) {
      console.log('bye');
    }
    setShowQuestions(false); 
    setShowScore(true); 
    setCount(0); 
    setSubmitButton(false); 
    setNextButton(true);
    setFavoritesButton(false);
  };
  
  const handleCelebrate = () => {
    setCelebrate(true);
    setTimeout(() => {
      setCelebrate(false);
    }, 6000);
  };

  const displayQuestion = (questions, answers) => {
    const { question } = questions[count];
    const questionDecoded = he.decode(question);
    
    const updateCount = () => {
      setCount(count + 1);
    };
    
    const setTrueFalse = (e) => {
      const selection = e.currentTarget.value;
      console.log('selection', selection);
      if (selection === questions[count].correct_answer) {
        setcorrectAnswerSelection(true);
      } else {
        setcorrectAnswerSelection(false);
      }
    };

    const addToFavorites = () => {
      axios.post(`/play/favoriteQuestions/${userId}`, {
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
      <div id="Question" className="card mx-auto w-75">
        <div className="card-body">
          <h3 className="card-title">Question {count + 1} of {questions.length}</h3>
          <h5 className="card-subtitle">{category} || {difficulty}</h5><br /> 
          <div>{questionDecoded}</div> 
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
        </div>
        <br /> 
        <div className="d-flex flex-row mb-3">
          <div id="Buttons">
            {nextButton
              ? (
                <div className="p-2"> 
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={() => { 
                      updateCount(); 
                      randomizeAnswers(questions[count + 1]);
                      displayQuestion(questions, answers); 
                      resetRadioButton(); 
                      onSubmitButton();
                      updateQuestionScore();
                    }}
                  > Next Question
                  </button>  
                </div>
              )
              : null}
          </div>
          <div className="p-2">
            {submitButton 
              ? (
                <div> 
                  <button
                    type="button"
                    className="btn btn-warning btn-lg" 
                    onClick={() => {
                      updateQuestionScore();
                      handleCelebrate();
                      resetPlayStates();
                    }}
                  >
                    Submit Results
                  </button><br />
                </div>
              )
              : null}
          </div>
          <div id="Favorites">
            {favoritesButton
              ? (
                <div className="ml-auto p-2"> 
                  <button type="button" className="btn btn-warning btn-lg" onClick={() => addToFavorites()}>
                    Add Question To Your Favorites
                  </button>
                </div>
              )
              : null}
          </div><br />
        </div>
      </div>
    );
  };

  const handlePlayClick = () => { // NOTE 1
    if (category !== '' && difficulty !== '') {
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
    } else {
      alert('Please select a category and difficulty to start playing!');
    } 
  };
 
  // increasing highscore based on difficulty!! 
  //(can also increase category score based on completion)
  useEffect(() => {
    if (difficulty === 'Easy' && score === 5) {
      axios.put(`/play/highscore/easy/${userId}`, {
        highScore: 'highscore',
      })
        .then(() => {
          console.log('highscore increased by 1');
          setHighScore(true);
        })
        .catch((err) => console.error('update easy highscore failed', err));
    }

    if (difficulty === 'Medium' && score === 5) {
      axios.put(`/play/highscore/medium/${userId}`, { highScore: 'highscore' })
        .then(() => {
          console.log('highscore increased by 2');
          setHighScore(true);
        })
        .catch((err) => console.error('update med highscore failed', err));
    }

    if (difficulty === 'Hard' && score === 5) {
      axios.put(`/play/highscore/hard/${userId}`, { highScore: 'highscore' })
        .then(() => {
          console.log('highscore increased by 3');
          setHighScore(true);
        })
        .catch((err) => console.error('update hard highscore failed', err));
    }
  // }
  }, [score]);

  //this is increasing the count if the game set has been completed!!! not if all correct
  useEffect(() => {
    const categoryLC = category.toLowerCase();
    if (score === 5) {
      axios.put(`/play/categoryCount/${userId}`, { categoryScore: `${categoryLC}_score` })
        .then(() => console.log('updated category highscore by 1'))
        .catch((err) => console.error('update category highscore failed', err));
    }
  }, [score]);
  
  return (
    <div>
      {celebrate && <Confetti />}
      <div className="navbar">
        <NavBar />
      </div>
      <div id="Questions" className="container-sm">
        {showQuestion
          ? (
            <div>
              { displayQuestion(resDataQuestions, randomAnswers) }
            </div>
          )
          : (
            <div id="MainPlay" className="container-sm text-center">
              <h2>Ready to Play?</h2>
              <p>Each game set will have 5 questions.</p> 
              <p>Answer all 5 correctly from any category to add to your highscore.</p>
              <p>When you are finished, reselect categories and difficulty and try again!</p> 
              <p>Hint: The harder the questions, the higher your highscore increases. </p>
              <h4>Select your Category and Difficulty Level Below:</h4>
              <select name="Category" id="Cat" onClick={(event) => onCategorySelection(event)}>
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
              <select name="Difficulty" id="Difficulty" onClick={(event) => onDifficultySelection(event)}>
                <option>Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select> <br /><br />
              <button
                type="button"
                className="btn btn-warning btn-lg"
                onClick={() => handlePlayClick()}
              >Start!
              </button> <br /><br />
            </div> 
          )}  
        <div id="scores" className="container-sm text-center">
          {showScore ? <div> You scored {score} out of {resDataQuestions.length}</div> : null}
          {highScore ? <div> Congrats! New high score! </div> : null}
        </div>
      </div>
    </div>
  );
};

export default Play;
