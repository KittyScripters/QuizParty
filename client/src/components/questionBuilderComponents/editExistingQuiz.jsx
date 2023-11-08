import React, { useState } from 'react';
import axios from 'axios';

const EditExistingQuiz = ({ quizNames, id }) => {
  console.log('quiznames in edit existing quiz:', quizNames);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [editedQuiz, setEditedQuiz] = useState([]);
  
  const handleQuizSelect = (quizName) => {
    axios.post('/retrieveUserQuiz/1', { question_set: quizName })
      .then(({ data }) => {
        console.log('data in get:', data);
        setSelectedQuiz(data);
      })
      .catch((err) => console.error('error getting quiz: ', err));
  };

  return (
    <div>
      <h1>Edit Your Quizzes</h1>
         
      {quizNames.map((quizName) => {
        return (
          <div key={quizName}>
            <button
              type="button"
              className="editUserQuizButton"
              value={quizName}
              onClick={(e) => { handleQuizSelect(e.target.value); }}
            >{quizName}
            </button>
          </div>
        );
      })}
      {selectedQuiz.length > 0 ? (
        <div>
          <h2>Quiz Name: {selectedQuiz[0].question_set}</h2>
          {selectedQuiz.map((quiz, index) => (
            <div key={quiz.id}>
              <p><b>{index + 1}.</b>
                <span 
                  contentEditable
                >{quiz.question}
                </span>
              </p>
              <p><b>Correct Answer:</b>
                <span 
                  contentEditable
                >{quiz.correct_answer}
                </span>
              </p>
              <p><b>Incorrect Answer 1:</b> 
                <span 
                  contentEditable
                >{quiz.incorrect_answer_1}
                </span>
              </p>
              <p><b>Incorrect Answer 2:</b> 
                <span 
                  contentEditable
                  onInput={(e) => setEditedQuestions({})}
                >{quiz.incorrect_answer_2}
                </span>
              </p>
              <p><b>Incorrect Answer 3:</b> 
                <span 
                  contentEditable
                >{quiz.incorrect_answer_3}
                </span>
              </p>
            </div>
          )) }
        </div>
      ) : null}
    </div>
  );
};

export default EditExistingQuiz;