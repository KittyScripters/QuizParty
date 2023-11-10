import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';

const YourQuizzes = ({ userId = 1 }) => {
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [quizNames, setQuizNames] = useState([]);
  const navigate = useNavigate();
  
  const getQuizNames = () => {
    axios.get('/getUserQuizNames/1')
      .then(({ data }) => {
        setQuizNames(data);
      })
      .catch((err) => console.error('error getting quiz names QuestionBuilder: ', err));
  };
  
  useEffect(() => {
    getQuizNames();
  }, []);
  
  const handleQuizEdit = (index, key, value) => {
    const updatedQuiz = [...selectedQuiz];
    updatedQuiz[index][key] = value;
    setSelectedQuiz(updatedQuiz);
  };

  const handleQuizSelect = (quizName) => {
    return new Promise((resolve, reject) => {
      axios.post('/retrieveUserQuiz/1', { question_set: quizName })
        .then(({ data }) => {
          console.log('data in retrieve quiz:', data);
          setSelectedQuiz(data);
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          console.error('error getting quiz: ', err);
          reject(err);
        });
    });
  };
  
  const handlePlayClick = async (e) => {
    const quizData = await handleQuizSelect(e.target.value);
    navigate('/protected/play', { state: { quizData } });
  };

  const handleDeleteClick = (e) => {
    axios.post('/retrieveUserQuiz/1', { question_set: e })
      .then(({ data }) => {
        const questionIds = data.map(({ id }) => id); 
        setQuizNames((oldNames) => oldNames.filter((quiz) => quiz !== e));
        return axios.delete('/deleteUserQuestions', { data: { questionIds } });
      })
      .then(() => {
      })
      .catch((err) => {
        console.error('Error deleting questions:', err);
      });
  };

  const handleSubmit = () => {
    axios
      .patch(`/updateUserQuiz/${userId}`, selectedQuiz)
      .then((response) => {
      })
      .catch((err) => console.error('Error on client side submitting updated questions: ', err));
  };
  return (
    <div>
      <h1>Edit Your Quizzes</h1>
         
      {quizNames.length === 0 ? (
        <div>No user created Quizzes.</div>
      )
        : quizNames.map((quizName) => {
          return (
            <div key={quizName} className="col">
              {quizName}{' '}
              <span className="button-container">
                <button
                  type="button"
                  className="playUserQuizButton"
                  value={quizName}
                  onClick={(e) => handlePlayClick(e)}
                >Play
                </button>
                <button
                  type="button"
                  className="editUserQuizButton"
                  value={quizName}
                  onClick={(e) => { handleQuizSelect(e.target.value); }}
                >Edit
                </button>
                <button
                  type="button"
                  className="deleteUserQuizButton"
                  value={quizName}
                  onClick={(e) => { handleDeleteClick(e.target.value); }}
                >Delete
                </button>
              </span>
            </div>
          );
        })}
      {selectedQuiz.length > 0 ? (
        <div>
          <h2>Quiz Name: {selectedQuiz[0].question_set}</h2>
          {selectedQuiz.map((quiz, index) => (
            <div key={quiz.id}>
              <div>
                <span><b>{index + 1}.</b>
                  <ContentEditable
                    html={quiz.question}
                    onChange={(e) => handleQuizEdit(index, 'question', e.target.value)}
                  />
                </span>
              </div>
              <div>
                <span><b>Correct Answer:</b>
                  <ContentEditable
                    html={quiz.correct_answer}
                    onChange={(e) => handleQuizEdit(index, 'correct_answer', e.target.value)}
                  />
                </span>
              </div>
              <div>
                <span><b>Incorrect Answer 1:</b> 
                  <ContentEditable
                    html={quiz.incorrect_answer_1}
                    onChange={(e) => handleQuizEdit(index, 'incorrect_answer_1', e.target.value)}
                  />
                
                </span>
              </div>
              <div>
                <span><b>Incorrect Answer 2:</b> 
                  <ContentEditable
                    html={quiz.incorrect_answer_2}
                    onChange={(e) => handleQuizEdit(index, 'incorrect_answer_2', e.target.value)}
                  />
                </span>
              </div>
              <div>
                <span><b>Incorrect Answer 3:</b> 
                  <ContentEditable
                    html={quiz.incorrect_answer_3}
                    onChange={(e) => handleQuizEdit(index, 'incorrect_answer_3', e.target.value)}
                  />
                </span>
              </div>
            </div>
          )) }
          <div>
            <button type="button" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default YourQuizzes;