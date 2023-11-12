/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Outlet, useLoaderData } from 'react-router-dom';
import Confetti from 'react-confetti';
import NavBar from './NavBar';

const he = require('he'); // this decodes the encoded result from the api call

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
  const [partyHatSpin, setPartyHatSpin] = useState(false);

  // loader data brings in live data from the google oauth
  const userData = useLoaderData();
  const userId = userData.id;

  // sets category state based on dropdown selection
  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };
  
  // sets difficulty state based on dropdown selection
  const onDifficultySelection = (event, dynamicValue) => {
    setDifficulty(dynamicValue || event.currentTarget.value);
  };
  
  // randomize function to shuffle the response answers
  const randomizeAnswers = (resDataQ) => {
    const correctAnswer = [];
    correctAnswer.push(he.decode(resDataQ.correct_answer));
    console.log('correct A', correctAnswer);

    const wrongAnswers = resDataQ.incorrect_answers.map((answer) => he.decode(answer));
    const combinedAnswers = correctAnswer.concat(wrongAnswers);
    
    const randomizedAnswers = combinedAnswers.sort(() => Math.random() - 0.5);
    setRandomAnswers(randomizedAnswers); 
  };

  // conditionally removes the next button and replaces it with the submit button
  const onSubmitButton = () => {
    if (count === resDataQuestions.length - 2) {
      setNextButton(false);
      setSubmitButton(true);
    } 
  };
  
  // sets score state based on correctAnswer state
  const updateQuestionScore = () => {
    if (correctAnswerSelection === true) {
      setScore(score + 1);
    }
    setcorrectAnswerSelection(false);
  };
  
  // this resets all the states used to play the game at the end
  const resetPlayStates = () => {
    setShowQuestions(false); 
    setShowScore(true); 
    setCount(0); 
    setSubmitButton(false); 
    setNextButton(true);
    setFavoritesButton(false);
  };
  
  // handles the confetti at the end of the game!
  const handleCelebrate = () => {
    setCelebrate(true);
    setPartyHatSpin(true); // enable spinning
    setTimeout(() => {
      setCelebrate(false);
      setPartyHatSpin(false); // disable spinning
    }, 6000);
  };

  // allows the user to play the quizes they made in QuestionBuilder
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
  
  // displays the question after start button/ handlePlayClick is called
  const displayQuestion = (questions, answers) => {
    // starts with one question from the array and decodes it
    const { question } = questions[count];
    const questionDecoded = he.decode(question);
    
    //used to track the index in the array of the questions
    const updateCount = () => {
      setCount(count + 1);
    };
    
    //sets T/F state for the selected answer so updateQuestionScore can determine score 
    const setTrueFalse = (e) => {
      const selection = e.currentTarget.value;
      console.log('selection', selection);
      if (selection === questions[count].correct_answer) {
        setcorrectAnswerSelection(true);
      } else {
        setcorrectAnswerSelection(false);
      }
    };

    // adds the clicked favorite question to the DB
    const addToFavorites = () => {
      axios.post(`/play/favoriteQuestions/${userId}`, {
        favQuestion: question,
      })
        .then(() => console.log('Updated db with fav question'))
        .catch((err) => console.error('Failed to update db with fav question', err));
    };

    // resets the selected radio button after Next button is clicked
    const resetRadioButton = () => {
      ['Choice1', 'Choice2', 'Choice3', 'Choice4'].forEach((id) => {
        document.getElementById(id).checked = false;
      });
      return false;
    };

    /*
    this section of HTML is inserted below the intro HTML for the main component
    there are radio buttons, then the next/submit button, then the favorite questions buttons that are all conditionally rendered
    */
    return ( 
      <div id="Question" className="card mx-auto w-75 text-center">
        <div className="card-body">
          <h3 className="card-title">Question {count + 1} of {questions.length}</h3>
          <h5 className="card-subtitle">{category} || {difficulty}</h5><br /> 
          <div>{questionDecoded}</div> 
          <br />
          <div id="buttonAnswers" className="btn-group btn-group-lg" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="choice" id="Choice1" value={answers[0]} onClick={(e) => { setTrueFalse(e); }} autoComplete="off" /> 
            <label className="btn" htmlFor="Choice1">{answers[0]} </label>
            <br /> 
            <input type="radio" className="btn-check" name="choice" id="Choice2" value={answers[1]} onClick={(e) => { setTrueFalse(e); }} autoComplete="off" /> 
            <label className="btn" htmlFor="Choice2">{answers[1]} </label>
            <br /> 
            <input type="radio" className="btn-check" name="choice" id="Choice3" value={answers[2]} onClick={(e) => { setTrueFalse(e); }} autoComplete="off" /> 
            <label className="btn" htmlFor="Choice3">{answers[2]} </label>
            <br />
            <input type="radio" className="btn-check" name="choice" id="Choice4" value={answers[3]} onClick={(e) => { setTrueFalse(e); }} autoComplete="off" /> 
            <label className="btn" htmlFor="Choice4">{answers[3]} </label>
            <br />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div id="favoriteButton">
            {favoritesButton
              ? (
                <div className="p-2"> 
                  <button type="button" className="btn btn-warning btn-lg" onClick={() => addToFavorites()}>
                    Add Question To Your Favorites
                  </button>
                </div>
              )
              : null}
          </div><br />
          <div id="nextButton">
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
          <div id="submitButton">
            {submitButton 
              ? (
                <div className="p-2"> 
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
        </div>
      </div>
    );
  };

  // handles the get request to the API and sets the states to begin playing the game
  const handlePlayClick = () => { 
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
   
  // Increases highscore in DB based on difficulty after completing the quiz if all 5 answers were correct
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
  }, [score]);
    
  //increasing highscore in DB for category after completing the quiz if all 5 answers were correct
  useEffect(() => {
    const categoryLC = category.toLowerCase();
    if (score === 5) {
      axios.put(`/play/categoryCount/${userId}`, { categoryScore: `${categoryLC}_score` })
        .then(() => console.log('updated category highscore by 1'))
        .catch((err) => console.error('update category highscore failed', err));
    }
  }, [score]);

  return ( //this is the return for the main Play component. the elements are all conditionally rendered depening on state 
    <div>
      {celebrate && <Confetti />}
     
      <NavBar partyHatSpin={partyHatSpin} />
      
      {celebrate && (
        <div>
          <img
            src="https://media.giphy.com/media/9spEM3yKJX0KARBobq/giphy.gif"
            alt="Celebration GIF"
            width="200"
            height="200"
            style={{ display: 'block', margin: '0 auto' }}
          />
        </div>
      )}

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
              <div className="dropdown">
                <button
                  className="btn btn-warning dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* if category is empty, render category, else render the selected category */}
                  {category === '' ? 'Category' : category}
                </button>
                {/* drop down menu, each item is an on click button that sets category*/}
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Animals')}>Animals</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Art')}>Art</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Books')}>Books</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Celebrities')}>Celebrities</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('History')}>History</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Music')}>Music</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Mythology')}>Mythology</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Nature')}>Nature</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Politics')}>Politics</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => setCategory('Sports')}>Sports</button></li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-warning dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* if difficulty is empty, render Difficulty, else render the selected difficulty */}
                  {difficulty === '' ? 'Difficulty' : difficulty}
                </button>
                {/* drop down menu, each item is an on click button that sets difficulty*/}
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li><button className="dropdown-item" type="button" onClick={() => setDifficulty('Easy')}>Easy</button></li> 
                  <li><button className="dropdown-item" type="button" onClick={() => setDifficulty('Medium')}>Medium</button></li> 
                  <li><button className="dropdown-item" type="button" onClick={() => setDifficulty('Hard')}>Hard</button></li> 
                </ul>
              </div>
              <button
                type="button"
                id="play-btn"
                className="btn btn-warning btn-lg"
                onClick={() => handlePlayClick()}
              >Play!
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
