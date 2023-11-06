import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderBoard = () => {
  // use state hooks for leaderboard to render conditionally and to store data
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  //use state hooks for search 
  const [search, setSearch] = useState('');
  //use state hooks for top x users
  const [topNum, setTopNum] = useState(10);
  //axios get req to retrieve the leaderboard data from the /leaderboard endpoint I specified
  const getLeaderBoard = (topNum, search) => {
    const params = { topNum, search };
    //get /leaderboard
    axios.get('/leaderboard', { params })
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
  // currently using useEffect to render the leaderboard on page load
  useEffect(() => {
    getLeaderBoard(null, topNum);
  }, [search, topNum]);
  // useEffect(() => {
  //   console.log('leaderboarddata state', leaderBoardData);
  // }, [leaderBoardData]);
  
  return (
    <div>
      <h1>LeaderBoard</h1>
      {/* Search bar for user */}
      <input 
        type="text" 
        placeholder="Search for a user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
        type="button"
        onClick={() => getLeaderBoard(search)}
      >
        Search Users stats
      </button>
      <br />
      {/* Top x users leaderboard grab */}
      <input 
        type="text" 
        placeholder="How many users?"
        onChange={(e) => setTopNum(e.target.value)}
        value={topNum}
      />
      <button type="button">
        Get Top
        {' '}
        {topNum}
        {' '}
        Users
      </button>
      {/* on click tied to our getLeaderboard func */}
      <button type="button" onClick={() => getLeaderBoard(null, topNum)}>Get LeaderBoard</button>
      {/* upon leaderboard being flicked to true, render the div below */}
      {leaderBoard ? (
        <div>
          <h2>Top 15 Scores:</h2>
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
                </div>
                
              </li>
            ))}
          </ol>
          <span>
            <button type="button">Play</button>
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default LeaderBoard;