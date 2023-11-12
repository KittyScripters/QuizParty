import React, { useState } from 'react';

const UserCreatedQuiz = ({
  quizName, handlePlayClick, handleQuizSelect, handleDeleteClick, 
  handleShareClick, following, handleSendClick,
}) => {
  const [followingSelect, setFollowingSelect] = useState([false]);
  const [selectedUser, setSelectedUser] = useState('');

  const handleSelectChange = (e) => {
    setSelectedUser(e.target.value);
  };
  console.log(following);
  console.log(selectedUser);
  return (
    <div key={quizName} className="col">
      {quizName}{' '}
      <span className="button-container">
        <button
          type="button"
          className="playUserQuizButton"
          value={quizName}
          onClick={(e) => handlePlayClick(e.target.value)}
        >Play
        </button>
        <button
          type="button"
          className="editUserQuizButton"
          value={quizName}
          onClick={(e) => { handleQuizSelect(e.target.value); }}
        >Edit
        </button>
        <button
          type="button"
          className="deleteUserQuizButton"
          value={quizName}
          onClick={(e) => { handleDeleteClick(e.target.value); }}
        >Delete
        </button>
        <button type="button" onClick={() => { handleShareClick(); setFollowingSelect(true); }}>Share</button>
        {followingSelect === true
        && (
          <span>
            <select value={selectedUser} onChange={handleSelectChange}>
              <option value="" disabled>Select Followed User</option>
              {following.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            <button value={quizName} type="button" onClick={(e) => handleSendClick(e.target.value, selectedUser)}>Send</button>
          </span>
        )}
      </span>
    </div>
  );
};

export default UserCreatedQuiz;