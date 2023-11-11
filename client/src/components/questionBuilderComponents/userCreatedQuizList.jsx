import React from 'react';
import UserCreatedQuiz from './userCreatedQuiz';

const UserCreatedQuizList = ({
  quizNames, handlePlayClick, handleQuizSelect, handleDeleteClick, 
}) => (
  <div>
    { quizNames.length === 0 ? (
      <div>No user created Quizzes.</div>
    ) : (quizNames.map((quizName) => (
      <UserCreatedQuiz 
        key={quizName}
        quizName={quizName}
        handlePlayClick={() => handlePlayClick(quizName)}
        handleQuizSelect={() => handleQuizSelect(quizName)}
        handleDeleteClick={() => handleDeleteClick(quizName)}
      />
    ))
    ) }
  </div>

);

export default UserCreatedQuizList;