// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAojcBvQnvfzH6eUj1z-DS6wK_ojBChbmM",
  authDomain: "stresscl-8f1be.firebaseapp.com",
  projectId: "stresscl-8f1be",
  storageBucket: "stresscl-8f1be.appspot.com",
  messagingSenderId: "768079350876",
  appId: "1:768079350876:web:19a528a4ad93133ea099",
  measurementId: "G-QNKWEEB7LH"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
