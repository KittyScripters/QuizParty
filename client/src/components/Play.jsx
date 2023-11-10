/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [showModal, setShowModal] = useState(false);
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
  
  const displayQuestion = (questions, answers) => {
    const { question } = questions[count];
    const questionDecoded = he.decode(question);
    
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
      <div id="Question">
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
        <br /> 
        <div className="d-flex">
          <div id="NextButton">
            {nextButton
              ? (
                <div className="p-2 "> 
                  <br /> 
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
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
            <div id="Favorites">
              {favoritesButton
                ? (
                  <div className="ml-auto p-2"> 
                    <button type="button" className="btn btn-warning btn-sm" onClick={() => addToFavorites()}>
                      Add Question To Favorites
                    </button>
                  </div>
                )
                : null}
            </div><br />
          </div>
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
        .catch((err) => console.error('update category highscore failed', err));
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  // Function to handle when the modal should be closed
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
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
        </button> <br /><br /><br />
      </div> 
      <div id="Questions" className="container-sm">
        {showQuestion
          ? (
            <div>
              <b>Question {count + 1} of {resDataQuestions.length}</b><br />
              { displayQuestion(resDataQuestions, randomAnswers) }
            </div>
          )
          : null}  
        <div className="HandleSubmit">
          {submitButton
            ? (
              <div> 
                <button
                  type="button"
                  className="btn btn-warning btn-lg" 
                  onClick={() => {
                    updateHighScore(); 
                    updateCategoryHighScore(); 
                    resetPlayStates(); 
                    //openModal();
                    //scoreModal();
                  }}
                >
                  Submit Results
                </button><br />
              </div>
            )
            : null}

        </div>
        <div id="scores" className="container-sm text-center">
          {showScore ? <div>You scored {score + 1} out of {resDataQuestions.length}</div> : null}
          {highScore ? <div> Congrats! New high score! </div> : null}
        </div>
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

// const scoreModal = () => {  
//   return (
//     <div className="modal fade" id="scoreModal" tabIndex="-1" aria-labelledby="scoreModalLabel" aria-hidden="true">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h1 className="modal-title fs-5" id="scoreModalLabel">Modal title</h1>
//           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//         </div>
//         <div className="modal-body">
//           ...
//         </div>
//         <div className="modal-footer">
//           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//           <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Play again</button>
//         </div>
//       </div>
//     </div>
//   );
// };