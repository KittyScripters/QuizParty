import React, { useState } from 'react';
import axios from 'axios';

const QuestionBuilder = () => {
  const [question, setQuestion] = useState('');
  const [correct_answer, setCorrectAnswer] = useState('');
  const [incorrect_answer_1, setincorrectAnswer1] = useState('');
  const [incorrect_answer_2, setincorrectAnswer2] = useState('');
  const [incorrect_answer_3, setincorrectAnswer3] = useState('');
  const [question_set, setQuestionSet] = useState('');
  
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
      correct_answer,
      incorrect_answer_1,
      incorrect_answer_2,
      incorrect_answer_3,
      question_set,
      user_id: 1,
    };
    postQuestion(questionBuilderValues);
  };
  
  return (
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
          value={correct_answer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <div>
        First Incorrect Answer: 
        {' '}
        <input 
          type="text"
          value={incorrect_answer_1}
          onChange={(e) => setincorrectAnswer1(e.target.value)}
        />     
      </div>
      <div>
        Second Incorrect Answer: 
        {' '}
        <input 
          type="text"
          value={incorrect_answer_2}
          onChange={(e) => setincorrectAnswer2(e.target.value)}
        />
        <div>
          Third Incorrect Answer: 
          {' '}
          <input 
            type="text"
            value={incorrect_answer_3}
            onChange={(e) => setincorrectAnswer3(e.target.value)}
          />
        </div>
        <div>
          Question Set: 
          {' '}
          <input 
            type="text"
            value={question_set}
            onChange={(e) => setQuestionSet(e.target.value)}
          />
        </div>
        <button type="button" onClick={submitValue}>Submit</button>
      </div>
      
    </span>
  );
};

export default QuestionBuilder;