// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUtvXoo6oze08nwgKt5ZVydwb0rPuMzBA",
  authDomain: "flashcard-83e75.firebaseapp.com",
  projectId: "flashcard-83e75",
  storageBucket: "flashcard-83e75.appspot.com",
  messagingSenderId: "52056463870",
  appId: "1:52056463870:web:3a8f1f147222c911aa48af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const db = getFirebase(app)
export {db}