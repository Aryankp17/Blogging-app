// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuR5dwwbIR4gikAWOtA-jZc4UWRjuxkHU",
  authDomain: "react-project-fb2c2.firebaseapp.com",
  projectId: "react-project-fb2c2",
  storageBucket: "react-project-fb2c2.firebasestorage.app",
  messagingSenderId: "891649940596",
  appId: "1:891649940596:web:6eaecd86a6b0db148ac521"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);