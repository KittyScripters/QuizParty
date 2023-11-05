import React from 'react';
import axios from 'axios'; 

const LogoutButton = () => {
  const handleLogout = () => {
    axios.get('/logout')
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/'; 
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;