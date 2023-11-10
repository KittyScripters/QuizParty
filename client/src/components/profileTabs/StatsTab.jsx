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
    [stats.myth_score, 'Mythology'],
    [stats.nature_score, 'Nature'],
    [stats.politics_score, 'Politics'],
    [stats.sports_score, 'Sports'],
  ];
  const checkHighestCatScore = (scores) => {
    scores.sort((a, b) => b[0] - a[0]);
    return `${scores[0][1]}: ${scores[0][0]}`;
  };
  return (
    <div id="profile-scores">
      <div id="score-header"><h3>Best Category: {checkHighestCatScore(catScores)}</h3></div>
      <table className="stats">
        <tr className="category">
          <th className="stats-headers">Total</th>
          <th className="stats-headers">Animals</th>
          <th className="stats-headers">Art</th>
          <th className="stats-headers">Books</th>
          <th className="stats-headers">Celebrities</th>
          <th className="stats-headers">History</th>
          <th className="stats-headers">Music</th>
          <th className="stats-headers">Mythology</th>
          <th className="stats-headers">Nature</th>
          <th className="stats-headers">Politics</th>
          <th className="stats-headers">Sports</th>
        </tr>
        <tr className="user-scores">
          <td className="stats-score">{stats.highscore}</td>
          <td className="stats-score">{stats.animals_score}</td>
          <td className="stats-score">{stats.art_score}</td>
          <td className="stats-score">{stats.books_score}</td>
          <td className="stats-score">{stats.celebrities_score}</td>
          <td className="stats-score">{stats.history_score}</td>
          <td className="stats-score">{stats.music_score}</td>
          <td className="stats-score">{stats.myth_score}</td>
          <td className="stats-score">{stats.nature_score}</td>
          <td className="stats-score">{stats.politics_score}</td>
          <td className="stats-score">{stats.sports_score}</td>
        </tr>
      </table>
    </div>
  );
};

export default StatsTab;
