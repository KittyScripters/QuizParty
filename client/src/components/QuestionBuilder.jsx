import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionAddForm from './questionBuilderComponents/questionAddForm';
import EditExistingQuiz from './questionBuilderComponents/editExistingQuiz';

const QuestionBuilder = () => {
  const [QBview, QBsetView] = useState('create');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setincorrectAnswer1] = useState('');
  const [incorrectAnswer2, setincorrectAnswer2] = useState('');
  const [incorrectAnswer3, setincorrectAnswer3] = useState('');
  
  const [quizNames, setQuizNames] = useState([]);
  
  const clearForm = () => {
    setQuestion('');
    setCorrectAnswer('');
    setincorrectAnswer1('');
    setincorrectAnswer2('');
    setincorrectAnswer3('');
  };
  
  const submitValue = () => {
    const postQuestion = (questionContents) => {
      axios.post('/createQuestion', questionContents)
        .then((response) => {
          console.log('Question Posted From QB: ', response.data);
          clearForm();
        })
        .catch((err) => {
          console.error('error saving question: ', err);
        });
    };

    const questionBuilderValues = {
      question,
      correct_answer: correctAnswer,
      incorrect_answer_1: incorrectAnswer1,
      incorrect_answer_2: incorrectAnswer2,
      incorrect_answer_3: incorrectAnswer3,
      
      user_id: 1,
    };
    postQuestion(questionBuilderValues);
  };

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
      {QBview === 'addQuestion'
  && (
    <span>
      <QuestionAddForm />
    </span>
  )}
    </span>
  );
};

export default QuestionBuilder;