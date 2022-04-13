import React, {useState} from 'react';
import Start from './components/Start';
import QnA from './components/QnA';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);  

  return (
    <div className="App">
      <div className="container">
        {/* <img className="bg-yellow-blob" src={require("./images/start-yellow-blob.png")} alt="yellow-blob"/> */}
        {startQuiz? <QnA /> : <Start startQuiz={setStartQuiz} />}
      </div>
    </div>
  );
}

export default App;
