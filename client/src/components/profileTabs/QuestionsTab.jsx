/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import Question from './Question';

const QuestionsTab = ({ questions }) => {
  return (
    <div className="questionsList">
      <ul className="userQuestions">
        {questions.map((question) => {
          return <Question key={question.id} question={question.question} />;
        })}
      </ul>
    </div>
  );
};

export default QuestionsTab;
