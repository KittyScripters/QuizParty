/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achievement from './Achievement';

const AchievementsTab = ({ achievements }) => {
  return (
    <div>
      <div>
        <h4>Achievements</h4>
        <div>
          {achievements.map((achievement) => {
            return <Achievement key={achievement.id} achievement={achievement.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
