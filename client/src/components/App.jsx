import React, { useState } from 'react';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Login from './Login';

// Parent App comp
const App = () => {
  const [view, setView] = useState('Login');
  return (
    <div>
      {/* this is rendering in this commit */}
      <nav>
        <button type="button" onClick={() => setView('LeaderBoard')}>Leaderboard</button>
        <button type="button" onClick={() => setView('Profile')}>Profile</button>
        <button type="button" onClick={() => setView('Play')}>Play</button>
        <button type="button" onClick={() => setView('QuestionBuilder')}>Create A Quiz</button>
        <button type="button" onClick={() => setView('Login')}>Login</button>
        <button type="button" onClick={() => setView('Login')}>Logout</button>
      </nav>
      {view === 'LeaderBoard' && <LeaderBoard />}
      {view === 'Profile' && <Profile />}
      {view === 'Play' && <Play />}
      {view === 'QuestionBuilder' && <QuestionBuilder />}
      {view === 'Login' && <Login />}
    </div>
  );
};

export default App;