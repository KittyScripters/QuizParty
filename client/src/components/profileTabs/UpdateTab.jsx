/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

const UpdateTab = ({ setView }) => {
  const [text, setText] = useState('');
  // allow the user to type
  const handleChange = (e) => {
    setText(e.target.value);
  };
  //allow user to update their bio on the database
  const updateBio = (update) => {
    axios.patch('/api/users/1', { bio: update })
      .then(() => {
        setView('Profile');
      })
      .catch((err) => console.error('Could not PATCH bio', err));
  };
  return (
    <div>
      <form className="update-field">
        <input onChange={(e) => handleChange(e)} />
        <button type="submit" onClick={() => updateBio(text)}>Update</button>
      </form>
    </div>
  );
};

export default UpdateTab;
