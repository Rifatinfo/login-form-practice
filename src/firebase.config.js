// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9H6hmOWaEFqOnw7eMvojss9AaEsgQQZE",
  authDomain: "login-form-practice-b630c.firebaseapp.com",
  projectId: "login-form-practice-b630c",
  storageBucket: "login-form-practice-b630c.appspot.com",
  messagingSenderId: "415005118107",
  appId: "1:415005118107:web:255b198e4b756b1fa6803e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth