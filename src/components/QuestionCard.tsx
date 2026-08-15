import { CircleIcon, HelpCircleIcon } from 'lucide-react'

import type { Question } from '@/types/quiz'
import { Card, CardContent } from '@/components/ui/card'

interface QuestionCardProps {
  question: Question
  onAnswer: (answerId: string) => void
}

function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <Card className="border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]">
      <CardContent className="p-6 sm:p-8">
        <h2 className="flex items-start gap-3 text-xl font-bold tracking-tight sm:text-2xl">
          <HelpCircleIcon
            className="text-primary mt-1 size-6 shrink-0"
            aria-hidden="true"
          />
          {question.text}
        </h2>

        <div
          className="mt-7 flex flex-col gap-3"
          role="group"
          aria-label="Opciones de respuesta"
        >
          {question.answers.map((answer, index) => (
            <button
              key={answer.id}
              type="button"
              onClick={() => onAnswer(answer.id)}
              aria-label={`Opción ${index + 1}: ${answer.text}`}
              className="group focus-visible:ring-ring/50 flex items-center gap-3 border-2 border-border bg-card px-5 py-4 text-left text-base transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-sky-50 hover:shadow-[4px_4px_0_0_var(--sky-400)] focus-visible:ring-[3px] focus-visible:outline-none dark:hover:bg-sky-950/50"
            >
              <CircleIcon
                className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-colors"
                aria-hidden="true"
              />
              <span>{answer.text}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
