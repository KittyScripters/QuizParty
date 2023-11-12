/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom';
import NavBar from './NavBar';

const LeaderBoard = () => {
  const userData = useLoaderData();
  const currUserId = userData.id;
  // use state hooks for leaderboard to render conditionally and to store data
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  //use state hooks for search
  const [search, setSearch] = useState('');
  //use state hooks for top x users
  const [topNum, setTopNum] = useState(10);
  //axios get req to retrieve the leaderboard data from the /leaderboard endpoint I specified

  //state for followers leaderboard 
  const [followersLeaderBoard, setFollowersLeaderBoard] = useState([]);
  //state for followers list for leaderboard/follow fuction
  const [followers, setFollowers] = useState([]);

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
      .then(() => {
        //if the post req is successful and the user is added to follower, update followers state
        //by adding new follwer with id of user being followed
        setFollowers((prevFollowers) => [...prevFollowers, { id: userId }]);
      })
      .catch((error) => {
        console.error('Failed to follow user:', error);
      });
  };

  const renderFollowersLeaderBoard = () => {
    setFollowersLeaderBoard(followers);
    setLeaderBoard(false);
  };
  // useEffect(() => {
  //   renderFollowersLeaderBoard();
  // }, [followers]);
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
  
  useEffect(() => {
    axios.get(`/api/join_followers/${currUserId}`)
      .then((response) => {
        //set followers to the res data 
        setFollowers(response.data);
      })
      .catch((err) => console.error(err));
    //dependent on array and should rerun changes
  }, [setFollowers]);
  
  return (
    <div className="container-fluid">
      <div id="leaderboard" className=" container-fluid align-text-center">
        <h1 id='search-title'>Leaderboard</h1>
        {/* Search bar for user */}
        <input 
          id="search-input"
          type="text" 
          placeholder="Search for a user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              getLeaderBoard(topNum, search);
            }
          }}
        />
        <button
          id="search-button" 
          className="btn btn-success"
          type="button"
          onClick={() => getLeaderBoard(topNum, search)}
        >
          Search Users stats
        </button>
        <br />
        {/* Top x users leaderboard grab */}
        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="leaderboard-Dropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Top
            {' '}
            {' '}
            Users
          </button>
          <ul className="dropdown-menu">
            <li>
              <a 
                className="dropdown-item" 
                href="#"
                onClick={() => getLeaderBoard(5, null)}
              >
                5
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="#"
                onClick={() => getLeaderBoard(10, null)}
              >
                10
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="#"
                onClick={() => getLeaderBoard(15, null)}
              >
                15
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="#"
                onClick={() => getLeaderBoard(50, null)}
              >
                50
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                href="#"
                onClick={() => getLeaderBoard(100, null)}
              >
                100
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* upon leaderboard being flicked to true, render the div below */}
      {leaderBoard ? (
        <div id="leaderboard" className="container-lg">
          <h2 id="top-scores-title">Top {leaderBoardData.length} Scores:</h2>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a 
                className={`nav-link ${leaderBoard ? 'active' : ''}`} 
                onClick={() => { getLeaderBoard(10, null); }}
              >
                All Users
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${!leaderBoard ? 'active' : ''}`} 
                onClick={() => { renderFollowersLeaderBoard(); }}
              >
                Get Followers Leaderboard
              </a>
            </li>
          </ul>
          <ol className="list-group list-group-numbered">
            {/* in an ordered list, map through the data, using a user and an index (keys) */}
            {leaderBoardData.map((user, index) => (
              <li key={index} id="leaderboard-list-item" className="list-group-item d-flex justify-content-center">
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
                    <span className="badge bg-success rounded-pill">
                      {user.highscore}
                    </span>
                    {' '}
                  </span>
                  {/* check for at least one element is satisfied, check for if follower id is user id */}
                  {followers.some((follower) => follower.id === user.id) ? (
                    <span>Already Followed</span>
                  ) : (
                    //div to utilize bootstrap to place button on the right of the li
                    <div className="float-end">
                      <button type="button" id="follow-btn" className="btn btn-warning" onClick={() => handleFollow(user.id)}>
                        Follow
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div id="secondary-button-group" className="d-flex justify-content-center">
            <span>
              <Link to="/protected/play">
                <button id="secondary-play-button" className="btn btn-warning" type="button">Play</button>
              </Link>
            </span>
            <span>
              <Link to="/protected/profile">
                <button id="secondary-profile-button" className="btn btn-warning" type="button">Profile</button>
              </Link>
            </span>
          </div>
        </div>
      ) 
        : (
          <div id="leaderboard">
            <h2 id="followers-leaderboard-title">Followers Leaderboard:</h2>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a 
                  className={`nav-link ${leaderBoard ? 'active' : ''}`} 
                  onClick={() => { getLeaderBoard(10, null); }}
                >
                  All Users
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${!leaderBoard ? 'active' : ''}`} 
                  onClick={() => { renderFollowersLeaderBoard(); }}
                >
                  Get Followers Leaderboard
                </a>
              </li>
            </ul>
            <ol className="list-group list-group-numbered">
              {followersLeaderBoard.map((follower, index) => (
                <li key={index} id="leaderboard-list-item" className="list-group-item d-flex justify-content-center">
                  <div>
                    <span>
                      <b>Username</b>: {follower.username}{' '}
                      <b>Highscore</b>: {follower.highscore}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <div id="secondary-button-group" className="d-flex justify-content-center">
              <span>
                <Link to="/protected/play">
                  <button id="secondary-play-button" className="btn btn-warning" type="button">Play</button>
                </Link>
              </span>
              <span>
                <Link to="/protected/profile">
                  <button id="secondary-profile-button" className="btn btn-warning" type="button">Profile</button>
                </Link>
              </span>
            </div>
          </div>
        )}
      
    </div>
  );
};

// test loader
export const testLoader = () => {
  return 'test loader is working';
};

export default LeaderBoard;