import React, { useState } from 'react';
import { Share2, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

const QuizPlatform = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
      type: "mcq"
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      type: "mcq"
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2,
      type: "mcq"
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3,
      type: "mcq"
    },
    {
      id: 5,
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      type: "mcq"
    },
    {
      id: 6,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2,
      type: "mcq"
    },
    {
      id: 7,
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correct: 1,
      type: "mcq"
    },
    {
      id: 8,
      question: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
      correct: 0,
      type: "mcq"
    },
    {
      id: 9,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correct: 1,
      type: "mcq"
    },
    {
      id: 10,
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correct: 1,
      type: "mcq"
    },
    {
      id: 11,
      question: "The Earth is flat.",
      options: ["True", "False"],
      correct: 1,
      type: "tf"
    },
    {
      id: 12,
      question: "Python is a programming language.",
      options: ["True", "False"],
      correct: 0,
      type: "tf"
    }
  ];

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(idx);
    setShowResult(true);
    
    const isCorrect = idx === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      correct: isCorrect
    }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setAnsweredQuestions([]);
  };

  const shareOnTwitter = () => {
    const totalMarks = questions.length * 10;
    const percentage = ((score / totalMarks) * 100).toFixed(1);
    const text = `I just scored ${score}/${totalMarks} (${percentage}%) on this awesome quiz! 🎯🔥 Can you beat my score? #QuizChallenge #BrainTest`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (quizComplete) {
    const totalMarks = questions.length * 10;
    const percentage = ((score / totalMarks) * 100).toFixed(1);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full transform animate-scale-in">
          <div className="text-center">
            <Award className="w-24 h-24 text-orange-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl p-8 mb-6">
              <p className="text-white text-6xl font-bold mb-2">{score}</p>
              <p className="text-white text-2xl">out of {totalMarks} marks</p>
              <p className="text-white text-xl mt-2">({percentage}%)</p>
            </div>
            
            <div className="grid grid-cols-6 gap-2 mb-8">
              {answeredQuestions.map((ans, idx) => (
                <div
                  key={idx}
                  className={`h-12 rounded-lg flex items-center justify-center font-bold text-white transition-all duration-300 ${
                    ans.correct ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={shareOnTwitter}
                className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Share2 className="w-5 h-5" />
                Share on 𝕏
              </button>
              <button
                onClick={resetQuiz}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-orange-600 font-bold text-lg">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="bg-orange-100 text-orange-700 font-bold px-4 py-2 rounded-full">
              Score: {score}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {currentQ.question}
          </h2>
          <p className="text-gray-500 text-sm">
            {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True or False'} • 10 marks
          </p>
        </div>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQ.correct;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full p-5 rounded-xl text-left font-semibold transition-all duration-300 transform hover:scale-102 ${
                  showCorrect
                    ? 'bg-green-500 text-white scale-105 shadow-lg'
                    : showIncorrect
                    ? 'bg-red-500 text-white scale-95'
                    : isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 hover:bg-orange-100 text-gray-800'
                } ${selectedAnswer === null ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6 ml-2" />}
                  {showIncorrect && <XCircle className="w-6 h-6 ml-2" />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg ${
            selectedAnswer === currentQ.correct
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {selectedAnswer === currentQ.correct ? '✓ Correct! +10 marks' : '✗ Incorrect! 0 marks'}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlatform;