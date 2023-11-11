import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import kittyHat from '../css/pictures/kittyhat.png';
import '../css/styles.scss';

const authHandle = () => {
  window.location.href = '/auth/google';
};

const Login = () => {
  return (
    <div id="login">
      <button
        className="btn btn-warning position-absolute top-50 start-50 translate-middle"
        style={{ fontSize: '2em', padding: '15px 30px' }} 
        type="button"
        onClick={() => {
          authHandle();
        }}
      >
        <img
          src={kittyHat}
          alt="Kitty Logo"
          style={{ marginRight: '10px', width: '50px', height: '50px' }} 
          className="custom-image"
        />
        Login with Google
        <img
          src={kittyHat}
          alt="Kitty Logo"
          style={{ marginLeft: '10px', width: '50px', height: '50px' }} 
          className="custom-image"
        />
      </button>
    </div>
  );
};

export default Login;