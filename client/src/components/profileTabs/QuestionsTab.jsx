/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const he = require('he');

const QuestionsTab = ({ userId }) => {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    axios.get(`/api/favorite_questions/${userId}`)
      .then(({ data }) => {
        console.log('faves', data);
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
      <div className="mt-3">
        <p id="profile-text" className="text-center">
          Need some extra practice or want to check out your personal questions??<br />
          Go review those favorite questions of yours and
          be sure update your questions in Your Quizzes.<br />
          Remember! Once you got that practice in, be sure to delete those questions
          you silly mongoose! 😉
        </p>
      </div>
      <div className="bg-info bg-gradient py-3 rounded">
        <div id="created" className="mx-auto">
          <h4 className="text-center">My questions</h4>
          <table className="mx-auto">
            <tbody>
              {userQuestions.map((question) => {
                return (
                  <tr className="bg-success bg-gradient" key={question.id}>
                    <td className="mx-auto px-5 rounded-start-4">
                      <button
                        className="
                        rounded
                        bg-success
                        border-info
                        m-1
                        text-white"
                        type="button"
                        onClick={() => deleteQuestion('questions', question.id)}
                      >Delete
                      </button>
                    </td>
                    <td className="mx-auto px-5 text-white rounded-end-4">
                      {question.question}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="favorite" className="mx-auto">
          <h4 className="text-center my-3">My favorites</h4>
          <table className="mx-auto">
            <tbody>
              {favoriteQuestions.map((question) => {
                return (
                  <tr className="bg-success bg-gradient" key={question.id}>
                    <td className="mx-auto px-5 rounded-start-4">
                      <button
                        className="
                          rounded
                          bg-success
                          border-info
                          m-1
                          text-white"
                        type="button"
                        onClick={() => deleteQuestion('favorite_questions', question.id)}
                      >Delete
                      </button>
                    </td>
                    <td className="mx-auto px-5 text-white rounded-end-4">
                      {he.decode(question.question)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionsTab;
