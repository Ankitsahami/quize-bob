import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizPlatform from './QuizPlatform';

describe('QuizPlatform Component', () => {
  const mockQuizData = [
    { id: 1, question: 'What is React?', answers: ['Library', 'Framework', 'Language'], correctAnswer: 'Library' },
    { id: 2, question: 'What is a Hook?', answers: ['A special function', 'A kind of syntax', 'A new feature'], correctAnswer: 'A special function' }
  ];

  test('renders quiz questions correctly', () => {
    render(<QuizPlatform quizData={mockQuizData} />);
    expect(screen.getByText(/What is React?/i)).toBeInTheDocument();
    expect(screen.getByText(/What is a Hook?/i)).toBeInTheDocument();
  });

  test('handles answer selection', () => {
    render(<QuizPlatform quizData={mockQuizData} />);
    fireEvent.click(screen.getByText(/Library/i));
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
  });

  test('updates score correctly', () => {
    render(<QuizPlatform quizData={mockQuizData} />);
    fireEvent.click(screen.getByText(/Library/i));
    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/A special function/i));
    expect(screen.getByText(/Score: 2/i)).toBeInTheDocument();
  });

  test('displays completion message on quiz finish', () => {
    render(<QuizPlatform quizData={mockQuizData} />);
    fireEvent.click(screen.getByText(/Library/i));
    fireEvent.click(screen.getByText(/A special function/i));
    expect(screen.getByText(/Quiz complete!/i)).toBeInTheDocument();
  });

  test('triggers UI interactions correctly', () => {
    const { getByText } = render(<QuizPlatform quizData={mockQuizData} />);
    fireEvent.click(getByText(/Library/i));
    fireEvent.click(getByText(/Next/i)); // Assuming there is a Next button
    expect(getByText(/What is a Hook?/i)).toBeInTheDocument();
  });
});