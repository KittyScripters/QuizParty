import React from 'react';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Login from './Login';

// Parent App comp
const App = () => {
  return (
    <div>
      {/* this is rendering in this commit */}
      <nav>
        <button type="button">leaderboard</button>
        <button type="button">profile</button>
        <button type="button">Play</button>
        <button type="button">question creator</button>
        <button type="button">login</button>
        <button type="button">logout</button>
      </nav>
      <LeaderBoard />
      <Play />
      <Profile />

    </div>
  );
};

export default App;