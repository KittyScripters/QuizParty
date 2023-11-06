import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderBoard = () => {
  // use state hooks for leaderboard to render conditionally and to store data
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  //axios get req to retrieve the leaderboard data from the /leaderboard endpoint I specified
  const getLeaderBoard = () => {
    //get /leaderboard
    axios.get('/leaderboard')
    // then, log success and set the leaderboard state to true and the data to the response data so
    // it can be mapped over and rendered
      .then((res) => {
        console.log('successfully fetched data from leaderboard', res.data);
        setLeaderBoardData(res.data);
        setLeaderBoard(true);
      })
      // catch error handling
      .catch((err) => {
        console.log('failed to retrieve leaderboard', err);
      });
  };
  // currently using useEffect to check the state of the leaderboard and the leaderboard data
  useEffect(() => {
    console.log('leaderboard state', leaderBoard);
  }, [leaderBoard]);
  useEffect(() => {
    console.log('leaderboarddata state', leaderBoardData);
  }, [leaderBoardData]);

  return (
    <div>
      <h1>LeaderBoard</h1>
      {/* on click tied to our getLeaderboard func */}
      <button type="button" onClick={() => getLeaderBoard()}>Get LeaderBoard</button>
      {/* upon leaderboard being flicked to true, render the div below */}
      {leaderBoard ? (
        <div>
          <h2>Top 10 Scores:</h2>
          <ol>
            {/* in an ordered list, map through the data, using a user and an index (keys) */}
            {leaderBoardData.map((user, index) => (
              <li key={index}>
                <div>
                  <span>
                    <b>Username</b>
                    :
                    {' '}
                    {user.username}
                    {' '}
                    <b>Highscore</b>
                    :
                    {' '}
                    {user.highscore}
                  </span>
                  <br />
                  <span />
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default LeaderBoard;