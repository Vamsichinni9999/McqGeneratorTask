import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ url }) => {
  const [mcqs, setMcqs] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  useEffect(() => {
    const fetchMCQs = async () => {
      const response = await fetch('http://127.0.0.1:8000/generate-mcqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setMcqs(data.mcqs);
    };

    fetchMCQs();
  }, [url]);

  const handleAnswer = (option) => {
    const currentQuestion = mcqs[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correct_answer;
    setUserAnswers([...userAnswers, { questionIndex: currentQuestionIndex, answer: option, isCorrect }]);
    setAnswered(true);
    setAnswerStatus(isCorrect);
    if (currentQuestionIndex < mcqs.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswered(false);
        setAnswerStatus(null);
      }, 1000); // wait for 1 second before moving to next question
    }
  };

  if (!mcqs) {
    return <div>Loading...</div>;
  }

  const currentQuestion = mcqs[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option, idx) => {
          const optionLabel = String.fromCharCode(97 + idx); // a, b, c, d
          const isOptionCorrect = option === currentQuestion.correct_answer;
          const optionClass = answered
            ? isOptionCorrect
              ? 'correct'
              : 'incorrect'
            : ''; // Add the class if the question was answered

          return (
            <button
              key={idx}
              className={optionClass}
              onClick={() => handleAnswer(option)}
              disabled={answered} // Disable buttons after selection
            >
              {optionLabel}) {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
