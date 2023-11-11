import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserCreatedQuizList from './userCreatedQuizList';
import QuizEditor from './quizEditor';

const YourQuizzes = ({ userId = 1 }) => {
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [quizNames, setQuizNames] = useState([]);
  const navigate = useNavigate();
  
  const getQuizNames = () => {
    axios.get('/getUserQuizNames/1')
      .then(({ data }) => {
        setQuizNames(data);
      })
      .catch((err) => console.error('error getting quiz names QuestionBuilder: ', err));
  };
  
  useEffect(() => {
    getQuizNames();
  }, []);
  
  const handleQuizEdit = (index, key, value) => {
    const updatedQuiz = [...selectedQuiz];
    updatedQuiz[index][key] = value;
    setSelectedQuiz(updatedQuiz);
  };

  const handleQuizSelect = (quizName) => {
    return new Promise((resolve, reject) => {
      axios.post('/retrieveUserQuiz/1', { question_set: quizName })
        .then(({ data }) => {
          console.log('data in retrieve quiz:', data);
          setSelectedQuiz(data);
          resolve(data);
        })
        .catch((err) => {
          console.error('error getting quiz: ', err);
          reject(err);
        });
    });
  };
  
  const handlePlayClick = async (e) => {
    const quizData = await handleQuizSelect(e);
    navigate('/protected/play', { state: { quizData } });
  };

  const handleDeleteClick = (e) => {
    axios.post('/retrieveUserQuiz/1', { question_set: e })
      .then(({ data }) => {
        const questionIds = data.map(({ id }) => id); 
        setQuizNames((oldNames) => oldNames.filter((quiz) => quiz !== e));
        return axios.delete('/deleteUserQuestions', { data: { questionIds } });
      })
      .then(() => {
      })
      .catch((err) => {
        console.error('Error deleting questions:', err);
      });
  };

  const handleSubmit = () => {
    axios
      .patch(`/updateUserQuiz/${userId}`, selectedQuiz)
      .then((response) => {
      })
      .catch((err) => console.error('Error on client side submitting updated questions: ', err));
  };
  return (
    <div>
      <h1>Edit Your Quizzes</h1>
      <UserCreatedQuizList 
        quizNames={quizNames}
        handlePlayClick={handlePlayClick}
        handleQuizSelect={handleQuizSelect}
        handleDeleteClick={handleDeleteClick}
      />
      {selectedQuiz.length > 0 ? (
        <div>
          <h2>Quiz Name: {selectedQuiz[0].question_set}</h2>
          {selectedQuiz.map((question, index) => (
            <QuizEditor 
              index={index}
              key={question.id}
              question={question}
              handleQuizEdit={handleQuizEdit} 
            />
          )) }
          <div>
            <button type="button" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default YourQuizzes;