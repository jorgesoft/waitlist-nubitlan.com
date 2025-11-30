/**
 * Example usage of analytics functions
 * 
 * This file shows how to use the analytics utilities in your components.
 * Copy these patterns when adding analytics to new features.
 */

import { 
  logQuizStarted, 
  logQuizCompleted, 
  logWaitlistSignup,
  logQuestionAnswered 
} from './analytics';

// Example 1: Track when quiz starts
function StartQuizButton() {
  const handleStart = () => {
    // Your quiz start logic here
    startQuiz();
    
    // Track the event
    logQuizStarted();
  };

  return <button onClick={handleStart}>Start Quiz</button>;
}

// Example 2: Track quiz completion
function QuizResults({ outcome, answers }) {
  useEffect(() => {
    if (outcome) {
      // Track completion with outcome details
      logQuizCompleted(outcome, Object.keys(answers).length);
    }
  }, [outcome, answers]);

  return <div>Your results...</div>;
}

// Example 3: Track waitlist signup
function WaitlistForm() {
  const handleSubmit = async (email: string) => {
    try {
      // Save to database
      await saveEmailSubscription(email, 'landing');
      
      // Analytics is automatically tracked in saveEmailSubscription
      // But you can also track it manually:
      // logWaitlistSignup(email, 'landing');
      
      showSuccessMessage();
    } catch (error) {
      showErrorMessage();
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// Example 4: Track individual question answers (optional)
function QuizQuestion({ question, onAnswer }) {
  const handleAnswer = (answerId: string) => {
    // Your answer logic
    onAnswer(answerId);
    
    // Track the answer
    logQuestionAnswered(
      question.id,
      answerId,
      currentQuestionNumber
    );
  };

  return (
    <div>
      <h3>{question.text}</h3>
      {question.answers.map(answer => (
        <button key={answer.id} onClick={() => handleAnswer(answer.id)}>
          {answer.text}
        </button>
      ))}
    </div>
  );
}

// Example 5: Custom event (if you need to add new events)
import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

function trackCustomEvent() {
  if (analytics) {
    logEvent(analytics, 'custom_event_name', {
      parameter1: 'value1',
      parameter2: 'value2',
    });
  }
}

export {
  StartQuizButton,
  QuizResults,
  WaitlistForm,
  QuizQuestion,
  trackCustomEvent
};
