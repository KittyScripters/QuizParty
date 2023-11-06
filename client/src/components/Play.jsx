import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Play = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // useEffect(() => {
  //   `You clicked ${category}`
  // });

  //console.log(category, difficulty);

  const handlePlayClick = () => { //get request
    axios.get('/api/play', {
      options: {
        category,
        difficulty,
        // category: category,
        // difficulty: difficulty,
      },
    })
      .then(() => {
        //render them the page w component did mount
        console.log('GET trivia questions successful');
      })
      .catch((err) => {
        console.error('GET trivia questions NOT successful', err);
      });
  };

  const onCategorySelection = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDifficultySelection = (event) => {
    setDifficulty(event.currentTarget.value);
  };

  return (
    <div>
      <h3>Choose your Category and Difficulty Level</h3>
      <select name="Category" id="Cat" onChange={(event) => onCategorySelection(event)}>
        <option>Category</option>
        <option>Animals</option>
        <option>Art</option>
        <option>Books</option>
        <option>Celebrities</option>
        <option>History</option>
        <option>Music</option>
        <option>Mythology</option>
        <option>Nature</option>
        <option>Politics</option>
        <option>Sports</option>
      </select>
      <select name="Difficulty" id="Difficulty" onChange={(event) => onDifficultySelection(event)} value="">
        <option>Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button type="button" onClick={() => handlePlayClick()}>Play!</button>
    </div>
  );
};

export default Play;