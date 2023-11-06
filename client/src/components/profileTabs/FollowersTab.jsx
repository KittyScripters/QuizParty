/* eslint-disable react/no-array-index-key */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

//expect to send the user's followers here
const FollowersTab = ({ followers }) => {
  return (
    <div>
      <h4>{followers.length} Followers</h4>
      <ul>
        {followers.map((follower, index) => <li key={index}>{follower}</li>)}
      </ul>
    </div>
  );
};

export default FollowersTab;
