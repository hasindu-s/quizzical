import React from 'react';
import Answer from './Answer';
import './Question.css';

function Question({question, select, checking}) {
  const answerElements = [];

  for (let i = 0; i < question.answers.length; i++) {
    answerElements.push(
      <Answer
        key={question.answers[i].answerId} 
        answer={question.answers[i]} 
        questionId={question.questionId}
        select={select}
        checking={checking}
      />
    );
  }

  return (
    <div className="question-container">
      <h3 className="question">{question.question}</h3>
      <div className="answers-container">
        {answerElements}  
      </div>
      <hr className="breakline"/>
    </div>
  )
}

export default Question;