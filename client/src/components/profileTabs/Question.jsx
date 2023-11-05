/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

const Question = ({ id, question }) => {
  return (
    <li key={id}>{question}</li>
  );
};

export default Question;
