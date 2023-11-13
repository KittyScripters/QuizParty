import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NameNewQuiz = ({
  questionSet, setQuestionSet, setParentView, userId,
}) => {
  const navigate = useNavigate();
  const cancelClick = () => {
    navigate('/protected/question-builder');
  };

  const checkQuizExists = () => {
    axios.get(`/checkQuizExists/${userId}/${questionSet}`)
      .then(({ data }) => {
        if (data.exists) {
          // eslint-disable-next-line no-alert
          alert('You already have a quiz with that name. Please enter another.');
        } else {
          setParentView();
        }
      });
  };
 
  return (
    <div id="name-new-quiz" className="name-new-quiz">
      Quiz Name: 
      {' '}
      <input 
        type="text"
        value={questionSet}
        onChange={(e) => setQuestionSet(e.target.value)}
        className="form-control"
      />
      <div>
        <button
          type="button"
          onClick={checkQuizExists}
          className="btn btn-primary"
        >Create
        </button>
        <button 
          type="button" 
          onClick={cancelClick}
          className="btn btn-secondary"
        >Cancel
        </button>
      </div>
    </div>
  );
};

export default NameNewQuiz;