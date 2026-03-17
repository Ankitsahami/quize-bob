import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizPlatform from './QuizPlatform';

describe('QuizPlatform Component', () => {
  test('renders first question correctly', () => {
    render(<QuizPlatform />);
    expect(screen.getByText(/What is the capital of France?/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 1\/12/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();
  });

  test('displays answer options for first question', () => {
    render(<QuizPlatform />);
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Madrid/i)).toBeInTheDocument();
  });

  test('handles correct answer selection', async () => {
    render(<QuizPlatform />);
    fireEvent.click(screen.getByText(/Paris/i));

    // Wait for score to update
    await waitFor(() => {
      expect(screen.getByText(/Score: 10/i)).toBeInTheDocument();
    });

    // Wait for the next question to appear (after 1.5s delay)
    await waitFor(() => {
      expect(screen.getByText(/Which planet is known as the Red Planet?/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('handles incorrect answer selection', async () => {
    render(<QuizPlatform />);
    fireEvent.click(screen.getByText(/London/i));

    // Score should remain 0
    expect(screen.getByText(/Score: 0/i)).toBeInTheDocument();

    // Wait for the next question to appear (after 1.5s delay)
    await waitFor(() => {
      expect(screen.getByText(/Which planet is known as the Red Planet?/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('shows visual feedback on answer selection', () => {
    render(<QuizPlatform />);

    // Test that clicking an answer shows visual feedback
    const parisButton = screen.getByText(/Paris/i).closest('button');
    fireEvent.click(parisButton);

    // The button should be disabled after selection
    expect(parisButton).toHaveClass('cursor-not-allowed');
  });

  test('component renders without errors', () => {
    render(<QuizPlatform />);
    expect(screen.getByText(/What is the capital of France?/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiple Choice/i)).toBeInTheDocument();
  });
});