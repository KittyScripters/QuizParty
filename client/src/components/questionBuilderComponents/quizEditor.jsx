import React from 'react';
import ContentEditable from 'react-contenteditable';

const QuizEditor = (({ question, handleQuizEdit, index }) => (
  <div className="quiz-editor" key={question.id}>
    <div>
      <span><b>{index + 1}.</b>
        <ContentEditable
          html={question.question}
          onChange={(e) => handleQuizEdit(index, 'question', e.target.value)}
          className="question-input"
        />
      </span>
    </div>
    <div>
      <span><b>Correct Answer:</b>
        <ContentEditable
          html={question.correct_answer}
          onChange={(e) => handleQuizEdit(index, 'correct_answer', e.target.value)}
          className="correct-answer-input"
        />
      </span>
    </div>
    <div>
      <span><b>Incorrect Answer 1:</b> 
        <ContentEditable
          html={question.incorrect_answer_1}
          onChange={(e) => handleQuizEdit(index, 'incorrect_answer_1', e.target.value)}
          className="incorrect-answer-input"
        />
        
      </span>
    </div>
    <div>
      <span><b>Incorrect Answer 2:</b> 
        <ContentEditable
          html={question.incorrect_answer_2}
          onChange={(e) => handleQuizEdit(index, 'incorrect_answer_2', e.target.value)}
          className="incorrect-answer-input"
        />
      </span>
    </div>
    <div>
      <span><b>Incorrect Answer 3:</b> 
        <ContentEditable
          html={question.incorrect_answer_3}
          onChange={(e) => handleQuizEdit(index, 'incorrect_answer_3', e.target.value)}
          className="incorrect-answer-input"
        />
      </span>
    </div>
  </div>
)

);

export default QuizEditor;