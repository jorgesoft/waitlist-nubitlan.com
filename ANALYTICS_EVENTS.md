# Firebase Analytics Events

This document describes all custom analytics events tracked in the application.

## Overview

The application uses Firebase Analytics to track user interactions. Events are automatically sent to Firebase when users interact with key features.

## Custom Events

### 1. Quiz Started (`quiz_started`)

**When**: User clicks "Comenzar evaluación" button

**Parameters**: None

**Purpose**: Track how many users start the quiz

**Example**:
```typescript
logQuizStarted();
```

---

### 2. Quiz Completed (`quiz_completed`)

**When**: User completes all quiz questions and reaches an outcome

**Parameters**:
- `outcome_id` (string): The ID of the outcome (e.g., "ready", "partially-ready", "needs-work")
- `outcome_level` (string): The readiness level
- `outcome_title` (string): The title of the outcome
- `questions_answered` (number): Total number of questions answered

**Purpose**: Track quiz completion rate and outcome distribution

**Example**:
```typescript
logQuizCompleted(outcome, 5);
```

**Firebase Console Query**:
- Go to Analytics > Events
- Filter by `quiz_completed`
- View breakdown by `outcome_level` to see distribution

---

### 3. Waitlist Signup (`waitlist_signup`)

**When**: User successfully joins the waitlist

**Parameters**:
- `source` (string): Where the signup came from (e.g., "quiz", "landing", "outcome")
- `has_email` (boolean): Whether an email was provided (always true, but doesn't log the actual email for privacy)

**Purpose**: Track waitlist conversion rate and sources

**Example**:
```typescript
logWaitlistSignup(email, 'quiz');
```

**Privacy Note**: The actual email address is NOT sent to analytics, only a boolean indicating an email was provided.

---

### 4. Question Answered (`quiz_question_answered`)

**When**: User selects an answer to a quiz question

**Parameters**:
- `question_id` (string): The ID of the question
- `answer_id` (string): The ID of the selected answer
- `question_number` (number): The sequential number of the question (1, 2, 3, etc.)

**Purpose**: Track user progress through the quiz and identify drop-off points

**Example**:
```typescript
logQuestionAnswered('q1', 'a1', 1);
```

**Note**: This event is available but not currently implemented. To enable it, update the `useQuizEngine` hook.

---

## Automatic Events

Firebase Analytics also tracks these events automatically:

- `page_view`: When users navigate to different pages
- `first_visit`: First time a user visits the site
- `session_start`: When a user session begins
- `user_engagement`: User engagement metrics
- `scroll`: Scroll depth tracking

## Viewing Analytics in Firebase Console

### Real-time Events
1. Go to Firebase Console > Analytics > Realtime
2. See events as they happen in real-time
3. Useful for testing

### Event Reports
1. Go to Firebase Console > Analytics > Events
2. View all events and their parameters
3. Click on an event to see detailed breakdown

### Custom Reports
1. Go to Firebase Console > Analytics > Custom Definitions
2. Create custom dimensions for event parameters
3. Build custom reports in Google Analytics 4

## Conversion Tracking

### Quiz Completion Funnel

Track the conversion funnel:
1. Page view on `/evaluacion`
2. `quiz_started` event
3. `quiz_question_answered` events (if implemented)
4. `quiz_completed` event

**Conversion Rate Formula**:
```
Completion Rate = (quiz_completed / quiz_started) × 100
```

### Waitlist Conversion

Track waitlist signups:
1. `quiz_completed` event
2. `waitlist_signup` event with `source: "quiz"`

**Conversion Rate Formula**:
```
Waitlist Rate = (waitlist_signup / quiz_completed) × 100
```

## Privacy Considerations

- **No PII**: Email addresses are NOT sent to analytics
- **User Agent**: Browser info is stored in Firestore but not in Analytics
- **Anonymous**: All analytics data is anonymous by default
- **GDPR Compliant**: Firebase Analytics is GDPR compliant when configured properly

## Testing Analytics

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open browser console and check for analytics logs

3. Complete actions (start quiz, complete quiz, etc.)

4. Check Firebase Console > Analytics > DebugView (requires debug mode)

### Enable Debug Mode

Add this to your browser console:
```javascript
window['ga-disable-GA_MEASUREMENT_ID'] = false;
```

Or use the Firebase Analytics Debugger Chrome extension.

### Production Testing

1. Deploy to production
2. Complete test actions
3. Wait 24-48 hours for data to appear in reports
4. Check Firebase Console > Analytics > Events

## Common Queries

### Most Common Outcomes
```
Event: quiz_completed
Breakdown by: outcome_level
```

### Quiz Completion Rate
```
Events: quiz_started vs quiz_completed
Time period: Last 30 days
```

### Waitlist Sources
```
Event: waitlist_signup
Breakdown by: source
```

### Drop-off Points
```
Event: quiz_question_answered
Breakdown by: question_number
Look for significant drops between questions
```

## Troubleshooting

### Events Not Appearing

1. **Check Firebase Config**: Ensure `measurementId` is set in `.env`
2. **Wait 24 hours**: Analytics data can take time to process
3. **Use DebugView**: Enable debug mode for real-time testing
4. **Check Console**: Look for JavaScript errors

### Duplicate Events

- Events are deduplicated by Firebase automatically
- If you see duplicates, check for multiple `logEvent` calls

### Missing Parameters

- Ensure all required parameters are passed to log functions
- Check TypeScript types for parameter requirements

## Best Practices

1. **Consistent Naming**: Use snake_case for event names
2. **Meaningful Parameters**: Include context that helps analysis
3. **Privacy First**: Never log PII (emails, names, etc.)
4. **Test Thoroughly**: Test events in development before deploying
5. **Document Changes**: Update this file when adding new events

## Future Enhancements

Potential events to add:

- `quiz_restarted`: When user restarts the quiz
- `outcome_shared`: When user shares their outcome
- `resource_downloaded`: When user downloads resources
- `external_link_clicked`: When user clicks external links
- `error_occurred`: When errors happen (with error type)

## Resources

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [Privacy Best Practices](https://firebase.google.com/support/privacy)
