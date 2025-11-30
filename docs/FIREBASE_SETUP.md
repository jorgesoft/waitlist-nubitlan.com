# Firebase Setup Guide

This guide will help you set up Firebase for the readiness application.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## 2. Register Your Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "Readiness Quiz")
3. Copy the Firebase configuration object

## 3. Enable Firestore Database

1. In the Firebase Console, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose a location for your database
4. Start in **production mode** or **test mode** (for development)

### Recommended Security Rules

For production, use these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write quiz results (read-only for admins)
    match /quizResults/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // Allow anyone to write email subscriptions (read-only for admins)
    match /emailSubscriptions/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration values in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Important**: Add `.env` to your `.gitignore` to keep credentials secure

## 5. Data Structure

### Quiz Results Collection (`quizResults`)

Each document contains:
```typescript
{
  answers: {
    [questionId: string]: answerId
  },
  outcome: {
    id: string,
    level: 'ready' | 'partially-ready' | 'needs-work',
    title: string
  },
  completedAt: Timestamp,
  userAgent: string
}
```

### Email Subscriptions Collection (`emailSubscriptions`)

Each document contains:
```typescript
{
  email: string,
  source: string,
  subscribedAt: Timestamp,
  userAgent: string
}
```

## 6. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Complete a quiz at `/evaluacion`
3. Check your Firestore Console to verify data is being saved

## 7. Analytics (Optional)

Firebase Analytics is automatically initialized. You can view analytics in the Firebase Console under "Analytics" > "Dashboard".

## 8. Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Ensure Firestore security rules are properly configured
3. Consider setting up Firebase App Check for additional security

## Troubleshooting

### "Firebase: Error (auth/api-key-not-valid)"
- Check that your API key is correct in `.env`
- Ensure the API key is enabled in Google Cloud Console

### "Missing or insufficient permissions"
- Review your Firestore security rules
- Ensure the rules allow `create` operations for the collections

### Data not saving
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure Firestore is enabled in Firebase Console

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)
