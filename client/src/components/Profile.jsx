import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AchievementsTab from './profileTabs/AchievementsTab';
import StatsTab from './profileTabs/StatsTab';
import FollowersTab from './profileTabs/FollowersTab';
import QuestionsTab from './profileTabs/QuestionsTab';
import UpdateTab from './profileTabs/UpdateTab';

/**
 * TODO:
 * Allow user to update their bio => request working, waiting on react router
 * Allow user to remove questions from their favorite questions list
 * Allow user to view their followers profiles
 * Access/render followers, favorite Questions, and personal questions
 */

// user's profile
const Profile = () => {
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState('Profile');
  const [achievements, setAchievements] = useState([]);
  const [followers, setFollowers] = useState([]);

  // USER STATE UPDATE
  useEffect(() => {
    // accessing user 1 "maidenwench"
    axios.get('api/users/1')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Could not get PROFILE DATA', err));
  }, []);

  // USER'S FAVORITE QUESTIONS UPDATE
  useEffect(() => {
    // accessing user's questions
    axios.get('/api/questions/1')
      .then(({ data }) => {
        setQuestions(data);
      })
      .catch((err) => console.error('Could not GET user\'s questions', err));
  }, []);

  // USER'S ACHIEVEMENTS UPDATE
  useEffect(() => {
    //get the corresponding data from join_achievements => using user_id
    axios.get('/api/join_achievements/1')
      .then(({ data }) => {
        setAchievements(data);
      })
      .catch((err) => console.error('Could not GET join_achievement ids', err));
  }, []);

  useEffect(() => {
    axios.get('/api/join_followers/1')
      .then(({ data }) => {
        setFollowers(data);
      })
      .catch((err) => console.error(err));
  }, [setFollowers]);

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
        <button type="button" onClick={() => setView('UpdateTab')}>Update</button>
      </div>
      <div>
        {view === 'StatsTab' && <StatsTab stats={user} />}
        {view === 'AchievementsTab' && <AchievementsTab achievements={achievements} />}
        {view === 'FollowersTab' && <FollowersTab followers={followers} />}
        {view === 'QuestionsTab' && <QuestionsTab questions={questions} />}
        {view === 'UpdateTab' && <UpdateTab />}
      </div>
    </div>
  );
};

export default Profile;