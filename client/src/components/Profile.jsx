import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './profileTabs/Question';
import AchievementsTab from './profileTabs/AchievementsTab';
import StatsTab from './profileTabs/StatsTab';
import FollowersTab from './profileTabs/FollowersTab'
import QuestionsTab from './profileTabs/QuestionsTab';


/**
 * TODO: 
 * Create three tabs (components): Stats, Achievements, Questions
 * Then move the appropriate divs to the corresponding tabs
 * Refactor Profile.jsx into a table of the tabs below the profile pic/bio
 * Conditionally render each tab onClick
 */

// user's profile
const Profile = () => {
  // initial user state
  const [user, setUser] = useState({});
  // initial questions state
  const [questions, setQuestions] = useState([]);
  // initial view state
  const [view, setView] = useState('Profile');
  // useEffect => axios get user by id request => setUser
  useEffect(() => {
    // accessing user 1 "maidenwench"
    axios.get('api/users/1')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Could not get PROFILE DATA', err));
    // accessing user's questions
    axios.get('/api/questions/1')
      .then(({ data }) => {
        setQuestions(data);
      })
      .catch((err) => console.error('Could not GET user\'s questions', err));
  }, []);

  return (
    <div>
      <img alt="user" />
      <h2 className="userName">{user.username}</h2>
      <p className="bio">
        {user.bio}
      </p>
      <div>
        <button type="button" onClick={() => setView('StatsTab')}>Stats</button>
        <button type="button" onClick={() => setView('AchievementsTab')}>Achievements</button>
        <button type="button" onClick={() => setView('FollowersTab')}>Followers</button>
        <button type="button" onClick={() => setView('QuestionsTab')}>Questions</button>
      </div>
      <div>
        <h1>View should go here</h1>
        {view === 'StatsTab' && <StatsTab stats={user} />}
        {view === 'AchievementsTab' && <AchievementsTab />}
        {view === 'FollowersTab' && <FollowersTab />}
        {view === 'QuestionsTab' && <QuestionsTab questions={questions} />}
      </div>
    </div>
  );
};

export default Profile;