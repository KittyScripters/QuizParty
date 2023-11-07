import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const authHandle = () => {
  window.location.href = '/auth/google';
};

const Login = () => {
  return (
    <div>
      <Link to="/protected/leaderboard">
        <button type="button" onClick={() => { authHandle(); }}>Login</button>
      </Link>
    </div>
  );
};

export default Login;