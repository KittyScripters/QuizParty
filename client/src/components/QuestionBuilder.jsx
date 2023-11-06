import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionBuilder = () => {
  const [QBview, QBsetView] = useState('create');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setincorrectAnswer1] = useState('');
  const [incorrectAnswer2, setincorrectAnswer2] = useState('');
  const [incorrectAnswer3, setincorrectAnswer3] = useState('');
  const [questionSet, setQuestionSet] = useState('');
  const [quizNames, setQuizNames] = useState([]);
  
  const clearForm = () => {
    setQuestion('');
    setCorrectAnswer('');
    setincorrectAnswer1('');
    setincorrectAnswer2('');
    setincorrectAnswer3('');
    setQuestionSet('');
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
      question_set: questionSet,
      user_id: 1,
    };
    postQuestion(questionBuilderValues);
  };
  
  const getQuizNames = (userid = 1) => {
    console.log('userid: ', userid);
    return axios.get(`/getUserQuizNames/${userid}`)
      .then((fetchedQuizNames) => {
        console.log(fetchedQuizNames.data);
        setQuizNames(fetchedQuizNames.data);
      })
      .catch((err) => {
        console.error('error getting quiz names QuestionBuilder: ', err);
      });
  };
  useEffect(() => {
    getQuizNames();
  }, []);

  console.log('quiznames on render: ', quizNames);
  return (
    <span>
      {QBview === 'create'
  && (
    <>
      <h1>Create A Quiz!</h1>
      <button
        type="button"
        onClick={() => QBsetView('nameQuiz')}
      >
        Create a New Quiz
      </button>
      <button
        type="button"
        onClick={() => {
          getQuizNames(1)
            .then(() => {
              if (quizNames.length > 0) {
                QBsetView('existingQuizes');
              }
            });
        }}
      >
        Edit an Existing Quiz
      </button>
    </>
  )}
      {QBview === 'existingQuizes'
      && (
        <>
          <h1>existing quizzes</h1>
          <ul>
            {quizNames.map((quizName) => (
              <li key={quizName}>{quizName}</li>
            ))}
          </ul>
          
        </>
      )}
      {QBview === 'nameQuiz'
      && (
        <>
          Quiz Name: 
          {' '}
          <input 
            type="text"
            value={questionSet}
            onChange={(e) => setQuestionSet(e.target.value)}
          />
          <div>
            <button type="button" onClick={() => QBsetView('addQuestion')}>Create</button>
            <button type="button" onClick={() => QBsetView('create')}>Cancel</button>
          </div>
        </>
      )}
      {QBview === 'addQuestion'
  && (
    <span>
      <div>
        Question: 
        {' '}
        <input 
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        Correct Answer: 
        {' '}
        <input 
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <div>
        First Incorrect Answer: 
        {' '}
        <input 
          type="text"
          value={incorrectAnswer1}
          onChange={(e) => setincorrectAnswer1(e.target.value)}
        />     
      </div>
      <div>
        Second Incorrect Answer: 
        {' '}
        <input 
          type="text"
          value={incorrectAnswer2}
          onChange={(e) => setincorrectAnswer2(e.target.value)}
        />
        <div>
          Third Incorrect Answer: 
          {' '}
          <input 
            type="text"
            value={incorrectAnswer3}
            onChange={(e) => setincorrectAnswer3(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={submitValue}>Add Question</button>
          <button type="button" onClick={() => QBsetView('nameQuiz')}>Back</button>
        </div>
      </div>
      
    </span>
  )}
    </span>
  );
};

export default QuestionBuilder;