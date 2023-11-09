/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
