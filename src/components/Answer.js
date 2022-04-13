import React from 'react';
import './Answer.css';

function Answer({answer, select, checking, questionId}) {
  console.log(answer.selected? answer.answer: '');
  const classes = `answer ${answer.selected?
    `selected ${checking? (answer.correct? 'correct': 'incorrect') : ''}` :
    `${checking && answer.correct? 'correct' : ''}`
  }`;
  return (
    <div 
      className={classes}
      onClick={() => (checking? null : select(answer.answerId, questionId))}  
    >
      {answer.answer}
    </div>
  );
}

export default Answer;