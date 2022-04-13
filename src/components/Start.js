import React from 'react';
import './Start.css';

function Start(props) {
  return (
    <div className="start-container">
      <h1 className="start-title">Quizzical</h1>
      <p className="start-description">We came, we quizzed, we conquered</p>
      <button className="start-button" onClick={() => props.startQuiz(true)}>Start quiz</button>
    </div>
  )
}

export default Start;