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
    <>
      Quiz Name: 
      {' '}
      <input 
        type="text"
        value={questionSet}
        onChange={(e) => setQuestionSet(e.target.value)}
      />
      <div>
        <button
          type="button"
          onClick={checkQuizExists}
        >Create
        </button>
        <button type="button" onClick={cancelClick}>Cancel</button>
      </div>
    </>
  );
};

export default NameNewQuiz;