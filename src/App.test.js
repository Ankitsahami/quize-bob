import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz platform', () => {
  render(<App />);
  const quizElement = screen.getByText(/What is the capital of France?/i);
  expect(quizElement).toBeInTheDocument();
});
