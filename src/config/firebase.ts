import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeiBFUMCoxSz-icvKu1d9avrriJJYDaZI",
  authDomain: "sv-verbot.firebaseapp.com",
  projectId: "sv-verbot",
  storageBucket: "sv-verbot.firebasestorage.app",
  messagingSenderId: "600040848515",
  appId: "1:600040848515:web:5b4629aac675eed2acafb6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);