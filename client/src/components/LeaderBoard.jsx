import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom';
import NavBar from './NavBar';
import getUserLoader from './App';

const LeaderBoard = () => {
  // use state hooks for leaderboard to render conditionally and to store data
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  //use state hooks for search 
  const [search, setSearch] = useState('');
  //use state hooks for top x users
  const [topNum, setTopNum] = useState(10);
  //axios get req to retrieve the leaderboard data from the /leaderboard endpoint I specified
  const [currentUser, setCurrentUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const data = useLoaderData();
  console.log('loader data in leaderboard', data);

  const getLeaderBoard = (topNum, search) => {
    const params = { topNum, search };
    // console.log('params', params);
    //get /leaderboard
    axios.get('/api/leaderboard', { params })
    // then, log success and set the leaderboard state to true and the data to the response data so
    // it can be mapped over and rendered
      .then((res) => {
        // console.log('res log', res);
        console.log('successfully fetched data from leaderboard');
        setLeaderBoardData(res.data);
        setLeaderBoard(true);
      })
      // catch error handling
      .catch((err) => {
        console.log('failed to retrieve leaderboard', err);
      });
  };

  const handleFollow = (userId) => {
    axios.post(`/follow/${userId}`)
      .then((response) => {
        console.log(response.data);
        setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
      })
      .catch((error) => {
        console.error('Failed to follow user:', error);
      });
  };
  
  // currently using useEffect to render the leaderboard on page load
  useEffect(() => {
    getLeaderBoard(topNum, null);
  }, []);
  //test logs to check state 
  // useEffect(() => {
  //   console.log('leaderboarddata state', leaderBoardData);
  // }, [leaderBoardData]);
  // useEffect(() => {
  //   console.log('leaderboard state', leaderBoardData);
  // }, [leaderBoard]);

  // useEffect(() => {
  //   axios.get('/api/current-user')
  //     .then((response) => {
  //       setCurrentUser(response.data); 
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch current user:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios.get('/api/followed-users')
  //     .then((response) => {
  //       setFollowedUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to fetch followed users:', error);
  //     });
  // }, []);
  
  return (
    <div>
      <div>
        <NavBar />
      </div>
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
        onClick={() => getLeaderBoard(topNum, search)}
      >
        Search Users stats
      </button>
      <br />
      {/* Top x users leaderboard grab */}
      <select 
        id="topNum" 
        value={topNum} 
        onChange={(e) => setTopNum(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      {/* on click tied to our getLeaderboard func */}
      <button type="button" onClick={() => getLeaderBoard(topNum)}>Get LeaderBoard</button>
      {/* upon leaderboard being flicked to true, render the div below */}
      {leaderBoard ? (
        <div>
          <h2>Top {leaderBoardData.length} Scores:</h2>
          <ol>
            {console.log('leaderboarddata state', leaderBoardData)}
            {console.log('leaderboarddata type', typeof leaderBoardData)}
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

                  {/* {currentUser !== null && user.id !== currentUser.id && !followedUsers.includes(user.id) && ( */}
                  <button type="button" onClick={() => handleFollow(user.id)}>
                    Follow
                  </button>
                  {/* )} */}
                </div>
              </li>
            ))}
          </ol>
          <span>
            <Link to="/protected/play">
              <button type="button">Play</button>
            </Link>
          </span>
          <span>
            <Link to="/protected/profile">
              <button type="button">Profile</button>
            </Link>
          </span>
        </div>
      ) : null}
    </div>
  );
};

// test loader
export const testLoader = () => {
  return 'test loader is working';
};

export default LeaderBoard;