
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6gHtNoie8e7fV5h8OjYRqCR4jIZ34hPw",
  authDomain: "plateforme-evenementielle.firebaseapp.com",
  databaseURL: "https://plateforme-evenementielle-default-rtdb.firebaseio.com",
  projectId: "plateforme-evenementielle",
  storageBucket: "plateforme-evenementielle.firebasestorage.app",
  messagingSenderId: "559131026057",
  appId: "1:559131026057:web:08c5450689f81cca6b1c58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtenir les instances des services que vous utiliserez
export const db = getDatabase(app); // Pour Firestore


