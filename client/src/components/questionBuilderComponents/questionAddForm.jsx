import React, { useState } from 'react';
import axios from 'axios';

const QuestionAddForm = () => {
  const [QAview, QAsetView] = useState('nameQuiz');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setincorrectAnswer1] = useState('');
  const [incorrectAnswer2, setincorrectAnswer2] = useState('');
  const [incorrectAnswer3, setincorrectAnswer3] = useState('');
  const [questionSet, setQuestionSet] = useState('');

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
      question_set: questionSet,
      user_id: 1,
    };
    postQuestion(questionBuilderValues);
  };
  console.log('render view value: ', QAview);
  return (
    <span>
      {QAview === 'nameQuiz'
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
            <button
              type="button"
              onClick={() => {
                QAsetView('addQuestion');
                console.log('view on create click: ', QAview);
              }}
            >
              Create

            </button>
            {/* <button type="button" onClick={() => QBsetView('create')}>Cancel</button> */}
          </div>
        </>
      )}
      {QAview === 'addQuestion' && (
        <> 
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
              <button type="button" onClick={() => QAsetView('nameQuiz')}>
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </span>
  );
};

export default QuestionAddForm;