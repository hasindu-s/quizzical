import React, {useState, useEffect} from 'react';
import Question from './Question';
import Error from './Error';
import he from 'he';
import {nanoid} from 'nanoid';
import {TailSpin} from 'react-loading-icons';
import './QnA.css';

function QnA({numOfQuestions}) {
  const [loading, setLoading] = useState(false);
  const [initQuestions, setInitQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const [checking, setChecking] = useState(false);
  const [marks, setMarks] = useState(0);

  function newGame() {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&type=multiple`)
    .then(response => response.json())
    .then(data => {
      if (data.response_code === 0) {
        setChecking(false);
        setMarks(0);
        setFetchError('');
        setInitQuestions(data.results);
        setLoading(false);
      }        
    })
    .catch(error => setFetchError(error.message));
  }

  useEffect(() => {
    newGame();
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    // Create the question in the required format
    function createQuestion(q) {
      let question = {};
      question['question'] = he.decode(q.question);
      question['questionId'] = nanoid();

      const answers = [];
      
      for (let i = 0; i < q.incorrect_answers.length; i++) {
        answers.push({
          answer: he.decode(q.incorrect_answers[i]),
          correct: false,
          selected: false,
          answerId: nanoid()
        });
      }

      answers.push({
        answer: he.decode(q.correct_answer),
        correct: true,
        selected: false,
        answerId: nanoid()
      });

      shuffleArray(answers);
      question['answers'] = answers;
      console.log(question);
      return question;
    }

    setQuestions(initQuestions.map(initQuestion => createQuestion(initQuestion)));
  }, [initQuestions]);
 
  function select(answerId, questionId) {
    setQuestions(prevQuestions => prevQuestions.map(prevQuestion => {
      const newQuestion = prevQuestion;
      const answers = newQuestion.answers.map(answer => (
        questionId === prevQuestion.questionId? {
          ...answer,
          selected: answerId === answer.answerId? true : false
        } : answer)
      );
      newQuestion.answers = answers;
      return newQuestion;      
    }));
    console.log(questions);
  }

  const questionElements = [];

  if (questions.length > 0) {
    for (let i = 0; i < numOfQuestions; i++) {
      questionElements.push(
        <Question 
          key={questions[i].questionId}
          question={questions[i]}
          select={select}
          checking={checking}
        />
      );
    }
  }

  function answerChecking() {
    setChecking(true);

    for (let question of questions) {
      for (let answer of question.answers) {
        if (answer.selected && answer.correct) {
          setMarks(prevMarks => ++prevMarks);
        }
      }
    }
  }

  const resultElements = 
    <div className="marks-container">
      <p className="marks">You scored {marks}/{numOfQuestions} answers</p>
      <button className="qna-button" onClick={newGame}>Play again</button>
    </div>

  const answeringElements =  <button className="qna-button" onClick={answerChecking}>Check answers</button>

  const loadingIcon = 
    <div className="loading-container">
      <TailSpin stroke="#4D5B9E" />
    </div>

  const displayingElements = 
    <div className="qna-section">
      {fetchError.length > 0? <Error message={fetchError} /> : questionElements}
    </div>

  return (
    <div className="qna-container">
      {loading? loadingIcon : displayingElements } 
      {loading? null : checking? resultElements: answeringElements}       
    </div>
  )
}

export default QnA;