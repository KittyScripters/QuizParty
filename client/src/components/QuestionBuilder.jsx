import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import NavBar from './NavBar';

const QuestionBuilder = () => {
  const [celebrate, setCelebrate] = useState(false);

  const handleCelebrate = () => {
    setCelebrate(true);
    setTimeout(() => {
      setCelebrate(false);
    }, 10000);
  };

  return (
    <span>
      {celebrate && <Confetti />}
      <div>
        <NavBar class="container-fluid text-center" />
      </div>
      <div id="MainPlay" className="container-sm text-center">
        <h1>Create A Quiz!</h1>
        <Link to="addQuestion"><button type="button" onClick={handleCelebrate}>Create a New Quiz</button></Link>      
        <Link to="yourQuizzes"><button type="button">Your Quizzes</button></Link>    
        <br />
      </div>
      <div id="MainPlay" className="container-sm text-left">
        <Outlet />
      </div>
    </span>
  );
};

export default QuestionBuilder;