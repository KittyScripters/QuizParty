import React, { useState } from 'react';
import axios from 'axios';

// user's profile
const Profile = () => {
  // user object state variable
  const getUser = () => {
    axios.get('/api/users')
  };

  return (
    <div>
      <img alt="user" />
      {/* following, personal high score */}
      <p className="bio">
        User bio paragraph describing themselves
      </p>
      <div>
        <table>
          <tr className="headers">
            <th className="profile-table">Followers</th>
            <th className="profile-table" colSpan="2">Stats</th>
            <th className="profile-table">Achievements</th>
          </tr>
          <tr className="table-data">
            <td>Stephen</td>
            <td>Entertainment: Music</td>
            <td>44</td>
            <td>Top Dog: Description</td>
          </tr>
        </table>
      </div>
      <div>
        <p>List of their questions from the database</p>
      </div>
    </div>
  );
};

export default Profile;