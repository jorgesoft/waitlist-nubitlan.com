import yaml from 'js-yaml';
import type { QuizConfig, Question } from '../types/quiz';

interface ValidationError {
  field: string;
  message: string;
}

class ConfigValidationError extends Error {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Quiz configuration validation failed');
    this.name = 'ConfigValidationError';
    this.errors = errors;
  }
}

function validateQuizConfig(config: any): QuizConfig {
  const errors: ValidationError[] = [];

  // Validate quiz metadata
  if (!config.quiz) {
    errors.push({ field: 'quiz', message: 'Missing quiz metadata' });
  } else {
    if (!config.quiz.title) {
      errors.push({ field: 'quiz.title', message: 'Missing quiz title' });
    }
    if (!config.quiz.description) {
      errors.push({ field: 'quiz.description', message: 'Missing quiz description' });
    }
    if (!config.quiz.startQuestionId) {
      errors.push({ field: 'quiz.startQuestionId', message: 'Missing start question ID' });
    }
  }

  // Validate questions array
  if (!Array.isArray(config.questions)) {
    errors.push({ field: 'questions', message: 'Questions must be an array' });
  } else if (config.questions.length === 0) {
    errors.push({ field: 'questions', message: 'At least one question is required' });
  } else {
    const questionIds = new Set<string>();
    
    config.questions.forEach((question: any, index: number) => {
      if (!question.id) {
        errors.push({ field: `questions[${index}].id`, message: 'Missing question ID' });
      } else {
        if (questionIds.has(question.id)) {
          errors.push({ field: `questions[${index}].id`, message: `Duplicate question ID: ${question.id}` });
        }
        questionIds.add(question.id);
      }

      if (!question.text) {
        errors.push({ field: `questions[${index}].text`, message: 'Missing question text' });
      }

      if (!Array.isArray(question.answers) || question.answers.length === 0) {
        errors.push({ field: `questions[${index}].answers`, message: 'Question must have at least one answer' });
      } else {
        question.answers.forEach((answer: any, answerIndex: number) => {
          if (!answer.id) {
            errors.push({ field: `questions[${index}].answers[${answerIndex}].id`, message: 'Missing answer ID' });
          }
          if (!answer.text) {
            errors.push({ field: `questions[${index}].answers[${answerIndex}].text`, message: 'Missing answer text' });
          }
          if (!answer.nextQuestionId && !answer.outcomeId) {
            errors.push({ 
              field: `questions[${index}].answers[${answerIndex}]`, 
              message: 'Answer must have either nextQuestionId or outcomeId' 
            });
          }
        });
      }
    });

    // Validate start question exists
    if (config.quiz?.startQuestionId && !questionIds.has(config.quiz.startQuestionId)) {
      errors.push({ 
        field: 'quiz.startQuestionId', 
        message: `Start question ID "${config.quiz.startQuestionId}" does not exist` 
      });
    }
  }

  // Validate outcomes array
  if (!Array.isArray(config.outcomes)) {
    errors.push({ field: 'outcomes', message: 'Outcomes must be an array' });
  } else if (config.outcomes.length === 0) {
    errors.push({ field: 'outcomes', message: 'At least one outcome is required' });
  } else {
    const outcomeIds = new Set<string>();
    
    config.outcomes.forEach((outcome: any, index: number) => {
      if (!outcome.id) {
        errors.push({ field: `outcomes[${index}].id`, message: 'Missing outcome ID' });
      } else {
        if (outcomeIds.has(outcome.id)) {
          errors.push({ field: `outcomes[${index}].id`, message: `Duplicate outcome ID: ${outcome.id}` });
        }
        outcomeIds.add(outcome.id);
      }

      if (!outcome.level) {
        errors.push({ field: `outcomes[${index}].level`, message: 'Missing outcome level' });
      } else if (!['ready', 'partially-ready', 'needs-work'].includes(outcome.level)) {
        errors.push({ 
          field: `outcomes[${index}].level`, 
          message: `Invalid outcome level: ${outcome.level}. Must be ready, partially-ready, or needs-work` 
        });
      }

      if (!outcome.title) {
        errors.push({ field: `outcomes[${index}].title`, message: 'Missing outcome title' });
      }

      if (!outcome.message) {
        errors.push({ field: `outcomes[${index}].message`, message: 'Missing outcome message' });
      }

      if (!Array.isArray(outcome.recommendations)) {
        errors.push({ field: `outcomes[${index}].recommendations`, message: 'Recommendations must be an array' });
      }
    });

    // Validate references
    if (Array.isArray(config.questions)) {
      const questionIds = new Set(config.questions.map((q: Question) => q.id));
      
      config.questions.forEach((question: Question, qIndex: number) => {
        question.answers.forEach((answer, aIndex) => {
          if (answer.nextQuestionId && !questionIds.has(answer.nextQuestionId)) {
            errors.push({ 
              field: `questions[${qIndex}].answers[${aIndex}].nextQuestionId`, 
              message: `Referenced question ID "${answer.nextQuestionId}" does not exist` 
            });
          }
          if (answer.outcomeId && !outcomeIds.has(answer.outcomeId)) {
            errors.push({ 
              field: `questions[${qIndex}].answers[${aIndex}].outcomeId`, 
              message: `Referenced outcome ID "${answer.outcomeId}" does not exist` 
            });
          }
        });
      });
    }
  }

  // Check for circular references
  if (Array.isArray(config.questions) && errors.length === 0) {
    const detectCircular = (questionId: string, visited: Set<string>): boolean => {
      if (visited.has(questionId)) {
        return true;
      }

      const question = config.questions.find((q: Question) => q.id === questionId);
      if (!question) return false;

      visited.add(questionId);

      for (const answer of question.answers) {
        if (answer.nextQuestionId) {
          if (detectCircular(answer.nextQuestionId, new Set(visited))) {
            return true;
          }
        }
      }

      return false;
    };

    if (config.quiz?.startQuestionId && detectCircular(config.quiz.startQuestionId, new Set())) {
      errors.push({ 
        field: 'questions', 
        message: 'Circular reference detected in question flow' 
      });
    }
  }

  if (errors.length > 0) {
    throw new ConfigValidationError(errors);
  }

  return config as QuizConfig;
}

export async function loadQuizConfig(): Promise<QuizConfig> {
  try {
    const response = await fetch('/quiz-config.yaml');
    
    if (!response.ok) {
      throw new Error(`Failed to load quiz configuration: ${response.statusText}`);
    }

    const yamlText = await response.text();
    const config = yaml.load(yamlText);

    return validateQuizConfig(config);
  } catch (error) {
    if (error instanceof ConfigValidationError) {
      console.error('Quiz configuration validation errors:', error.errors);
      throw error;
    }
    
    console.error('Failed to load quiz configuration:', error);
    throw new Error('Failed to load quiz configuration');
  }
}
