import React from 'react';
import './Answer.css';

function Answer({answer, select, checking, questionId}) {
  console.log(answer.selected? answer.answer: '');
  const styleClasses = `answer ${answer.selected?
    `selected ${checking? `checking ${answer.correct? 'correct': 'incorrect'}` : ''}` :
    `${checking? `checking ${answer.correct? 'correct': ''}` : ''}`
  }`;
  
  return (
    <div 
      className={styleClasses}
      onClick={() => (checking? null : select(answer.answerId, questionId))}  
    >
      {answer.answer}
    </div>
  );
}

export default Answer;