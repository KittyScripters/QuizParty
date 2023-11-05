import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

// user's profile
const Profile = () => {
  // initial user state
  const [user, setUser] = useState({});
  // initial questions state
  const [questions, setQuestions] = useState([]);
  // useEffect => axios get user by id request => setUser
  useEffect(() => {
    // accessing user 1 "maidenwench"
    axios.get('api/users/1')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Could not get PROFILE DATA', err));
    // accessing user's questions
    axios.get('/api/questions/1')
      .then(({ data }) => {
        setQuestions(data);
      })
      .catch((err) => console.error('Could not GET user\'s questions', err));
  }, []);
  console.log('after useEffect', user);
  console.log('questions current state', questions);

  return (
    <div>
      <img alt="user" />
      <h2 className="userName">{user.username}</h2>
      <p className="bio">
        {user.bio}
      </p>
      <div>
        <table>
          <tr className="category">
            <th className="stats-headers">Total</th>
            <th className="stats-headers">Animals</th>
            <th className="stats-headers">Art</th>
            <th className="stats-headers">Books</th>
            <th className="stats-headers">Celebrities</th>
            <th className="stats-headers">History</th>
            <th className="stats-headers">Music</th>
            <th className="stats-headers">Mythology</th>
            <th className="stats-headers">Nature</th>
            <th className="stats-headers">Politics</th>
            <th className="stats-headers">Sports</th>
          </tr>
          <tr className="user-scores">
            <td className="stats-score">{user.highscore}</td>
            <td className="stats-score">{user.animals_score}</td>
            <td className="stats-score">{user.art_score}</td>
            <td className="stats-score">{user.books_score}</td>
            <td className="stats-score">{user.celebrities_score}</td>
            <td className="stats-score">{user.history_score}</td>
            <td className="stats-score">{user.music_score}</td>
            <td className="stats-score">{user.myth_score}</td>
            <td className="stats-score">{user.nature_score}</td>
            <td className="stats-score">{user.politics_score}</td>
            <td className="stats-score">{user.sports_score}</td>
          </tr>
        </table>
        <table>
          <tr className="headers">
            <th className="profile-table">Followers</th>
            <th className="profile-table">Achievements</th>
          </tr>
          <tr className="table-data">
            <td>Stephen</td>
            <td>Top Dog</td>
          </tr>
        </table>
      </div>
      <div>
        <ul className="userQuestions">
          {questions.map((questionObj) => {
            return <Question id={questionObj.id} question={questionObj.question} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;