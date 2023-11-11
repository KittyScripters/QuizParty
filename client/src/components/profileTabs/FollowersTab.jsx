/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//expect to send the user's followers here
const FollowersTab = ({ userId }) => {
  const [followers, setFollowers] = useState([]);

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

  return (
    <div>
      <div className="bg-info bg-gradient rounded p-3 mt-3 w-75 mx-auto">
        <h4 className="text-center mb-3">Following: {followers.length}</h4>
        <table className="mx-auto px-5">
          <tbody>
            {followers.map((follower) => {
              return (
                <tr className="bg-success bg-gradient">
                  <td className="mx-auto px-5 rounded-start-4">
                    <button
                      className="
                        rounded
                        bg-success
                        border-info
                        m-1
                        text-white"
                      type="button"
                      onClick={() => deleteFollower(follower.id)}
                    >Delete
                    </button>
                  </td>
                  <td className="px-5">
                    {' '}
                  </td>
                  <td className="mx-auto px-5 text-white">
                    {`${follower.firstname} ${follower.lastname}`}
                  </td>
                  <td className="px-5">
                    {' '}
                  </td>
                  <td className="mx-auto px-5 text-white rounded-end-4">
                    {`Top score: ${follower.highscore}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowersTab;
