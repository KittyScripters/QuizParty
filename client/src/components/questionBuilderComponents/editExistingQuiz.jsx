import React from 'react';

const EditExistingQuiz = ({ quizNames, id }) => {
  console.log('quiznames in edit existing quiz:', quizNames);
  return (
    <div>
      <h1>existing quizzes</h1>
         
      {quizNames.map((quizName) => {
        return (
          <div key={quizName}>
            <button type="button">{quizName}</button>
          </div>
        );
      })} 
    </div>
  );
};

export default EditExistingQuiz;