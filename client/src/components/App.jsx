/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable func-style */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from 'jwt-decode';

import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import Play from './Play';
import QuestionBuilder from './QuestionBuilder';
import Login from './Login';

const App = () => {
  const [view, setView] = useState('Login');
  const [user, setUser] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT info:', response.credential);

  //   const userObj = jwtDecode(response.credential);
  //   console.log('Decoded JWT info:', userObj);

  //   setUser(userObj);
  //   document.getElementById('signInDiv').hidden = true;
  // }

  // function handleSignOut() {
  //   setUser({});
  //   document.getElementById('signInDiv').hidden = false;
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: '904896192288-1ds4bgshm1iticdll13184fprmepj7l3.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {
  //       theme: 'outline',
  //       size: 'extraLarge',
  //       width: 309,
  //       text: 'continue_with',
  //     },
  //   );

  //   google.accounts.id.prompt();
  // }, []);

  return (
    <div>
      <div>
        <nav>
          <button type="button" onClick={() => setView('LeaderBoard')}>Leaderboard</button>
          <button type="button" onClick={() => setView('Profile')}>Profile</button>
          <button type="button" onClick={() => setView('Play')}>Play</button>
          <button type="button" onClick={() => setView('QuestionBuilder')}>Create A Quiz</button>
        </nav>
        {view === 'LeaderBoard' && <LeaderBoard />}
        {view === 'Profile' && <Profile />}
        {view === 'Play' && <Play />}
        {view === 'QuestionBuilder' && <QuestionBuilder />}
        {view === 'Login' && <Login />}
      </div>
    </div>
  );
};

export default App;