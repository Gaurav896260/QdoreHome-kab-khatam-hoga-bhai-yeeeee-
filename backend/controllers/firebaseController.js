import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfbEawOIdbNqwhw2yhIJl0v8b0XpHwuxw",
  authDomain: "qdore-home2-437014.firebaseapp.com",
  projectId: "qdore-home2-437014",
  storageBucket: "qdore-home2-437014.appspot.com",
  messagingSenderId: "1071032802638",
  appId: "1:1071032802638:web:5af79c9e993ad74a16d21f",
  measurementId: "G-E2W23GMXYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export {
  auth,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
};
