# 🚀 Quick Start Guide

Get your Firebase-powered readiness application up and running in minutes.

## Prerequisites

- Node.js installed
- Firebase account (free tier is fine)
- 10 minutes of your time

## Step 1: Install Dependencies ✅

Already done! Firebase is installed.

## Step 2: Create Firebase Project (5 min)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it (e.g., "readiness-app")
4. Enable Google Analytics (recommended)
5. Click "Create project"

## Step 3: Register Web App (2 min)

1. In Firebase Console, click the web icon `</>`
2. Register app with a nickname
3. Copy the `firebaseConfig` object

## Step 4: Enable Firestore (1 min)

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location
5. Click "Enable"

## Step 5: Configure Environment (2 min)

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Firebase config
nano .env  # or use your favorite editor
```

Paste your Firebase values:
```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

## Step 6: Set Security Rules (2 min)

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizResults/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /emailSubscriptions/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

Click "Publish"

## Step 7: Test It! (1 min)

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173/evaluacion
# Complete the quiz
# Check Firebase Console → Firestore Database
```

You should see a new document in `quizResults`!

## Step 8: Deploy (Optional)

```bash
# Build for production
npm run build

# Deploy to your hosting platform
# (Vercel, Netlify, Firebase Hosting, etc.)
```

Don't forget to set environment variables in your hosting platform!

## ✅ What's Working Now

- ✅ Quiz results saved to Firestore
- ✅ Analytics tracking quiz starts and completions
- ✅ Ready for waitlist signups
- ✅ Privacy-compliant (no PII in analytics)

## 📊 View Your Data

**Firestore Data:**
Firebase Console → Firestore Database → quizResults

**Analytics:**
Firebase Console → Analytics → Events

**Real-time:**
Firebase Console → Analytics → Realtime

## 🆘 Having Issues?

### "Firebase: Error (auth/api-key-not-valid)"
→ Check your `.env` file has the correct API key

### "Missing or insufficient permissions"
→ Check your Firestore security rules

### Data not saving
→ Check browser console for errors
→ Verify Firestore is enabled

### Analytics not showing
→ Wait 24-48 hours for dashboard data
→ Use DebugView for real-time testing

## 📚 Full Documentation

- `docs/FIREBASE_SETUP.md` - Detailed setup instructions
- `docs/ANALYTICS_EVENTS.md` - Analytics documentation
- `docs/FIREBASE_INTEGRATION.md` - What was added
- `docs/DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist

## 🎉 You're Done!

Your application is now:
- Saving quiz results to Firestore
- Tracking user engagement with Analytics
- Ready for production deployment

Questions? Check the documentation files above!
