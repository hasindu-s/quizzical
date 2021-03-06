import React, {useState} from 'react';
import Start from './components/Start';
import QnA from './components/QnA';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);  
  const [numOfQuestions, setNumOfQuestions] = useState(5);

  const styleClasses = `container ${startQuiz? "quiz-background" : "start-background"}`

  return (
    <div className="App">
      <div className={styleClasses}>
        {startQuiz? 
          <QnA 
            numOfQuestions={numOfQuestions}
          /> : 
          <Start 
            startQuiz={setStartQuiz} 
            numOfQuestions={numOfQuestions}
            setNumOfQuestions={setNumOfQuestions}
          />
        }
      </div>
    </div>
  );
}

export default App;
