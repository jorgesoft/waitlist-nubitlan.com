import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { QuizResult } from '../services/quizService';

export function useQuizResults(limitCount: number = 50) {
  const [results, setResults] = useState<(QuizResult & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const quizResultsRef = collection(db, 'quizResults');
        const constraints: QueryConstraint[] = [
          orderBy('completedAt', 'desc'),
          limit(limitCount)
        ];
        const q = query(quizResultsRef, ...constraints);
        
        const querySnapshot = await getDocs(q);
        const fetchedResults = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as (QuizResult & { id: string })[];

        setResults(fetchedResults);
      } catch (err) {
        console.error('Error fetching quiz results:', err);
        setError('No se pudieron cargar los resultados');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [limitCount]);

  return { results, loading, error };
}
