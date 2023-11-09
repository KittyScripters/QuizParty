/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//expect to send the user's followers here
const FollowersTab = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  console.log(userId);

  useEffect(() => {
    axios.get(`/api/join_followers/${userId}`)
      .then(({ data }) => {
        setFollowers(data);
      })
      .catch((err) => console.error(err));
  }, [setFollowers]);

  const deleteFollower = (followerId) => {
    axios.delete(`/api/join_followers/${userId}/${followerId}`)
      .then(() => {
        axios.get(`/api/join_followers/${userId}`)
          .then(({ data }) => {
            setFollowers(data);
          })
          .catch((err) => console.error(err));
      });
  };
  console.log('state', followers);

  return (
    <div>
      <h4>{followers.length} Followers</h4>
      <div>
        {followers.map((follower) => {
          console.log(follower);
          return (
            <div key={follower[0]}>
              <button onClick={() => deleteFollower(follower[0])}>Delete</button>
              {follower[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowersTab;
