// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB277AuV-Z5eVc5zATt5jW7Y3LyYzVIoHY",
  authDomain: "healthify-dce46.firebaseapp.com",
  projectId: "healthify-dce46",
  storageBucket: "healthify-dce46.firebasestorage.app",
  messagingSenderId: "957714639609",
  appId: "1:957714639609:web:24d8a6f343ce668728d028",
  measurementId: "G-TZBD6GRYZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
