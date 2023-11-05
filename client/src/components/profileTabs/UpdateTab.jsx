/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const UpdateTab = () => {
  const [text, setText] = useState('Update here');
  // allow the user to type
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div>
      <form className="update-field">
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTab;
