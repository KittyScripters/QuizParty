import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const authHandle = () => {
  window.location.href = '/auth/google';
};

const Login = () => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <button type="button" onClick={() => { authHandle(); }}>Login</button>
    </div>
  );
};

export default Login;