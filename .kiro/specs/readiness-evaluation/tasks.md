# Implementation Plan

- [ ] 1. Set up routing infrastructure
  - Install react-router-dom package
  - Create router configuration in main.tsx with routes for "/" and "/evaluacion"
  - Extract existing landing page content into a LandingPage component
  - Verify navigation works between routes
  - _Requirements: 1.1_

- [ ] 2. Create YAML configuration structure and loader
  - Create public/quiz-config.yaml with the example quiz structure (ISO 27001 decision tree)
  - Install js-yaml package for YAML parsing
  - Create src/types/quiz.ts with TypeScript interfaces for QuizConfig, Question, Answer, and Outcome
  - Create src/utils/loadQuizConfig.ts to fetch and parse the YAML file
  - Add configuration validation logic to detect missing fields and invalid references
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.6_

- [ ] 3. Implement quiz engine with state management
  - Create src/hooks/useQuizEngine.ts custom hook to manage quiz state
  - Implement state for currentQuestionId, answers record, isComplete flag, and outcome
  - Implement handleAnswer function that records answers and navigates decision tree
  - Implement determineOutcome function that finds the correct outcome based on answer path
  - Implement restart function that resets state to initial values
  - Add logic to prevent circular references and handle edge cases
  - _Requirements: 2.2, 2.3, 2.5, 4.2, 4.3_

- [ ] 4. Build question display component
  - Create src/components/QuestionCard.tsx component
  - Display question text with proper heading level
  - Render answer options as accessible buttons with proper ARIA labels
  - Implement onAnswer callback when user selects an answer
  - Style with Bootstrap classes matching landing page design
  - Add keyboard navigation support (Tab, Enter, Space)
  - _Requirements: 2.1, 5.1, 5.2, 5.5_

- [ ] 5. Build outcome display component
  - Create src/components/OutcomeCard.tsx component
  - Display outcome title, level indicator, and message
  - Render recommendations list with proper semantic markup
  - Add restart button with icon and proper ARIA label
  - Style outcome levels with distinct colors (success, warning, danger)
  - Include call-to-action link back to waitlist form for "needs-work" outcome
  - _Requirements: 2.5, 4.1_

- [ ] 6. Create progress indicator component
  - Create src/components/QuizProgress.tsx component
  - Calculate and display current step number and total steps
  - Render visual progress bar using Bootstrap progress component
  - Update progress as user moves through questions
  - Ensure progress indicator is accessible with ARIA attributes
  - _Requirements: 1.4, 5.2_

- [ ] 7. Build main evaluation page component
  - Create src/pages/EvaluationPage.tsx component
  - Load quiz configuration using the config loader
  - Initialize quiz engine with useQuizEngine hook
  - Render quiz title and description from configuration
  - Conditionally render QuestionCard or OutcomeCard based on quiz state
  - Include QuizProgress component
  - Add navigation link back to home page in header
  - Handle loading and error states for configuration loading
  - Style page layout with Bootstrap container and responsive classes
  - _Requirements: 1.2, 1.3, 2.4, 3.5, 5.3_

- [ ] 8. Integrate evaluation page into router
  - Import EvaluationPage component in main.tsx
  - Add route configuration for "/evaluacion" path
  - Test direct URL access to /evaluacion
  - Test navigation from landing page to evaluation page
  - Verify browser back/forward buttons work correctly
  - _Requirements: 1.1_

- [ ] 9. Add navigation link from landing page
  - Add "Evalúa tu preparación" button or link in the landing page hero section
  - Use React Router Link component for client-side navigation
  - Style link to match existing design system
  - Add appropriate icon (e.g., clipboard-check)
  - _Requirements: 1.1_

- [ ] 10. Implement accessibility enhancements
  - Add ARIA live regions for dynamic content announcements
  - Ensure all interactive elements have visible focus indicators
  - Test keyboard navigation through entire quiz flow
  - Verify color contrast meets WCAG AA standards
  - Add skip links if needed for keyboard users
  - Test with screen reader (manual verification)
  - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [ ] 11. Add responsive design refinements
  - Test layout on mobile (320px-767px), tablet (768px-1023px), and desktop (1024px+)
  - Adjust button sizes and spacing for touch targets on mobile
  - Ensure text remains readable at all screen sizes
  - Test with browser zoom at 200%
  - Optimize quiz card layout for narrow screens
  - _Requirements: 5.3_

- [ ]* 12. Create error boundary and fallback UI
  - Create src/components/ErrorBoundary.tsx component
  - Wrap EvaluationPage with error boundary
  - Display user-friendly error message if quiz fails to load
  - Provide link back to home page in error state
  - Log errors to console for debugging
  - _Requirements: Error handling from design_
