/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

const UpdateTab = ({ userId }) => {
  const [text, setText] = useState('');
  // allow the user to type
  const handleChange = (e) => {
    setText(e.target.value);
  };
  // allow the user to submit with enter key
  const handleEnter = (event, update) => {
    if (event.key === 'Enter') {
      updateBio(update)
    }
  }
  //allow user to update their bio on the database
  const updateBio = (update) => {
    axios.patch(`/api/users/${userId}`, { bio: update })
      .then(() => {
        setView('Profile');
      })
      .catch((err) => console.error('Could not PATCH bio', err));
  };
  return (
    <div>
      <form className="update-field">
        <input onChange={(e) => handleChange(e)} onKeyDown={(e) => handleEnter(e, text)} />
        <button type="submit" onClick={() => updateBio(text)}>Update</button>
      </form>
    </div>
  );
};

export default UpdateTab;
