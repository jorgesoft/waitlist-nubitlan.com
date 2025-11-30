# Design Document

## Overview

The readiness evaluation feature adds an interactive quiz at `/evaluacion` that assesses a company's preparedness for data protection laws. The design uses a decision-tree approach with conditional question flow, configured through a YAML file for easy content management. The implementation leverages React Router for navigation and a custom quiz engine that interprets the YAML configuration.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Application                    │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐         ┌──────────────────────────┐  │
│  │   Router     │────────▶│  Evaluation Page         │  │
│  │  (React      │         │  Component               │  │
│  │   Router)    │         └──────────┬───────────────┘  │
│  └──────────────┘                    │                   │
│                                      │                   │
│                         ┌────────────▼────────────────┐  │
│                         │  Quiz Engine                │  │
│                         │  - State Management         │  │
│                         │  - Decision Tree Logic      │  │
│                         │  - Answer Recording         │  │
│                         └────────────┬────────────────┘  │
│                                      │                   │
│                         ┌────────────▼────────────────┐  │
│                         │  YAML Config Loader         │  │
│                         │  - Parse quiz structure     │  │
│                         │  - Validate configuration   │  │
│                         └─────────────────────────────┘  │
│                                      │                   │
└──────────────────────────────────────┼───────────────────┘
                                       │
                         ┌─────────────▼────────────────┐
                         │  quiz-config.yaml            │
                         │  - Questions                 │
                         │  - Conditional Logic         │
                         │  - Outcomes                  │
                         └──────────────────────────────┘
```

### Routing Strategy

Since the current application doesn't use React Router, we'll add it to support the `/evaluacion` route while maintaining the existing landing page at `/`.

## Components and Interfaces

### 1. Router Setup

**Component: `App.tsx` (Modified)**
- Add React Router with routes for `/` (landing page) and `/evaluacion` (evaluation page)
- Wrap existing landing page content in a route component

### 2. Evaluation Page Component

**Component: `EvaluationPage.tsx`**

```typescript
interface EvaluationPageProps {}

// Main container component that orchestrates the quiz flow
```

Responsibilities:
- Load and display the quiz interface
- Manage overall page layout and styling
- Provide navigation back to home

### 3. Quiz Engine Component

**Component: `QuizEngine.tsx`**

```typescript
interface QuizEngineProps {
  config: QuizConfig;
}

interface QuizState {
  currentQuestionId: string | null;
  answers: Record<string, string>;
  isComplete: boolean;
  outcome: Outcome | null;
}
```

Responsibilities:
- Manage quiz state (current question, answers, completion)
- Implement decision tree navigation logic
- Determine final outcome based on answer path
- Provide restart functionality

### 4. Question Display Component

**Component: `QuestionCard.tsx`**

```typescript
interface QuestionCardProps {
  question: Question;
  onAnswer: (answerId: string) => void;
}
```

Responsibilities:
- Display question text
- Render answer options as interactive buttons
- Handle answer selection
- Provide accessible markup

### 5. Outcome Display Component

**Component: `OutcomeCard.tsx`**

```typescript
interface OutcomeCardProps {
  outcome: Outcome;
  onRestart: () => void;
}
```

Responsibilities:
- Display final readiness assessment
- Show outcome message and recommendations
- Provide restart button
- Offer navigation options

### 6. Progress Indicator Component

**Component: `QuizProgress.tsx`**

```typescript
interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}
```

Responsibilities:
- Show visual progress through the quiz
- Display step counter
- Provide context to users about quiz length

## Data Models

### Quiz Configuration Schema (YAML)

```yaml
quiz:
  title: string
  description: string
  startQuestionId: string
  
questions:
  - id: string
    text: string
    answers:
      - id: string
        text: string
        nextQuestionId: string | null  # null means end of quiz
        outcomeId: string | null       # if this is a terminal answer
        
outcomes:
  - id: string
    level: "ready" | "partially-ready" | "needs-work"
    title: string
    message: string
    recommendations: string[]
```

### Example Configuration

```yaml
quiz:
  title: "Evaluación de Preparación para la Ley de Protección de Datos"
  description: "Responde estas preguntas para evaluar qué tan preparada está tu empresa"
  startQuestionId: "q1"

questions:
  - id: "q1"
    text: "¿Tu empresa implementa ISO 27001?"
    answers:
      - id: "q1-yes"
        text: "Sí"
        nextQuestionId: "q2"
      - id: "q1-no"
        text: "No"
        nextQuestionId: "q3"
        
  - id: "q2"
    text: "¿Estás certificado en ISO 27001?"
    answers:
      - id: "q2-yes"
        text: "Sí"
        outcomeId: "very-ready"
      - id: "q2-no"
        text: "No"
        outcomeId: "partially-ready"
        
  - id: "q3"
    text: "¿Tu empresa implementa algún marco de seguridad?"
    answers:
      - id: "q3-yes"
        text: "Sí"
        outcomeId: "partially-ready"
      - id: "q3-no"
        text: "No"
        outcomeId: "needs-work"

outcomes:
  - id: "very-ready"
    level: "ready"
    title: "¡Muy bien preparado!"
    message: "Tu empresa está muy probablemente lista para cumplir con la ley."
    recommendations:
      - "Revisa que tu certificación ISO 27001 esté actualizada"
      - "Documenta cómo tus controles ISO cubren los requisitos de la ley"
      
  - id: "partially-ready"
    level: "partially-ready"
    title: "Parcialmente preparado"
    message: "Tu empresa podría estar lista, pero necesita validación adicional."
    recommendations:
      - "Realiza un gap analysis entre tus controles actuales y los requisitos de la ley"
      - "Considera obtener certificación ISO 27001"
      - "Documenta tus políticas de protección de datos"
      
  - id: "needs-work"
    level: "needs-work"
    title: "Necesitas trabajar en esto"
    message: "Tu empresa probablemente tiene mucho trabajo por hacer para estar lista."
    recommendations:
      - "Comienza implementando controles básicos de seguridad"
      - "Desarrolla políticas de protección de datos personales"
      - "Considera contratar asesoría especializada"
      - "Únete a nuestra lista de espera para recibir guía paso a paso"
```

### TypeScript Interfaces

```typescript
interface QuizConfig {
  quiz: {
    title: string;
    description: string;
    startQuestionId: string;
  };
  questions: Question[];
  outcomes: Outcome[];
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  text: string;
  nextQuestionId?: string;
  outcomeId?: string;
}

interface Outcome {
  id: string;
  level: 'ready' | 'partially-ready' | 'needs-work';
  title: string;
  message: string;
  recommendations: string[];
}
```

## Error Handling

### Configuration Validation

1. **Missing Required Fields**
   - Validate that all required fields exist in YAML
   - Show developer-friendly error messages in development
   - Fallback to a default error state in production

2. **Invalid References**
   - Validate that `nextQuestionId` references exist
   - Validate that `outcomeId` references exist
   - Validate that `startQuestionId` exists

3. **Circular References**
   - Detect infinite loops in question flow
   - Prevent stack overflow from circular navigation

### Runtime Error Handling

1. **YAML Loading Failures**
   - Catch and display user-friendly error message
   - Provide fallback content or redirect to home

2. **Invalid State Transitions**
   - Handle unexpected quiz states gracefully
   - Provide restart option if state becomes corrupted

3. **Missing Outcomes**
   - Ensure every answer path leads to an outcome
   - Show generic outcome if specific one is missing

## Testing Strategy

### Unit Tests

1. **Quiz Engine Logic**
   - Test state transitions between questions
   - Test answer recording
   - Test outcome determination
   - Test restart functionality

2. **Configuration Parser**
   - Test YAML parsing with valid configuration
   - Test validation with invalid configurations
   - Test error handling for malformed YAML

3. **Decision Tree Navigation**
   - Test all possible paths through the quiz
   - Test that all paths lead to outcomes
   - Test edge cases (single question, no questions)

### Integration Tests

1. **Component Integration**
   - Test QuizEngine with QuestionCard interaction
   - Test navigation flow from start to outcome
   - Test restart flow

2. **Router Integration**
   - Test navigation to /evaluacion route
   - Test navigation back to home
   - Test direct URL access to /evaluacion

### Accessibility Tests

1. **Keyboard Navigation**
   - Test tab order through questions and answers
   - Test Enter/Space to select answers
   - Test focus management on question transitions

2. **Screen Reader Support**
   - Test ARIA labels on interactive elements
   - Test announcement of question changes
   - Test outcome readability

3. **Visual Accessibility**
   - Test color contrast ratios
   - Test with different zoom levels
   - Test responsive behavior on mobile devices

## Implementation Notes

### Styling Approach

- Use existing Bootstrap classes from the landing page for consistency
- Match the color scheme and typography of the main site
- Ensure responsive design works on all screen sizes
- Add custom CSS only where Bootstrap is insufficient

### Performance Considerations

- YAML configuration is loaded once on component mount
- Quiz state is managed in React state (no external state management needed)
- Minimal re-renders by using proper React patterns
- Configuration file should be small (<50KB) for fast loading

### Accessibility Considerations

- Use semantic HTML (`<form>`, `<fieldset>`, `<legend>`, `<button>`)
- Provide ARIA labels for dynamic content
- Ensure keyboard navigation works throughout
- Maintain focus management during transitions
- Use sufficient color contrast (WCAG AA minimum)
- Support screen reader announcements for state changes

### Localization Considerations

- All text content is in YAML configuration (Spanish)
- Easy to add additional language files in the future
- Component code is language-agnostic
