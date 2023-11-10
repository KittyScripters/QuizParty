import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const authHandle = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};

const Login = () => {
  return (
    <div>
      <button type="button" onClick={() => { authHandle(); }}>Login</button>
    </div>
  );
};

export default Login;