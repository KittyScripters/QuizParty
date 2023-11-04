import React from 'react';

// user's profile
const Profile = () => {
  return (
    <div>
      <img alt="user" />
      <p className="bio">
        User bio paragraph describing themselves
      </p>
      <div>
        <table>
          <tr className="category">
            <th className="stats-headers">Total</th>
            <th className="stats-headers">Art</th>
            <th className="stats-headers">Celebs</th>
            <th className="stats-headers">Animals</th>
            <th className="stats-headers">Music</th>
            <th className="stats-headers">Sports</th>
            <th className="stats-headers">Books</th>
            <th className="stats-headers">Mythology</th>
            <th className="stats-headers">History</th>
            <th className="stats-headers">Nature</th>
            <th className="stats-headers">Politics</th>
          </tr>
          <tr>
            <td className="stats-score">203</td>
            <td className="stats-score">5</td>
            <td className="stats-score">3</td>
            <td className="stats-score">0</td>
            <td className="stats-score">66</td>
            <td className="stats-score">13</td>
            <td className="stats-score">0</td>
            <td className="stats-score">17</td>
            <td className="stats-score">85</td>
            <td className="stats-score">1</td>
            <td className="stats-score">13</td>
          </tr>
        </table>
        <table>
          <tr className="headers">
            <th className="profile-table">Followers</th>
            <th className="profile-table">Achievements</th>
          </tr>
          <tr className="table-data">
            <td>Stephen</td>
            <td>Top Dog</td>
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