# Firebase Deployment Checklist

Use this checklist before deploying your application to production.

## ✅ Pre-Deployment Checklist

### Firebase Configuration

- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Web app registered in Firebase Console
- [ ] Firebase credentials copied to `.env`
- [ ] `.env` file is in `.gitignore`
- [ ] Environment variables configured in hosting platform

### Firestore Security

- [ ] Security rules configured (see FIREBASE_SETUP.md)
- [ ] Rules tested in Firebase Console Rules Playground
- [ ] Write-only access verified for public collections
- [ ] Admin access configured (if needed)

### Testing

- [ ] Quiz completion saves data to Firestore
- [ ] Data appears correctly in Firestore Console
- [ ] No console errors in browser
- [ ] Application builds successfully (`npm run build`)
- [ ] Preview build works (`npm run preview`)

### Performance

- [ ] Firestore indexes created (auto-created on first query)
- [ ] Bundle size checked (currently ~546 KB)
- [ ] Consider code splitting if needed
- [ ] Firebase Analytics configured (optional)

### Monitoring

- [ ] Firebase Console access shared with team
- [ ] Usage alerts configured
- [ ] Backup strategy planned
- [ ] Error monitoring set up (optional: Sentry, etc.)

## 🚀 Deployment Steps

### 1. Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Build and Deploy

```bash
# Build the application
npm run build

# Test the build locally
npm run preview

# Deploy (example for Vercel)
vercel --prod

# Or for Netlify
netlify deploy --prod
```

### 3. Post-Deployment Verification

- [ ] Visit production URL
- [ ] Complete a test quiz
- [ ] Verify data in Firestore Console
- [ ] Check Firebase Analytics (if enabled)
- [ ] Test on mobile devices
- [ ] Verify accessibility features work

## 🔒 Security Best Practices

### Production Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizResults/{resultId} {
      // Only allow creation with valid data structure
      allow create: if request.resource.data.keys().hasAll(['answers', 'outcome', 'completedAt'])
                    && request.resource.data.outcome.keys().hasAll(['id', 'level', 'title'])
                    && request.resource.data.completedAt == request.time;
      allow read, update, delete: if false;
    }
    
    match /emailSubscriptions/{subscriptionId} {
      // Only allow creation with valid email
      allow create: if request.resource.data.keys().hasAll(['email', 'source', 'subscribedAt'])
                    && request.resource.data.email is string
                    && request.resource.data.email.matches('.*@.*\\..*')
                    && request.resource.data.subscribedAt == request.time;
      allow read, update, delete: if false;
    }
  }
}
```

### Additional Security

- [ ] Enable Firebase App Check (recommended)
- [ ] Set up rate limiting with Cloud Functions
- [ ] Configure CORS if needed
- [ ] Review Firebase project permissions
- [ ] Enable 2FA for Firebase Console access

## 📊 Monitoring and Maintenance

### Regular Checks

- [ ] Monitor Firestore usage (daily/weekly)
- [ ] Check for quota limits
- [ ] Review error logs
- [ ] Analyze quiz completion rates
- [ ] Export data regularly for backup

### Firebase Console Dashboards

1. **Firestore Usage**: Monitor reads/writes/deletes
2. **Analytics**: Track user engagement
3. **Performance**: Monitor app performance
4. **Crashlytics**: Track errors (if configured)

## 🆘 Rollback Plan

If issues occur after deployment:

1. **Revert deployment**: Use hosting platform's rollback feature
2. **Check Firestore**: Verify no data corruption
3. **Review logs**: Check Firebase Console logs
4. **Test locally**: Reproduce issue in development
5. **Fix and redeploy**: Apply fix and test thoroughly

## 📞 Support Resources

- Firebase Status: https://status.firebase.google.com/
- Firebase Support: https://firebase.google.com/support
- Community: https://stackoverflow.com/questions/tagged/firebase

## 🎉 Post-Launch

After successful deployment:

- [ ] Announce launch to stakeholders
- [ ] Monitor first 24 hours closely
- [ ] Collect user feedback
- [ ] Plan next iteration
- [ ] Document any issues and solutions
