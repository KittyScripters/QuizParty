/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';

const StatsTab = ({ stats }) => {
  return (
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
      <tr className="user-scores">
        <td className="stats-score">Total Percentage</td>
        <td className="stats-score">Animal Percentage</td>
        <td className="stats-score">Art Percentage</td>
        <td className="stats-score">Books Percentage</td>
        <td className="stats-score">Celebrities Percentage</td>
        <td className="stats-score">History Percentage</td>
        <td className="stats-score">Music Percentage</td>
        <td className="stats-score">Mythology Percentage</td>
        <td className="stats-score"> Nature Percentage</td>
        <td className="stats-score">Politics Percentage</td>
        <td className="stats-score">Sports Percentage</td>
      </tr>
    </table>
  );
};

export default StatsTab;
