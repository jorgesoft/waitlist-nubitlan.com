import type { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerId: string) => void;
}

function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const handleAnswerClick = (answerId: string) => {
    onAnswer(answerId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, answerId: string) => {
    // Support Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onAnswer(answerId);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h4 mb-4 d-flex align-items-center gap-2">
          <i className="bi bi-question-circle text-primary" aria-hidden="true"></i>
          {question.text}
        </h2>
        
        <div 
          className="d-flex flex-column gap-3"
          role="group"
          aria-label="Opciones de respuesta"
        >
          {question.answers.map((answer, index) => (
            <button
              key={answer.id}
              type="button"
              className="btn btn-outline-primary btn-lg text-start d-flex align-items-center gap-2 py-3 quiz-answer-button"
              onClick={() => handleAnswerClick(answer.id)}
              onKeyDown={(e) => handleKeyDown(e, answer.id)}
              aria-label={`Opción ${index + 1}: ${answer.text}`}
            >
              <i className="bi bi-circle" aria-hidden="true"></i>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
