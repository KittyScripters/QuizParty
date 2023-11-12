import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useLoaderData, Link } from 'react-router-dom';
import AchievementsTab from './profileTabs/AchievementsTab';
import StatsTab from './profileTabs/StatsTab';
import FollowersTab from './profileTabs/FollowersTab';
import QuestionsTab from './profileTabs/QuestionsTab';
import UpdateTab from './profileTabs/UpdateTab';
import NavBar from './NavBar';

// user's profile
const Profile = () => {
  const userData = useLoaderData();
  const [user, setUser] = useState({});
  const [view, setView] = useState('Profile');
  const [achievements, setAchievements] = useState([]);

  console.log(userData);
  const userId = userData.id;
  // USER STATE UPDATE
  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Could not get PROFILE DATA', err));
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
      })
      .catch((err) => console.error('Could not PATCH achievements', err));
  }, [setAchievements]);

  return (
    <div>
      <NavBar />
      <div id="profile-background" className="container-lg pt-5 pb-5">
        <div>
          <div
            id="img-name-bio"
            className="
            container-sm
            bg-info
            start-50
            w-50
            p-5
            text-center
            rounded-pill"
          >
            <img className="rounded w-25 h-25" alt="user" src={user ? user.image_url : ''} referrerPolicy="no-referrer" />
            <h2>{`${user.firstname} ${user.lastname}`}</h2>
            <div className="d-inline-block">
              <strong>{user.bio}</strong>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center container-sm">
          <button className="rounded bg-success border-info m-1 text-white" id="profile-button" type="button" onClick={() => setView('StatsTab')}>Stats</button>
          <button className="rounded bg-success border-info m-1 text-white" id="profile-button" type="button" onClick={() => setView('AchievementsTab')}>Achievements</button>
          <button className="rounded bg-success border-info m-1 text-white" id="profile-button" type="button" onClick={() => setView('FollowersTab')}>Following</button>
          <button className="rounded bg-success border-info m-1 text-white" id="profile-button" type="button" onClick={() => setView('QuestionsTab')}>Questions</button>
          <button className="rounded bg-success border-info m-1 text-white" id="profile-button" type="button" onClick={() => setView('UpdateTab')}>Update</button>
        </div>
        <div>
          <Outlet />
        </div>
        <div>
          {view === 'StatsTab' && <StatsTab stats={user} />}
          {view === 'AchievementsTab' && <AchievementsTab achievements={achievements} />}
          {view === 'FollowersTab' && <FollowersTab userId={userId} />}
          {view === 'QuestionsTab' && <QuestionsTab userId={userId} />}
          {view === 'UpdateTab' && <UpdateTab userId={userId} setView={setView} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;