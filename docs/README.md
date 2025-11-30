# Documentation

Welcome to the Readiness Application documentation!

## 🚀 Getting Started

**New to the project?** Start here:
- [Quick Start Guide](./QUICK_START.md) - Get up and running in 10 minutes

## 📚 Core Documentation

### Firebase Setup
- [Firebase Setup Guide](./FIREBASE_SETUP.md) - Complete Firebase configuration
- [Firebase Integration Summary](./FIREBASE_INTEGRATION.md) - What was added to the project
- [Firestore Initialization](./scripts/init-firestore.md) - Database setup and structure

### Analytics
- [Analytics Events](./ANALYTICS_EVENTS.md) - Custom event tracking documentation
- [Analytics Setup Complete](./ANALYTICS_SETUP_COMPLETE.md) - Analytics implementation summary

### Deployment
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification steps

### Accessibility
- [Accessibility Enhancements](./accessibility-enhancements.md) - Accessibility features
- [Accessibility Validation](./accessibility-validation.md) - Testing and validation

## 🎯 Quick Links

### For Developers
- Setting up Firebase → [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- Understanding analytics → [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md)
- Code examples → `../src/utils/analytics.example.tsx.md`

### For Deployment
- Pre-deployment checklist → [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- Environment variables → `../.env.example`

### For Product/Analytics
- What events are tracked → [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md)
- How to view data → [ANALYTICS_SETUP_COMPLETE.md](./ANALYTICS_SETUP_COMPLETE.md)

## 📊 Project Structure

```
docs/
├── README.md                          # This file
├── QUICK_START.md                     # Quick setup guide
├── FIREBASE_SETUP.md                  # Firebase configuration
├── FIREBASE_INTEGRATION.md            # Integration summary
├── ANALYTICS_EVENTS.md                # Analytics documentation
├── ANALYTICS_SETUP_COMPLETE.md        # Analytics summary
├── DEPLOYMENT_CHECKLIST.md            # Deployment guide
├── accessibility-enhancements.md      # Accessibility features
├── accessibility-validation.md        # Accessibility testing
└── scripts/
    └── init-firestore.md              # Firestore setup
```

## 🔧 Configuration Files

- `../.env.example` - Environment variable template
- `../src/config/firebase.ts` - Firebase initialization
- `../src/services/quizService.ts` - Database operations
- `../src/utils/analytics.ts` - Analytics helpers

## 🆘 Need Help?

1. Check the [Quick Start Guide](./QUICK_START.md) first
2. Review the [Firebase Setup Guide](./FIREBASE_SETUP.md) for configuration issues
3. See [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md) for analytics questions
4. Check the troubleshooting sections in each guide

## 📝 Contributing

When adding new features:
1. Update relevant documentation
2. Add analytics events if needed (see [ANALYTICS_EVENTS.md](./ANALYTICS_EVENTS.md))
3. Update the [FIREBASE_INTEGRATION.md](./FIREBASE_INTEGRATION.md) if adding Firebase features
4. Test accessibility (see [accessibility-validation.md](./accessibility-validation.md))
