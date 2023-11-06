/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Achievement from './Achievement';

const AchievementsTab = ({ achievements }) => {
  //map through this state variable to pass into Achievement
  const [list, setList] = useState([]);
  //useEffect to mount the list of achievements
  useEffect(() => {
    const results = [];
    achievements.forEach((item) => {
      axios.get(`/api/achievements/${item.achievement_id}`)
        .then(({ data }) => {
          results.push(data);
          setList(results);
        })
        .catch((err) => console.error(err));
    });
  }, []);
  console.log('current state', list);

  return (
    <div>
      <div>
        <h4>Achievements</h4>
        <div>
          {list.map((achievement) => {
            return <Achievement key={achievement.id} achievement={achievement} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab;
