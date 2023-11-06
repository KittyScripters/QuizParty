/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

const Achievement = ({ achievement }) => {
  return (
    <div key={achievement.id}>
      {achievement.name}
    </div>
  );
};

export default Achievement;
