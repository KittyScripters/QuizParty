import React from 'react';
import { useNavigate } from 'react-router-dom';

const NameNewQuiz = ({ questionSet, setQuestionSet, setParentView }) => {
  const navigate = useNavigate();
  const cancelClick = () => {
    navigate('/protected/question-builder');
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
          onClick={setParentView}
        >Create
        </button>
        <button type="button" onClick={cancelClick}>Cancel</button>
      </div>
    </>
  );
};

export default NameNewQuiz;