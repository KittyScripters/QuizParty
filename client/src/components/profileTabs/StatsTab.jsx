/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const StatsTab = ({ stats }) => {
  const catScores = [
    [stats.animals_score, 'Animals'],
    [stats.art_score, 'Art'],
    [stats.books_score, 'Books'],
    [stats.celebrities_score, 'Celebrities'],
    [stats.history_score, 'History'],
    [stats.music_score, 'Music'],
    [stats.mythology_score, 'Mythology'],
    [stats.nature_score, 'Nature'],
    [stats.politics_score, 'Politics'],
    [stats.sports_score, 'Sports'],
  ];
  const checkHighestCatScore = (scores) => {
    scores.sort((a, b) => b[0] - a[0]);
    return `${scores[0][1]}: ${scores[0][0]}`;
  };
  return (
    <div
      id="profile-scores"
      className="
        text-center
      "
    >
      <div className="start-50" id="score-header"><h3>Best Category: {checkHighestCatScore(catScores)}</h3></div>
      <table className="start-50">
        <tr className="category">
          <th id="stats-total" className="">Total</th>
          <th className="">Animals</th>
          <th className="">Art</th>
          <th className="">Books</th>
          <th className="">Celebrities</th>
          <th className="">History</th>
          <th className="">Music</th>
          <th className="">Mythology</th>
          <th className="">Nature</th>
          <th className="">Politics</th>
          <th className="">Sports</th>
        </tr>
        <tr id="stats-total" className="user-scores">
          <td className="">{stats.highscore}</td>
          <td className="">{stats.animals_score}</td>
          <td className="">{stats.art_score}</td>
          <td className="">{stats.books_score}</td>
          <td className="">{stats.celebrities_score}</td>
          <td className="">{stats.history_score}</td>
          <td className="">{stats.music_score}</td>
          <td className="">{stats.mythology_score}</td>
          <td className="">{stats.nature_score}</td>
          <td className="">{stats.politics_score}</td>
          <td className="">{stats.sports_score}</td>
        </tr>
      </table>
    </div>
  );
};

export default StatsTab;
