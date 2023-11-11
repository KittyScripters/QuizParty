import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const authHandle = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};

const Login = () => {
  return (
    <div id="login">
      <button
        className="btn btn-warning position-absolute top-50 start-50 translate-middle" 
        type="button" 
        onClick={() => { authHandle(); }}
      >Login with Google
      </button>
    </div>
  );
};

export default Login;