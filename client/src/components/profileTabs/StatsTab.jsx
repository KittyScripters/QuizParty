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
      <div>
        <p id="profile-text" className="text-center">
          Stay up to date with your progress! <br />
          Be sure to check in when tracking your scores and best category <br />
          Keep it up scholar 🧐
        </p>
      </div>
      <div className="bg-info bg-gradient rounded-3 pb-3">
        <h3 className="mt-4">
          Best Category: {checkHighestCatScore(catScores)}
        </h3>
        <table className="mx-auto bg-success bg-gradient rounded">
          <thead>
            <tr
              id="stat-cats"
              className="
              mx-auto
            "
            >
              <th className="p-3 font-weight-bolder text-white">Total</th>
              <th className="p-3 font-weight-bolder text-white">Animals</th>
              <th className="p-3 font-weight-bolder text-white">Art</th>
              <th className="p-3 font-weight-bolder text-white">Books</th>
              <th className="p-2 font-weight-bolder text-white">Celebrities</th>
              <th className="p-3 font-weight-bolder text-white">History</th>
              <th className="p-3 font-weight-bolder text-white">Music</th>
              <th className="p-2 font-weight-bolder text-white">Mythology</th>
              <th className="p-3 font-weight-bolder text-white">Nature</th>
              <th className="p-3 font-weight-bolder text-white">Politics</th>
              <th className="p-3 font-weight-bolder text-white">Sports</th>
            </tr>
          </thead>
          <tbody>
            <tr id="stats-total" className="font-weight-bolder">
              <td className="pb-4 text-white">{stats.highscore}</td>
              <td className="pb-4 text-white">{stats.animals_score}</td>
              <td className="pb-4 text-white">{stats.art_score}</td>
              <td className="pb-4 text-white">{stats.books_score}</td>
              <td className="pb-4 text-white">{stats.celebrities_score}</td>
              <td className="pb-4 text-white">{stats.history_score}</td>
              <td className="pb-4 text-white">{stats.music_score}</td>
              <td className="pb-4 text-white">{stats.mythology_score}</td>
              <td className="pb-4 text-white">{stats.nature_score}</td>
              <td className="pb-4 text-white">{stats.politics_score}</td>
              <td className="pb-4 text-white">{stats.sports_score}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatsTab;
