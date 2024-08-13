// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-real-estate-41576.firebaseapp.com",
  projectId: "mern-real-estate-41576",
  storageBucket: "mern-real-estate-41576.appspot.com",
  messagingSenderId: "237876755141",
  appId: "1:237876755141:web:8cb5372dd25a5fe5610eac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);