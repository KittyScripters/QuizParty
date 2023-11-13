import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import NavBar from './NavBar';

const QuestionBuilder = () => {
  const [showOutlet, setShowOutlet] = useState(false);

  const buttonClick = () => {
    setShowOutlet(true);
  };

  return (
    <span>
      <NavBar />
      <div id="question-builder" className="card-lg text-center">
        <h1>Create A Quiz!</h1>
        <Link to="addQuestion">
          <button 
            type="button"
            onClick={buttonClick}
          >Create a New Quiz
          </button>
        </Link>      
        <Link to="yourQuizzes">
          <button 
            type="button"
            onClick={buttonClick}
          >Your Quizzes
          </button>
        </Link>    
        <br />
      </div>
      <div id="question-builder" style={{ display: showOutlet ? 'block' : 'none' }}>
        <Outlet />
      </div>
    </span>
  ); 
};

export default QuestionBuilder;