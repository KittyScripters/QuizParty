import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';

const QuestionBuilder = () => {
  return (
    <span>
      <div>
        <NavBar class="container-fluid text-center" />
      </div>
      <div id="MainPlay" className="container-sm text-center">
        <h1>Create A Quiz!</h1>
        <Link to="addQuestion"><button type="button">Create a New Quiz</button></Link>      
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