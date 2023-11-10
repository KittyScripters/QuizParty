import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';

const EditExistingQuiz = ({ id = 1 }) => {
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [quizNames, setQuizNames] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/getUserQuizNames/1')
      .then(({ data }) => {
        console.log('data in get:', data);
        setQuizNames(data);
      })
      .catch((err) => console.error('error getting quiz names QuestionBuilder: ', err));
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
          resolve(data);
        })
        .catch((err) => {
          console.error('error getting quiz: ', err);
          reject(err);
        });
    });
  };
  console.log('selectedQuiz on render: ', selectedQuiz);

  const handlePlayClick = async (e) => {
    console.log('e target value ', e.target.value);
    const quizData = await handleQuizSelect(e.target.value);
    console.log('selected Quiz in play click:', quizData);
    navigate('/protected/play', { state: { quizData } });
  };

  const handleSubmit = () => {
    axios
      .patch(`/updateUserQuiz/${id}`, selectedQuiz)
      .then((response) => {
        console.log('questions updated as: ', selectedQuiz);
      })
      .catch((err) => console.error('Error on client side submitting updated questions: ', err));
  };
  return (
    <div>
      <h1>Edit Your Quizzes</h1>
         
      {quizNames.map((quizName) => {
        return (
          <div key={quizName}>
            {quizName}{' '}
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

export default EditExistingQuiz;