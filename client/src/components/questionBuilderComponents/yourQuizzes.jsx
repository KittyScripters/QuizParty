import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import UserCreatedQuizList from './userCreatedQuizList';
import QuizEditor from './quizEditor';

const YourQuizzes = () => {
  const data = useLoaderData();
  console.log(data);
  const { id: userId } = useLoaderData();
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [quizNames, setQuizNames] = useState([]);
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const [userFirstname, setUserFirstname] = useState('');
  
  const getQuizNames = () => {
    axios.get(`/getUserQuizNames/${userId}`)
      .then(({ data }) => {
        setQuizNames(data);
      })
      .catch((err) => console.error('error getting quiz names: ', err));
  };
  
  const getFirstNameById = () => {
    axios.get(`/api/users/${userId}`)
      .then(({ data }) => {
        const { firstname } = data;
        setUserFirstname(firstname);
      })
      .catch((err) => console.error('could not get name', err));
  };

  useEffect(() => {
    getQuizNames();
    getFirstNameById();
  }, []);
  
  const handleQuizEdit = (index, key, value) => {
    const updatedQuiz = [...selectedQuiz];
    updatedQuiz[index][key] = value;
    setSelectedQuiz(updatedQuiz);
  };
  
  const handleQuizSelect = (quizName) => {
    return new Promise((resolve, reject) => {
      axios.post(`/retrieveUserQuiz/${userId}`, { question_set: quizName })
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

  const handleSendClick = (quizName, selectedUserId) => {
    axios.get(`/checkQuizExists/${selectedUserId}/${userFirstname}'s quiz: ${quizName}`)
      .then(({ data }) => {
        if (data.exists) {
          // eslint-disable-next-line no-alert
          alert('They already have a quiz with that name. Please try again.');
        } else {
          handleQuizSelect(quizName)
            .then((quizData) => {
              const newUserQuiz = quizData.map((question) => ({
                user_id: selectedUserId,
                question: question.question,
                correct_answer: question.correct_answer,
                incorrect_answer_1: question.incorrect_answer_1,
                incorrect_answer_2: question.incorrect_answer_2,
                incorrect_answer_3: question.incorrect_answer_3,
                question_set: `${userFirstname}'s quiz: ${quizName}`,
              }));
  
              return axios.post('/bulkCreateQuestions', { questionData: newUserQuiz });
            })
            .then((response) => {
              setSelectedQuiz([]);
            })
            .catch((err) => console.error('Error on client side submitting updated questions: ', err));
        }
      })
      .catch((err) => console.error('Error checking quiz existence: ', err));
  };

  const handlePlayClick = async (e) => {
    const quizData = await handleQuizSelect(e);
    navigate('/protected/play', { state: { quizData } });
  };
  
  const handleDeleteClick = (e) => {
    axios.post(`/retrieveUserQuiz/${userId}`, { question_set: e })
      .then(({ data }) => {
        const questionIds = data.map(({ id }) => id); 
        setQuizNames((oldNames) => oldNames.filter((quiz) => quiz !== e));
        return axios.delete('/deleteUserQuestions', { data: { questionIds } });
      })
      .then(() => {
        if (e === selectedQuiz[0].question_set) {
          setSelectedQuiz([]);
        }
      })
      .catch((err) => {
        console.error('Error deleting questions:', err);
      });
  };

  const handleAddQuestions = () => {
    navigate('../addQuestion', {
      state: { quizName: selectedQuiz[0].question_set, existingQuestions: selectedQuiz },
    });
  };

  const handleShareClick = () => {
    axios.get(`/api/join_followers/${userId}`)
      .then(({ data }) => {
        setFollowing(data);
      })
      .catch((err) => console.error(err));
  };

  const clearSelectedQuiz = () => {
    setSelectedQuiz([]);
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
        handleShareClick={handleShareClick}
        following={following}
        handleSendClick={handleSendClick}
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
              clearSelectedQuiz={clearSelectedQuiz}
            />
          )) }
          <div>
            <button type="button" onClick={handleSubmit}>Save</button>
            <button type="button" onClick={handleAddQuestions}>Add Questions</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default YourQuizzes;