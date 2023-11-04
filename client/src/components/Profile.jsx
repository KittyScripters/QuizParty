import React from 'react';

// user's profile
const Profile = () => {
  return (
    <div>
      <img alt="user" />
      {/* following, personal high score */}
      <p className="bio">
        User bio paragraph describing themselves
      </p>
      <div>
        <span>Their followers</span>
        <span>Personal High Score</span>
      </div>
      <div>
        <p>List of their questions from the database</p>
      </div>
    </div>
  );
};

export default Profile;