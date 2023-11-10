import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';

const QuestionBuilder = () => {
  return (
    <span>
      <div>
        <NavBar />
      </div>
      <h1>Create A Quiz!</h1>
      <Link to="addQuestion"><button type="button">Create a New Quiz</button></Link>      
      <Link to="existingQuizes"><button type="button">Your Quizes</button></Link>    
      <br /><br />
      <Outlet />
    </span>
  );
};

export default QuestionBuilder;