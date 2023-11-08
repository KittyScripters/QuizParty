/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

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
        <nav id="navBar" className="container-fluid">
          <button className="navButton" type="button" onClick={() => setView('LeaderBoard')}>Leaderboard</button>
          <button className="navButton" type="button" onClick={() => setView('Profile')}>Profile</button>
          <button className="navButton" type="button" onClick={() => setView('Play')}>Play</button>
          <button className="navButton" type="button" onClick={() => setView('QuestionBuilder')}>Create A Quiz</button>
          <Logout />
        </nav>
        {view === 'LeaderBoard' && <LeaderBoard />}
        {view === 'Profile' && <Profile />}
        {view === 'Play' && <Play />}
        {view === 'QuestionBuilder' && <QuestionBuilder />}
        
      </div>
    </div>
  );
};

export default App;