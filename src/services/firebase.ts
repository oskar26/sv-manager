import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeiBFUMCoxSz-icvKu1d9avrriJJYDaZI",
  authDomain: "sv-verbot.firebaseapp.com",
  projectId: "sv-verbot",
  storageBucket: "sv-verbot.firebasestorage.app",
  messagingSenderId: "600040848515",
  appId: "1:600040848515:web:5b4629aac675eed2acafb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Update Firestore rules to allow access when request.auth == null
// This is because we're using simple username/password auth instead of Firebase Auth
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
*/