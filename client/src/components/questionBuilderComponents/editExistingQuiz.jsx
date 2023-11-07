import React from 'react';

const EditExistingQuiz = ({ quizNames }) => {
  console.log('quiznames in edit existing quiz:', quizNames);
  return (
    <div>
      <h1>existing quizzes</h1>
      <ul>
        
        {quizNames.map((quizName) => {
          return (
            <div>
              <button type="button" key={quizName}>{quizName}</button>
            </div>
          );
        })}
        
      </ul>
      
    </div>
  );
};

export default EditExistingQuiz;