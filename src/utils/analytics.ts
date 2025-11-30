import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';
import type { Outcome } from '../types/quiz';

/**
 * Log quiz completion event
 */
export function logQuizCompleted(outcome: Outcome, answersCount: number) {
  if (!analytics) return;

  try {
    logEvent(analytics, 'quiz_completed', {
      outcome_id: outcome.id,
      outcome_level: outcome.level,
      outcome_title: outcome.title,
      questions_answered: answersCount,
    });
  } catch (error) {
    console.error('Error logging quiz completion:', error);
  }
}

/**
 * Log waitlist signup event
 */
export function logWaitlistSignup(email: string, source: string = 'unknown') {
  if (!analytics) return;

  try {
    logEvent(analytics, 'waitlist_signup', {
      source,
      // Don't log the actual email for privacy
      has_email: !!email,
    });
  } catch (error) {
    console.error('Error logging waitlist signup:', error);
  }
}

/**
 * Log quiz started event
 */
export function logQuizStarted() {
  if (!analytics) return;

  try {
    logEvent(analytics, 'quiz_started');
  } catch (error) {
    console.error('Error logging quiz start:', error);
  }
}

/**
 * Log quiz question answered
 */
export function logQuestionAnswered(questionId: string, answerId: string, questionNumber: number) {
  if (!analytics) return;

  try {
    logEvent(analytics, 'quiz_question_answered', {
      question_id: questionId,
      answer_id: answerId,
      question_number: questionNumber,
    });
  } catch (error) {
    console.error('Error logging question answer:', error);
  }
}
