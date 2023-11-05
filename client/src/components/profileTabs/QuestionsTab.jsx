/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';

const QuestionsTab = ({ questions }) => {
  return (
    <div className="questionsList">
      <ul className="userQuestions">
        {questions.map((questionObj) => {
          return <Question id={questionObj.id} question={questionObj.question} />;
        })}
      </ul>
    </div>
  );
};

export default QuestionsTab;
