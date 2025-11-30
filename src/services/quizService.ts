import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { logWaitlistSignup } from '../utils/analytics';
import type { Outcome } from '../types/quiz';

export interface QuizResult {
  answers: Record<string, string>;
  outcome: {
    id: string;
    level: string;
    title: string;
  };
  completedAt: Date;
  userAgent?: string;
}

/**
 * Save quiz results to Firestore
 */
export async function saveQuizResult(
  answers: Record<string, string>,
  outcome: Outcome
): Promise<string> {
  try {
    const quizResultsRef = collection(db, 'quizResults');
    
    const result: Omit<QuizResult, 'completedAt'> & { completedAt: ReturnType<typeof serverTimestamp> } = {
      answers,
      outcome: {
        id: outcome.id,
        level: outcome.level,
        title: outcome.title,
      },
      completedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
    };

    const docRef = await addDoc(quizResultsRef, result);
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw new Error('No se pudo guardar el resultado de la evaluación');
  }
}

/**
 * Save email subscription to Firestore
 */
export async function saveEmailSubscription(
  email: string,
  source: string = 'quiz'
): Promise<string> {
  try {
    const subscriptionsRef = collection(db, 'emailSubscriptions');
    
    const subscription = {
      email,
      source,
      subscribedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
    };

    const docRef = await addDoc(subscriptionsRef, subscription);
    
    // Log analytics event
    logWaitlistSignup(email, source);
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving email subscription:', error);
    throw new Error('No se pudo guardar la suscripción');
  }
}
