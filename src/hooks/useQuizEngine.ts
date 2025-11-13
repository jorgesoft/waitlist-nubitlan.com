import { useState, useCallback, useEffect } from 'react';
import type { QuizConfig, Question, Answer, Outcome } from '../types/quiz';

interface QuizState {
  currentQuestionId: string | null;
  answers: Record<string, string>;
  isComplete: boolean;
  outcome: Outcome | null;
}

export function useQuizEngine(config: QuizConfig) {
  const [state, setState] = useState<QuizState>({
    currentQuestionId: config.quiz.startQuestionId,
    answers: {},
    isComplete: false,
    outcome: null,
  });

  // Reset state when config changes (e.g., when real config loads)
  useEffect(() => {
    setState({
      currentQuestionId: config.quiz.startQuestionId,
      answers: {},
      isComplete: false,
      outcome: null,
    });
  }, [config.quiz.startQuestionId]);

  // Find a question by ID
  const findQuestion = useCallback(
    (questionId: string): Question | undefined => {
      return config.questions.find((q) => q.id === questionId);
    },
    [config.questions]
  );

  // Find an outcome by ID
  const findOutcome = useCallback(
    (outcomeId: string): Outcome | undefined => {
      return config.outcomes.find((o) => o.id === outcomeId);
    },
    [config.outcomes]
  );

  // Determine the outcome based on the answer path
  const determineOutcome = useCallback(
    (answer: Answer): Outcome | null => {
      if (answer.outcomeId) {
        return findOutcome(answer.outcomeId) || null;
      }
      return null;
    },
    [findOutcome]
  );

  // Handle answer selection and navigate decision tree
  const handleAnswer = useCallback(
    (answerId: string) => {
      const currentQuestion = state.currentQuestionId
        ? findQuestion(state.currentQuestionId)
        : null;

      if (!currentQuestion) {
        console.error('Current question not found');
        return;
      }

      const selectedAnswer = currentQuestion.answers.find(
        (a) => a.id === answerId
      );

      if (!selectedAnswer) {
        console.error('Selected answer not found');
        return;
      }

      // Record the answer
      const newAnswers = {
        ...state.answers,
        [state.currentQuestionId!]: answerId,
      };

      // Check if this answer leads to an outcome
      const outcome = determineOutcome(selectedAnswer);

      if (outcome) {
        // Quiz is complete
        setState({
          currentQuestionId: null,
          answers: newAnswers,
          isComplete: true,
          outcome,
        });
      } else if (selectedAnswer.nextQuestionId) {
        // Navigate to next question
        const nextQuestion = findQuestion(selectedAnswer.nextQuestionId);

        if (!nextQuestion) {
          console.error(
            `Next question not found: ${selectedAnswer.nextQuestionId}`
          );
          return;
        }

        // Check for circular references by detecting if we've already answered this question
        if (newAnswers[selectedAnswer.nextQuestionId]) {
          console.error(
            `Circular reference detected: question ${selectedAnswer.nextQuestionId} has already been answered`
          );
          return;
        }

        setState({
          currentQuestionId: selectedAnswer.nextQuestionId,
          answers: newAnswers,
          isComplete: false,
          outcome: null,
        });
      } else {
        // No outcome and no next question - invalid configuration
        console.error(
          'Answer has neither outcomeId nor nextQuestionId - invalid configuration'
        );
      }
    },
    [state, findQuestion, determineOutcome]
  );

  // Restart the quiz
  const restart = useCallback(() => {
    setState({
      currentQuestionId: config.quiz.startQuestionId,
      answers: {},
      isComplete: false,
      outcome: null,
    });
  }, [config.quiz.startQuestionId]);

  // Get the current question
  const currentQuestion = state.currentQuestionId
    ? findQuestion(state.currentQuestionId)
    : null;

  return {
    currentQuestion,
    isComplete: state.isComplete,
    outcome: state.outcome,
    answers: state.answers,
    handleAnswer,
    restart,
  };
}
