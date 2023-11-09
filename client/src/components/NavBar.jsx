/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const handleLogout = () => {
  axios.get('/logout')
    .then((response) => {
      if (response.status === 200) {
        window.location.href = '/'; 
      }
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
};

const NavBar = () => {
  return (
    <div className="navbar">
      <div id="Header" className="container-sm text-center">
        <h1>Quiz Party</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/protected/leaderboard">LeaderBoard</Link>
          </li>
          <li>
            <Link to="/protected/profile">Profile</Link>
          </li>
          <li>
            <Link to="/protected/play">Play</Link>
          </li>
          <li>
            <Link to="/protected/question-builder">QuestionBuilder</Link>
          </li>
          <li>
            <Link to="/login">
              <button type="button" onClick={() => { handleLogout(); }}>
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
