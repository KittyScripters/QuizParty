import React from 'react';

const UserCreatedQuiz = ({
  quizName, handlePlayClick, handleQuizSelect, handleDeleteClick, 
}) => {
  return (
    <div key={quizName} className="col">
      {quizName}{' '}
      <span className="button-container">
        <button
          type="button"
          className="playUserQuizButton"
          value={quizName}
          onClick={(e) => handlePlayClick(e.target.value)}
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
};

export default UserCreatedQuiz;