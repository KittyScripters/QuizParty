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
    return `${scores[0][1]} ${scores[0][0]}`;
  };
  return (
    <div
      id="profile-scores"
      className="
        text-center
      "
    >
      <div className="mt-5" id="score-header"><h3>Best Category: {checkHighestCatScore(catScores)}</h3></div>
      <table className="mx-auto">
        <tr id="stat-cats" className="mx-auto">
          <th className="p-3">Total</th>
          <th className="p-3">Animals</th>
          <th className="p-3">Art</th>
          <th className="p-3">Books</th>
          <th className="p-2">Celebrities</th>
          <th className="p-3">History</th>
          <th className="p-3">Music</th>
          <th className="p-2">Mythology</th>
          <th className="p-3">Nature</th>
          <th className="p-3">Politics</th>
          <th className="p-3">Sports</th>
        </tr>
        <tr id="stats-total">
          <td>{stats.highscore}</td>
          <td>{stats.animals_score}</td>
          <td>{stats.art_score}</td>
          <td>{stats.books_score}</td>
          <td>{stats.celebrities_score}</td>
          <td>{stats.history_score}</td>
          <td>{stats.music_score}</td>
          <td>{stats.mythology_score}</td>
          <td>{stats.nature_score}</td>
          <td>{stats.politics_score}</td>
          <td>{stats.sports_score}</td>
        </tr>
      </table>
    </div>
  );
};

export default StatsTab;
