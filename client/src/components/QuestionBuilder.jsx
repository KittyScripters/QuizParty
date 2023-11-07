import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionAddForm from './questionBuilderComponents/questionAddForm';
import EditExistingQuiz from './questionBuilderComponents/editExistingQuiz';

const QuestionBuilder = () => {
  const [QBview, QBsetView] = useState('create');
  const [quizNames, setQuizNames] = useState([]);

  useEffect(() => {
    axios.get('/getUserQuizNames/1')
      .then(({ data }) => {
        console.log('data in get:', data);
        setQuizNames(data);
      })
      .catch((err) => console.error('error getting quiz names QuestionBuilder: ', err));
  }, []);

  return (
    <span>
      
      {QBview === 'create'
  && (
    <>
      <h1>Create A Quiz!</h1>
      <button
        type="button"
        onClick={() => QBsetView('addQuestion')}
      >
        Create a New Quiz
      </button>
      <button
        type="button"
        onClick={() => {
          QBsetView('existingQuizes');
        }}
      >
        Edit an Existing Quiz
      </button>
    </>
  )}
      {QBview === 'existingQuizes' && <EditExistingQuiz quizNames={quizNames} />}
      {QBview === 'addQuestion'&& <QuestionAddForm />}
    </span>
  );
};

export default QuestionBuilder;