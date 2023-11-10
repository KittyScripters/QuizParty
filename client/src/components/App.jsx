/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Logout from './Logout';

const App = () => {
  const [view, setView] = useState('Login');
  
  return (
    <div>
      
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default App;