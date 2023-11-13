import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData, useLocation } from 'react-router-dom';
import NameNewQuiz from './nameNewQuiz';

const QuestionAddForm = () => {
  const { id: userId } = useLoaderData();
  const [QAview, QAsetView] = useState('nameQuiz');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setincorrectAnswer1] = useState('');
  const [incorrectAnswer2, setincorrectAnswer2] = useState('');
  const [incorrectAnswer3, setincorrectAnswer3] = useState('');
  const [questionSet, setQuestionSet] = useState('');
  const [createdQuestions, setCreatedQuestions] = useState([]);
  const location = useLocation();
  const { state } = location;
  const clearForm = () => {
    setQuestion('');
    setCorrectAnswer('');
    setincorrectAnswer1('');
    setincorrectAnswer2('');
    setincorrectAnswer3('');
  };
  
  const setParentView = () => {
    QAsetView('addQuestion');
  };

  useEffect(() => {
    if (state) {
      setQuestionSet(state.quizName);
      setCreatedQuestions(state.existingQuestions);
      QAsetView('addQuestion');
    }
  }, [state]);

  const submitValue = () => {
    const postQuestion = (questionContents) => {
      axios.post('/createQuestion', questionContents)
        .then((response) => {
          console.log('Question Posted From QB: ', response.data);
          setCreatedQuestions([...createdQuestions, response.data]);
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
      user_id: userId,
    };
    postQuestion(questionBuilderValues);
  };
  
  return (
    <div id="question-add-form">
      {QAview === 'nameQuiz'
      && (
        <NameNewQuiz
          userId={userId}
          questionSet={questionSet}
          setQuestionSet={setQuestionSet}
          setParentView={setParentView}
        />
      )}
    
      {QAview === 'addQuestion' && (
        <> 
          <h2>{questionSet}</h2>
          <div className="form-group">
            Question: 
            {' '}
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            Correct Answer: 
            {' '}
            <input 
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            First Incorrect Answer: 
            {' '}
            <input 
              type="text"
              value={incorrectAnswer1}
              onChange={(e) => setincorrectAnswer1(e.target.value)}
              className="form-control"
            />     
          </div>
          <div className="form-group">
            Second Incorrect Answer: 
            {' '}
            <input 
              type="text"
              value={incorrectAnswer2}
              onChange={(e) => setincorrectAnswer2(e.target.value)}
              className="form-control"
            />
            <div className="form-group">
              Third Incorrect Answer: 
              {' '}
              <input 
                type="text"
                value={incorrectAnswer3}
                onChange={(e) => setincorrectAnswer3(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <button type="button" onClick={submitValue}>Add Question</button>
              <button
                type="button"
                onClick={() => { 
                  QAsetView('nameQuiz'); 
                  setCreatedQuestions([]); 
                }}
                className="btn btn-secondary"
              >
                Back
              </button>
            </div>
            <div>
              {createdQuestions.map((createdQuestion, index) => (
                <div key={createdQuestion.id} className="created-question">
                  <div>
                    <br />
                    <span><b>{index + 1}.</b> {createdQuestion.question}</span>
                  </div>
                  <div>
                    <span><b>Correct Answer:</b> {createdQuestion.correct_answer}</span>
                  </div>
                  <div>
                    <span><b>Incorrect Answer 1:</b> {createdQuestion.incorrect_answer_1}</span>
                  </div>
                  <div>
                    <span><b>Incorrect Answer 2:</b> {createdQuestion.incorrect_answer_2}</span>
                  </div>
                  <div>
                    <span><b>Incorrect Answer 3:</b> {createdQuestion.incorrect_answer_3}</span>
                  </div>
                  <br />
                </div> 
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionAddForm;
