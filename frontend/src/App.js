import React, { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [url, setUrl] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    if (url) {
      setQuizStarted(true);
    } else {
      alert("Please provide a valid URL.");
    }
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to generate quiz"
          />
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : (
        <Quiz url={url} />
      )}
    </div>
  );
}

export default App;
