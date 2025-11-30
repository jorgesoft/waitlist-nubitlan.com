import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvmxkjocXCy82eFK0aWgG8J0dTsYfkz60",
  authDomain: "nubitlan-waitlist.firebaseapp.com",
  databaseURL: "https://nubitlan-waitlist-default-rtdb.firebaseio.com",
  projectId: "nubitlan-waitlist",
  storageBucket: "nubitlan-waitlist.firebasestorage.app",
  messagingSenderId: "519023682806",
  appId: "1:519023682806:web:7e6d1fe2ef0863b667f8d7",
  measurementId: "G-BYM0DSX56D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
