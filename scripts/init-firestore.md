# Firestore Initialization Guide

After setting up your Firebase project and configuring the environment variables, you'll want to set up your Firestore collections and indexes.

## Collections Structure

Your Firestore database will automatically create these collections when data is first written:

### 1. `quizResults`
Stores completed quiz evaluations.

**Fields:**
- `answers` (map): Question ID to answer ID mapping
- `outcome` (map):
  - `id` (string): Outcome identifier
  - `level` (string): ready | partially-ready | needs-work
  - `title` (string): Outcome title
- `completedAt` (timestamp): When the quiz was completed
- `userAgent` (string): Browser user agent string

**Indexes needed:**
- Single field index on `completedAt` (Descending) - Auto-created on first query

### 2. `emailSubscriptions`
Stores email subscriptions from the waitlist.

**Fields:**
- `email` (string): Subscriber email address
- `source` (string): Where the subscription came from (e.g., "quiz", "landing")
- `subscribedAt` (timestamp): When they subscribed
- `userAgent` (string): Browser user agent string

**Indexes needed:**
- Single field index on `subscribedAt` (Descending) - Auto-created on first query
- Single field index on `email` (Ascending) - For duplicate checking (optional)

## Security Rules

Apply these rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Quiz results - write-only for users
    match /quizResults/{resultId} {
      allow create: if request.resource.data.keys().hasAll(['answers', 'outcome', 'completedAt'])
                    && request.resource.data.outcome.keys().hasAll(['id', 'level', 'title']);
      allow read, update, delete: if false;
    }
    
    // Email subscriptions - write-only for users
    match /emailSubscriptions/{subscriptionId} {
      allow create: if request.resource.data.keys().hasAll(['email', 'source', 'subscribedAt'])
                    && request.resource.data.email is string
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read, update, delete: if false;
    }
  }
}
```

## Testing Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/evaluacion` and complete a quiz

3. Check the Firestore Console to verify:
   - A new document appears in `quizResults`
   - The document has all expected fields
   - The timestamp is correct

## Viewing Data

To view your quiz results, you can:

1. **Firebase Console**: Go to Firestore Database and browse collections
2. **Export Data**: Use Firebase CLI to export data
3. **Custom Admin Panel**: Build a protected admin route using the `useQuizResults` hook

### Example: Simple Stats Query

In Firebase Console, you can run queries like:

- Count by outcome level:
  - Collection: `quizResults`
  - Filter: `outcome.level == ready`
  
- Recent completions:
  - Collection: `quizResults`
  - Order by: `completedAt desc`
  - Limit: 10

## Backup and Export

Set up automated backups:

1. Go to Firebase Console > Firestore Database
2. Click "Import/Export" tab
3. Set up scheduled exports to Cloud Storage

## Monitoring

Enable monitoring in Firebase Console:

1. Go to "Analytics" > "Dashboard" for user metrics
2. Go to "Firestore" > "Usage" for database metrics
3. Set up alerts for quota limits

## Next Steps

- Set up Firebase Authentication if you want to add user accounts
- Configure Firebase Hosting for deployment
- Add Cloud Functions for server-side processing (e.g., sending emails)
- Set up BigQuery export for advanced analytics
