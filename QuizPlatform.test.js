import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuizPlatform from './QuizPlatform';

describe('QuizPlatform Component', () => {
  test('initial state', () => {
    const { getByText } = render(<QuizPlatform />);
    expect(getByText(/start quiz/i)).toBeInTheDocument();
  });

  test('handle answer selection', () => {
    const { getByText } = render(<QuizPlatform />);
    fireEvent.click(getByText('Answer 1'));
    expect(getByText('Answer 1')).toHaveAttribute('data-selected', 'true');
  });

  test('complete quiz and calculate score', () => {
    const { getByText } = render(<QuizPlatform />);
    fireEvent.click(getByText('Start Quiz'));
    // Simulate answering questions...
    fireEvent.click(getByText('Answer 1'));
    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Answer 2'));
    fireEvent.click(getByText('Finish'));
    expect(getByText(/your score:/i)).toBeInTheDocument();
  });
});