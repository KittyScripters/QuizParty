import React from 'react';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Navbar from './Navbar';
import Play from './Play';
// Parent App comp
const App = () => {
  return (
    <div>
      {/* this is rendering in this commit */}
      <h1>hello</h1>
      <Navbar />
      <LeaderBoard />
      <Play />
      <Profile />

    </div>
  );
};

export default App;