import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-state-1440f.firebaseapp.com",
  projectId: "e-state-1440f",
  storageBucket: "e-state-1440f.appspot.com",
  messagingSenderId: "331738167779",
  appId: "1:331738167779:web:884794680d8e68d72408d6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
