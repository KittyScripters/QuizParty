/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div id="navbar" className="container-fluid text-center">

      <div id="Header">
        QUIZ PARTY
      </div>
      <nav>
        
        <span>
          <button type="button" onClick={() => handleNavigation('/protected/leaderboard')}>
            LeaderBoard
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleNavigation('/protected/profile')}>
            Profile
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleNavigation('/protected/play')}>
            Play
          </button>
        </span>
        <span>
          <button type="button" onClick={() => handleNavigation('/protected/question-builder')}>
            QuestionBuilder
          </button>
        </span>
        <span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </span>

      </nav>
    </div>
  );
};

export default NavBar;
