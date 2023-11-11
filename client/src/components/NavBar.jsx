/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//const partyHat = '/css/pictures/party hat (1).png';
import partyHat from '../css/pictures/partyHat.png';

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
        <img src={partyHat} className="partyHat" alt="party hat" width="70" />
        QUIZ PARTY
        <img src={partyHat} className="partyHat" alt="party hat" width="70" />
      </div>
      <nav>
        
        <span>
          <button type="button" id="navButton" onClick={() => handleNavigation('/protected/leaderboard')}>
            LeaderBoard
          </button>
        </span>
        <span>
          <button type="button" id="navButton" onClick={() => handleNavigation('/protected/profile')}>
            Profile
          </button>
        </span>
        <span>
          <button type="button" id="navButton" onClick={() => handleNavigation('/protected/play')}>
            Play
          </button>
        </span>
        <span>
          <button type="button" id="navButton" onClick={() => handleNavigation('/protected/question-builder')}>
            Your Quizzes
          </button>
        </span>
        <span>
          <button type="button" id="navButton" onClick={handleLogout}>
            Logout
          </button>
        </span>
        
      </nav>
    </div>
  );
};

export default NavBar;
