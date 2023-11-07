import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import AchievementsTab from './profileTabs/AchievementsTab';
import StatsTab from './profileTabs/StatsTab';
import FollowersTab from './profileTabs/FollowersTab';
import QuestionsTab from './profileTabs/QuestionsTab';
import UpdateTab from './profileTabs/UpdateTab';
import NavBar from './NavBar';

/**
 * TODO:
 * Allow user to update their bio => request working, waiting on react router
 * Allow user to remove questions from their favorite questions list
 */

// user's profile
const Profile = () => {
  const [user, setUser] = useState({});
  const [view, setView] = useState('Profile');
  const [achievements, setAchievements] = useState([]);

  const userId = 1;
  // USER STATE UPDATE
  useEffect(() => {
<<<<<<< HEAD
    // accessing user 1 "maidenwench"
    axios.get('api/users/31')
=======
    axios.get(`api/users/${userId}`)
>>>>>>> 4dd2c3da43510c35cd16e4de1300f57d7a5700c3
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Could not get PROFILE DATA', err));
<<<<<<< HEAD
  }, []);

  // USER'S FAVORITE QUESTIONS UPDATE
  useEffect(() => {
    // accessing user's questions
    axios.get('/api/questions/31')
      .then(({ data }) => {
        setQuestions(data);
      })
      .catch((err) => console.error('Could not GET user\'s questions', err));
  }, []);

  // USER'S ACHIEVEMENTS UPDATE
  useEffect(() => {
    //get the corresponding data from join_achievements => using user_id
    axios.get('/api/join_achievements/31')
      .then(({ data }) => {
        console.log(data);
        setAchievements(data);
=======
  }, [setUser]);

  // USER'S ACHIEVEMENTS UPDATE
  useEffect(() => {
    axios.patch('/api/join_achievements')
      .then(() => {
        axios.get(`/api/join_achievements/${userId}`)
          .then(({ data }) => {
            setAchievements(data);
          })
          .catch((err) => console.error('Could not GET join_achievement ids', err));
>>>>>>> 4dd2c3da43510c35cd16e4de1300f57d7a5700c3
      })
      .catch((err) => console.error('Could not PATCH achievements', err));
  }, [setAchievements]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
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
        <Outlet />
      </div>
      <div>
        {view === 'StatsTab' && <StatsTab stats={user} />}
        {view === 'AchievementsTab' && <AchievementsTab achievements={achievements} />}
        {view === 'FollowersTab' && <FollowersTab userId={userId} />}
        {view === 'QuestionsTab' && <QuestionsTab userId={userId} />}
        {view === 'UpdateTab' && <UpdateTab />}
      </div>
    </div>
  );
};

export default Profile;