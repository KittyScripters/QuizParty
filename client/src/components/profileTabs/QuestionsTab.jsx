/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsTab = ({ userId }) => {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);

  console.log(favoriteQuestions);
  console.log(userQuestions);
  console.log(userId);

  useEffect(() => {
    axios.get(`/api/favorite_questions/${userId}`)
      .then(({ data }) => {
        setFavoriteQuestions(data);
      });
  }, [setFavoriteQuestions]);

  useEffect(() => {
    axios.get(`/api/questions/${userId}`)
      .then(({ data }) => {
        setUserQuestions(data);
      })
      .catch((err) => console.error('Could not GET user\'s questions', err));
  }, [setUserQuestions]);

  const deleteQuestion = (questionType, id) => {
    axios.delete(`/api/${questionType}/${id}`)
      .then(() => {
        axios.get(`/api/${questionType}/${userId}`)
          .then(({ data }) => {
            questionType === 'questions' ? setUserQuestions(data) : setFavoriteQuestions(data);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="favQuestions">
        <h4>My favorites</h4>
        <ul className="favoriteQuestions">
          {favoriteQuestions.map((question) => {
            return (
              <div key={question.id}>
                <button onClick={ () => deleteQuestion('favorite_questions', question.id)}>Delete</button>
                {question.question}
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h4>My questions</h4>
        <div>
          {userQuestions.map((question) => {
            return (
              <div key={question.id}>
                <button onClick={ () => deleteQuestion('questions', question.id)}>Delete</button>
                {question.question}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionsTab;
