/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

const Achievement = ({ id, achievement }) => {
  return (
    <li key={id}>{achievement}</li>
  );
};

export default Achievement;
