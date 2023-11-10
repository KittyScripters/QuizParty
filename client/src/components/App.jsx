/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Logout from './Logout';

const App = () => {
  const [id, setId] = useState(null);
  useEffect(() => {
    axios.get('/api/current-user')
      .then((user) => {
        console.log('this response data', user.data.id); 
        setId(user.data.id);
      })
      .catch((error) => {
        console.error('Failed to fetch current user:', error);
      });
  }, []);
  
  return (
    <div>
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default App;