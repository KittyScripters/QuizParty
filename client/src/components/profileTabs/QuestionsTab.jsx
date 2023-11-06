/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
import FavoriteQuestion from './FavoriteQuestion';
import UserQuestion from './UserQuestion';

const QuestionsTab = ({ favoriteQuestions, userQuestions }) => {
  return (
    <div>
      <div className="favQuestions">
        <h4>My favorites</h4>
        <ul className="favoriteQuestions">
          {favoriteQuestions.map((question) => {
            return <FavoriteQuestion key={question.id} question={question.question} />;
          })}
        </ul>
      </div>
      <div>
        <h4>My questions</h4>
        <ol>
          {userQuestions.map((question) => {
            return <UserQuestion key={question.id} question={question.question} />;
          })}
        </ol>
      </div>
    </div>
  );
};

export default QuestionsTab;
