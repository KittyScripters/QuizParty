/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateTab = ({ userId, setView }) => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  //allow user to update their bio on the database
  const updateBio = (update) => {
    axios.patch(`/api/users/${userId}`, { bio: update })
      .then(() => {
        navigate('/protected/profile');
      })
      .catch((err) => console.error('Could not PATCH bio', err));
  };
  // allow the user to type
  const handleChange = (e) => {
    setText(e.target.value);
  };
  // allow the user to submit with enter key
  const handleEnter = (event, update) => {
    if (event.key === 'Enter') {
      updateBio(update);
    }
  };

  return (
    <div>
      <div className="bg-info bg-gradient rounded p-3 mt-3 w-50 mx-auto">
        <div className="mt-3">
          <p id="profile-text" className="text-center">
            Got something to say? Update your bio!
          </p>
        </div>
        <div className="text-center">
          <form className="mx-auto">
            <input
              className="mx-auto"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e, text)}
            />
            <button
              className="rounded bg-success border-info m-1 text-white"
              type="submit"
              onClick={() => updateBio(text)}
            >Update
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default UpdateTab;
