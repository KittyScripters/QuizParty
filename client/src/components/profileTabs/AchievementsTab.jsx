/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const AchievementsTab = ({ achievements }) => {
  console.log('achievements tab', achievements); // good data
  const [list, setList] = useState([]);
  return (
    <div>
      <div>
        <h4>Achievements</h4>
      </div>
    </div>
  );
};

export default AchievementsTab;
